#!/usr/bin/env python3
"""
Onboarding Plan Generator — St. Louis County

Takes a role and department, outputs a sequenced 90-day onboarding plan
with KSAB-tagged activities following the dependency chain (K→S→A→B).

Usage:
    python scripts/onboarding_plan_generator.py --role "Customer Service Rep" --department customer
    python scripts/onboarding_plan_generator.py --role "Plan Reviewer" --department permits --start-date 2026-04-01
    python scripts/onboarding_plan_generator.py --role "Tax Agent" --department revenue --output plan.md
"""

import argparse
from datetime import datetime, timedelta

# Universal onboarding (all employees, Week 1)
UNIVERSAL_WEEK1 = [
    {
        "day": 1,
        "am": "Welcome & admin: badge, parking, IT setup, benefits",
        "pm": "County overview: mission, structure, 14 departments",
        "domain": "K",
    },
    {
        "day": 2,
        "am": "HR policies: ethics, harassment prevention, Sunshine Law",
        "pm": "Department tour, meet team, find key resources",
        "domain": "K",
    },
    {
        "day": 3,
        "am": "Cybersecurity awareness (mandatory)",
        "pm": "Core systems: email, intranet, time entry, leave requests",
        "domain": "K+S",
    },
    {
        "day": 4,
        "am": "Constituent service orientation: demographics, equity, ADA",
        "pm": "Shadow experienced colleague (2 hours)",
        "domain": "K+A",
    },
    {
        "day": 5,
        "am": "Department-specific orientation begins",
        "pm": "Meet supervisor: discuss 90-day plan, assign buddy/mentor",
        "domain": "A",
    },
]

MANDATORY_COMPLIANCE = [
    {"topic": "Sexual harassment prevention", "format": "eLearning", "hours": 1, "deadline_day": 14},
    {"topic": "Ethics and conflicts of interest", "format": "eLearning", "hours": 0.75, "deadline_day": 14},
    {"topic": "Cybersecurity awareness", "format": "Classroom (Day 3)", "hours": 1, "deadline_day": 3},
    {"topic": "ADA and reasonable accommodations", "format": "eLearning", "hours": 0.5, "deadline_day": 21},
    {"topic": "Records retention and Sunshine Law", "format": "eLearning", "hours": 0.5, "deadline_day": 21},
    {"topic": "Workplace safety (OSHA basics)", "format": "eLearning", "hours": 0.5, "deadline_day": 30},
]

CHECKPOINTS = [
    {
        "day": 5,
        "name": "Baseline Knowledge Check",
        "method": "Informal conversation",
        "criteria": "Understands department mission, core processes, systems login",
    },
    {
        "day": 14,
        "name": "Skills Check",
        "method": "Observed task",
        "criteria": "Can perform 3 core tasks with guidance",
    },
    {
        "day": 30,
        "name": "First Formal Review",
        "method": "Supervisor assessment + knowledge quiz",
        "criteria": "≥80% knowledge quiz; no critical KSAB gaps identified",
    },
    {
        "day": 60,
        "name": "Intermediate Review",
        "method": "Supervisor assessment + performance data",
        "criteria": "Handles routine work independently; KPI contribution visible",
    },
    {
        "day": 90,
        "name": "Graduation Assessment",
        "method": "Full KSAB assessment against role profile",
        "criteria": "Meets all Day 90 success criteria (role-specific)",
    },
]

# Role-specific curricula
ROLE_CURRICULA = {
    "customer_service": {
        "title": "Customer Service Representative",
        "competency_ids": ["CS-K1", "CS-K2", "CS-K3", "CS-S1", "CS-S2", "CS-S3", "CS-A1", "CS-A2", "CS-B1", "CS-B2"],
        "weeks_2_4": [
            {
                "week": 2,
                "focus": "Knowledge Deep Dive",
                "activities": [
                    {
                        "day": "Mon",
                        "activity": "County services catalog study guide — Part 2. Knowledge quiz (target ≥80%).",
                        "domain": "K",
                        "hours": 6,
                    },
                    {
                        "day": "Tue",
                        "activity": "Qless system: create queues, manage flow, run reports. Hands-on with test accounts.",
                        "domain": "S",
                        "hours": 6,
                    },
                    {
                        "day": "Wed",
                        "activity": "Phone system: ACD login, transfer protocols, hold procedures, call documentation.",
                        "domain": "S",
                        "hours": 6,
                    },
                    {
                        "day": "Thu",
                        "activity": "Shadow experienced rep full day: walk-in, phone, Qless. Take notes.",
                        "domain": "K+A",
                        "hours": 6,
                    },
                    {
                        "day": "Fri",
                        "activity": "Self-study: referral pathways guide. Reflection journal.",
                        "domain": "K",
                        "hours": 4,
                    },
                ],
            },
            {
                "week": 3,
                "focus": "Guided Practice",
                "activities": [
                    {
                        "day": "Mon",
                        "activity": "Triage simulation: 10 scenarios, route to correct department in <2 min.",
                        "domain": "S",
                        "hours": 4,
                    },
                    {
                        "day": "Tue",
                        "activity": "Phone: supervised calls with experienced rep coaching. Debrief after each.",
                        "domain": "S+B",
                        "hours": 6,
                    },
                    {
                        "day": "Wed",
                        "activity": "Walk-in: supervised service with buddy. Focus on greeting, triage, documentation.",
                        "domain": "S+B",
                        "hours": 6,
                    },
                    {
                        "day": "Thu",
                        "activity": "Language access: practice interpreter line, review multilingual resources.",
                        "domain": "S",
                        "hours": 4,
                    },
                    {
                        "day": "Fri",
                        "activity": "Week review: what went well, questions, adjust plan.",
                        "domain": "—",
                        "hours": 2,
                    },
                ],
            },
            {
                "week": 4,
                "focus": "Solo with Safety Net",
                "activities": [
                    {
                        "day": "Mon-Thu",
                        "activity": "Independent service with buddy nearby. Supervisor observes 2 interactions/day.",
                        "domain": "B",
                        "hours": 24,
                    },
                    {
                        "day": "Fri",
                        "activity": "Day 30 check-in: knowledge re-quiz, supervisor observation rating, self-reflection.",
                        "domain": "—",
                        "hours": 3,
                    },
                ],
            },
        ],
        "weeks_5_8": [
            {
                "focus": "Digital self-service promotion",
                "activity": "Learn portal features; practice guiding constituents to digital in every interaction.",
                "domain": "B",
                "hours": 4,
            },
            {
                "focus": "Cross-department shadowing",
                "activity": "2 hours each in Revenue, Permits, Parks — understand what happens after referral.",
                "domain": "K",
                "hours": 6,
            },
            {
                "focus": "Difficult constituent scenarios",
                "activity": "De-escalation workshop (2 hours). Role-play angry/confused/frustrated callers.",
                "domain": "S",
                "hours": 2,
            },
            {
                "focus": "CRM documentation quality",
                "activity": "Supervisor reviews 10 CRM entries; feedback on completeness, clarity, follow-up.",
                "domain": "B",
                "hours": 2,
            },
        ],
        "weeks_9_12": [
            {
                "focus": "Full independence",
                "activity": "No buddy required. Supervisor spot-checks 1 interaction/day.",
                "domain": "B",
                "hours": "ongoing",
            },
            {
                "focus": "FCR focus",
                "activity": "Track personal FCR rate. ID top 3 referral patterns resolvable at first contact.",
                "domain": "B",
                "hours": 2,
            },
            {
                "focus": "Day 60 check-in",
                "activity": "FCR rate review, CSAT for served constituents, CRM audit.",
                "domain": "—",
                "hours": 2,
            },
            {
                "focus": "Day 90 graduation",
                "activity": "Full KSAB assessment. Transition to ongoing IDP.",
                "domain": "—",
                "hours": 3,
            },
        ],
        "success_criteria": [
            "Services catalog knowledge quiz ≥90%",
            "First-contact resolution rate ≥65%",
            "CRM documentation compliance ≥90%",
            "Supervisor observation rating ≥3 on all CS competencies",
            "Digital self-service offered in ≥80% of observed interactions",
            "Zero unresolved constituent complaints attributed to new hire",
        ],
    },
    "plan_reviewer": {
        "title": "Permit Plan Reviewer",
        "competency_ids": ["PL-K1", "PL-K2", "PL-S1", "PL-S3", "PL-A1", "PL-A2", "PL-B1", "PL-B2"],
        "weeks_2_4": [
            {
                "week": 2,
                "focus": "Code Foundation",
                "activities": [
                    {
                        "day": "Mon-Wed",
                        "activity": "Zoning code study: county ordinance chapters 1-6. Mentor Q&A (2×1hr).",
                        "domain": "K",
                        "hours": 18,
                    },
                    {
                        "day": "Thu-Fri",
                        "activity": "Building code: residential study guide. Common permits: deck, basement, addition.",
                        "domain": "K",
                        "hours": 12,
                    },
                ],
            },
            {
                "week": 3,
                "focus": "Systems + Shadowing",
                "activities": [
                    {
                        "day": "Mon-Tue",
                        "activity": "Permit system hands-on: queue, status updates, reviewer assignment, notes.",
                        "domain": "S",
                        "hours": 12,
                    },
                    {
                        "day": "Wed-Thu",
                        "activity": "Shadow senior reviewer full days. Reviewer narrates decisions aloud.",
                        "domain": "K+S",
                        "hours": 12,
                    },
                    {
                        "day": "Fri",
                        "activity": "Fee schedule study. Calculate fees for 5 sample applications.",
                        "domain": "K",
                        "hours": 4,
                    },
                ],
            },
            {
                "week": 4,
                "focus": "Practice Reviews",
                "activities": [
                    {
                        "day": "Mon-Wed",
                        "activity": "Review 5 previously-decided applications. Compare to actual decisions. Discuss.",
                        "domain": "S",
                        "hours": 18,
                    },
                    {
                        "day": "Thu",
                        "activity": "Attend 2 pre-application meetings as observer.",
                        "domain": "A",
                        "hours": 6,
                    },
                    {
                        "day": "Fri",
                        "activity": "Day 30 check-in: code knowledge quiz, review discussion, self-assessment.",
                        "domain": "—",
                        "hours": 3,
                    },
                ],
            },
        ],
        "weeks_5_8": [
            {
                "focus": "Supervised live reviews",
                "activity": "Simple residential reviews — senior reviewer co-signs all decisions.",
                "domain": "S+B",
                "hours": 60,
            },
            {
                "focus": "Written feedback practice",
                "activity": "Draft rejection feedback with fix path. Senior edits and coaches.",
                "domain": "B",
                "hours": 8,
            },
            {
                "focus": "Code interpretation workshop",
                "activity": "4-hour session: ambiguous scenarios, gray areas, escalation criteria.",
                "domain": "K",
                "hours": 4,
            },
            {
                "focus": "Customer interaction training",
                "activity": "Explaining rejections without adversarial tone. Empathy + clarity.",
                "domain": "A",
                "hours": 2,
            },
        ],
        "weeks_9_12": [
            {
                "focus": "Independent simple residential",
                "activity": "Review and decide without co-signature. 20% spot-check by supervisor.",
                "domain": "B",
                "hours": "ongoing",
            },
            {
                "focus": "Complex residential intro",
                "activity": "Shadow complex reviews. Begin guided practice on additions.",
                "domain": "S",
                "hours": 12,
            },
            {
                "focus": "Day 90 assessment",
                "activity": "Code test (≥85%). Review quality audit. Supervisor KSAB rating.",
                "domain": "—",
                "hours": 3,
            },
        ],
        "success_criteria": [
            "Code knowledge test ≥85%",
            "Simple residential reviews completed at ≤7 day average",
            "Written feedback provided on 100% of rejections",
            "Supervisor observation rating ≥3 on all PL competencies",
            "Zero constituent complaints attributed to new reviewer",
        ],
    },
    "tax_agent": {
        "title": "Revenue / Tax Service Agent",
        "competency_ids": ["RT-K1", "RT-K2", "RT-K3", "RT-S1", "RT-S2", "RT-S3", "RT-A1", "RT-B1", "RT-B2"],
        "weeks_2_4": [
            {
                "week": 2,
                "focus": "Tax Law + Systems",
                "activities": [
                    {
                        "day": "Mon-Wed",
                        "activity": "Missouri property tax law study + mentor sessions. Assessment cycle, timelines.",
                        "domain": "K",
                        "hours": 18,
                    },
                    {
                        "day": "Thu-Fri",
                        "activity": "Tax system navigation: parcel lookup, payment history, processing, receipts.",
                        "domain": "S",
                        "hours": 12,
                    },
                ],
            },
            {
                "week": 3,
                "focus": "Programs + Shadow",
                "activities": [
                    {
                        "day": "Mon",
                        "activity": "Senior Tax Freeze: eligibility, workflow, documentation requirements.",
                        "domain": "K",
                        "hours": 6,
                    },
                    {
                        "day": "Tue",
                        "activity": "Payment portal: learn from constituent view. Practice guiding callers.",
                        "domain": "S",
                        "hours": 6,
                    },
                    {
                        "day": "Wed-Thu",
                        "activity": "Shadow experienced agent: phone + walk-in. Observe de-escalation.",
                        "domain": "K+S+A",
                        "hours": 12,
                    },
                    {
                        "day": "Fri",
                        "activity": "De-escalation training: role-play upset taxpayer scenarios.",
                        "domain": "S",
                        "hours": 3,
                    },
                ],
            },
            {
                "week": 4,
                "focus": "Supervised Practice",
                "activities": [
                    {
                        "day": "Mon-Thu",
                        "activity": "Process live payments with buddy present. Zero-error tolerance.",
                        "domain": "S+B",
                        "hours": 24,
                    },
                    {
                        "day": "Fri",
                        "activity": "Day 30 check-in: knowledge quiz, error audit, self-reflection.",
                        "domain": "—",
                        "hours": 3,
                    },
                ],
            },
        ],
        "weeks_5_8": [
            {
                "focus": "Independent phone service",
                "activity": "Take calls independently. Promote online payment in every call (tracked).",
                "domain": "B",
                "hours": "ongoing",
            },
            {
                "focus": "Error audit",
                "activity": "Supervisor audits 10% of transactions weekly. Target: <1% error rate.",
                "domain": "B",
                "hours": 2,
            },
            {
                "focus": "Senior Freeze processing",
                "activity": "Handle applications: supervisor reviews first 10, then independent.",
                "domain": "S+B",
                "hours": 8,
            },
        ],
        "weeks_9_12": [
            {
                "focus": "Full independence",
                "activity": "All payment types, all channels.",
                "domain": "B",
                "hours": "ongoing",
            },
            {
                "focus": "Appeal process",
                "activity": "Observe Board of Equalization hearing. Learn referral process.",
                "domain": "K",
                "hours": 4,
            },
            {
                "focus": "Day 90 assessment",
                "activity": "Knowledge test (≥85%). Error rate audit. Online promotion rate. KSAB rating.",
                "domain": "—",
                "hours": 3,
            },
        ],
        "success_criteria": [
            "Tax law knowledge test ≥85%",
            "Payment processing error rate <1%",
            "Online payment promoted in ≥80% of phone interactions",
            "Supervisor observation rating ≥3 on all RT competencies",
            "Senior Freeze applications processed within SLA",
        ],
    },
}

# Generic fallback for unlisted roles
GENERIC_CURRICULUM = {
    "title": "Generic County Employee",
    "weeks_2_4": [
        {
            "week": 2,
            "focus": "Department Knowledge",
            "activities": [
                {
                    "day": "Mon-Wed",
                    "activity": "Department SOPs, regulations, policies study with mentor.",
                    "domain": "K",
                    "hours": 18,
                },
                {
                    "day": "Thu-Fri",
                    "activity": "Department systems training: primary software, data entry, reporting.",
                    "domain": "S",
                    "hours": 12,
                },
            ],
        },
        {
            "week": 3,
            "focus": "Shadowing",
            "activities": [
                {
                    "day": "Mon-Thu",
                    "activity": "Shadow experienced colleague performing core job functions.",
                    "domain": "K+S",
                    "hours": 24,
                },
                {"day": "Fri", "activity": "Reflection + questions with supervisor.", "domain": "A", "hours": 3},
            ],
        },
        {
            "week": 4,
            "focus": "Guided Practice",
            "activities": [
                {
                    "day": "Mon-Thu",
                    "activity": "Perform core tasks with colleague observing and coaching.",
                    "domain": "S+B",
                    "hours": 24,
                },
                {"day": "Fri", "activity": "Day 30 check-in.", "domain": "—", "hours": 3},
            ],
        },
    ],
    "weeks_5_8": [
        {
            "focus": "Expanding scope",
            "activity": "Handle increasing variety of tasks independently with check-ins.",
            "domain": "B",
            "hours": "ongoing",
        },
        {
            "focus": "Cross-training",
            "activity": "Learn adjacent functions within department.",
            "domain": "K+S",
            "hours": 8,
        },
    ],
    "weeks_9_12": [
        {
            "focus": "Full independence",
            "activity": "Complete all routine tasks without supervision.",
            "domain": "B",
            "hours": "ongoing",
        },
        {
            "focus": "Day 90 graduation",
            "activity": "Full KSAB assessment. Transition to IDP.",
            "domain": "—",
            "hours": 3,
        },
    ],
    "success_criteria": [
        "Department knowledge assessment ≥80%",
        "Supervisor confidence rating ≥4/5",
        "Can perform all routine tasks independently",
        "Zero safety or compliance incidents",
    ],
}

ROLE_ALIASES = {
    "customer service": "customer_service",
    "customer service rep": "customer_service",
    "csr": "customer_service",
    "plan reviewer": "plan_reviewer",
    "permit reviewer": "plan_reviewer",
    "tax agent": "tax_agent",
    "revenue agent": "tax_agent",
    "tax service": "tax_agent",
}


def get_business_day(start: datetime, offset: int) -> datetime:
    """Get business day N days from start (skip weekends)."""
    current = start
    days_added = 0
    while days_added < offset:
        current += timedelta(days=1)
        if current.weekday() < 5:  # Mon-Fri
            days_added += 1
    return current


def generate_plan(role: str, department: str, start_date: str = None) -> str:
    """Generate a complete 90-day onboarding plan."""
    start = datetime.strptime(start_date, "%Y-%m-%d") if start_date else datetime.now()

    # Find matching curriculum
    role_key = ROLE_ALIASES.get(role.lower().strip(), role.lower().strip().replace(" ", "_"))
    curriculum = ROLE_CURRICULA.get(role_key, GENERIC_CURRICULUM)
    title = curriculum.get("title", role)

    lines = [
        "# 90-Day Onboarding Plan",
        f"**Employee Role**: {title}",
        f"**Department**: {department}",
        f"**Start Date**: {start.strftime('%Y-%m-%d')} ({start.strftime('%A')})",
        f"**Day 30 Check-in**: {get_business_day(start, 30).strftime('%Y-%m-%d')}",
        f"**Day 60 Check-in**: {get_business_day(start, 60).strftime('%Y-%m-%d')}",
        f"**Day 90 Graduation**: {get_business_day(start, 90).strftime('%Y-%m-%d')}",
        "**Buddy**: [Assign before start date]",
        "**Mentor**: [Assign before start date]",
        "",
        "---",
        "",
        "## Week 1: Universal County Orientation",
        "",
        "| Day | Date | Morning | Afternoon | KSAB |",
        "|-----|------|---------|-----------|------|",
    ]

    for day_info in UNIVERSAL_WEEK1:
        day_num = day_info["day"]
        day_date = get_business_day(start, day_num - 1)
        lines.append(
            f"| Day {day_num} | {day_date.strftime('%m/%d')} ({day_date.strftime('%a')}) | "
            f"{day_info['am']} | {day_info['pm']} | {day_info['domain']} |"
        )
    lines.append("")

    # Mandatory compliance
    lines.extend(
        [
            "### Mandatory Compliance Training (complete by deadline)",
            "",
            "| Training | Format | Hours | Deadline |",
            "|----------|--------|-------|----------|",
        ]
    )
    for comp in MANDATORY_COMPLIANCE:
        deadline = get_business_day(start, comp["deadline_day"])
        lines.append(
            f"| {comp['topic']} | {comp['format']} | {comp['hours']} | {deadline.strftime('%m/%d')} (Day {comp['deadline_day']}) |"
        )
    lines.append("")

    # Weeks 2-4
    lines.extend(["---", "", "## Weeks 2–4: Department-Specific Development", ""])
    for week_block in curriculum.get("weeks_2_4", []):
        week_num = week_block.get("week", "?")
        focus = week_block.get("focus", "")
        lines.append(f"### Week {week_num}: {focus}")
        lines.append("")
        lines.append("| Day | Activity | KSAB | Hours |")
        lines.append("|-----|----------|------|-------|")
        for act in week_block.get("activities", []):
            lines.append(f"| {act['day']} | {act['activity']} | {act['domain']} | {act.get('hours', '—')} |")
        lines.append("")

    # Weeks 5-8
    lines.extend(["---", "", "## Weeks 5–8: Expanding Competence", ""])
    lines.append("| Focus | Activity | KSAB | Hours |")
    lines.append("|-------|----------|------|-------|")
    for act in curriculum.get("weeks_5_8", []):
        lines.append(f"| {act['focus']} | {act['activity']} | {act['domain']} | {act.get('hours', '—')} |")
    lines.append("")

    # Weeks 9-12
    lines.extend(["---", "", "## Weeks 9–12: Independence & Assessment", ""])
    lines.append("| Focus | Activity | KSAB | Hours |")
    lines.append("|-------|----------|------|-------|")
    for act in curriculum.get("weeks_9_12", []):
        lines.append(f"| {act['focus']} | {act['activity']} | {act['domain']} | {act.get('hours', '—')} |")
    lines.append("")

    # Checkpoints
    lines.extend(["---", "", "## Assessment Checkpoints", ""])
    lines.append("| Day | Date | Check-in | Method | Criteria |")
    lines.append("|-----|------|----------|--------|----------|")
    for cp in CHECKPOINTS:
        cp_date = get_business_day(start, cp["day"])
        lines.append(
            f"| Day {cp['day']} | {cp_date.strftime('%m/%d')} | {cp['name']} | {cp['method']} | {cp['criteria']} |"
        )
    lines.append("")

    # Success criteria
    criteria = curriculum.get("success_criteria", GENERIC_CURRICULUM["success_criteria"])
    lines.extend(["---", "", "## Day 90 Success Criteria", ""])
    for _i, c in enumerate(criteria, 1):
        lines.append(f"- [ ] {c}")
    lines.extend(
        [
            "",
            "---",
            "",
            "## Post-90-Day Transition",
            "",
            "At Day 90, remaining gaps become goals in the employee's Individual",
            "Development Plan. Use `templates/individual-development-plan-template.md`.",
        ]
    )

    if curriculum.get("competency_ids"):
        lines.extend(
            [
                "",
                f"**Target competencies for ongoing IDP**: {', '.join(curriculum['competency_ids'])}",
            ]
        )

    return "\n".join(lines)


def main():
    parser = argparse.ArgumentParser(description="Generate 90-day onboarding plan")
    parser.add_argument("--role", "-r", required=True, help="Job role (e.g., 'Customer Service Rep')")
    parser.add_argument("--department", "-d", required=True, help="Department ID")
    parser.add_argument("--start-date", "-s", help="Start date (YYYY-MM-DD, default: today)")
    parser.add_argument("--output", "-o", help="Output file path")
    args = parser.parse_args()

    plan = generate_plan(args.role, args.department, args.start_date)

    if args.output:
        with open(args.output, "w") as f:
            f.write(plan)
        print(f"✅ 90-day plan written to {args.output}")
    else:
        print(plan)


if __name__ == "__main__":
    main()
