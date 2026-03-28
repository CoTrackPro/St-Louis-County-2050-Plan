# Scorecard Template — Department KPI Report

Use this template to generate a one-page department scorecard.
Fill in bracketed values. Status thresholds: 🟢 ≥90% of target,
🟡 75–89% of target, 🔴 <75% of target. For inverse KPIs (where
lower is better), flip the comparison.

---

## Output Format

```markdown
# [Department Name] — Performance Scorecard
**Reporting Period**: [Month Year] | **Prepared by**: [Name/Role]
**Last Updated**: [Date]

---

## KPI Summary

| # | KPI | Current | Target | Trend (vs. Prior) | Status |
|---|-----|---------|--------|-------------------|--------|
| 1 | [KPI Name] | [Value] [Unit] | [Target] [Unit] | [↑/↓/→] [%] | [🟢/🟡/🔴] |
| 2 | [KPI Name] | [Value] [Unit] | [Target] [Unit] | [↑/↓/→] [%] | [🟢/🟡/🔴] |
| 3 | [KPI Name] | [Value] [Unit] | [Target] [Unit] | [↑/↓/→] [%] | [🟢/🟡/🔴] |
| 4 | [KPI Name] | [Value] [Unit] | [Target] [Unit] | [↑/↓/→] [%] | [🟢/🟡/🔴] |
| 5 | [KPI Name] | [Value] [Unit] | [Target] [Unit] | [↑/↓/→] [%] | [🟢/🟡/🔴] |
| 6 | [KPI Name] | [Value] [Unit] | [Target] [Unit] | [↑/↓/→] [%] | [🟢/🟡/🔴] |

**Overall Score**: [X/6 Green] | **Trend**: [Improving / Stable / Declining]

---

## Trend Data (Last 6 Periods)

| KPI | P-6 | P-5 | P-4 | P-3 | P-2 | P-1 | Current |
|-----|-----|-----|-----|-----|-----|-----|---------|
| [KPI 1] | | | | | | | |
| [KPI 2] | | | | | | | |
| [KPI 3] | | | | | | | |

---

## Active Initiatives

| # | Initiative | Status | Impact | Owner | Due |
|---|-----------|--------|--------|-------|-----|
| 1 | [Initiative name] | [🟢 Complete / 🔵 In Progress / 🟡 Planning / 🔴 Blocked] | [High/Med/Low] | [Name/Team] | [Date] |
| 2 | [Initiative name] | [Status] | [Impact] | [Owner] | [Date] |
| 3 | [Initiative name] | [Status] | [Impact] | [Owner] | [Date] |

---

## Risks & Blockers

- **[Risk 1]**: [Description]. Mitigation: [Action].
- **[Risk 2]**: [Description]. Mitigation: [Action].

---

## Equity Check

| Metric | North County | South County | West County | Central |
|--------|-------------|-------------|-------------|---------|
| [Key KPI] | | | | |

Disparities >10% flagged: [Yes/No — detail if yes]

---

## Next Period Priorities

1. [Priority 1 — specific, measurable, with owner]
2. [Priority 2]
3. [Priority 3]
```

---

## Completion Instructions

1. Select 6–8 KPIs from `references/kpi-framework.md` for the target department.
2. Use real data if available; otherwise label values as `[ILLUSTRATIVE]`.
3. Calculate status using the thresholds above.
4. Pull initiative status from department work plans or project tracking.
5. Complete equity check using geographically disaggregated data where available.
6. Identify top 3 priorities for next reporting period.

## Output Formats

- **Markdown**: Default. Copy-paste ready.
- **React artifact**: Generate as a dashboard card component.
- **DOCX**: Use the docx skill to produce a formatted Word document.
- **PDF**: Use the pdf skill to produce a print-ready PDF.
