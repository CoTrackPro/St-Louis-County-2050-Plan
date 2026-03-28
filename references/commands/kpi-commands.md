# KPI & Scoring Commands

## `/score <department>`

Score a department's KPIs: status (🟢🟡🔴), gap-to-target, trend, composite.

**Aliases**: `/score permits`, `/score revenue`, `/score parks`

**Action:**
1. Load KPI definitions from `references/kpi-framework.md` for the department
2. If user provides real data, use it. If not, use illustrative values and label them `[ILLUSTRATIVE]`.
3. Run `python scripts/run.py score --input <data> --department <dept>`
4. Output scored table + composite + top priority

**If user just says `/score` with no department**, ask which department or offer `/status` for county-wide.

**If user provides data inline** (e.g., "our processing time is 14 days, online rate is 55%"), parse values and construct JSON input for the scorer script.

---

## `/scorecard <department>`

Generate a full one-page department scorecard with KPIs, initiatives, equity check, and priorities.

**Aliases**: `/scorecard permits`, `/card permits`

**Action:**
1. Run `/score <department>` first to get scored KPIs
2. Run `python scripts/run.py pipeline --input <scored> --department <dept>`
3. If user wants HTML: use `--format html`
4. If user wants Word doc: use the docx skill with `templates/scorecard-template.md`
5. Include initiatives section (ask user or use illustrative)
6. Include equity check if geographic data available

**Quick version** (no data provided):
Generate illustrative scorecard using sample data. Label all values `[ILLUSTRATIVE]`.

---

## `/benchmark <department>`

Compare department KPIs to national peers (ICMA, NRPA, CALEA, etc.).

**Aliases**: `/benchmark permits`, `/bench permits`, `/peers permits`

**Action:**
1. Run `python scripts/run.py benchmark --actuals <data>`
2. Auto-loads `assets/benchmark-data.csv`
3. Shows percentile positioning, gap to median, gap to best-in-class
4. Highlights bottom-quartile KPIs as priorities
5. Cites benchmark source for each comparison

**If user has no actuals**, use illustrative values for the department and label them.

**If user asks "what benchmarks are available?"**:
Run `python scripts/run.py benchmark --list-kpis` to show all 38 available benchmarks.

---

## `/trend <department> <kpi>`

Show a KPI's trend over time with sparkline visualization.

**Aliases**: `/trend permits processing`, `/trend revenue collection`

**Action:**
1. If user has time-series data, visualize it
2. If not, generate illustrative 12-month trend
3. Include: current value, target, trend direction, sparkline, notable events
4. If the Visualizer tool is available, render as an inline chart
5. Otherwise, use text sparkline (▁▂▃▄▅▆▇█)

**Output format:**
```
## Avg Permit Processing Time — 12-Month Trend

Target: 10 days | Current: 12.3 days | Trend: ↓ 8.2% (improving)

▁▂▃▅▇█▇▅▃▃▂▂  12-month sparkline

| Month | Value | Status | Event |
|-------|-------|--------|-------|
| Apr 25 | 15.1 | 🔴 | — |
| May 25 | 14.2 | 🔴 | New reviewer hired |
| ...
| Mar 26 | 12.3 | 🟡 | Digital portal v2 launched |

Forecast (if trend continues): Target reached by Jul 2026
```

---

## `/alerts`

Show all KPIs currently in 🔴 or 🟡 status across the county.

**Aliases**: `/alerts`, `/red`, `/warnings`

**Action:**
1. Score all available KPIs
2. Filter to 🔴 and 🟡 status
3. Sort by severity (🔴 first) then by attainment (worst first)
4. Show department, KPI, current value, target, gap, consecutive periods below target

**Output format:**
```
# Active Alerts — St. Louis County

## 🔴 Critical (below 75% of target)

| Department | KPI | Current | Target | Gap | Consecutive Periods |
|-----------|-----|---------|--------|-----|-------------------|
| Customer Service | Qless Wait Time | 28 min | 20 min | +8 min | 3 |
| Human Services | Housing Placement | 32% | 40% | -8% | 4 |

## 🟡 Warning (75–89% of target)

| Department | KPI | Current | Target | Gap | Consecutive Periods |
|-----------|-----|---------|--------|-----|-------------------|
| Permits | Avg Processing Time | 12.3 days | 10 days | +2.3 days | 6 |
| Permits | Online Submission | 67% | 85% | -18% | — |

Total: 2 critical, 4 warning across 8 departments
Type /diagnose <dept> for root cause analysis.
```

---

## `/why-failing <kpi>`

Diagnose the root KSAB domain for an underperforming KPI.

**Aliases**: `/why permits_avg_processing`, `/root-cause processing time`

**Action:**
1. Load `references/workforce-development.md` Section 5 (KPI-to-Competency Linkage)
2. Find the KPI in the linkage table
3. Identify linked competency IDs and KSAB domains
4. Walk through the diagnostic sequence:
   - Is it Knowledge? (Do staff know the standard?)
   - Is it Skill? (Can they execute when tested?)
   - Is it Attitude? (Do they believe it matters?)
   - Is it Behavior? (Do they do it consistently?)
5. Recommend domain-appropriate intervention (NOT "more training" for everything)

**Output format:**
```
# Why Is Permit Processing Time Underperforming?

**KPI**: Avg Processing Time | Current: 12.3 days | Target: 10 days

## Linked Competencies
- PL-S1: Plan review speed (Skill)
- PL-B1: Consistent daily throughput (Behavior)

## Diagnostic Walkthrough

1. ❓ Knowledge gap? Staff know the code and procedures.
   → Evidence: Knowledge test avg 88%. NOT a knowledge problem.

2. ❓ Skill gap? Can they review plans efficiently?
   → Evidence: Senior reviewers average 7 days. Junior reviewers average 16 days.
   → LIKELY SKILL GAP for junior staff.

3. ❓ Attitude gap? Do they see speed as important?
   → Evidence: Staff report feeling "thoroughness > speed" pressure.
   → POSSIBLE ATTITUDE FACTOR.

4. ❓ Behavior gap? Do they complete reviews consistently?
   → Evidence: System logs show 40% of reviews sit untouched for 3+ days before starting.
   → LIKELY BEHAVIOR GAP — work not started promptly.

## Root Diagnosis
**Primary**: Behavior (PL-B1) — reviews not started promptly
**Secondary**: Skill (PL-S1) — junior reviewers need coached practice

## Recommended Interventions
- ⚠️ Do NOT send staff to more code training — they already know the code
- ✅ Process redesign: FIFO queue with visible aging dashboard
- ✅ Coached practice for junior reviewers (shadow → supervised → solo)
- ✅ Daily standup: each reviewer states what they'll complete today

Type /gaps permits for full KSAB assessment or /train permits for training plan.
```
