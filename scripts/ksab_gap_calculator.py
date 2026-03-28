#!/usr/bin/env python3
"""
KSAB Gap Calculator — St. Louis County Workforce Development

Takes proficiency ratings, computes gap scores, prioritizes by severity,
and outputs domain-matched intervention recommendations.

Usage:
    python scripts/ksab_gap_calculator.py --input assessments.json
    python scripts/ksab_gap_calculator.py --inline '[...]' --department permits

Input format (JSON array):
    [
        {
            "competency_id": "PL-S1",
            "name": "Plan review — residential and commercial",
            "domain": "skill",
            "assessed_level": 2,
            "target_level": 4,
            "linked_kpis": ["permits_avg_processing"],
            "staff_count": 12,
            "assessment_method": "supervisor_observation"
        }
    ]
"""

import json
import sys
import argparse
from typing import Any

# Domain-matched intervention lookup
INTERVENTIONS = {
    "knowledge": {
        1: [
            {"modality": "eLearning modules", "hours": "1-2", "cost": "low"},
            {"modality": "Job aids / quick reference cards", "hours": "N/A", "cost": "low"},
        ],
        2: [
            {"modality": "Instructor-led classroom", "hours": "4-8", "cost": "medium"},
            {"modality": "Mentoring with SME", "hours": "ongoing", "cost": "low"},
            {"modality": "Self-study with guided reading", "hours": "4-8", "cost": "low"},
        ],
        3: [
            {"modality": "Intensive classroom + certification", "hours": "16-40", "cost": "high"},
            {"modality": "Structured mentoring program (12 weeks)", "hours": "24+", "cost": "medium"},
        ],
        4: [
            {"modality": "External certification program", "hours": "40+", "cost": "high"},
            {"modality": "Reassess role fit — gap may indicate hiring mismatch", "hours": "N/A", "cost": "N/A"},
        ],
    },
    "skill": {
        1: [
            {"modality": "Coached practice / refresher", "hours": "2-4", "cost": "low"},
            {"modality": "Peer observation", "hours": "1-2", "cost": "low"},
        ],
        2: [
            {"modality": "On-the-job training with structured guide", "hours": "8-16", "cost": "medium"},
            {"modality": "Simulation / role play", "hours": "4-8", "cost": "medium"},
        ],
        3: [
            {"modality": "Intensive OJT with daily coaching", "hours": "40+", "cost": "high"},
            {"modality": "Shadowing experienced practitioner (2-4 weeks)", "hours": "80+", "cost": "medium"},
            {"modality": "Cross-training rotation", "hours": "80+", "cost": "medium"},
        ],
        4: [
            {"modality": "Extended apprenticeship / supervised practice", "hours": "160+", "cost": "high"},
            {"modality": "Reassess role fit", "hours": "N/A", "cost": "N/A"},
        ],
    },
    "attitude": {
        1: [
            {"modality": "Recognition program reinforcement", "hours": "ongoing", "cost": "low"},
            {"modality": "Constituent feedback sharing", "hours": "0.5", "cost": "low"},
        ],
        2: [
            {"modality": "Leadership modeling + role clarity conversation", "hours": "2-4", "cost": "low"},
            {"modality": "Peer stories / impact connection sessions", "hours": "2", "cost": "low"},
            {"modality": "Site visit to high-performing peer", "hours": "8-16", "cost": "medium"},
        ],
        3: [
            {"modality": "Employee engagement diagnostic + action plan", "hours": "8+", "cost": "medium"},
            {"modality": "Leadership coaching for supervisor", "hours": "12+", "cost": "medium"},
            {"modality": "Culture initiative / team reset", "hours": "16+", "cost": "medium"},
        ],
        4: [
            {"modality": "Systemic culture intervention required", "hours": "ongoing", "cost": "high"},
            {"modality": "NOTE: Training alone will NOT fix attitude gaps of this size", "hours": "N/A", "cost": "N/A"},
        ],
    },
    "behavior": {
        1: [
            {"modality": "Checklist / protocol reinforcement", "hours": "0.5", "cost": "low"},
            {"modality": "1:1 feedback conversation", "hours": "0.5", "cost": "low"},
        ],
        2: [
            {"modality": "Process redesign (make right behavior the easy path)", "hours": "8-16", "cost": "medium"},
            {"modality": "Performance dashboard visible to team", "hours": "4 setup", "cost": "low"},
            {"modality": "Weekly 1:1 coaching with supervisor", "hours": "ongoing", "cost": "low"},
        ],
        3: [
            {"modality": "Systemic process redesign + accountability system", "hours": "40+", "cost": "high"},
            {"modality": "Nudge design (defaults, reminders, prompts in systems)", "hours": "16+", "cost": "medium"},
            {"modality": "Mystery shopper / audit program", "hours": "ongoing", "cost": "medium"},
        ],
        4: [
            {"modality": "Full process/system overhaul", "hours": "80+", "cost": "high"},
            {"modality": "Performance management escalation", "hours": "N/A", "cost": "N/A"},
            {"modality": "NOTE: Do NOT prescribe more training — this is a systems/accountability problem", "hours": "N/A", "cost": "N/A"},
        ],
    },
}

PRIORITY_LABELS = {
    0: ("✅ Met", "none"),
    1: ("🔵 Low", "reinforcement"),
    2: ("🟡 Medium", "structured_intervention"),
    3: ("🔴 High", "intensive_intervention"),
    4: ("⛔ Critical", "role_review_required"),
}

ANTI_PATTERNS = {
    "attitude": "⚠️ Do NOT prescribe mandatory training for attitude gaps — it creates resentment. Use leadership modeling, recognition, and culture initiatives instead.",
    "behavior": "⚠️ Do NOT prescribe more training for behavior gaps — staff already know how. Fix the process, accountability systems, and feedback loops instead.",
}


def calculate_gap(assessment: dict) -> dict:
    """Calculate gap score and classify priority."""
    assessed = assessment.get("assessed_level", 0)
    target = assessment.get("target_level", 0)
    gap = max(0, target - assessed)
    domain = assessment.get("domain", "knowledge").lower()

    # Cap gap at 4 for intervention lookup
    lookup_gap = min(gap, 4)

    priority_label, priority_action = PRIORITY_LABELS.get(
        min(gap, 4), ("⛔ Critical", "role_review_required")
    )

    # Get domain-matched interventions
    domain_interventions = INTERVENTIONS.get(domain, INTERVENTIONS["knowledge"])
    recommended = domain_interventions.get(lookup_gap, [])

    # Anti-pattern warning
    anti_pattern = ANTI_PATTERNS.get(domain) if gap >= 2 else None

    return {
        **assessment,
        "gap_score": gap,
        "priority": priority_label,
        "priority_action": priority_action,
        "recommended_interventions": recommended,
        "anti_pattern_warning": anti_pattern,
        "impact_score": gap * assessment.get("staff_count", 1),
    }


def generate_heat_map(gaps: list[dict]) -> str:
    """Generate KSAB heat map markdown table."""
    # Group by competency area (strip ID prefix for grouping)
    areas: dict[str, dict[str, list[int]]] = {}
    for g in gaps:
        # Use first part of competency_id or name as area
        comp_id = g.get("competency_id", "")
        area = g.get("name", comp_id)
        domain = g.get("domain", "unknown")
        gap = g.get("gap_score", 0)

        if area not in areas:
            areas[area] = {"knowledge": [], "skill": [], "attitude": [], "behavior": []}
        areas[area][domain].append(gap)

    lines = [
        "### Gap Heat Map",
        "",
        "| Competency | Knowledge | Skills | Attitudes | Behaviors |",
        "|-----------|-----------|--------|-----------|-----------|",
    ]

    for area, domains in areas.items():
        row = [area[:40]]
        for d in ["knowledge", "skill", "attitude", "behavior"]:
            scores = domains[d]
            if not scores:
                row.append("—")
            else:
                avg = sum(scores) / len(scores)
                if avg <= 1:
                    row.append("🟢")
                elif avg <= 2:
                    row.append("🟡")
                else:
                    row.append("🔴")
        lines.append("| " + " | ".join(row) + " |")

    return "\n".join(lines)


def generate_report(gaps: list[dict], department: str = "unknown") -> str:
    """Generate full gap analysis report in markdown."""
    # Sort by impact score descending
    sorted_gaps = sorted(gaps, key=lambda g: g.get("impact_score", 0), reverse=True)

    lines = [
        f"# KSAB Gap Analysis — {department}",
        "",
        "## Summary",
        "",
    ]

    # Summary stats
    total = len(gaps)
    critical = sum(1 for g in gaps if g["gap_score"] >= 3)
    high = sum(1 for g in gaps if g["gap_score"] == 2)
    low = sum(1 for g in gaps if g["gap_score"] == 1)
    met = sum(1 for g in gaps if g["gap_score"] == 0)
    avg_gap = round(sum(g["gap_score"] for g in gaps) / total, 1) if total else 0

    lines.extend([
        f"- **Competencies assessed**: {total}",
        f"- **Average gap score**: {avg_gap}",
        f"- **Met/exceeded (gap 0)**: {met}",
        f"- **Low gaps (1)**: {low}",
        f"- **Medium gaps (2)**: {high}",
        f"- **Critical gaps (3+)**: {critical}",
        "",
    ])

    # Domain distribution
    domain_gaps = {}
    for g in gaps:
        d = g.get("domain", "unknown")
        if d not in domain_gaps:
            domain_gaps[d] = []
        domain_gaps[d].append(g["gap_score"])

    lines.extend(["## Gap Distribution by Domain", ""])
    lines.append("| Domain | Count | Avg Gap | Max Gap | Primary Fix |")
    lines.append("|--------|-------|---------|---------|-------------|")
    fix_map = {
        "knowledge": "Training, docs, mentoring",
        "skill": "Practice, OJT, coaching",
        "attitude": "Leadership, culture, recognition",
        "behavior": "Process redesign, accountability",
    }
    for d in ["knowledge", "skill", "attitude", "behavior"]:
        scores = domain_gaps.get(d, [])
        if scores:
            lines.append(f"| {d.title()} | {len(scores)} | {round(sum(scores)/len(scores),1)} | {max(scores)} | {fix_map.get(d, '')} |")
    lines.append("")

    # Heat map
    lines.append(generate_heat_map(gaps))
    lines.append("")

    # Priority interventions
    lines.extend(["## Priority Interventions (sorted by impact)", ""])
    lines.append("| Priority | Competency | Domain | Gap | Staff | Impact | Top Intervention |")
    lines.append("|----------|-----------|--------|-----|-------|--------|-----------------|")

    for g in sorted_gaps[:10]:  # Top 10
        if g["gap_score"] == 0:
            continue
        interventions = g.get("recommended_interventions", [])
        top_intervention = interventions[0]["modality"] if interventions else "N/A"
        name = g.get("name", g.get("competency_id", ""))[:35]
        lines.append(
            f"| {g['priority']} | {name} | {g.get('domain', '').title()} | "
            f"+{g['gap_score']} | {g.get('staff_count', '?')} | "
            f"{g.get('impact_score', '?')} | {top_intervention} |"
        )
    lines.append("")

    # Anti-pattern warnings
    warnings = set()
    for g in sorted_gaps:
        if g.get("anti_pattern_warning"):
            warnings.add(g["anti_pattern_warning"])
    if warnings:
        lines.extend(["## ⚠️ Anti-Pattern Warnings", ""])
        for w in warnings:
            lines.append(f"- {w}")
        lines.append("")

    # Detailed recommendations for critical gaps
    critical_gaps = [g for g in sorted_gaps if g["gap_score"] >= 3]
    if critical_gaps:
        lines.extend(["## Critical Gap Details", ""])
        for g in critical_gaps:
            lines.append(f"### {g.get('name', g.get('competency_id'))}")
            lines.append(f"- **Domain**: {g.get('domain', '').title()}")
            lines.append(f"- **Current → Target**: {g.get('assessed_level')} → {g.get('target_level')} (gap: +{g['gap_score']})")
            lines.append(f"- **Staff affected**: {g.get('staff_count', '?')}")
            lines.append(f"- **Linked KPIs**: {', '.join(g.get('linked_kpis', ['N/A']))}")
            lines.append(f"- **Assessment method**: {g.get('assessment_method', 'N/A')}")
            lines.append("- **Recommended interventions**:")
            for interv in g.get("recommended_interventions", []):
                lines.append(f"  - {interv['modality']} ({interv['hours']} hrs, cost: {interv['cost']})")
            if g.get("anti_pattern_warning"):
                lines.append(f"- {g['anti_pattern_warning']}")
            lines.append("")

    return "\n".join(lines)


def main():
    parser = argparse.ArgumentParser(description="Calculate KSAB gaps and recommend interventions")
    parser.add_argument("--input", "-i", help="Path to JSON file with assessment data")
    parser.add_argument("--inline", help="Inline JSON string with assessment data")
    parser.add_argument("--department", "-d", default="unknown", help="Department ID")
    parser.add_argument("--output", "-o", help="Output file path")
    parser.add_argument("--format", "-f", choices=["json", "markdown", "both"], default="both")
    args = parser.parse_args()

    if args.inline:
        assessments = json.loads(args.inline)
    elif args.input:
        with open(args.input) as f:
            assessments = json.load(f)
    else:
        print("Error: Provide --input file or --inline JSON", file=sys.stderr)
        sys.exit(1)

    if not isinstance(assessments, list):
        assessments = [assessments]

    gaps = [calculate_gap(a) for a in assessments]

    output_parts = []
    if args.format in ("markdown", "both"):
        output_parts.append(generate_report(gaps, args.department))
    if args.format in ("json", "both"):
        output_parts.append(json.dumps(gaps, indent=2, ensure_ascii=False))

    output_text = "\n\n---\n\n".join(output_parts)

    if args.output:
        with open(args.output, "w") as f:
            f.write(output_text)
        print(f"✅ Output written to {args.output}")
    else:
        print(output_text)


if __name__ == "__main__":
    main()
