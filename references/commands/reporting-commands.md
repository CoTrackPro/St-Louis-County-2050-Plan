# Reporting & Diagnostic Commands

## `/diagnose <department>`

Full diagnostic pipeline: score → benchmark → KSAB gaps → scorecard.
The most comprehensive single command.

**Aliases**: `/diagnose permits`, `/full-analysis permits`, `/deep-dive permits`

**Action:**
1. Run `python scripts/run.py diagnose --department <dept>`
2. Pipeline executes:
   - Step 1: Score all department KPIs
   - Step 2: Compare to national benchmarks
   - Step 3: Run KSAB gap analysis
   - Step 4: Render scorecard (markdown + HTML)
3. Present results in sequence with narrative connecting the pieces
4. End with "Top 3 recommended actions" synthesis

**If user provides data files**, pass them to the pipeline.
**If no data**, use sample data and label `[ILLUSTRATIVE]`.

**Key output:** The narrative synthesis at the end should connect the dots:
"Your processing time is 🟡 because PL-B1 (consistent throughput) is a behavior
gap — staff know the code but aren't starting reviews promptly. This places you
at the 40th percentile nationally. Recommended: visual queue management + daily
standups, not more training."

---

## `/briefing`

Generate a council briefing — 2-page executive summary for County Executive or Council.

**Aliases**: `/briefing`, `/council`, `/executive-summary`

**Action:**
1. Load `templates/council-briefing-template.md`
2. If department scorecards exist, pull summary data from each
3. If not, generate illustrative briefing and label it
4. Include: headline metric, department summary table, wins, areas requiring
   attention, recommended actions with fiscal impact, constituent feedback snapshot

**Output options:**
- Markdown (default)
- Word document (use docx skill)
- PDF (use pdf skill)

**Tone:** Plain language, no jargon. Lead with outcomes for residents.
Never release raw numbers without narrative context.

---

## `/district <N>`

Generate a district-level scorecard for a specific council member.

**Aliases**: `/district 1`, `/district 3`, `/council-district 5`

**Action:**
1. Identify which geographic zones the district covers (north/south/west/central)
2. Filter KPI data by geographic disaggregation where available
3. Compare district performance to county average
4. Highlight disparities >10%
5. Include location-specific data (which government centers serve this district)

**Output format:**
```
# District [N] Performance Report
**Council Member**: [Name]
**Geographic Area**: [Description]
**Government Centers**: [Locations serving this district]

## District vs. County Average

| KPI | District [N] | County Avg | Disparity | Status |
|-----|-------------|-----------|-----------|--------|
| Qless Wait Time | 32 min | 25 min | +28% ⚠️ | 🔴 |
| Permit Processing | 11 days | 12.3 days | -11% | 🟢 |

## District-Specific Priorities
1. [Priority based on district data]
2. [Priority]
3. [Priority]

## Constituent Feedback — District [N]
- CSAT: [X]/5.0 (county avg: [Y]/5.0)
- Top concern: [Theme]
```

**Note:** This requires geographically disaggregated data. If unavailable,
note which KPIs can't be disaggregated and recommend data collection to enable
district-level reporting.

---

## `/export <department>`

Export KPI data as CSV or JSON for open data portal or external analysis.

**Aliases**: `/export permits csv`, `/export all json`, `/data-dump`

**Action:**
1. Generate data conforming to `schemas/kpi-data-model.json`
2. If real data available, export it
3. If not, export schema with example rows
4. Include data dictionary and metadata

**Output formats:**
- CSV (default): one row per KPI per period
- JSON: structured per data model
- Both: CSV data + JSON metadata

---

## `/crisis`

Activate crisis/surge protocol. Use when a KPI goes 🔴 for 3+ periods,
during natural disaster, or when a department faces emergency conditions.

**Aliases**: `/crisis`, `/surge`, `/emergency`

**Action:**
1. Identify the crisis type:
   - **KPI crisis**: 3+ consecutive periods in 🔴 status
   - **Demand surge**: Volume spike >50% above normal (snow storm, tax deadline, election)
   - **Capacity crisis**: Vacancy rate >15% or key staff sudden departure
   - **External crisis**: Pandemic, natural disaster, political emergency
2. Load appropriate protocol
3. Generate response plan with immediate (24hr), short-term (1 week), and recovery (30 day) actions

**Output format:**
```
# Crisis Protocol Activated
**Type**: [KPI Crisis / Demand Surge / Capacity Crisis / External]
**Department**: [Department]
**Trigger**: [What triggered the crisis]

## Immediate Actions (next 24 hours)
- [ ] [Action 1 with owner]
- [ ] [Action 2]
- [ ] [Action 3]

## Short-Term Stabilization (next 7 days)
- [ ] [Action with owner and deadline]

## Recovery Plan (next 30 days)
- [ ] [Action]

## Communication
- Staff: [What to tell team]
- Council: [What to brief]
- Public: [What to communicate]

## Exit Criteria
- [What metrics must reach before exiting crisis mode]
```

**KPI Crisis Escalation Ladder:**
1. 🟡 for 2+ periods → Department head notified, action plan required
2. 🔴 for 1 period → County Executive briefed, improvement initiative launched
3. 🔴 for 3+ periods → Crisis protocol activated, cross-department support mobilized
4. 🔴 for 6+ periods → Council notification, budget/staffing intervention considered
