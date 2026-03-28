# CLAUDE.md — Project Intelligence for Claude Code

## What This Is
AI-powered operating system for St. Louis County, MO government performance. A Claude skill with 46 commands across 8 tracks covering KPI scoring, workforce development (KSAB framework), service delivery tools, and resident guides.

## Quick Orientation
- `SKILL.md` — Routing hub, start here for command dispatch
- `references/` — Domain knowledge (KPIs, KSAB, legal context, case studies)
- `scripts/` — 15 Python CLI tools (standard library only, no pip deps)
- `schemas/` — JSON data models for KPIs, competencies, API routes
- `templates/` — Markdown output templates for reports and plans
- `assets/` — Sample data (CSVs + JSON) for demos and testing
- `evals/evals.json` — 23 evaluation scenarios

## Build & Test
```bash
# Validate entire pipeline (30 seconds)
bash scripts/demo.sh

# Run linting
ruff check scripts/

# Run type checking
mypy scripts/ --ignore-missing-imports

# Run tests
python -m pytest tests/ -v

# Score a department
python scripts/run.py score --input assets/sample-kpis.json --department permits

# Full diagnostic pipeline
python scripts/run.py diagnose --department permits
```

## Code Conventions
- **Python 3.9+**, standard library only — no external packages
- All scripts use `argparse` with consistent flags: `--input`, `--output`, `--format`, `--department`
- Entry point: `scripts/run.py` chains individual scripts into pipelines
- Type hints on function signatures
- Docstrings on all public functions
- Output formats: JSON, Markdown, HTML, React JSX, SQL

## Key Domain Concepts
- **KSAB Framework**: Knowledge/Skills/Attitudes/Behaviors — always diagnose the domain before prescribing interventions
- **15 departments**: Permits, Revenue, Parks, Animal Services, Vital Records, Elections, Customer Service, Procurement, Planning, Public Health, Transportation, Police, Justice Services, Human Services, IT
- **71 KPIs** with national benchmarks (ICMA, NRPA, CALEA, GFOA)
- **7 constituent journeys** mapping cross-department experiences

## Important Patterns
- Scripts are standalone CLI tools that also compose via `run.py`
- All data flows as JSON between pipeline stages
- Benchmark data lives in `assets/benchmark-data.csv`
- Department metadata in `assets/department-catalog.csv`
- Legal constraints in `references/missouri-legal-context.md` — respect Sunshine Law, Hancock Amendment, civil service rules
