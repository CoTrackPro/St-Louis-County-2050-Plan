# Session & Navigation Commands

## `/help`

Show all available commands grouped by category.

**Output:**
```
🏛️ STL County KPI — Command Reference

NAVIGATION
  /help                  Show this command list
  /departments           List all 15 departments with status summary
  /status                County-wide performance snapshot

KPI & SCORING
  /score <dept>          Score department KPIs (status, gap, trend)
  /scorecard <dept>      Generate full department scorecard
  /benchmark <dept>      Compare department to national peers
  /trend <dept> <kpi>    Show KPI trend with sparkline
  /alerts                Show all KPIs in 🔴 or 🟡 status
  /top-priorities        Show top 5 underperforming KPIs county-wide

WORKFORCE & TRAINING
  /gaps <dept>           KSAB gap analysis for department
  /train <dept>          Training needs assessment
  /onboard <role> <dept> Generate 90-day onboarding plan
  /idp                   Individual development plan template
  /succession <dept>     Succession risk assessment
  /why-failing <kpi>     Diagnose root KSAB domain for underperforming KPI

CONSTITUENT JOURNEYS
  /journey <type>        Show journey map (building, reentry, senior, etc.)
  /handoffs              Show cross-department handoff failure patterns
  /journey-score         Score journey data (requires JSON input)

REPORTING
  /briefing              Generate council briefing
  /diagnose <dept>       Full diagnostic: score → benchmark → gaps → scorecard
  /district <N>          District-level scorecard for council member
  /export <dept>         Export KPI data as CSV/JSON

DATA & SYSTEMS
  /audit                 Data quality audit
  /sources <dept>        Show data sources for department KPIs
  /sql                   Generate SQL audit templates

IMPLEMENTATION
  /rollout               Phased implementation plan
  /pilot                 Pilot department selection guide
  /stakeholders          Stakeholder map and engagement strategy
  /legal                 Missouri legal constraints reference
  /crisis                Crisis/surge protocol

Type any command to begin. Most commands accept a department name or ID.
```

---

## `/departments`

List all departments with current status summary.

**Action:**
1. Load `assets/department-catalog.csv`
2. If scored KPI data is available, include overall status per department
3. Output formatted table

**Output format:**
```
# St. Louis County — Department Directory

| # | Department | ID | KPIs | Status | Top Issue |
|---|-----------|-----|------|--------|-----------|
| 1 | Permits & Licensing | permits | 6 | 🟡 | Processing time above target |
| 2 | Revenue & Taxation | revenue | 6 | 🟢 | — |
| ... | | | | | |

Service hours: Mon–Thu 8am–3:30pm (no Friday service)
Locations: Clayton HQ, NW Crossings, South County
West County Government Center: CLOSED
```

---

## `/status`

County-wide performance snapshot — one screen.

**Action:**
1. If KPI data is available, run `scripts/run.py score` for all departments
2. If no data, generate illustrative snapshot
3. Show county-level composite

**Output format:**
```
# St. Louis County — Performance Snapshot
**Period**: [current month] | **Updated**: [today]

COUNTY COMPOSITE: 🟡 78.4%

BY DEPARTMENT:
🟢 Revenue (94.2%)    🟢 Parks (88.1%)     🟢 Elections (91.0%)
🟡 Permits (78.5%)    🟡 Animal (82.3%)    🟡 Transport (76.0%)
🟡 Customer (71.4%)   🟡 Health (79.8%)    🟡 Police (80.2%)
🔴 Justice (68.1%)    🔴 Human Svc (65.4%)

TOP 3 ALERTS:
🔴 Customer Service wait time: 28 min (target: 20) — Friday closure impact
🔴 Housing placement rate: 32% (target: 40%) — shelter capacity
🔴 Permit backlog: 342 apps (target: 200) — staffing gap

IMPROVING: 8 KPIs ↑  |  STABLE: 12 KPIs →  |  DECLINING: 5 KPIs ↓

Type /scorecard <dept> for department detail or /diagnose <dept> for full analysis.
```

---

## `/top-priorities`

Show the 5 worst-performing KPIs across all departments.

**Action:**
1. Score all available KPIs using `scripts/kpi_scorer.py`
2. Sort by attainment percentage (lowest first)
3. Show top 5 with department, gap, trend, and linked competency

**Output format:**
```
# Top 5 County-Wide Priorities

| Rank | KPI | Department | Attainment | Gap | Trend | Root KSAB Domain |
|------|-----|-----------|-----------|-----|-------|-----------------|
| 1 | Housing Placement Rate | Human Services | 58.5% | -22% | ↓ declining | Skill (case management) |
| 2 | Digital Self-Service Rate | Customer Service | 62.4% | -18% | ↑ improving | Behavior (staff promotion) |
| 3 | Permit Backlog | Permits | 58.5% | +142 apps | ↑ improving | Behavior (daily throughput) |
| 4 | Qless Wait Time | Customer Service | 71.4% | +8 min | ↓ declining | Process (Friday closure) |
| 5 | Diversion Completion | Justice Services | 72.0% | -8% | → flat | Skill (motivational interviewing) |

Type /diagnose <dept> for full analysis or /why-failing <kpi> for root cause.
```
