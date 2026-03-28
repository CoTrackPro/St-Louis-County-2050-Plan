#!/usr/bin/env python3
"""
Scorecard Renderer — St. Louis County Department Scorecards

Generates a formatted markdown or HTML scorecard from structured KPI JSON.
Integrates with kpi_scorer.py output.

Usage:
    python scripts/scorecard_renderer.py --input scored_kpis.json --department "Permits & Licensing"
    python scripts/scorecard_renderer.py --input scored_kpis.json --format html --output scorecard.html
    python scripts/scorecard_renderer.py --inline '{...}' --format markdown
"""

import argparse
import json
import sys
from datetime import datetime


def render_sparkline_text(values: list[float]) -> str:
    """Render a simple text sparkline from a list of values."""
    if not values or len(values) < 2:
        return "—"
    chars = "▁▂▃▄▅▆▇█"
    mn, mx = min(values), max(values)
    rng = mx - mn if mx != mn else 1
    return "".join(chars[min(int((v - mn) / rng * 7), 7)] for v in values)


def render_markdown(data: dict) -> str:
    """Render scorecard as markdown."""
    dept_name = data.get("department_name", data.get("department_id", "Unknown"))
    period = data.get("period", datetime.now().strftime("%B %Y"))
    summary = data.get("department_summary", {})
    kpis = data.get("scored_kpis", [])
    initiatives = data.get("initiatives", [])
    equity = data.get("equity", {})
    risks = data.get("risks", [])
    priorities = data.get("priorities", [])

    lines = [
        f"# {dept_name} — Performance Scorecard",
        f"**Reporting Period**: {period} | **Last Updated**: {datetime.now().strftime('%Y-%m-%d')}",
        "",
        f"**Overall**: {summary.get('overall_status', '⚪')} | "
        f"**Composite**: {summary.get('composite_score', 'N/A')}% | "
        f"**Improving**: {summary.get('improving_count', 0)} | "
        f"**Declining**: {summary.get('declining_count', 0)}",
        "",
        "---",
        "",
        "## KPI Summary",
        "",
        "| # | KPI | Current | Target | Gap | Trend | Sparkline | Status |",
        "|---|-----|---------|--------|-----|-------|-----------|--------|",
    ]

    for i, k in enumerate(kpis, 1):
        unit = k.get("unit", "")
        val = f"{k.get('value', 'N/A')} {unit}".strip()
        tgt = f"{k.get('target', 'N/A')} {unit}".strip()
        gap = k.get("gap")
        gap_str = f"{'+' if gap and gap > 0 else ''}{gap}" if gap is not None else "—"
        trend = k.get("trend_pct")
        trend_str = ""
        if trend is not None:
            arrow = "↑" if trend > 0 else "↓" if trend < 0 else "→"
            trend_str = f"{arrow} {abs(trend)}%"
        sparkline = render_sparkline_text(k.get("sparkline", []))
        status = k.get("status", "⚪")
        name = k.get("name", k.get("kpi_id", ""))
        lines.append(f"| {i} | {name} | {val} | {tgt} | {gap_str} | {trend_str} | {sparkline} | {status} |")

    # Status counts
    counts = summary.get("status_counts", {})
    green = counts.get("🟢", 0)
    yellow = counts.get("🟡", 0)
    red = counts.get("🔴", 0)
    lines.extend(["", f"**Score**: {green}🟢 {yellow}🟡 {red}🔴", ""])

    # Top priority
    priority_kpi = summary.get("top_priority")
    if priority_kpi:
        lines.extend(
            [
                f"**⚡ Top Priority**: {priority_kpi.get('name', priority_kpi.get('kpi_id', ''))} "
                f"— attainment {priority_kpi.get('attainment_pct')}%, gap {priority_kpi.get('gap')}",
                "",
            ]
        )

    # Initiatives
    if initiatives:
        lines.extend(
            [
                "---",
                "",
                "## Active Initiatives",
                "",
                "| # | Initiative | Status | Impact | Owner | Due |",
                "|---|-----------|--------|--------|-------|-----|",
            ]
        )
        status_icons = {
            "complete": "🟢 Complete",
            "in_progress": "🔵 In Progress",
            "planning": "🟡 Planning",
            "blocked": "🔴 Blocked",
        }
        for i, init in enumerate(initiatives, 1):
            status = status_icons.get(init.get("status", ""), init.get("status", ""))
            lines.append(
                f"| {i} | {init.get('title', '')} | {status} | "
                f"{init.get('impact', '')} | {init.get('owner', '')} | {init.get('due', '')} |"
            )
        lines.append("")

    # Risks
    if risks:
        lines.extend(["---", "", "## Risks & Blockers", ""])
        for risk in risks:
            lines.append(
                f"- **{risk.get('title', '')}**: {risk.get('description', '')}. "
                f"Mitigation: {risk.get('mitigation', 'TBD')}"
            )
        lines.append("")

    # Equity check
    if equity:
        lines.extend(["---", "", "## Equity Check", ""])
        zones = equity.get("zones", {})
        if zones:
            zone_names = list(next(iter(zones.values())).keys()) if zones else []
            header = "| Metric | " + " | ".join(zone_names) + " | Disparity |"
            sep = "|--------|" + "|".join(["------"] * len(zone_names)) + "|-----------|"
            lines.extend([header, sep])
            for metric, values in zones.items():
                vals = [str(values.get(z, "—")) for z in zone_names]
                nums = [v for v in values.values() if isinstance(v, (int, float))]
                disparity = ""
                if len(nums) >= 2:
                    spread = max(nums) - min(nums)
                    avg = sum(nums) / len(nums)
                    if avg > 0 and (spread / avg) > 0.1:
                        disparity = f"⚠️ {round(spread / avg * 100)}%"
                lines.append(f"| {metric} | " + " | ".join(vals) + f" | {disparity} |")
            lines.append("")

    # Priorities
    if priorities:
        lines.extend(["---", "", "## Next Period Priorities", ""])
        for i, p in enumerate(priorities, 1):
            lines.append(f"{i}. {p}")
        lines.append("")

    return "\n".join(lines)


def render_html(data: dict) -> str:
    """Render scorecard as standalone HTML."""
    dept_name = data.get("department_name", data.get("department_id", "Unknown"))
    period = data.get("period", datetime.now().strftime("%B %Y"))
    summary = data.get("department_summary", {})
    kpis = data.get("scored_kpis", [])

    kpi_rows = ""
    for k in kpis:
        unit = k.get("unit", "")
        status = k.get("status", "⚪")
        status_class = (
            "green" if "🟢" in status else "yellow" if "🟡" in status else "red" if "🔴" in status else "gray"
        )
        trend = k.get("trend_pct")
        trend_html = ""
        if trend is not None:
            arrow = "↑" if trend > 0 else "↓" if trend < 0 else "→"
            color = (
                "#059669"
                if k.get("trend_direction") == "improving"
                else "#DC2626"
                if k.get("trend_direction") == "declining"
                else "#6B7280"
            )
            trend_html = f'<span style="color:{color}">{arrow} {abs(trend)}%</span>'

        kpi_rows += f"""
        <tr>
            <td>{k.get("name", "")}</td>
            <td><strong>{k.get("value", "N/A")}</strong> {unit}</td>
            <td>{k.get("target", "N/A")} {unit}</td>
            <td>{trend_html}</td>
            <td><span class="status-badge {status_class}">{status}</span></td>
        </tr>"""

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{dept_name} — Scorecard</title>
<style>
:root {{
    --navy: #1B3A5C;
    --teal: #2E7D9B;
    --gold: #E8913A;
    --bg: #F5F6F8;
    --card: #FFFFFF;
    --text: #1A1A2E;
    --muted: #6B7280;
    --green: #059669;
    --yellow: #D97706;
    --red: #DC2626;
    --border: #E5E7EB;
}}
* {{ margin: 0; padding: 0; box-sizing: border-box; }}
body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: var(--bg); color: var(--text); padding: 2rem; }}
.scorecard {{ max-width: 900px; margin: 0 auto; background: var(--card); border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); overflow: hidden; }}
.header {{ background: var(--navy); color: white; padding: 1.5rem 2rem; }}
.header h1 {{ font-size: 1.5rem; margin-bottom: 0.25rem; }}
.header .period {{ opacity: 0.8; font-size: 0.9rem; }}
.summary {{ display: flex; gap: 1rem; padding: 1rem 2rem; border-bottom: 1px solid var(--border); flex-wrap: wrap; }}
.summary-card {{ flex: 1; min-width: 120px; text-align: center; padding: 0.75rem; }}
.summary-card .label {{ font-size: 0.75rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.05em; }}
.summary-card .value {{ font-size: 1.5rem; font-weight: 700; margin-top: 0.25rem; }}
table {{ width: 100%; border-collapse: collapse; }}
th {{ background: var(--bg); padding: 0.75rem 1rem; text-align: left; font-size: 0.8rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.05em; }}
td {{ padding: 0.75rem 1rem; border-bottom: 1px solid var(--border); }}
.status-badge {{ display: inline-block; width: 28px; text-align: center; font-size: 1.1rem; }}
.footer {{ padding: 1rem 2rem; background: var(--bg); font-size: 0.8rem; color: var(--muted); }}
</style>
</head>
<body>
<div class="scorecard">
    <div class="header">
        <h1>{dept_name}</h1>
        <div class="period">{period} | Updated {datetime.now().strftime("%Y-%m-%d")}</div>
    </div>
    <div class="summary">
        <div class="summary-card">
            <div class="label">Overall</div>
            <div class="value">{summary.get("overall_status", "⚪")}</div>
        </div>
        <div class="summary-card">
            <div class="label">Composite</div>
            <div class="value">{summary.get("composite_score", "N/A")}%</div>
        </div>
        <div class="summary-card">
            <div class="label">Improving</div>
            <div class="value" style="color:var(--green)">{summary.get("improving_count", 0)}</div>
        </div>
        <div class="summary-card">
            <div class="label">Declining</div>
            <div class="value" style="color:var(--red)">{summary.get("declining_count", 0)}</div>
        </div>
    </div>
    <table>
        <thead>
            <tr><th>KPI</th><th>Current</th><th>Target</th><th>Trend</th><th>Status</th></tr>
        </thead>
        <tbody>
            {kpi_rows}
        </tbody>
    </table>
    <div class="footer">
        St. Louis County Government — Performance Management | Data may be illustrative
    </div>
</div>
</body>
</html>"""


def main():
    parser = argparse.ArgumentParser(description="Render department scorecard")
    parser.add_argument("--input", "-i", help="Path to JSON file (kpi_scorer output or structured scorecard data)")
    parser.add_argument("--inline", help="Inline JSON string")
    parser.add_argument("--department", "-d", help="Department display name")
    parser.add_argument("--period", "-p", help="Reporting period label")
    parser.add_argument("--output", "-o", help="Output file path")
    parser.add_argument("--format", "-f", choices=["markdown", "html"], default="markdown")
    args = parser.parse_args()

    if args.inline:
        data = json.loads(args.inline)
    elif args.input:
        with open(args.input) as f:
            data = json.load(f)
    else:
        print("Error: Provide --input or --inline", file=sys.stderr)
        sys.exit(1)

    if args.department:
        data["department_name"] = args.department
    if args.period:
        data["period"] = args.period

    if args.format == "html":
        output = render_html(data)
    else:
        output = render_markdown(data)

    if args.output:
        with open(args.output, "w") as f:
            f.write(output)
        print(f"✅ Scorecard written to {args.output}")
    else:
        print(output)


if __name__ == "__main__":
    main()
