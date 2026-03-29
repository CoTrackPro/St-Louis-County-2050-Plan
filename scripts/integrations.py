#!/usr/bin/env python3
"""
Integration Starter Code — API Clients for County Data Sources

Working code snippets for connecting to real data sources. Each client
is self-contained and can be used independently.

Usage:
    python scripts/integrations.py census --county 29189 --table B01001
    python scripts/integrations.py socrata --dataset xxxx-xxxx
    python scripts/integrations.py test    # Test all connections
"""

import argparse
import json
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode
from urllib.request import Request, urlopen

# ============================================================
# Census ACS API Client
# ============================================================


class CensusClient:
    """US Census American Community Survey API client.

    Free API — no key required for basic access (limited rate).
    Get an API key at: https://api.census.gov/data/key_signup.html
    """

    BASE = "https://api.census.gov/data"
    STL_COUNTY_FIPS = {"state": "29", "county": "189"}  # St. Louis County, MO

    COMMON_TABLES = {
        "population": {"table": "B01001", "variables": ["B01001_001E"], "labels": ["Total Population"]},
        "median_income": {"table": "B19013", "variables": ["B19013_001E"], "labels": ["Median Household Income"]},
        "race": {
            "table": "B02001",
            "variables": ["B02001_001E", "B02001_002E", "B02001_003E"],
            "labels": ["Total", "White", "Black"],
        },
        "age_65plus": {"table": "B01001", "variables": ["B01001_001E"], "labels": ["Total Population"]},
        "housing_tenure": {
            "table": "B25003",
            "variables": ["B25003_001E", "B25003_002E", "B25003_003E"],
            "labels": ["Total", "Owner", "Renter"],
        },
        "poverty": {
            "table": "B17001",
            "variables": ["B17001_001E", "B17001_002E"],
            "labels": ["Total", "Below Poverty"],
        },
    }

    def __init__(self, api_key: str = None):
        self.api_key = api_key

    def get_county_data(self, variables: list[str], year: int = 2023, state: str = None, county: str = None) -> dict:
        """Fetch ACS 5-year data for a county."""
        state = state or self.STL_COUNTY_FIPS["state"]
        county = county or self.STL_COUNTY_FIPS["county"]

        params = {
            "get": ",".join(variables),
            "for": f"county:{county}",
            "in": f"state:{state}",
        }
        if self.api_key:
            params["key"] = self.api_key

        url = f"{self.BASE}/{year}/acs/acs5?{urlencode(params)}"

        try:
            req = Request(url, headers={"User-Agent": "STLCountyKPI/1.0"})
            with urlopen(req, timeout=15) as resp:
                data = json.loads(resp.read())
                # Census returns [header_row, data_row]
                if len(data) >= 2:
                    headers = data[0]
                    values = data[1]
                    return dict(zip(headers, values))
                return {"raw": data}
        except (URLError, HTTPError) as e:
            return {"error": str(e), "url": url}

    def get_common(self, topic: str, year: int = 2023) -> dict:
        """Fetch common demographic data by topic name."""
        if topic not in self.COMMON_TABLES:
            return {"error": f"Unknown topic. Available: {list(self.COMMON_TABLES.keys())}"}

        spec = self.COMMON_TABLES[topic]
        result = self.get_county_data(spec["variables"], year)

        if "error" not in result:
            labeled = {}
            for var, label in zip(spec["variables"], spec["labels"]):
                val = result.get(var)
                labeled[label] = int(val) if val and val.isdigit() else val
            result["labeled"] = labeled

        return result


# ============================================================
# Socrata Open Data API Client (County Open Data Portal)
# ============================================================


class SocrataClient:
    """Socrata Open Data API (SODA) client for county data portal.

    St. Louis County portal: https://data.stlouisco.com
    No API key required for public datasets (rate limited).
    """

    BASE = "https://data.stlouisco.com/resource"

    def __init__(self, domain: str = "data.stlouisco.com", app_token: str = None):
        self.domain = domain
        self.base = f"https://{domain}/resource"
        self.app_token = app_token

    def query(
        self, dataset_id: str, select: str = None, where: str = None, order: str = None, limit: int = 1000
    ) -> list[dict]:
        """Query a Socrata dataset using SoQL."""
        params = {"$limit": str(limit)}
        if select:
            params["$select"] = select
        if where:
            params["$where"] = where
        if order:
            params["$order"] = order

        url = f"{self.base}/{dataset_id}.json?{urlencode(params)}"
        headers = {"User-Agent": "STLCountyKPI/1.0"}
        if self.app_token:
            headers["X-App-Token"] = self.app_token

        try:
            req = Request(url, headers=headers)
            with urlopen(req, timeout=15) as resp:
                return json.loads(resp.read())
        except (URLError, HTTPError) as e:
            return [{"error": str(e), "url": url}]

    def list_datasets(self) -> list[dict]:
        """List available datasets on the portal."""
        url = f"https://{self.domain}/api/catalog/v1?domains={self.domain}&limit=50"
        try:
            req = Request(url, headers={"User-Agent": "STLCountyKPI/1.0"})
            with urlopen(req, timeout=15) as resp:
                data = json.loads(resp.read())
                return [
                    {
                        "name": r.get("resource", {}).get("name", ""),
                        "id": r.get("resource", {}).get("id", ""),
                        "description": r.get("resource", {}).get("description", "")[:100],
                        "updated": r.get("resource", {}).get("updatedAt", ""),
                    }
                    for r in data.get("results", [])
                ]
        except (URLError, HTTPError) as e:
            return [{"error": str(e)}]


# ============================================================
# FBI Crime Data Explorer API Client
# ============================================================


class UCRClient:
    """FBI Uniform Crime Reporting (UCR) API client.

    API docs: https://crime-data-explorer.fr.cloud.gov/pages/docApi
    Free, no key required.
    """

    BASE = "https://api.usa.gov/crime/fbi/cde"

    # St. Louis County PD ORI (agency identifier) — verify actual ORI
    STL_COUNTY_ORI = "MO0950000"

    def get_agency_crime(
        self, ori: str = None, offense: str = "violent-crime", start_year: int = 2018, end_year: int = 2023
    ) -> dict:
        """Fetch crime data for an agency by ORI code."""
        ori = ori or self.STL_COUNTY_ORI
        url = f"{self.BASE}/summarized/agency/{ori}/{offense}?from={start_year}&to={end_year}"

        try:
            req = Request(url, headers={"User-Agent": "STLCountyKPI/1.0"})
            with urlopen(req, timeout=15) as resp:
                return json.loads(resp.read())
        except (URLError, HTTPError) as e:
            return {"error": str(e), "url": url}


# ============================================================
# Qless API Pattern (Template — Requires County Credentials)
# ============================================================


class QlessClient:
    """Qless virtual queue API client pattern.

    NOTE: Qless API requires county admin credentials.
    This is a template showing the expected API structure.
    Replace BASE_URL and API_KEY with actual values from county IT.

    API docs: https://api.qless.com/docs (requires partner access)
    """

    # Template — replace with actual values
    BASE = "https://api.qless.com/v1"

    def __init__(self, api_key: str = "YOUR_QLESS_API_KEY"):
        self.api_key = api_key
        self.headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        }

    def get_current_wait(self, location_id: str) -> dict:
        """Get current average wait time for a location.

        Returns: {"avg_wait_minutes": N, "queue_length": N, "serving": N}

        NOTE: This is a template — actual endpoint may differ.
        Contact Qless support or county IT for actual API docs.
        """
        # Template — actual implementation requires credentials
        return {
            "note": "Template — requires county Qless API credentials",
            "expected_endpoint": f"{self.BASE}/locations/{location_id}/stats",
            "expected_response": {
                "avg_wait_minutes": "number",
                "queue_length": "number",
                "currently_serving": "number",
                "no_show_rate": "number",
            },
            "how_to_get_credentials": "Contact county IT department for Qless admin API access",
        }

    def get_historical_stats(self, location_id: str, start_date: str, end_date: str) -> dict:
        """Get historical wait time and volume data.

        This data feeds directly into:
        - Customer Service KPIs (wait time, service time)
        - Demand forecasting models
        - Capacity planning calculator
        """
        return {
            "note": "Template — requires county Qless API credentials",
            "expected_data": {
                "daily_stats": [
                    {
                        "date": "2026-01-15",
                        "total_served": 145,
                        "avg_wait_minutes": 22.3,
                        "avg_service_minutes": 12.1,
                        "no_shows": 8,
                        "peak_hour": "9:00-10:00",
                        "peak_wait_minutes": 38.5,
                    }
                ]
            },
            "kpis_fed": [
                "customer_qless_wait",
                "customer_fcr",
                "customer_digital_rate (via channel tracking)",
            ],
        }


# ============================================================
# Connection Tester
# ============================================================


def test_connections():
    """Test all available API connections."""
    results = []

    # Census API
    print("Testing Census ACS API...")
    census = CensusClient()
    r = census.get_county_data(["B01001_001E"], 2023)
    ok = "error" not in r
    pop = r.get("B01001_001E", "?") if ok else "N/A"
    results.append(("Census ACS", ok, f"Population: {pop}"))
    print(f"  {'✅' if ok else '❌'} Census: {pop if ok else r.get('error', 'unknown error')}")

    # Socrata
    print("Testing Socrata Open Data Portal...")
    socrata = SocrataClient()
    datasets = socrata.list_datasets()
    ok = len(datasets) > 0 and "error" not in datasets[0]
    results.append(("Socrata Portal", ok, f"{len(datasets)} datasets found"))
    print(f"  {'✅' if ok else '❌'} Socrata: {len(datasets)} datasets" if ok else f"  ❌ Socrata: {datasets}")

    # FBI UCR
    print("Testing FBI Crime Data Explorer...")
    ucr = UCRClient()
    r = ucr.get_agency_crime()
    ok = "error" not in r
    results.append(("FBI UCR", ok, ""))
    print(f"  {'✅' if ok else '❌'} FBI UCR: {'connected' if ok else r.get('error', 'unknown')}")

    # Qless (template only)
    print("Qless API: Template only — requires county credentials")
    results.append(("Qless", False, "Template — needs county API key"))

    print(f"\n{'=' * 50}")
    connected = sum(1 for _, ok, _ in results if ok)
    print(f"Connected: {connected}/{len(results)}")

    return results


def main():
    parser = argparse.ArgumentParser(description="API integration clients for county data")
    parser.add_argument("command", choices=["census", "socrata", "ucr", "qless", "test"], help="Which API to query")
    parser.add_argument("--county", default="29189", help="FIPS code (default: 29189 STL County)")
    parser.add_argument("--table", default="B01001", help="Census table")
    parser.add_argument("--dataset", help="Socrata dataset ID")
    parser.add_argument(
        "--topic", help="Census common topic (population, median_income, race, poverty, housing_tenure)"
    )
    parser.add_argument("--output", "-o", help="Output file")
    args = parser.parse_args()

    if args.command == "test":
        test_connections()
        return

    if args.command == "census":
        client = CensusClient()
        if args.topic:
            result = client.get_common(args.topic)
        else:
            state = args.county[:2]
            county = args.county[2:]
            result = client.get_county_data([f"{args.table}_001E"], state=state, county=county)

    elif args.command == "socrata":
        client = SocrataClient()
        if args.dataset:
            result = client.query(args.dataset, limit=10)
        else:
            result = client.list_datasets()

    elif args.command == "ucr":
        client = UCRClient()
        result = client.get_agency_crime()

    elif args.command == "qless":
        client = QlessClient()
        result = client.get_current_wait("location-1")

    output = json.dumps(result, indent=2, ensure_ascii=False)
    if args.output:
        with open(args.output, "w") as f:
            f.write(output)
        print(f"✅ Output written to {args.output}")
    else:
        print(output)


if __name__ == "__main__":
    main()
