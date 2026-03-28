# District Scorecard Template — Council Member Geographic View

Use this template when a council member wants to see their district's
performance compared to the county average. Requires geographically
disaggregated KPI data.

---

## Output Format

```markdown
# District [N] — Performance Report
**Council Member**: [Name]
**Period**: [Month/Quarter Year]
**Geographic Area**: [Description — e.g., "North County: Florissant, Hazelwood, Berkeley, Jennings"]
**Government Centers Serving District**: [Location(s) — note closures]

---

## District vs. County Comparison

| KPI | District [N] | County Avg | Disparity | Direction | Status |
|-----|-------------|-----------|-----------|-----------|--------|
| Qless Wait Time (nearest center) | [X] min | [Y] min | [+/-Z%] | [⚠️ if >10%] | [🟢🟡🔴] |
| Permit Processing Time | [X] days | [Y] days | [+/-Z%] | | |
| Parks Program Fill Rate | [X]% | [Y]% | [+/-Z%] | | |
| Police P1 Response Time | [X] min | [Y] min | [+/-Z%] | | |
| Road Condition (PCI) | [X] | [Y] | [+/-Z%] | | |
| Restaurant Inspection Cycle | [X] days | [Y] days | [+/-Z%] | | |

**Disparities >10%**: [Count] KPIs show significant geographic disparity.

---

## District Demographics (Census ACS)

| Metric | District [N] | County Avg |
|--------|-------------|-----------|
| Population | [X] | 979,595 |
| Median Household Income | $[X] | $67,432 |
| Home Ownership Rate | [X]% | 69% |
| Population 65+ | [X]% | [Y]% |
| Residents Below Poverty | [X]% | [Y]% |

---

## Service Access — District [N]

| Service | Nearest Location | Distance | Hours | Status |
|---------|-----------------|----------|-------|--------|
| Government Center | [Location] | [X] mi | Mon–Thu 8am–3:30pm | [Open/Closed] |
| Parks (closest 3) | [Park 1, Park 2, Park 3] | [X] mi | [Varies] | |
| Police Precinct | [Precinct] | [X] mi | 24/7 | |
| Library (county) | [Branch] | [X] mi | [Hours] | |

**Access note**: [Flag if West County closure or Friday closure disproportionately
affects this district. E.g., "West County closure requires District 3 residents
to travel to South County or Clayton — adding 15+ minutes."]

---

## District-Specific Priorities

Based on performance data and district demographics:

1. **[Priority 1]**: [Description with data — e.g., "Qless wait times at NW Crossings
   are 35% higher than county average, affecting [X] residents who can no longer
   access West County center."]
2. **[Priority 2]**: [Description]
3. **[Priority 3]**: [Description]

---

## Constituent Feedback — District [N]

| Metric | District [N] | County Avg |
|--------|-------------|-----------|
| CSAT Score | [X]/5.0 | [Y]/5.0 |
| Top compliment theme | [Theme] | |
| Top complaint theme | [Theme] | |
| Feedback volume (period) | [N] | [N] |

---

## Recommended Actions for Council Consideration

| # | Action | Fiscal Impact | Timeline | Council Role |
|---|--------|-------------|----------|-------------|
| 1 | [Action] | [$X] | [Date] | [Awareness / Approval / Advocacy] |
| 2 | [Action] | [$X] | [Date] | |

---

## Methodology

- KPIs disaggregated by [geographic method: zip code, precinct, facility service area]
- Disparities flagged at >10% deviation from county average
- Demographic data from Census ACS [year] (FIPS 29-189)
- Service access distances are approximate (road distance to nearest facility)
- [ILLUSTRATIVE] values are estimates pending data system integration
```

---

## District Map Reference

St. Louis County has 7 council districts. For geographic disaggregation,
map districts to these approximate zones:

| District | Approximate Area | Zone | Government Center |
|----------|-----------------|------|-------------------|
| 1 | Northwest County | North | NW Crossings |
| 2 | North-Central County | North | NW Crossings or Clayton |
| 3 | West County | West | ~~West County~~ (CLOSED) → Clayton or South |
| 4 | Central County / Clayton | Central | Clayton HQ |
| 5 | Mid-County | Central | Clayton HQ |
| 6 | South County | South | South County Center |
| 7 | Southwest County | South/West | South County Center |

**West County closure impact**: District 3 residents lost their nearest
government center. Monitor wait times at Clayton and South County for
displaced demand. This is a high-visibility equity issue for the District 3
council member.

## Completion Instructions

1. Identify the council district number and mapped geographic zone(s).
2. Filter KPI data by geographic disaggregation where available.
3. Pull district demographics from Census ACS (use Census API with tract-level data).
4. Calculate disparity percentages vs. county average.
5. Flag disparities >10% — these are the actionable findings.
6. Frame priorities around what the council member can influence:
   budget votes, ordinances, constituent outreach.
7. Label all illustrative data as `[ILLUSTRATIVE]`.
