# Fork Guide — Adapting This Skill to Your County

This skill was built for St. Louis County, Missouri, but the architecture
is universal. Any US county can fork this repo and customize it for their
jurisdiction. Here's what to change and what to keep.

---

## What's Universal (Keep As-Is)

These components work for any county government without modification:

| Component | Why It's Universal |
|-----------|-------------------|
| KSAB framework (workforce-development.md Sections 1, 2, 4, 6) | Knowledge/Skills/Attitudes/Behaviors model applies everywhere |
| Improvement playbook (improvement-playbook.md) | Lean, queueing theory, digital transformation are jurisdiction-agnostic |
| Change management playbook (change-management.md) | Political dynamics, union navigation, resistance patterns are universal |
| Template structures (all templates/) | Scorecard, action plan, briefing, IDP, TNA formats work anywhere |
| All Python scripts (scripts/*.py) | Scoring, gap analysis, capacity planning math is universal |
| Case studies (case-studies.md) | National examples apply everywhere |
| Onboarding sequencing logic (onboarding-curriculum.md Sections 1, 5, 6, 7) | KSAB dependency chain applies to any role |
| KPI-to-competency linkage methodology | The diagnostic approach works regardless of specific KPIs |

## What to Customize (Fork These)

### Step 1: Department Structure (30 minutes)

**Files to edit:**
- `SKILL.md` — Department Index table
- `assets/department-catalog.csv` — Department names, locations, phones
- `references/government-operations.md` — County overview, locations, hours

**What to change:**
1. Replace St. Louis County departments with your departments
2. Update population, area, median income statistics
3. Update service locations and hours
4. Update phone numbers and URLs

### Step 2: KPI Definitions (2–4 hours)

**Files to edit:**
- `references/kpi-framework.md` — All KPI definitions

**What to change:**
1. Review each KPI — most apply to any county (permits, taxes, parks, police)
2. Adjust targets based on your county's current performance and peer group
3. Add or remove KPIs based on your department structure
4. Update data source references to your specific systems

**What to keep:**
- The KPI definition format (definition, data source, frequency, target, equity note)
- The department-section organization
- Target-setting methodology (benchmark-informed, not arbitrary)

### Step 3: Benchmarks (1 hour)

**Files to edit:**
- `assets/benchmark-data.csv` — National benchmark data

**What to change:**
1. Update `peer_group` to match your county's population tier:
   - Under 100K: "Counties <100K"
   - 100K–250K: "Counties 100K-250K"
   - 250K–500K: "Counties 250K-500K"
   - 500K–1M: "Counties 500K-1M" (current)
   - Over 1M: "Counties >1M"
2. Update benchmark values if you have access to ICMA data for your tier
3. Add benchmarks for departments unique to your county

### Step 4: Legal Context (1–2 hours)

**Files to edit:**
- `references/missouri-legal-context.md` → rename to your state

**What to change:**
1. Replace Missouri Sunshine Law with your state's open records law
2. Replace Hancock Amendment with your state's tax/revenue limitations
3. Update civil service rules to your county's merit system
4. Replace POST Commission with your state's police training requirements
5. Update procurement code reference
6. Update budget cycle (fiscal year, approval process)

### Step 5: Service Delivery Content (2–4 hours)

**Files to edit:**
- `references/employee-toolkit.md` — Phone numbers, URLs, routing
- `references/resident-service-guides.md` — Life-event guides, FAQ, contacts

**What to change:**
1. All phone numbers and URLs
2. Service locations and hours
3. "Not us" redirects (state vs. county vs. municipal split varies by state)
4. Specific program names and eligibility criteria
5. FAQ answers (top 25 will vary by jurisdiction)

### Step 6: Competency Maps (1–2 hours)

**Files to edit:**
- `references/workforce-development.md` Section 3 — Department-specific competencies

**What to change:**
1. Adjust competency IDs to match your departments
2. Modify target proficiency levels based on your workforce maturity
3. Add competencies unique to your departments
4. Remove any that don't apply

### Step 7: Data Sources (1–2 hours)

**Files to edit:**
- `references/data-sources.md` — APIs, portals, systems

**What to change:**
1. County open data portal URL and API
2. State data sources (health dept, secretary of state, courts)
3. Internal system names (ERP, permit system, etc.)
4. Census FIPS codes for your county

### Step 8: Branding (15 minutes)

**Files to edit:**
- `scripts/dashboard-spec.md` — Color palette
- `scripts/dashboard_generator.py` — Title, department data
- `scripts/service_finder_generator.py` — Service data, phones, URLs
- `README.md` — County name, description

---

## Checklist

- [ ] Fork the repo
- [ ] Update SKILL.md description with your county name
- [ ] Replace department-catalog.csv
- [ ] Update government-operations.md with your county stats
- [ ] Review and adjust KPI definitions (kpi-framework.md)
- [ ] Update benchmark-data.csv peer group
- [ ] Replace missouri-legal-context.md with your state
- [ ] Update all phone numbers and URLs
- [ ] Update employee-toolkit.md routing and scripts
- [ ] Update resident-service-guides.md life-event guides
- [ ] Adjust competency maps for your departments
- [ ] Update data-sources.md for your systems
- [ ] Run `bash scripts/demo.sh` to validate
- [ ] Update README.md with your county name and details

**Estimated total time**: 8–16 hours for a complete customization.
