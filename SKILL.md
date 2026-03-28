---
name: stl-county-kpi
description: >
  St. Louis County government services KPI tracker, scorecard generator, and
  improvement planner. Covers all major county departments: Permits & Licensing,
  Revenue & Taxation, Parks & Recreation, Animal Services, Vital Records,
  Elections, Customer Service (Qless/call center), Procurement, Planning & Zoning,
  Public Health, Transportation, Police, Justice Services, and Human Services.
  Use for ANY request related to St. Louis County government performance, service
  delivery metrics, operational improvement, budget justification, council briefings,
  open data analysis, digital transformation, constituent satisfaction, wait times,
  processing times, backlog reduction, or municipal benchmarking. Also covers
  workforce development, KSAB (Knowledge/Skills/Attitudes/Behaviors) gap analysis,
  training needs assessment, competency frameworks, individual development plans,
  employee performance diagnostics, succession planning, training program design,
  Kirkpatrick evaluation, and HR metrics (vacancy, turnover, engagement, training ROI).
  Also covers service delivery improvement: employee service scripts, triage
  decision trees, de-escalation playbooks, job aids, warm handoff protocols,
  and resident self-service guides organized by life event (moved, building,
  senior, business, crisis, reentry, bereavement, pet adoption). Generates
  chatbot responses, website content, printable handouts, and eligibility checkers.
  Trigger when someone mentions STL County KPIs, government scorecards, county
  department performance, service level agreements, municipal metrics, county council
  reports, government efficiency, competency gaps, training needs, employee development,
  workforce planning, KSAB analysis, knowledge gaps, skill gaps, attitude problems,
  behavior change, constituent journey, cross-department handoffs, service design,
  data sources, open data, new employee onboarding, 90-day plan, buddy program,
  or any question about how St. Louis County services or staff are performing or
  could improve — even if they don't say "KPI" explicitly. Supports slash commands:
  /help, /score, /scorecard, /benchmark, /gaps, /train, /onboard, /diagnose,
  /journey, /briefing, /district, /alerts, /why-failing, /succession, /rollout,
  /pilot, /legal, /qless, /crisis, /audit, /sources, /export, /status.
---

# STL County KPI — Government Services Performance Skill

Performance intelligence for St. Louis County, Missouri government operations.
Helps county staff, elected officials, analysts, and civic technologists measure,
report, and improve government service delivery across all departments.

---

## Quick Start

### Commands
When a user types a `/command`, load the appropriate commands file and execute.

| Category | Commands File | Commands |
|----------|-------------|----------|
| Session & Nav | `references/commands/session-commands.md` | `/help` `/departments` `/status` `/top-priorities` |
| KPI & Scoring | `references/commands/kpi-commands.md` | `/score` `/scorecard` `/benchmark` `/trend` `/alerts` `/why-failing` |
| Workforce | `references/commands/workforce-commands.md` | `/gaps` `/train` `/onboard` `/idp` `/succession` |
| Reporting | `references/commands/reporting-commands.md` | `/briefing` `/diagnose` `/district` `/export` `/crisis` |
| Journeys & Ops | `references/commands/operations-commands.md` | `/journey` `/handoffs` `/journey-score` `/audit` `/sources` `/rollout` `/pilot` `/stakeholders` `/legal` `/qless` |
| Service Delivery | `references/commands/service-commands.md` | `/triage` `/script` `/referral` `/escalate` `/faq` `/job-aid` `/not-us` `/guide` `/eligible` `/process` `/wait` `/contact` `/web-content` `/chatbot-response` `/handout` |

If unsure which file to load, load `references/commands/session-commands.md` and run `/help` first.

### Without Commands
When a user asks a natural language question (not a `/command`), use the track decision tree below to route:

1. **Identify the track** — use the decision tree
2. **Load only the relevant files** — don't load everything
3. **Run scripts when deterministic output is needed** — use `scripts/run.py` as the entry point
4. **Generate the deliverable** using the appropriate template

**Demo**: Run `bash scripts/demo.sh` to validate the full pipeline in 30 seconds.
**Pipeline**: Run `python scripts/run.py diagnose` for a full score → benchmark → gap → scorecard flow.

---

## Track Decision Tree

First, identify which track the request falls into:

| If the user asks about... | → Track | Start here |
|---------------------------|---------|-----------|
| Department performance, KPIs, metrics, targets | **KPI** | See KPI Track below |
| Staff competency, training, KSAB, onboarding, turnover | **Workforce** | See Workforce Track below |
| Resident experience, cross-department handoffs, service design | **Journeys** | See Journeys Track below |
| Data sources, APIs, data quality, open data | **Data** | See Data Track below |
| System design, data models, APIs, dashboards | **Engineering** | See Engineering Track below |
| Reporting to executives, council, public | **Reporting** | See Reporting Track below |
| How to roll out KPIs, politics, stakeholders, change | **Change Mgmt** | `references/change-management.md` |
| Missouri law, Sunshine Law, civil service, Hancock | **Legal Context** | `references/missouri-legal-context.md` |
| Employee tools, scripts, triage, job aids, de-escalation | **Service Delivery** | See Service Delivery Track below |
| Resident guides, eligibility, self-service, FAQ, life events | **Service Delivery** | See Service Delivery Track below |

---

### KPI Track

| Need | File(s) to load |
|------|----------------|
| KPI definitions for a department | `references/kpi-framework.md` (relevant section) |
| Department structure, hours, services | `references/government-operations.md` |
| Improvement strategies | `references/improvement-playbook.md` |
| National benchmarks | `assets/benchmark-data.csv` or run `scripts/run.py benchmark` |
| Score KPIs (status, gap, trend) | Run `scripts/run.py score --input kpis.json` |
| Department catalog | `assets/department-catalog.csv` |

### Workforce Track

| Need | File(s) to load |
|------|----------------|
| KSAB framework overview | `references/workforce-development.md` Sections 1–2 |
| Department competency maps | `references/workforce-development.md` Section 3 (relevant dept only) |
| KPI-to-competency linkage (why is KPI failing?) | `references/workforce-development.md` Section 5 |
| Training modality selection | `references/workforce-development.md` Section 6 |
| Workforce KPIs (vacancy, turnover, engagement) | `references/workforce-development.md` Section 7 |
| Succession planning, knowledge transfer | `references/workforce-development.md` Section 9 |
| KSAB gap analysis | `templates/ksab-gap-analysis-template.md` or run `scripts/run.py gaps` |
| Training needs assessment | `templates/training-needs-assessment-template.md` |
| Individual development plan | `templates/individual-development-plan-template.md` |
| Onboarding 90-day plan | `references/onboarding-curriculum.md` or run `scripts/run.py onboard` |
| Buddy/mentor program | `references/onboarding-curriculum.md` Section 6 |
| Cultural competency, equity training | `references/workforce-development.md` Section 10 |

### Journeys Track

| Need | File(s) to load |
|------|----------------|
| Cross-department journey maps | `references/constituent-journeys.md` (relevant journey) |
| End-to-end journey KPIs | `references/constituent-journeys.md` Section 9 |
| Handoff failure diagnosis | `references/constituent-journeys.md` Section 10 |
| Score journey data | Run `scripts/run.py journey --input data.json` |

### Data Track

| Need | File(s) to load |
|------|----------------|
| Real data sources, APIs, portals | `references/data-sources.md` Sections 1–4 |
| KPI-to-data-source mapping | `references/data-sources.md` Section 5 |
| Data quality audit | Run `scripts/run.py audit` or `references/data-sources.md` Section 6 |
| Integration architecture | `references/data-sources.md` Section 7 |

### Service Delivery Track — Employee Tools

| Need | File(s) to load |
|------|----------------|
| Service triage / routing decision tree | `references/employee-toolkit.md` Section 1 |
| Phone scripts for common scenarios | `references/employee-toolkit.md` Section 2 |
| Walk-in service scripts | `references/employee-toolkit.md` Section 3 |
| Cross-department referral guide (warm handoff) | `references/employee-toolkit.md` Section 4 |
| Escalation protocols | `references/employee-toolkit.md` Section 5 |
| Digital self-service promotion scripts | `references/employee-toolkit.md` Section 6 |
| De-escalation / difficult interaction playbook | `references/employee-toolkit.md` Section 7 |
| Common questions quick answers | `references/employee-toolkit.md` Section 8 |
| Multilingual service guide | `references/employee-toolkit.md` Section 9 |
| Printable job aid cards | `references/employee-toolkit.md` Section 10 |

### Service Delivery Track — Resident Tools

| Need | File(s) to load |
|------|----------------|
| Life-event guides (moved, building, senior, etc.) | `references/resident-service-guides.md` Section 1 |
| Service eligibility checker (Tax Freeze, permits, general) | `references/resident-service-guides.md` Section 2 |
| Step-by-step process maps (plain language) | `references/resident-service-guides.md` Section 3 |
| Wait time and processing time expectations | `references/resident-service-guides.md` Section 4 |
| Top 25 FAQ with answers | `references/resident-service-guides.md` Section 5 |
| Accessibility and language access info | `references/resident-service-guides.md` Section 6 |
| Contact directory with "best time to call" tips | `references/resident-service-guides.md` Section 7 |
| Web content generation (plain language, 8th-grade level) | Use `/web-content` command |
| Chatbot response generation | Use `/chatbot-response` command |
| Printable handouts for distribution | Use `/handout` command |

### Engineering Track

| Need | File(s) to load |
|------|----------------|
| KPI tracking data model | `schemas/kpi-data-model.json` |
| Competency tracking data model | `schemas/competency-data-model.json` |
| API design | `schemas/api-routes.json` |
| Dashboard specification | `scripts/dashboard-spec.md` |

### Reporting Track

| Need | File(s) to load |
|------|----------------|
| Department scorecard | `templates/scorecard-template.md` or run `scripts/run.py pipeline` |
| KPI improvement action plan | `templates/action-plan-template.md` |
| Council/executive briefing | `templates/council-briefing-template.md` |
| Full diagnostic (score → benchmark → gaps → scorecard) | Run `scripts/run.py diagnose` |

---

## Department Index

| ID | Department | Key Service Areas |
|---|---|---|
| `permits` | Permits & Licensing | Building permits, zoning, inspections, business licenses |
| `revenue` | Revenue & Taxation | Property tax, personal property, payments, senior freeze |
| `parks` | Parks & Recreation | 70+ parks, rec centers, trails, events, programs |
| `animal` | Animal Services | Adoption, intake, foster, spay/neuter, stray response |
| `records` | Vital Records | Birth certificates, death certificates, document requests |
| `elections` | Board of Elections | Voter registration, polling, turnout, ballot processing |
| `customer` | Customer Service | Qless virtual queue, call center, walk-in, online services |
| `procurement` | Procurement (Ch. 107) | Bid opportunities, vendor registration, contract compliance |
| `planning` | Planning & Zoning | Land use, variances, comprehensive plan, GIS |
| `health` | Public Health | Inspections, immunizations, WIC, environmental health |
| `transport` | Transportation | Road maintenance, signals, ADA compliance, snow removal |
| `police` | Police Department | Response times, community engagement, crime stats |
| `justice` | Justice Services | Pretrial, probation, diversion programs, reentry |
| `human_svc` | Human Services | CDBG, homeless services, aging, disability, veterans |
| `hr` | Human Resources / Administration | Workforce development, training, recruitment, civil service, employee relations |

---

## Output Formats

### Scorecard
Use `templates/scorecard-template.md`. Produces a one-page department scorecard with:
- 6–8 KPIs with current value, target, trend, and status (🟢🟡🔴)
- Sparkline-ready trend data (last 6 periods)
- Top 3 active initiatives with status and owner
- Key risks and blockers

### Action Plan
Use `templates/action-plan-template.md`. Produces a structured improvement plan:
- Problem statement with baseline data
- SMART goal
- Root cause analysis (5 Whys or fishbone)
- Interventions ranked by impact × feasibility
- 90-day milestones
- Resource requirements and budget impact
- Success metrics and measurement plan

### Council Briefing
Use `templates/council-briefing-template.md`. Produces a 2-page executive brief:
- Headline metric + trend
- Context paragraph (plain language)
- Department-level summary table
- Recommended actions with fiscal impact
- Appendix with methodology notes

### Dashboard Spec
Use `scripts/dashboard-spec.md`. Produces a technical specification for building
a KPI dashboard as a React artifact, static site, or Power BI/Tableau report.

### Data Export
Generate CSV or JSON conforming to `schemas/kpi-data-model.json`.

### KSAB Gap Analysis
Use `templates/ksab-gap-analysis-template.md`. Produces a diagnostic report:
- Performance problem linked to KPI
- Competency-to-KPI mapping
- Assessment results with proficiency ratings
- Root domain diagnosis (K vs S vs A vs B)
- Gap heat map by competency area
- Domain-matched interventions (training ≠ the answer for every gap)
- Kirkpatrick measurement plan

### Training Needs Assessment
Use `templates/training-needs-assessment-template.md`. Produces an investment plan:
- Organizational context and workforce snapshot
- Multi-source needs identification
- Prioritization matrix (KPI impact × urgency × reach)
- Mandatory compliance training inventory
- Tiered training plan with budget
- Annual calendar and evaluation framework

### Individual Development Plan
Use `templates/individual-development-plan-template.md`. Produces:
- KSAB proficiency profile for one employee
- SMART development goals linked to KPIs
- Activities matched to gap domain (not just classroom)
- Career aspiration pathway
- Check-in schedule with discussion guide

### Constituent Journey Map
Use `references/constituent-journeys.md`. Produces:
- End-to-end journey stages with departments touched
- Cross-department KPIs (total time, touchpoints, drop-off rate)
- Handoff failure diagnosis
- KSAB connections explaining journey breakdowns
- Improvement opportunities

### Onboarding Curriculum
Use `references/onboarding-curriculum.md`. Produces:
- Sequenced 90-day plan following KSAB dependency chain (K→S→A→B)
- Day-by-day schedule for first 4 weeks
- Week-by-week plan for weeks 5–12
- Assessment checkpoints (Day 5, 14, 30, 60, 90)
- Graduation success criteria
- Buddy/mentor assignments

### Employee Service Tools
Use `references/employee-toolkit.md`. Produces:
- Triage decision trees for routing constituents in <2 minutes
- Phone/walk-in scripts for common scenarios
- De-escalation playbook (LEAD framework)
- Warm handoff referral guides
- Printable job aid cards (pdf skill)
- Digital self-service promotion scripts for every interaction

### Resident Self-Service Guides
Use `references/resident-service-guides.md`. Produces:
- Life-event guides in plain language ("I just moved here", "I want to build")
- Interactive eligibility checkers (React artifacts)
- Step-by-step process maps with time estimates
- FAQ answers for top 25 resident questions
- Web content at 8th-grade reading level
- Chatbot response JSON
- Printable handouts for government centers and community events

---

## Principles

1. **Data-grounded** — Every KPI must have a clear data source, collection method,
   and refresh frequency. Flag when data is estimated vs. measured.

2. **Benchmark-informed** — Compare STL County to national municipal medians from
   ICMA, NLC, and What Works Cities. Load `assets/benchmark-data.csv` for context.

3. **Equity-aware** — Disaggregate KPIs by geography (north/south/west county),
   race/ethnicity, and income where data permits. Flag disparities.

4. **Actionable** — Every scorecard must connect metrics to at least one concrete
   improvement initiative with an owner and timeline.

5. **Transparent** — Favor open data formats and public reporting. Reference
   STL County's Open Data portal commitments.

6. **Fiscally honest** — Improvement plans must estimate cost and identify funding
   source (operating budget, grant, capital, shared services).

7. **KSAB-diagnostic** — When a KPI underperforms, diagnose whether the root cause
   is a Knowledge, Skill, Attitude, or Behavior gap before prescribing training.
   Training fixes K and S gaps. A and B gaps require leadership, culture, process
   design, and accountability interventions. Misdiagnosis wastes resources.

8. **Resident-centered** — Organize services by what residents need, not by how
   government is structured. Residents don't think in departments — they think in
   life events ("I moved", "I need to build", "I need help"). Every tool should
   reduce touchpoints, eliminate referral loops, and promote self-service.

---

## Guardrails

- Do not fabricate real KPI data. Use realistic illustrative values and label them
  as `[ILLUSTRATIVE]` or `[TARGET]`. When real data is available from the county's
  open data portal or public reports, cite the source.
- Do not make political recommendations or endorse candidates/officials.
- Frame efficiency improvements as serving constituents, not as headcount reduction.
- Acknowledge that government operations have constraints (procurement rules,
  civil service, union agreements, legal mandates) that private sector does not.
- When discussing police or justice metrics, use evidence-based, non-inflammatory
  language and cite recognized frameworks (CALEA, Vera Institute, etc.).
- When producing KSAB assessments, frame gaps as development opportunities,
  not personal deficiencies. Emphasize that Attitude and Behavior gaps are
  often systemic (leadership, culture, process), not individual character flaws.
- Never recommend termination or discipline — that's a management and HR decision.
  Recommend development pathways and escalation triggers instead.
- Acknowledge civil service, union, and legal constraints on workforce actions.
  Don't recommend practices that assume private-sector flexibility.
- When generating resident-facing content, write at 8th-grade reading level.
  Use active voice, short sentences, numbered steps. Test readability.
- When generating employee scripts, keep tone warm and professional.
  Never script employees to lie, deflect, or deny service.
- Never route residents to a department or number without verifying it's the
  right one. The #1 complaint is being bounced between departments.
- Always distinguish county vs. state vs. municipal services (see employee
  toolkit Section 8.3). Vehicle registration, marriage licenses, SNAP, and
  court records are NOT county services.
