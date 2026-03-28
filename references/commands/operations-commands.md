# Journey, Data & Implementation Commands

---

## Journey Commands

### `/journey <type>`

Show a constituent journey map with departments, touchpoints, and end-to-end KPIs.

**Aliases**: `/journey building`, `/journey reentry`, `/journey senior`

**Available journey types:**
| Type | Name | Departments |
|------|------|------------|
| `building` | Homeowner Building Project | Planning → Permits → Revenue |
| `new-resident` | New Resident Setup | Revenue → Elections → Parks |
| `tax` | Property Tax Lifecycle | Revenue → Customer Service |
| `reentry` | Justice-Involved Reentry | Justice → Records → Human Svc → Health |
| `senior` | Senior Services Navigation | Revenue → Human Svc → Parks → Health |
| `business` | Small Business Startup | Planning → Permits → Health → Revenue |
| `crisis` | Crisis to Stability (Homelessness) | Human Svc → Health → Justice → Records |

**Action:**
1. Load `references/constituent-journeys.md` — relevant journey section only
2. Display journey stages, departments touched, end-to-end KPIs
3. Identify likely handoff failure points
4. Show KSAB connections (why the journey breaks)
5. Recommend improvements

**If user just says `/journey`**, show available types and ask which one.

### `/handoffs`

Show the 6 cross-department handoff failure patterns with diagnosis guidance.

**Action:**
1. Load `references/constituent-journeys.md` Section 10
2. Display pattern library: Referral Black Hole, Repeat Explainer, Eligibility Maze,
   Scheduling Collision, Data Deadend, Ownership Vacuum
3. For each, show: symptom → root cause → fix
4. Ask user which pattern they're seeing

### `/journey-score`

Score journey data using the journey scorer script. Requires JSON input.

**Action:**
1. If user provides journey touchpoint data, run `python scripts/run.py journey --input <data>`
2. Calculate: total days, touchpoints, handoff success rate, drop-off rate
3. Compare to journey targets
4. Flag handoff failures by pattern type
5. If user doesn't have data, show the expected input format and offer to build illustrative data

---

## Data Commands

### `/audit`

Run data quality audit on KPI measurement data.

**Aliases**: `/audit`, `/data-quality`, `/data-check`

**Action (with data file):**
1. Run `python scripts/run.py audit --input <file>`
2. Checks: completeness, staleness, outliers, duplicates, range
3. Output: audit report with severity ratings and recommendations

**Action (SQL mode):**
1. Run `python scripts/run.py audit --sql`
2. Output: PostgreSQL audit queries ready to run against KPI database

**Action (no data):**
Show what the audit checks for and what data format is needed.

### `/sources <department>`

Show real data sources for a department's KPIs.

**Aliases**: `/sources permits`, `/data-sources revenue`, `/where-data`

**Action:**
1. Load `references/data-sources.md` Section 5 (KPI-to-Source Mapping)
2. Filter to the requested department
3. Show: KPI → primary source → secondary source → access level → automation potential
4. Include API endpoints and URLs where available
5. Note access requirements (public vs. internal vs. state)

**If user says `/sources` with no department**, show the county open data portal
overview and top public data sources.

---

## Implementation Commands

### `/rollout`

Show the phased implementation plan for launching a KPI program.

**Aliases**: `/rollout`, `/implement`, `/launch-plan`

**Action:**
1. Load `references/change-management.md` Section 4
2. Display 3-phase plan:
   - Phase 0: Foundation (months 1–2) — executive sponsorship, data audit, pilot selection
   - Phase 1: Pilot (months 3–5) — 2 departments, first scorecards, Stat meetings
   - Phase 2: Expansion (months 6–12) — add departments, training, public dashboard
   - Phase 3: Institutionalization (year 2+) — budget integration, certification
3. Include success criteria for each phase
4. Warn about common failure modes

### `/pilot`

Guide pilot department selection.

**Aliases**: `/pilot`, `/pilot-selection`, `/where-to-start`

**Action:**
1. Load `references/change-management.md` Section 6
2. Walk through selection criteria: leadership willingness, data readiness,
   visibility, improvement potential, staff capacity, union risk
3. Score each department (or let user score)
4. Recommend "easy win + meaningful challenge" combination
5. Default recommendation: Parks + Permits (or Revenue + Customer Service)

### `/stakeholders`

Generate stakeholder map and engagement strategy.

**Aliases**: `/stakeholders`, `/who`, `/politics`

**Action:**
1. Load `references/change-management.md` Section 2
2. Display power/interest matrix for all stakeholder groups
3. Identify champions vs. skeptics
4. Provide engagement strategy per stakeholder
5. Include "what to say and what NOT to say" guidance

### `/legal`

Quick reference for Missouri legal constraints on KPI programs.

**Aliases**: `/legal`, `/law`, `/sunshine`, `/missouri`

**Action:**
1. Load `references/missouri-legal-context.md` Section 11 (quick reference table)
2. Display: constraint → impact → mitigation for each law
3. If user asks about a specific law (Sunshine, Hancock, civil service),
   load the relevant detailed section

### `/qless`

Qless virtual queue analytics and optimization.

**Aliases**: `/qless`, `/queue`, `/wait-times`

**Action:**
1. Load Qless-related KPIs from `references/kpi-framework.md` Section 7
2. Show current operational context: Mon–Thu only, 3 locations, West County closed
3. Display analytics available from Qless API:
   - Wait time by time of day, day of week, location
   - Service time by transaction type
   - No-show rate
   - Peak demand patterns
   - Staff throughput
4. Recommend optimization strategies from `references/improvement-playbook.md` Section 2:
   - Appointment scheduling
   - Time slot nudges
   - Cross-training
   - Pre-screening checklists
5. Calculate impact projections for Friday closure

**Output includes:**
```
## Qless Impact Analysis — Friday Closure

Pre-closure weekly capacity: 5 days × 7.5 hrs × 3 locations = 112.5 service hours
Post-closure weekly capacity: 4 days × 7.5 hrs × 3 locations = 90 service hours
Capacity reduction: -20%

If demand is constant:
- Expected wait time increase: +25% (from 20 min → 25 min)
- Expected staff utilization: 85% → 106% (UNSUSTAINABLE without intervention)

Required interventions to maintain 20-min wait target:
1. Shift 15% of transactions to digital self-service (saves 13.5 hrs/week)
2. Add appointment scheduling for complex transactions (reduces walk-in randomness)
3. Extend Thu hours to 5:00pm at one location (adds 4.5 hrs/week)
```
