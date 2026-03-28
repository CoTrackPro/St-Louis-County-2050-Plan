#!/usr/bin/env python3
"""
Journey Scorer — St. Louis County Cross-Department Service Journeys

Takes touchpoint/timing data across departments, calculates end-to-end
journey KPIs, and flags handoff failures.

Usage:
    python scripts/journey_scorer.py --input journey_data.json
    python scripts/journey_scorer.py --inline '[...]' --journey building_project

Input format (JSON array of journey instances):
    [
        {
            "journey_id": "BP-2026-001",
            "journey_type": "building_project",
            "touchpoints": [
                {
                    "step": 1,
                    "department": "customer",
                    "action": "Initial inquiry — phone call",
                    "date": "2026-01-15",
                    "channel": "phone",
                    "resolved": false,
                    "handoff_to": "planning",
                    "handoff_confirmed": false,
                    "notes": "Caller didn't know to check zoning first"
                },
                {
                    "step": 2,
                    "department": "planning",
                    "action": "Zoning verification",
                    "date": "2026-01-22",
                    "channel": "walk_in",
                    "resolved": true,
                    "wait_minutes": 45,
                    "service_minutes": 15
                }
            ],
            "start_date": "2026-01-15",
            "end_date": "2026-03-10",
            "outcome": "completed"
        }
    ]
"""

import argparse
import json
import sys
from collections import defaultdict
from datetime import datetime

JOURNEY_TARGETS = {
    "building_project": {
        "name": "Homeowner Building Project",
        "target_days": 30,
        "target_touchpoints": 5,
        "target_drop_off_rate": 0.15,
        "departments": ["customer", "planning", "permits", "revenue"],
    },
    "new_resident": {
        "name": "New Resident Establishing Services",
        "target_days": 14,
        "target_touchpoints": 3,
        "target_drop_off_rate": 0.10,
        "departments": ["revenue", "elections", "customer", "parks"],
    },
    "tax_lifecycle": {
        "name": "Property Tax Lifecycle",
        "target_days": 90,
        "target_touchpoints": 2,
        "target_drop_off_rate": 0.05,
        "departments": ["revenue", "customer"],
    },
    "reentry": {
        "name": "Justice-Involved Reentry",
        "target_days": 120,
        "target_touchpoints": 10,
        "target_drop_off_rate": 0.30,
        "departments": ["justice", "records", "human_svc", "health"],
    },
    "senior_services": {
        "name": "Senior Services Navigation",
        "target_days": 21,
        "target_touchpoints": 2,
        "target_drop_off_rate": 0.20,
        "departments": ["revenue", "human_svc", "parks", "health"],
    },
    "small_business": {
        "name": "Small Business Startup",
        "target_days": 90,
        "target_touchpoints": 8,
        "target_drop_off_rate": 0.25,
        "departments": ["planning", "permits", "health", "revenue"],
    },
    "crisis_to_stability": {
        "name": "Crisis to Stability (Homelessness)",
        "target_days": 120,
        "target_touchpoints": 12,
        "target_drop_off_rate": 0.35,
        "departments": ["human_svc", "health", "justice", "records"],
    },
}

HANDOFF_FAILURE_PATTERNS = {
    "referral_black_hole": {
        "name": "Referral Black Hole",
        "description": "Referred to another department but no confirmation of arrival",
        "detect": lambda tp: tp.get("handoff_to") and not tp.get("handoff_confirmed", True),
    },
    "repeat_explainer": {
        "name": "Repeat Explainer",
        "description": "Constituent had to re-explain situation to new department",
        "detect": lambda tp: tp.get("had_to_re_explain", False),
    },
    "eligibility_maze": {
        "name": "Eligibility Maze",
        "description": "Sent to wrong department before finding correct one",
        "detect": lambda tp: tp.get("was_misdirected", False),
    },
    "scheduling_collision": {
        "name": "Scheduling Collision",
        "description": "Could not align appointment across departments within service hours",
        "detect": lambda tp: tp.get("scheduling_conflict", False),
    },
}


def score_journey(journey: dict) -> dict:
    """Score a single journey instance."""
    touchpoints = journey.get("touchpoints", [])
    journey_type = journey.get("journey_type", "unknown")
    targets = JOURNEY_TARGETS.get(journey_type, {})

    # Calculate total elapsed days
    start = journey.get("start_date")
    end = journey.get("end_date")
    total_days = None
    if start and end:
        try:
            d_start = datetime.strptime(start, "%Y-%m-%d")
            d_end = datetime.strptime(end, "%Y-%m-%d")
            total_days = (d_end - d_start).days
        except ValueError:
            pass

    # Count touchpoints
    total_touchpoints = len(touchpoints)

    # Departments involved
    departments = list(dict.fromkeys(tp.get("department", "") for tp in touchpoints if tp.get("department")))

    # Channel distribution
    channels = defaultdict(int)
    for tp in touchpoints:
        channels[tp.get("channel", "unknown")] += 1

    # Wait time analysis
    wait_times = [tp.get("wait_minutes", 0) for tp in touchpoints if tp.get("wait_minutes")]
    total_wait = sum(wait_times)
    avg_wait = round(total_wait / len(wait_times), 1) if wait_times else 0

    # Handoff analysis
    handoffs = [tp for tp in touchpoints if tp.get("handoff_to")]
    handoff_count = len(handoffs)
    failed_handoffs = []
    for tp in touchpoints:
        for pattern_id, pattern in HANDOFF_FAILURE_PATTERNS.items():
            if pattern["detect"](tp):
                failed_handoffs.append({
                    "pattern": pattern_id,
                    "pattern_name": pattern["name"],
                    "description": pattern["description"],
                    "step": tp.get("step"),
                    "department": tp.get("department"),
                    "action": tp.get("action", ""),
                })

    # Handoff gaps (time between last touchpoint in dept A and first in dept B)
    handoff_gaps = []
    for i in range(1, len(touchpoints)):
        prev = touchpoints[i - 1]
        curr = touchpoints[i]
        if prev.get("department") != curr.get("department"):
            try:
                d_prev = datetime.strptime(prev.get("date", ""), "%Y-%m-%d")
                d_curr = datetime.strptime(curr.get("date", ""), "%Y-%m-%d")
                gap = (d_curr - d_prev).days
                handoff_gaps.append({
                    "from_dept": prev.get("department"),
                    "to_dept": curr.get("department"),
                    "gap_days": gap,
                    "is_excessive": gap > 7,
                })
            except ValueError:
                pass

    # Score against targets
    days_status = "🟢"
    touchpoint_status = "🟢"
    target_days = targets.get("target_days")
    target_tp = targets.get("target_touchpoints")

    if total_days and target_days:
        if total_days > target_days * 1.5:
            days_status = "🔴"
        elif total_days > target_days:
            days_status = "🟡"

    if target_tp:
        if total_touchpoints > target_tp * 2:
            touchpoint_status = "🔴"
        elif total_touchpoints > target_tp:
            touchpoint_status = "🟡"

    # Overall journey score (simple composite)
    days_score = min(100, round((target_days / total_days) * 100, 1)) if total_days and target_days and total_days > 0 else None
    tp_score = min(100, round((target_tp / total_touchpoints) * 100, 1)) if target_tp and total_touchpoints > 0 else None
    handoff_score = round(100 * (1 - len(failed_handoffs) / max(handoff_count, 1)), 1) if handoff_count > 0 else 100

    scores = [s for s in [days_score, tp_score, handoff_score] if s is not None]
    composite = round(sum(scores) / len(scores), 1) if scores else None

    return {
        "journey_id": journey.get("journey_id"),
        "journey_type": journey_type,
        "journey_name": targets.get("name", journey_type),
        "outcome": journey.get("outcome", "unknown"),
        "metrics": {
            "total_days": total_days,
            "target_days": target_days,
            "days_status": days_status,
            "total_touchpoints": total_touchpoints,
            "target_touchpoints": target_tp,
            "touchpoint_status": touchpoint_status,
            "departments_involved": departments,
            "department_count": len(departments),
            "channels": dict(channels),
            "total_wait_minutes": total_wait,
            "avg_wait_minutes": avg_wait,
            "handoff_count": handoff_count,
            "failed_handoff_count": len(failed_handoffs),
            "handoff_success_rate": round(100 * (1 - len(failed_handoffs) / max(handoff_count, 1)), 1) if handoff_count else 100,
        },
        "scores": {
            "days_score": days_score,
            "touchpoint_score": tp_score,
            "handoff_score": handoff_score,
            "composite": composite,
        },
        "failed_handoffs": failed_handoffs,
        "handoff_gaps": [g for g in handoff_gaps if g.get("is_excessive")],
    }


def aggregate_journeys(scored: list[dict]) -> dict:
    """Aggregate multiple journey instances into summary stats."""
    if not scored:
        return {}

    journey_type = scored[0].get("journey_type", "unknown")
    targets = JOURNEY_TARGETS.get(journey_type, {})

    total_days = [s["metrics"]["total_days"] for s in scored if s["metrics"]["total_days"] is not None]
    total_tp = [s["metrics"]["total_touchpoints"] for s in scored]
    composites = [s["scores"]["composite"] for s in scored if s["scores"]["composite"] is not None]
    outcomes = defaultdict(int)
    for s in scored:
        outcomes[s.get("outcome", "unknown")] += 1

    # Handoff failure frequency
    failure_freq = defaultdict(int)
    for s in scored:
        for f in s.get("failed_handoffs", []):
            failure_freq[f["pattern_name"]] += 1

    drop_off_count = outcomes.get("dropped_off", 0) + outcomes.get("abandoned", 0)
    drop_off_rate = round(drop_off_count / len(scored) * 100, 1) if scored else 0

    return {
        "journey_type": journey_type,
        "journey_name": targets.get("name", journey_type),
        "sample_size": len(scored),
        "avg_days": round(sum(total_days) / len(total_days), 1) if total_days else None,
        "median_days": sorted(total_days)[len(total_days) // 2] if total_days else None,
        "target_days": targets.get("target_days"),
        "avg_touchpoints": round(sum(total_tp) / len(total_tp), 1) if total_tp else None,
        "target_touchpoints": targets.get("target_touchpoints"),
        "avg_composite_score": round(sum(composites) / len(composites), 1) if composites else None,
        "outcomes": dict(outcomes),
        "drop_off_rate": drop_off_rate,
        "target_drop_off_rate": targets.get("target_drop_off_rate", 0) * 100,
        "top_handoff_failures": dict(sorted(failure_freq.items(), key=lambda x: x[1], reverse=True)[:5]),
    }


def generate_report(scored: list[dict], aggregate: dict) -> str:
    """Generate markdown journey analysis report."""
    lines = [
        f"# Journey Analysis — {aggregate.get('journey_name', 'Unknown')}",
        f"**Sample size**: {aggregate.get('sample_size', 0)} journey instances",
        "",
        "---",
        "",
        "## Summary",
        "",
        "| Metric | Actual | Target | Status |",
        "|--------|--------|--------|--------|",
    ]

    avg_days = aggregate.get("avg_days")
    tgt_days = aggregate.get("target_days")
    days_status = "🟢" if avg_days and tgt_days and avg_days <= tgt_days else "🟡" if avg_days and tgt_days and avg_days <= tgt_days * 1.5 else "🔴"
    lines.append(f"| Avg total days | {avg_days or 'N/A'} | {tgt_days or 'N/A'} | {days_status} |")

    avg_tp = aggregate.get("avg_touchpoints")
    tgt_tp = aggregate.get("target_touchpoints")
    tp_status = "🟢" if avg_tp and tgt_tp and avg_tp <= tgt_tp else "🟡" if avg_tp and tgt_tp and avg_tp <= tgt_tp * 1.5 else "🔴"
    lines.append(f"| Avg touchpoints | {avg_tp or 'N/A'} | {tgt_tp or 'N/A'} | {tp_status} |")

    drop = aggregate.get("drop_off_rate", 0)
    tgt_drop = aggregate.get("target_drop_off_rate", 0)
    drop_status = "🟢" if drop <= tgt_drop else "🟡" if drop <= tgt_drop * 1.5 else "🔴"
    lines.append(f"| Drop-off rate | {drop}% | {tgt_drop}% | {drop_status} |")

    lines.append(f"| Composite score | {aggregate.get('avg_composite_score', 'N/A')}% | 90%+ | {'🟢' if (aggregate.get('avg_composite_score') or 0) >= 90 else '🟡' if (aggregate.get('avg_composite_score') or 0) >= 75 else '🔴'} |")
    lines.append("")

    # Outcomes
    outcomes = aggregate.get("outcomes", {})
    if outcomes:
        lines.extend(["## Outcomes", ""])
        for outcome, count in outcomes.items():
            pct = round(count / aggregate.get("sample_size", 1) * 100, 1)
            lines.append(f"- **{outcome}**: {count} ({pct}%)")
        lines.append("")

    # Handoff failures
    failures = aggregate.get("top_handoff_failures", {})
    if failures:
        lines.extend(["## Top Handoff Failures", ""])
        lines.append("| Pattern | Occurrences | Description |")
        lines.append("|---------|------------|-------------|")
        for pattern_name, count in failures.items():
            desc = ""
            for p in HANDOFF_FAILURE_PATTERNS.values():
                if p["name"] == pattern_name:
                    desc = p["description"]
                    break
            lines.append(f"| {pattern_name} | {count} | {desc} |")
        lines.append("")

    # Individual journey details (first 5)
    lines.extend(["## Sample Journey Details", ""])
    for s in scored[:5]:
        lines.append(f"### {s.get('journey_id', '?')} — {s.get('outcome', '?')}")
        m = s.get("metrics", {})
        lines.append(f"- Days: {m.get('total_days', '?')} | Touchpoints: {m.get('total_touchpoints', '?')} | Departments: {', '.join(m.get('departments_involved', []))}")
        lines.append(f"- Composite score: {s.get('scores', {}).get('composite', '?')}%")
        if s.get("failed_handoffs"):
            lines.append(f"- ⚠️ Handoff failures: {', '.join(f['pattern_name'] for f in s['failed_handoffs'])}")
        if s.get("handoff_gaps"):
            for g in s["handoff_gaps"]:
                lines.append(f"- ⏰ Excessive gap: {g['from_dept']} → {g['to_dept']} ({g['gap_days']} days)")
        lines.append("")

    return "\n".join(lines)


def main():
    parser = argparse.ArgumentParser(description="Score cross-department constituent journeys")
    parser.add_argument("--input", "-i", help="Path to JSON file with journey data")
    parser.add_argument("--inline", help="Inline JSON string")
    parser.add_argument("--journey", "-j", help="Journey type filter")
    parser.add_argument("--output", "-o", help="Output file path")
    parser.add_argument("--format", "-f", choices=["json", "markdown", "both"], default="both")
    args = parser.parse_args()

    if args.inline:
        journeys = json.loads(args.inline)
    elif args.input:
        with open(args.input) as f:
            journeys = json.load(f)
    else:
        print("Error: Provide --input or --inline", file=sys.stderr)
        sys.exit(1)

    if not isinstance(journeys, list):
        journeys = [journeys]
    if args.journey:
        journeys = [j for j in journeys if j.get("journey_type") == args.journey]

    scored = [score_journey(j) for j in journeys]
    aggregate = aggregate_journeys(scored)

    output_parts = []
    if args.format in ("markdown", "both"):
        output_parts.append(generate_report(scored, aggregate))
    if args.format in ("json", "both"):
        output_parts.append(json.dumps({"scored": scored, "aggregate": aggregate}, indent=2, ensure_ascii=False))

    output_text = "\n\n---\n\n".join(output_parts)
    if args.output:
        with open(args.output, "w") as f:
            f.write(output_text)
        print(f"✅ Output written to {args.output}")
    else:
        print(output_text)


if __name__ == "__main__":
    main()
