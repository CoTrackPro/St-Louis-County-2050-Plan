# stl-county-kpi

[![CI](https://github.com/dougdevitre/st-louis-county-2050-plan/actions/workflows/ci.yml/badge.svg)](https://github.com/dougdevitre/st-louis-county-2050-plan/actions/workflows/ci.yml)
[![Python 3.9+](https://img.shields.io/badge/python-3.9%2B-blue.svg)](https://www.python.org/downloads/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**AI-powered operating system for St. Louis County, Missouri government performance, workforce development, and resident service delivery.**

A Claude skill that helps county employees measure, report, and improve government services — and helps residents navigate the services they need.

## What This Does

| For County Analysts | For Department Heads | For Front-Line Staff | For Residents |
|---|---|---|---|
| Score KPIs across 15 departments | Generate council briefings | Service triage decision trees | Life-event guides ("I just moved") |
| Compare to national benchmarks | Run KSAB gap analyses | Phone/walk-in scripts | Eligibility checkers |
| Build dashboards (React artifacts) | Create training plans | De-escalation playbook | Step-by-step process maps |
| Capacity planning models | Succession risk assessment | Printable job aid cards | Service finder (interactive) |
| Data quality audits | 90-day onboarding plans | Warm handoff protocols | FAQ with direct answers |

## Quick Start

### Install as a Claude Skill
Drag `stl-county-kpi.skill` into Claude's skills settings.

### Or clone and explore
```bash
git clone https://github.com/[your-org]/stl-county-kpi.git
cd stl-county-kpi

# Run the demo (validates entire pipeline in 30 seconds)
bash scripts/demo.sh

# Full diagnostic for a department
python scripts/run.py diagnose --department permits

# Generate a KPI dashboard artifact
python scripts/run.py score --input assets/sample-kpis.json --department permits
python scripts/dashboard_generator.py --demo

# Model Friday closure impact
python scripts/capacity_calculator.py --arrival-rate 12 --service-time 15 --staff 3 --scenario friday-closure
```

## Commands (46 total)

Type any command in Claude when the skill is installed:

| Command | What It Does |
|---------|-------------|
| `/help` | Show all commands |
| `/status` | County-wide performance snapshot |
| `/score permits` | Score department KPIs |
| `/scorecard permits` | Full department scorecard |
| `/benchmark permits` | Compare to national peers (ICMA, NRPA, CALEA) |
| `/diagnose permits` | Full pipeline: score → benchmark → gaps → scorecard |
| `/gaps permits` | KSAB competency gap analysis |
| `/why-failing processing_time` | Root cause diagnosis (K vs S vs A vs B) |
| `/train permits` | Training needs assessment |
| `/onboard "CSR" customer` | 90-day onboarding plan |
| `/journey building` | Cross-department journey map |
| `/triage` | Service routing decision tree for staff |
| `/script angry` | De-escalation script |
| `/guide moved` | Resident life-event guide |
| `/eligible tax-freeze` | Eligibility checker |
| `/briefing` | Council briefing |
| `/crisis` | Crisis/surge protocol |

[Full command reference in `/help`]

## Repo Structure

```
stl-county-kpi/
├── SKILL.md                              — Routing hub (8 tracks, 46 commands)
├── references/                           — Domain knowledge (11 files)
│   ├── kpi-framework.md                  — 71 KPIs across 15 departments
│   ├── workforce-development.md          — KSAB framework, competency maps
│   ├── employee-toolkit.md               — Triage trees, scripts, job aids
│   ├── resident-service-guides.md        — Life-event guides, FAQ, eligibility
│   ├── constituent-journeys.md           — 7 cross-department journey maps
│   ├── onboarding-curriculum.md          — 90-day role-specific curricula
│   ├── improvement-playbook.md           — Lean, digital transformation, equity
│   ├── change-management.md              — Political rollout playbook
│   ├── missouri-legal-context.md         — Sunshine Law, Hancock, civil service
│   ├── data-sources.md                   — APIs, portals, data connectors
│   ├── case-studies.md                   — 15 real government performance wins
│   └── commands/                         — 6 command definition files (46 commands)
├── templates/                            — Output templates (7 files)
├── schemas/                              — Data models + API routes (3 files)
├── scripts/                              — Executable tools (12 files)
│   ├── run.py                            — Unified pipeline runner
│   ├── demo.sh                           — 30-second validation
│   ├── kpi_scorer.py                     — Score KPIs
│   ├── ksab_gap_calculator.py            — KSAB gap analysis
│   ├── benchmark_comparator.py           — National peer comparison
│   ├── capacity_calculator.py            — Queueing theory capacity planning
│   ├── dashboard_generator.py            — React dashboard artifact
│   ├── service_finder_generator.py       — Resident service finder artifact
│   ├── onboarding_plan_generator.py      — 90-day plan generator
│   ├── scorecard_renderer.py             — Markdown + HTML scorecard
│   ├── data_quality_auditor.py           — Data completeness/staleness/outliers
│   ├── journey_scorer.py                 — Cross-department journey scoring
│   └── dashboard-spec.md                 — Dashboard design spec
├── assets/                               — Data files (4 files)
│   ├── benchmark-data.csv                — 38 national benchmarks
│   ├── department-catalog.csv            — 15 departments
│   ├── sample-kpis.json                  — Demo KPI data
│   └── sample-assessments.json           — Demo KSAB data
└── evals/                                — Test cases (23 scenarios)
```

## Key Concepts

### KSAB Framework
Every underperforming KPI has a root cause in one of four domains:
- **Knowledge** — staff don't know *what* to do → fix with training, documentation
- **Skills** — staff can't *execute* → fix with practice, coaching, OJT
- **Attitudes** — staff don't see *why it matters* → fix with leadership, culture, recognition
- **Behaviors** — staff don't *do it consistently* → fix with process redesign, accountability

The skill always diagnoses the domain before prescribing interventions. Training only fixes K and S gaps — prescribing training for A and B gaps wastes money.

### Constituent Journey Maps
Residents don't experience government by department. The skill maps 7 cross-department journeys (building project, reentry, senior services, etc.) with end-to-end KPIs, handoff failure patterns, and KSAB root causes.

### Service Delivery Tools
The skill doesn't just measure performance — it provides the actual scripts, decision trees, and tools that front-line staff use to deliver better service. Every tool directly moves a KPI.

## Requirements

- Python 3.9+ (scripts use standard library only — no pip packages needed)
- Claude with skill support (for `.skill` installation)
- OR any environment that can read markdown and run Python

## Forking for Another County

See [FORK_GUIDE.md](FORK_GUIDE.md) for step-by-step instructions on adapting this skill to any county in the US. The patterns are universal — you customize the departments, KPI targets, legal context, and contact info.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on adding KPIs, departments, scripts, and more.

## Security

See [SECURITY.md](SECURITY.md) for vulnerability reporting.

## License

MIT — use it, fork it, improve government. See [LICENSE](LICENSE) for details.

## Credits

Built for St. Louis County, Missouri using data from the county's public website, ICMA benchmarks, Best Friends Animal Society, CALEA, NRPA, GFOA, HUD, FBI UCR, and Missouri state data sources. Case studies cite real government implementations.
