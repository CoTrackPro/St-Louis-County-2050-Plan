#!/usr/bin/env python3
"""
Benchmark Comparator — St. Louis County vs. National Peers

Reads benchmark-data.csv, compares department actuals to national medians
(ICMA, NRPA, CALEA, Best Friends, etc.), outputs gap report with
percentile positioning and improvement priorities.

Usage:
    python scripts/benchmark_comparator.py --benchmarks assets/benchmark-data.csv --actuals actuals.json
    python scripts/benchmark_comparator.py --benchmarks assets/benchmark-data.csv --actuals actuals.json --department permits
    python scripts/benchmark_comparator.py --benchmarks assets/benchmark-data.csv --actuals actuals.json --output report.md
    python scripts/benchmark_comparator.py --benchmarks assets/benchmark-data.csv --list-kpis  # Show available benchmark KPIs

Input actuals format (JSON):
    [
        {"kpi_id": "permits_avg_processing", "value": 12.3, "direction": "lower_is_better"},
        {"kpi_id": "animal_live_release", "value": 89, "direction": "higher_is_better"}
    ]

Benchmark CSV columns: kpi_id, kpi_name, department, unit, source, peer_group, year, p25, median, p75, best_in_class, notes
"""

import argparse
import csv
import json
import sys


def load_benchmarks(path: str) -> list[dict]:
    """Load benchmark data from CSV."""
    benchmarks = []
    with open(path, newline="") as f:
        reader = csv.DictReader(f)
        for row in reader:
            for field in ("p25", "median", "p75", "best_in_class"):
                if row.get(field):
                    try:
                        row[field] = float(row[field])
                    except ValueError:
                        row[field] = None
                else:
                    row[field] = None
            benchmarks.append(row)
    return benchmarks


def estimate_percentile(value: float, p25: float, median: float, p75: float, direction: str) -> int:
    """Estimate the percentile of a value given p25/median/p75 benchmarks."""
    if direction == "lower_is_better":
        # Lower is better: if value < p25, that's GOOD (above 75th percentile performance)
        if value <= p25:
            return 85  # Rough estimate: better than 75th percentile
        elif value <= median:
            spread = median - p25
            if spread > 0:
                position = (median - value) / spread
                return 50 + int(position * 25)
            return 60
        elif value <= p75:
            spread = p75 - median
            if spread > 0:
                position = (p75 - value) / spread
                return 25 + int(position * 25)
            return 35
        else:
            return 15  # Below 25th percentile
    else:
        # Higher is better: if value > p75, that's GOOD
        if value >= p75:
            return 85
        elif value >= median:
            spread = p75 - median
            if spread > 0:
                position = (value - median) / spread
                return 50 + int(position * 25)
            return 60
        elif value >= p25:
            spread = median - p25
            if spread > 0:
                position = (value - p25) / spread
                return 25 + int(position * 25)
            return 35
        else:
            return 15


def compare(actuals: list[dict], benchmarks: list[dict], department: str = None) -> list[dict]:
    """Compare actuals to benchmarks."""
    bench_lookup = {b["kpi_id"]: b for b in benchmarks}
    results = []

    for actual in actuals:
        kpi_id = actual.get("kpi_id", "")
        bench = bench_lookup.get(kpi_id)

        if not bench:
            results.append({
                **actual,
                "benchmark_found": False,
                "message": f"No benchmark data found for {kpi_id}",
            })
            continue

        if department and bench.get("department") != department:
            continue

        value = actual.get("value")
        direction = actual.get("direction", bench.get("direction", "higher_is_better"))
        median = bench.get("median")
        p25 = bench.get("p25")
        p75 = bench.get("p75")
        best = bench.get("best_in_class")

        if value is None or median is None:
            results.append({**actual, **bench, "benchmark_found": True, "comparison": "insufficient_data"})
            continue

        # Gap to median
        gap_to_median = value - median
        if direction == "lower_is_better":
            gap_to_median = median - value  # positive = better than median

        # Percentile estimate
        percentile = None
        if p25 is not None and p75 is not None:
            percentile = estimate_percentile(value, p25, median, p75, direction)

        # Gap to best in class
        gap_to_best = None
        if best is not None:
            gap_to_best = value - best
            if direction == "lower_is_better":
                gap_to_best = best - value  # positive = better than best

        # Classification
        if percentile is not None:
            if percentile >= 75:
                position = "🟢 Top Quartile"
            elif percentile >= 50:
                position = "🟢 Above Median"
            elif percentile >= 25:
                position = "🟡 Below Median"
            else:
                position = "🔴 Bottom Quartile"
        else:
            if direction == "lower_is_better":
                position = "🟢 Above Median" if value <= median else "🔴 Below Median"
            else:
                position = "🟢 Above Median" if value >= median else "🔴 Below Median"

        results.append({
            "kpi_id": kpi_id,
            "kpi_name": bench.get("kpi_name", kpi_id),
            "department": bench.get("department", ""),
            "unit": bench.get("unit", ""),
            "direction": direction,
            "benchmark_found": True,
            "actual_value": value,
            "p25": p25,
            "median": median,
            "p75": p75,
            "best_in_class": best,
            "source": bench.get("source", ""),
            "peer_group": bench.get("peer_group", ""),
            "year": bench.get("year", ""),
            "gap_to_median": round(gap_to_median, 2) if gap_to_median is not None else None,
            "gap_to_best": round(gap_to_best, 2) if gap_to_best is not None else None,
            "estimated_percentile": percentile,
            "position": position,
            "notes": bench.get("notes", ""),
        })

    return results


def generate_report(results: list[dict]) -> str:
    """Generate markdown benchmark comparison report."""
    found = [r for r in results if r.get("benchmark_found")]
    not_found = [r for r in results if not r.get("benchmark_found")]

    # Summary
    top_quartile = sum(1 for r in found if r.get("estimated_percentile", 0) >= 75)
    above_median = sum(1 for r in found if 50 <= r.get("estimated_percentile", 0) < 75)
    below_median = sum(1 for r in found if 25 <= r.get("estimated_percentile", 0) < 50)
    bottom = sum(1 for r in found if r.get("estimated_percentile", 0) < 25)

    lines = [
        "# Benchmark Comparison Report — St. Louis County vs. National Peers",
        f"**Date**: {__import__('datetime').datetime.now().strftime('%Y-%m-%d')}",
        f"**KPIs Compared**: {len(found)} (of {len(results)} submitted)",
        "",
        "---",
        "",
        "## Peer Positioning Summary",
        "",
        f"- 🟢 **Top Quartile** (≥75th %ile): {top_quartile} KPIs",
        f"- 🟢 **Above Median** (50th–74th %ile): {above_median} KPIs",
        f"- 🟡 **Below Median** (25th–49th %ile): {below_median} KPIs",
        f"- 🔴 **Bottom Quartile** (<25th %ile): {bottom} KPIs",
        "",
    ]

    # Group by department
    by_dept: dict[str, list[dict]] = {}
    for r in found:
        dept = r.get("department", "other")
        if dept not in by_dept:
            by_dept[dept] = []
        by_dept[dept].append(r)

    for dept, dept_results in sorted(by_dept.items()):
        lines.extend([
            "---",
            "",
            f"## {dept.replace('_', ' ').title()}",
            "",
            "| KPI | STL County | Median | P25 | P75 | Best | %ile | Position | Source |",
            "|-----|-----------|--------|-----|-----|------|------|----------|--------|",
        ])

        for r in sorted(dept_results, key=lambda x: x.get("estimated_percentile", 50)):
            unit = r.get("unit", "")
            actual = f"{r.get('actual_value', '?')} {unit}".strip()
            med = f"{r.get('median', '?')} {unit}".strip() if r.get("median") is not None else "—"
            p25 = f"{r.get('p25', '?')}" if r.get("p25") is not None else "—"
            p75 = f"{r.get('p75', '?')}" if r.get("p75") is not None else "—"
            best = f"{r.get('best_in_class', '?')}" if r.get("best_in_class") is not None else "—"
            pctile = f"{r.get('estimated_percentile', '?')}th" if r.get("estimated_percentile") is not None else "—"
            position = r.get("position", "—")
            source = r.get("source", "—")
            name = r.get("kpi_name", r.get("kpi_id", ""))[:35]

            lines.append(f"| {name} | {actual} | {med} | {p25} | {p75} | {best} | {pctile} | {position} | {source} |")

        lines.append("")

    # Improvement priorities (bottom quartile and below median)
    priorities = sorted(
        [r for r in found if r.get("estimated_percentile", 50) < 50],
        key=lambda x: x.get("estimated_percentile", 50)
    )

    if priorities:
        lines.extend([
            "---",
            "",
            "## Improvement Priorities (Below Median)",
            "",
            "Ranked by distance from peer median, worst first:",
            "",
        ])
        for i, r in enumerate(priorities, 1):
            gap = r.get("gap_to_median", 0)
            direction = "need to reduce by" if r.get("direction") == "lower_is_better" and gap < 0 else "need to improve by"
            if r.get("direction") == "lower_is_better":
                direction = "need to reduce by" if gap < 0 else "ahead by"
            else:
                direction = "need to improve by" if gap < 0 else "ahead by"

            lines.append(
                f"{i}. **{r.get('kpi_name', '')}** ({r.get('department', '')}) — "
                f"STL: {r.get('actual_value')} vs median: {r.get('median')}. "
                f"{direction} {abs(gap)} {r.get('unit', '')}. "
                f"Est. {r.get('estimated_percentile', '?')}th percentile. "
                f"Source: {r.get('source', '?')}"
            )
        lines.append("")

    # Not found
    if not_found:
        lines.extend([
            "---",
            "",
            "## KPIs Without Benchmark Data",
            "",
        ])
        for r in not_found:
            lines.append(f"- {r.get('kpi_id', '?')}: {r.get('message', 'No benchmark found')}")
        lines.append("")

    return "\n".join(lines)


def list_available_kpis(benchmarks: list[dict]) -> str:
    """List all available benchmark KPIs."""
    lines = [
        "# Available Benchmark KPIs",
        "",
        "| kpi_id | Name | Department | Source | Peer Group | Year |",
        "|--------|------|-----------|--------|-----------|------|",
    ]
    for b in sorted(benchmarks, key=lambda x: (x.get("department", ""), x.get("kpi_id", ""))):
        lines.append(
            f"| {b.get('kpi_id', '')} | {b.get('kpi_name', '')} | "
            f"{b.get('department', '')} | {b.get('source', '')} | "
            f"{b.get('peer_group', '')} | {b.get('year', '')} |"
        )
    return "\n".join(lines)


def main():
    parser = argparse.ArgumentParser(description="Compare STL County KPIs to national benchmarks")
    parser.add_argument("--benchmarks", "-b", required=True, help="Path to benchmark-data.csv")
    parser.add_argument("--actuals", "-a", help="Path to JSON file with actual KPI values")
    parser.add_argument("--inline", help="Inline JSON string with actuals")
    parser.add_argument("--department", "-d", help="Filter by department")
    parser.add_argument("--output", "-o", help="Output file path")
    parser.add_argument("--format", "-f", choices=["json", "markdown", "both"], default="both")
    parser.add_argument("--list-kpis", action="store_true", help="List available benchmark KPIs")
    args = parser.parse_args()

    benchmarks = load_benchmarks(args.benchmarks)

    if args.list_kpis:
        print(list_available_kpis(benchmarks))
        return

    if args.inline:
        actuals = json.loads(args.inline)
    elif args.actuals:
        with open(args.actuals) as f:
            actuals = json.load(f)
    else:
        print("Error: Provide --actuals file, --inline JSON, or --list-kpis", file=sys.stderr)
        sys.exit(1)

    if not isinstance(actuals, list):
        actuals = [actuals]

    results = compare(actuals, benchmarks, args.department)

    output_parts = []
    if args.format in ("markdown", "both"):
        output_parts.append(generate_report(results))
    if args.format in ("json", "both"):
        output_parts.append(json.dumps(results, indent=2, ensure_ascii=False))

    output_text = "\n\n---\n\n".join(output_parts)
    if args.output:
        with open(args.output, "w") as f:
            f.write(output_text)
        print(f"✅ Report written to {args.output}")
    else:
        print(output_text)


if __name__ == "__main__":
    main()
