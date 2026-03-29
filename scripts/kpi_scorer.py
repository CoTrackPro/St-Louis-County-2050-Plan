#!/usr/bin/env python3
"""
KPI Scorer — St. Louis County Government Services

Calculates gap-to-target, status (🟢🟡🔴), trend %, and composite
department score from raw KPI data input.

Usage:
    python scripts/kpi_scorer.py --input kpis.json
    python scripts/kpi_scorer.py --input kpis.json --output scored.json
    python scripts/kpi_scorer.py --department permits --inline '[{"kpi_id":"avg_processing","value":12.3,"target":10,"prior":13.4,"direction":"lower_is_better"}]'

Input format (JSON array):
    [
        {
            "kpi_id": "avg_processing",
            "department_id": "permits",
            "name": "Avg Processing Time",
            "value": 12.3,
            "target": 10,
            "unit": "days",
            "prior": 13.4,
            "direction": "lower_is_better"  // or "higher_is_better"
        }
    ]

Output: Scored KPIs with status, gap, trend, plus department composite.
"""

import argparse
import json
import sys


def score_kpi(kpi: dict) -> dict:
    """Score a single KPI: status, gap, trend, attainment."""
    value = kpi.get("value")
    target = kpi.get("target")
    prior = kpi.get("prior")
    direction = kpi.get("direction", "higher_is_better")

    if value is None or target is None:
        return {
            **kpi,
            "status": "⚪",
            "status_label": "no_data",
            "gap": None,
            "attainment_pct": None,
            "trend_pct": None,
        }

    # Calculate attainment (how close to target)
    if direction == "lower_is_better":
        # For lower-is-better, attainment > 100% means beating target
        if value == 0 and target == 0:
            attainment = 100.0
        elif target == 0:
            attainment = 0.0
        else:
            attainment = (target / value) * 100 if value > 0 else 100.0
        gap = target - value  # negative = above target (bad)
    else:
        # For higher-is-better, attainment > 100% means beating target
        if target == 0:
            attainment = 100.0 if value >= 0 else 0.0
        else:
            attainment = (value / target) * 100
        gap = value - target  # negative = below target (bad)

    # Status thresholds
    if attainment >= 90:
        status = "🟢"
        status_label = "on_target"
    elif attainment >= 75:
        status = "🟡"
        status_label = "approaching"
    else:
        status = "🔴"
        status_label = "below_target"

    # Trend calculation
    trend_pct = None
    trend_direction = None
    if prior is not None and prior != 0:
        trend_pct = round(((value - prior) / abs(prior)) * 100, 1)
        if direction == "lower_is_better":
            trend_direction = "improving" if trend_pct < 0 else "declining" if trend_pct > 0 else "flat"
        else:
            trend_direction = "improving" if trend_pct > 0 else "declining" if trend_pct < 0 else "flat"

    return {
        **kpi,
        "status": status,
        "status_label": status_label,
        "gap": round(gap, 2),
        "attainment_pct": round(attainment, 1),
        "trend_pct": trend_pct,
        "trend_direction": trend_direction,
    }


def score_department(kpis: list[dict]) -> dict:
    """Calculate composite department score from scored KPIs."""
    if not kpis:
        return {"composite_score": None, "status_counts": {}, "overall_status": "⚪"}

    scored = [k for k in kpis if k.get("attainment_pct") is not None]
    if not scored:
        return {"composite_score": None, "status_counts": {}, "overall_status": "⚪"}

    # Composite = weighted average of attainment percentages (capped at 120%)
    attainments = [min(k["attainment_pct"], 120.0) for k in scored]
    composite = round(sum(attainments) / len(attainments), 1)

    # Status counts
    counts = {"🟢": 0, "🟡": 0, "🔴": 0, "⚪": 0}
    for k in kpis:
        s = k.get("status", "⚪")
        counts[s] = counts.get(s, 0) + 1

    # Overall department status
    if counts["🔴"] >= 2 or (counts["🔴"] >= 1 and counts["🟡"] >= 2):
        overall = "🔴"
    elif counts["🔴"] >= 1 or counts["🟡"] >= 2:
        overall = "🟡"
    else:
        overall = "🟢"

    # Identify top priority (worst attainment)
    worst = min(scored, key=lambda k: k["attainment_pct"])

    return {
        "composite_score": composite,
        "status_counts": counts,
        "overall_status": overall,
        "kpi_count": len(kpis),
        "scored_count": len(scored),
        "top_priority": {
            "kpi_id": worst.get("kpi_id"),
            "name": worst.get("name"),
            "attainment_pct": worst["attainment_pct"],
            "gap": worst.get("gap"),
        },
        "improving_count": sum(1 for k in scored if k.get("trend_direction") == "improving"),
        "declining_count": sum(1 for k in scored if k.get("trend_direction") == "declining"),
    }


def format_table(scored_kpis: list[dict]) -> str:
    """Format scored KPIs as a markdown table."""
    lines = [
        "| # | KPI | Value | Target | Gap | Attainment | Trend | Status |",
        "|---|-----|-------|--------|-----|-----------|-------|--------|",
    ]
    for i, k in enumerate(scored_kpis, 1):
        unit = k.get("unit", "")
        value_str = f"{k.get('value', 'N/A')} {unit}".strip()
        target_str = f"{k.get('target', 'N/A')} {unit}".strip()
        gap_str = f"{k.get('gap', 'N/A')}" if k.get("gap") is not None else "N/A"
        att_str = f"{k.get('attainment_pct', 'N/A')}%" if k.get("attainment_pct") is not None else "N/A"
        trend_str = ""
        if k.get("trend_pct") is not None:
            arrow = "↑" if k["trend_pct"] > 0 else "↓" if k["trend_pct"] < 0 else "→"
            trend_str = f"{arrow} {abs(k['trend_pct'])}%"
        status = k.get("status", "⚪")
        name = k.get("name", k.get("kpi_id", ""))
        lines.append(f"| {i} | {name} | {value_str} | {target_str} | {gap_str} | {att_str} | {trend_str} | {status} |")
    return "\n".join(lines)


def main():
    parser = argparse.ArgumentParser(description="Score KPIs for St. Louis County departments")
    parser.add_argument("--input", "-i", help="Path to JSON file with KPI data")
    parser.add_argument("--inline", help="Inline JSON string with KPI data")
    parser.add_argument("--department", "-d", help="Department ID (for labeling)")
    parser.add_argument("--output", "-o", help="Output file path (default: stdout)")
    parser.add_argument("--format", "-f", choices=["json", "markdown", "both"], default="both", help="Output format")
    args = parser.parse_args()

    # Load input
    if args.inline:
        kpis = json.loads(args.inline)
    elif args.input:
        with open(args.input) as f:
            kpis = json.load(f)
    else:
        print("Error: Provide --input file or --inline JSON", file=sys.stderr)
        sys.exit(1)

    if not isinstance(kpis, list):
        kpis = [kpis]

    # Score each KPI
    scored = [score_kpi(k) for k in kpis]

    # Department composite
    dept_id = args.department or scored[0].get("department_id", "unknown") if scored else "unknown"
    composite = score_department(scored)

    result = {
        "department_id": dept_id,
        "scored_kpis": scored,
        "department_summary": composite,
    }

    # Output
    output_parts = []

    if args.format in ("markdown", "both"):
        md = f"## Department: {dept_id}\n"
        md += f"**Overall Status**: {composite['overall_status']} | "
        md += f"**Composite Score**: {composite.get('composite_score', 'N/A')}%\n"
        md += f"**Improving**: {composite.get('improving_count', 0)} | "
        md += f"**Declining**: {composite.get('declining_count', 0)}\n\n"
        if composite.get("top_priority"):
            p = composite["top_priority"]
            md += f"**Top Priority**: {p.get('name', p.get('kpi_id'))} "
            md += f"(attainment: {p.get('attainment_pct')}%, gap: {p.get('gap')})\n\n"
        md += format_table(scored)
        output_parts.append(md)

    if args.format in ("json", "both"):
        output_parts.append(json.dumps(result, indent=2, ensure_ascii=False))

    output_text = "\n\n---\n\n".join(output_parts)

    if args.output:
        with open(args.output, "w") as f:
            f.write(output_text)
        print(f"✅ Output written to {args.output}")
    else:
        print(output_text)


if __name__ == "__main__":
    main()
