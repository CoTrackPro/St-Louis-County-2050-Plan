#!/usr/bin/env python3
"""
Data Quality Auditor — St. Louis County KPI Platform

Checks KPI data for completeness, staleness, outliers, and duplicates.
Works with CSV/JSON exports or directly against the KPI data model.

Usage:
    python scripts/data_quality_auditor.py --input measurements.csv
    python scripts/data_quality_auditor.py --input measurements.json --format json
    python scripts/data_quality_auditor.py --generate-sql  # Output SQL templates for direct DB use

Input CSV columns: kpi_id, period_start, period_end, value, data_quality
Input JSON: array of objects with same fields
"""

import json
import sys
import csv
import argparse
from datetime import datetime, timedelta
from collections import defaultdict
from typing import Any
import math


def load_csv(path: str) -> list[dict]:
    with open(path, newline="") as f:
        reader = csv.DictReader(f)
        rows = []
        for row in reader:
            for num_field in ("value",):
                if num_field in row and row[num_field]:
                    try:
                        row[num_field] = float(row[num_field])
                    except ValueError:
                        pass
            rows.append(row)
        return rows


def load_json(path: str) -> list[dict]:
    with open(path) as f:
        return json.load(f)


def check_completeness(measurements: list[dict]) -> dict:
    """Check for missing periods and null values."""
    issues = []
    by_kpi = defaultdict(list)
    for m in measurements:
        by_kpi[m.get("kpi_id", "unknown")].append(m)

    for kpi_id, records in by_kpi.items():
        # Check for null/missing values
        nulls = [r for r in records if r.get("value") is None or r.get("value") == ""]
        if nulls:
            issues.append({
                "check": "null_values",
                "severity": "high",
                "kpi_id": kpi_id,
                "count": len(nulls),
                "message": f"{kpi_id}: {len(nulls)} records with null/empty value",
            })

        # Check for missing periods (assumes monthly)
        dates = []
        for r in records:
            try:
                dates.append(datetime.strptime(r.get("period_start", ""), "%Y-%m-%d"))
            except (ValueError, TypeError):
                pass

        if len(dates) >= 2:
            dates.sort()
            for i in range(1, len(dates)):
                gap_days = (dates[i] - dates[i - 1]).days
                if gap_days > 45:  # More than ~1.5 months gap
                    issues.append({
                        "check": "missing_period",
                        "severity": "medium",
                        "kpi_id": kpi_id,
                        "message": f"{kpi_id}: Gap of {gap_days} days between {dates[i-1].strftime('%Y-%m-%d')} and {dates[i].strftime('%Y-%m-%d')}",
                    })

    return {
        "check_name": "completeness",
        "records_checked": len(measurements),
        "kpis_checked": len(by_kpi),
        "issues": issues,
        "issue_count": len(issues),
    }


def check_staleness(measurements: list[dict], max_stale_days: int = 45) -> dict:
    """Check for stale data (no recent updates)."""
    issues = []
    by_kpi = defaultdict(list)
    for m in measurements:
        by_kpi[m.get("kpi_id", "unknown")].append(m)

    today = datetime.now()

    for kpi_id, records in by_kpi.items():
        latest = None
        for r in records:
            try:
                d = datetime.strptime(r.get("period_end", r.get("period_start", "")), "%Y-%m-%d")
                if latest is None or d > latest:
                    latest = d
            except (ValueError, TypeError):
                pass

        if latest is None:
            issues.append({
                "check": "no_valid_dates",
                "severity": "high",
                "kpi_id": kpi_id,
                "message": f"{kpi_id}: No valid date found in any record",
            })
        else:
            stale_days = (today - latest).days
            if stale_days > max_stale_days:
                severity = "high" if stale_days > 90 else "medium"
                issues.append({
                    "check": "stale_data",
                    "severity": severity,
                    "kpi_id": kpi_id,
                    "days_stale": stale_days,
                    "latest_date": latest.strftime("%Y-%m-%d"),
                    "message": f"{kpi_id}: Data is {stale_days} days old (latest: {latest.strftime('%Y-%m-%d')})",
                })

    return {
        "check_name": "staleness",
        "threshold_days": max_stale_days,
        "issues": issues,
        "issue_count": len(issues),
    }


def check_outliers(measurements: list[dict], z_threshold: float = 2.5) -> dict:
    """Detect values >N standard deviations from the rolling mean."""
    issues = []
    by_kpi = defaultdict(list)
    for m in measurements:
        if isinstance(m.get("value"), (int, float)):
            by_kpi[m.get("kpi_id", "unknown")].append(m)

    for kpi_id, records in by_kpi.items():
        # Sort by date
        try:
            sorted_records = sorted(records, key=lambda r: r.get("period_start", ""))
        except TypeError:
            continue

        values = [r["value"] for r in sorted_records if isinstance(r.get("value"), (int, float))]

        if len(values) < 4:
            continue

        mean = sum(values) / len(values)
        variance = sum((v - mean) ** 2 for v in values) / len(values)
        std = math.sqrt(variance) if variance > 0 else 0

        if std == 0:
            continue

        for r in sorted_records:
            v = r.get("value")
            if isinstance(v, (int, float)):
                z_score = abs(v - mean) / std
                if z_score > z_threshold:
                    issues.append({
                        "check": "outlier",
                        "severity": "medium",
                        "kpi_id": kpi_id,
                        "period": r.get("period_start", ""),
                        "value": v,
                        "mean": round(mean, 2),
                        "std": round(std, 2),
                        "z_score": round(z_score, 2),
                        "message": f"{kpi_id}: Value {v} on {r.get('period_start', '?')} is {round(z_score, 1)} std devs from mean ({round(mean, 1)})",
                    })

    return {
        "check_name": "outliers",
        "z_threshold": z_threshold,
        "issues": issues,
        "issue_count": len(issues),
    }


def check_duplicates(measurements: list[dict]) -> dict:
    """Find duplicate records (same kpi_id + period)."""
    issues = []
    seen = defaultdict(int)

    for m in measurements:
        key = (m.get("kpi_id", ""), m.get("period_start", ""))
        seen[key] += 1

    for (kpi_id, period), count in seen.items():
        if count > 1:
            issues.append({
                "check": "duplicate",
                "severity": "high",
                "kpi_id": kpi_id,
                "period": period,
                "count": count,
                "message": f"{kpi_id}: {count} records for period {period}",
            })

    return {
        "check_name": "duplicates",
        "issues": issues,
        "issue_count": len(issues),
    }


def check_range(measurements: list[dict]) -> dict:
    """Check for values that seem implausible (negative percents, >100% rates, etc.)."""
    issues = []

    for m in measurements:
        v = m.get("value")
        kpi_id = m.get("kpi_id", "")
        unit = m.get("unit", "")

        if not isinstance(v, (int, float)):
            continue

        # Negative values for things that shouldn't be negative
        if v < 0 and unit in ("%", "days", "minutes", "hours", "rating_5"):
            issues.append({
                "check": "negative_value",
                "severity": "high",
                "kpi_id": kpi_id,
                "period": m.get("period_start", ""),
                "value": v,
                "message": f"{kpi_id}: Negative value ({v}) for unit type '{unit}'",
            })

        # Percentage over 100
        if v > 100 and unit == "%":
            issues.append({
                "check": "over_100_pct",
                "severity": "medium",
                "kpi_id": kpi_id,
                "period": m.get("period_start", ""),
                "value": v,
                "message": f"{kpi_id}: Value {v}% exceeds 100% — verify data",
            })

        # Rating over scale max
        if v > 5 and unit == "rating_5":
            issues.append({
                "check": "over_scale",
                "severity": "high",
                "kpi_id": kpi_id,
                "period": m.get("period_start", ""),
                "value": v,
                "message": f"{kpi_id}: Rating {v} exceeds 5-point scale",
            })

    return {
        "check_name": "range_check",
        "issues": issues,
        "issue_count": len(issues),
    }


def generate_report(results: list[dict]) -> str:
    """Generate markdown audit report."""
    total_issues = sum(r["issue_count"] for r in results)
    high = sum(1 for r in results for i in r.get("issues", []) if i.get("severity") == "high")
    medium = sum(1 for r in results for i in r.get("issues", []) if i.get("severity") == "medium")

    lines = [
        "# Data Quality Audit Report",
        f"**Date**: {datetime.now().strftime('%Y-%m-%d %H:%M')}",
        f"**Total Issues**: {total_issues} ({high} high, {medium} medium)",
        "",
        "---",
        "",
    ]

    # Summary table
    lines.extend([
        "## Summary",
        "",
        "| Check | Issues | Severity |",
        "|-------|--------|----------|",
    ])
    for r in results:
        severities = [i.get("severity", "?") for i in r.get("issues", [])]
        sev_str = f"{severities.count('high')} high, {severities.count('medium')} med" if severities else "—"
        status = "✅" if r["issue_count"] == 0 else "🔴" if any(s == "high" for s in severities) else "🟡"
        lines.append(f"| {status} {r['check_name']} | {r['issue_count']} | {sev_str} |")
    lines.append("")

    # Detail sections
    for r in results:
        if r["issue_count"] == 0:
            continue
        lines.extend([
            f"## {r['check_name'].replace('_', ' ').title()}",
            "",
        ])
        for i in r.get("issues", []):
            icon = "🔴" if i.get("severity") == "high" else "🟡"
            lines.append(f"- {icon} {i['message']}")
        lines.append("")

    # Recommendations
    if total_issues > 0:
        lines.extend([
            "## Recommendations",
            "",
        ])
        if high > 0:
            lines.append("- **Immediate**: Investigate and resolve all high-severity issues before next reporting cycle")
        if any(r["check_name"] == "staleness" and r["issue_count"] > 0 for r in results):
            lines.append("- **Process**: Review data collection schedules for stale KPIs; automate where possible")
        if any(r["check_name"] == "duplicates" and r["issue_count"] > 0 for r in results):
            lines.append("- **Data model**: Add unique constraints on (kpi_id, period_start) to prevent duplicates")
        if any(r["check_name"] == "completeness" and r["issue_count"] > 0 for r in results):
            lines.append("- **Governance**: Assign data steward per department responsible for monthly KPI submission")

    return "\n".join(lines)


def generate_sql() -> str:
    """Output SQL audit queries for direct database use."""
    return """-- ============================================================
-- Data Quality Audit SQL Templates
-- St. Louis County KPI Platform
-- Run against PostgreSQL with the kpi_data_model schema
-- ============================================================

-- 1. COMPLETENESS: Find missing monthly periods
SELECT kd.kpi_id, kd.name, expected_period
FROM kpi_definitions kd
CROSS JOIN generate_series(
  DATE_TRUNC('month', CURRENT_DATE - INTERVAL '12 months'),
  DATE_TRUNC('month', CURRENT_DATE),
  '1 month'::interval
) AS expected_period
LEFT JOIN kpi_measurements km
  ON km.kpi_id = kd.kpi_id
  AND DATE_TRUNC('month', km.period_start) = expected_period
WHERE km.measurement_id IS NULL
  AND kd.collection_frequency IN ('monthly', 'weekly')
  AND kd.is_active = true
ORDER BY kd.kpi_id, expected_period;

-- 2. STALENESS: KPIs with no recent data
SELECT kd.kpi_id, kd.name, kd.collection_frequency,
  MAX(km.period_end) AS latest_data,
  CURRENT_DATE - MAX(km.period_end) AS days_stale,
  CASE
    WHEN CURRENT_DATE - MAX(km.period_end) > 90 THEN '🔴 CRITICAL'
    WHEN CURRENT_DATE - MAX(km.period_end) > 45 THEN '🟡 STALE'
    ELSE '🟢 CURRENT'
  END AS freshness_status
FROM kpi_definitions kd
LEFT JOIN kpi_measurements km ON km.kpi_id = kd.kpi_id
WHERE kd.is_active = true
GROUP BY kd.kpi_id, kd.name, kd.collection_frequency
ORDER BY days_stale DESC NULLS FIRST;

-- 3. OUTLIERS: Values >2.5 std devs from rolling mean
WITH stats AS (
  SELECT kpi_id, period_start, value,
    AVG(value) OVER w AS rolling_avg,
    STDDEV(value) OVER w AS rolling_std
  FROM kpi_measurements
  WINDOW w AS (PARTITION BY kpi_id ORDER BY period_start
               ROWS BETWEEN 5 PRECEDING AND CURRENT ROW)
)
SELECT kpi_id, period_start, value,
  ROUND(rolling_avg::numeric, 2) AS rolling_avg,
  ROUND(rolling_std::numeric, 2) AS rolling_std,
  ROUND(ABS(value - rolling_avg) / NULLIF(rolling_std, 0), 1) AS z_score
FROM stats
WHERE rolling_std > 0
  AND ABS(value - rolling_avg) / rolling_std > 2.5
ORDER BY period_start DESC;

-- 4. DUPLICATES: Same KPI + period appearing multiple times
SELECT kpi_id, period_start, COUNT(*) AS duplicate_count
FROM kpi_measurements
GROUP BY kpi_id, period_start
HAVING COUNT(*) > 1
ORDER BY duplicate_count DESC;

-- 5. RANGE CHECK: Implausible values
SELECT km.kpi_id, kd.name, kd.unit, km.period_start, km.value,
  CASE
    WHEN km.value < 0 AND kd.unit IN ('%', 'days', 'minutes') THEN 'Negative value'
    WHEN km.value > 100 AND kd.unit = '%' THEN 'Over 100%'
    WHEN km.value > 5 AND kd.unit = 'rating_5' THEN 'Over scale max'
    ELSE 'OK'
  END AS issue
FROM kpi_measurements km
JOIN kpi_definitions kd ON kd.kpi_id = km.kpi_id
WHERE (km.value < 0 AND kd.unit IN ('%', 'days', 'minutes', 'hours'))
   OR (km.value > 100 AND kd.unit = '%')
   OR (km.value > 5 AND kd.unit = 'rating_5');

-- 6. DATA QUALITY FLAGS: Summary of estimated vs measured data
SELECT kpi_id,
  COUNT(*) AS total_records,
  SUM(CASE WHEN data_quality = 'measured' THEN 1 ELSE 0 END) AS measured,
  SUM(CASE WHEN data_quality = 'estimated' THEN 1 ELSE 0 END) AS estimated,
  SUM(CASE WHEN data_quality = 'projected' THEN 1 ELSE 0 END) AS projected,
  ROUND(100.0 * SUM(CASE WHEN data_quality = 'measured' THEN 1 ELSE 0 END) / COUNT(*), 1) AS measured_pct
FROM kpi_measurements
GROUP BY kpi_id
ORDER BY measured_pct ASC;

-- 7. FRESHNESS DASHBOARD: All KPIs with status
SELECT
  d.name AS department,
  kd.kpi_id,
  kd.name AS kpi_name,
  kd.collection_frequency,
  MAX(km.period_end) AS latest_data,
  CURRENT_DATE - MAX(km.period_end) AS days_stale,
  COUNT(km.measurement_id) AS total_records,
  CASE
    WHEN MAX(km.period_end) IS NULL THEN '⚪ NO DATA'
    WHEN CURRENT_DATE - MAX(km.period_end) > 90 THEN '🔴 CRITICAL'
    WHEN CURRENT_DATE - MAX(km.period_end) > 45 THEN '🟡 STALE'
    ELSE '🟢 CURRENT'
  END AS status
FROM kpi_definitions kd
JOIN departments d ON d.department_id = kd.department_id
LEFT JOIN kpi_measurements km ON km.kpi_id = kd.kpi_id
WHERE kd.is_active = true
GROUP BY d.name, kd.kpi_id, kd.name, kd.collection_frequency
ORDER BY d.name, days_stale DESC NULLS FIRST;
"""


def main():
    parser = argparse.ArgumentParser(description="Audit KPI data quality")
    parser.add_argument("--input", "-i", help="Path to CSV or JSON data file")
    parser.add_argument("--format", "-f", choices=["csv", "json"], default="csv", help="Input format")
    parser.add_argument("--output", "-o", help="Output file path")
    parser.add_argument("--generate-sql", action="store_true", help="Output SQL templates instead")
    parser.add_argument("--stale-days", type=int, default=45, help="Max acceptable data age in days")
    parser.add_argument("--z-threshold", type=float, default=2.5, help="Z-score threshold for outliers")
    args = parser.parse_args()

    if args.generate_sql:
        sql = generate_sql()
        if args.output:
            with open(args.output, "w") as f:
                f.write(sql)
            print(f"✅ SQL templates written to {args.output}")
        else:
            print(sql)
        return

    if not args.input:
        print("Error: Provide --input file or --generate-sql", file=sys.stderr)
        sys.exit(1)

    # Load data
    if args.format == "json":
        measurements = load_json(args.input)
    else:
        measurements = load_csv(args.input)

    # Run all checks
    results = [
        check_completeness(measurements),
        check_staleness(measurements, args.stale_days),
        check_outliers(measurements, args.z_threshold),
        check_duplicates(measurements),
        check_range(measurements),
    ]

    report = generate_report(results)

    if args.output:
        with open(args.output, "w") as f:
            f.write(report)
        print(f"✅ Audit report written to {args.output}")
    else:
        print(report)


if __name__ == "__main__":
    main()
