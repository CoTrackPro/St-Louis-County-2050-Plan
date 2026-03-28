# KSAB Gap Analysis Template

Use this template to assess Knowledge, Skill, Attitude, and Behavior gaps
within a department or role group, linked to underperforming KPIs.
Produces a diagnostic report with prioritized interventions.

Load `references/workforce-development.md` for competency definitions
and Section 5 for KPI-to-competency linkage.

---

## Output Format

```markdown
# KSAB Gap Analysis Report
**Department**: [Department Name]
**Role Group**: [e.g., Front-Line Staff / Supervisors / All]
**Triggering KPI(s)**: [KPI Name — current: X, target: Y]
**Assessment Date**: [Date]
**Analyst**: [Name/Role]

---

## 1. Performance Problem Statement

**KPI**: [Name]
**Current Value**: [X] [unit]
**Target**: [Y] [unit]
**Gap Duration**: [N periods below target]
**Constituent Impact**: [What residents experience as a result]

---

## 2. Linked Competencies

| # | Competency ID | Competency Description | KSAB Domain | Target Proficiency | Source |
|---|-------------|----------------------|-------------|-------------------|--------|
| 1 | [e.g., PL-S1] | [e.g., Plan review — residential and commercial] | [K/S/A/B] | [1–5] | KPI linkage table |
| 2 | | | | | |
| 3 | | | | | |
| 4 | | | | | |

---

## 3. Assessment Results

### Assessment Methods Used

| Method | Domain(s) Assessed | Sample Size | Date Conducted |
|--------|--------------------|-------------|----------------|
| [e.g., Knowledge test] | [K] | [N] | [Date] |
| [e.g., Supervisor observation] | [B] | [N] | [Date] |
| [e.g., 360° feedback survey] | [A, B] | [N] | [Date] |
| [e.g., System log analysis] | [B] | [N/A — automated] | [Date range] |

### Proficiency Ratings

| Competency ID | Domain | Target | Assessed Average | Gap Score | Distribution |
|--------------|--------|--------|-----------------|-----------|-------------|
| [ID] | K | [X] | [Y] | [+/-] | [e.g., "60% at 2, 30% at 3, 10% at 4"] |
| [ID] | S | [X] | [Y] | [+/-] | |
| [ID] | A | [X] | [Y] | [+/-] | |
| [ID] | B | [X] | [Y] | [+/-] | |

### Gap Severity Classification

| Gap Score | Count of Competencies | Priority |
|-----------|----------------------|----------|
| +3 or more (Critical) | [N] | Immediate action |
| +2 (High) | [N] | Structured intervention within 60 days |
| +1 (Medium) | [N] | Reinforcement / coaching |
| 0 or negative (Met/Exceeded) | [N] | Maintain / leverage as peer mentors |

---

## 4. Root Domain Diagnosis

For each underperforming KPI, identify the *primary* KSAB domain driving the gap.

### [KPI Name]

**Primary gap domain**: [K / S / A / B]

**Evidence**:
- [Statement with data supporting this diagnosis]
- [Statement]
- [Statement]

**Ruling out other domains**:
- **Knowledge**: [Met/Gap — evidence]
- **Skills**: [Met/Gap — evidence]
- **Attitudes**: [Met/Gap — evidence]
- **Behaviors**: [Met/Gap — evidence]

**Diagnosis narrative**:
> [2–3 sentences explaining why this domain is the root issue.
> Example: "Staff demonstrated strong knowledge of permit code requirements
> on the written assessment (avg 88%). However, supervisor observations
> showed only 45% consistently provide written rejection rationale with
> a fix path — suggesting a Behavior gap, not a Knowledge gap.
> Training on code knowledge would not address this; process redesign
> and feedback loops are needed."]

---

## 5. Gap Heat Map

Visual summary of where gaps are concentrated.

| Competency Area | Knowledge | Skills | Attitudes | Behaviors |
|----------------|-----------|--------|-----------|-----------|
| [Area 1, e.g., Customer Service] | [🟢/🟡/🔴] | [🟢/🟡/🔴] | [🟢/🟡/🔴] | [🟢/🟡/🔴] |
| [Area 2, e.g., Technical/Code] | [🟢/🟡/🔴] | [🟢/🟡/🔴] | [🟢/🟡/🔴] | [🟢/🟡/🔴] |
| [Area 3, e.g., Digital Systems] | [🟢/🟡/🔴] | [🟢/🟡/🔴] | [🟢/🟡/🔴] | [🟢/🟡/🔴] |
| [Area 4, e.g., Data/Reporting] | [🟢/🟡/🔴] | [🟢/🟡/🔴] | [🟢/🟡/🔴] | [🟢/🟡/🔴] |
| [Area 5, e.g., Equity/Access] | [🟢/🟡/🔴] | [🟢/🟡/🔴] | [🟢/🟡/🔴] | [🟢/🟡/🔴] |

**Legend**: 🟢 = Gap ≤1 (on target) | 🟡 = Gap 2 (needs attention) | 🔴 = Gap ≥3 (critical)

---

## 6. Recommended Interventions

Prioritized by gap severity and KPI impact. Each intervention is matched
to the correct KSAB domain.

| Priority | Competency Gap | Domain | Intervention | Modality | Audience | Duration | Est. Cost | Expected KPI Impact | Timeline |
|----------|---------------|--------|-------------|----------|----------|----------|-----------|-------------------|----------|
| 1 | [ID: Description] | [K/S/A/B] | [Specific action] | [From modality guide] | [Who] | [Hours/days] | [$X] | [KPI +X%] | [Date] |
| 2 | | | | | | | | | |
| 3 | | | | | | | | | |
| 4 | | | | | | | | | |
| 5 | | | | | | | | | |

### Anti-Patterns to Avoid

- ❌ **Prescribing classroom training for a Behavior gap** — they already know how; fix the process/accountability
- ❌ **Mandatory "attitude training"** — creates resentment; use leadership modeling and recognition instead
- ❌ **One-size-fits-all training** — segment by proficiency level; advanced staff need different development than foundational
- ❌ **Training without measurement** — every intervention must have a Level 3 (behavior change) or Level 4 (KPI impact) checkpoint

---

## 7. Measurement Plan

| Kirkpatrick Level | What to Measure | Method | When | Owner |
|-------------------|----------------|--------|------|-------|
| Level 1 — Reaction | Participant satisfaction with training | Post-training survey | Immediately after | Training coordinator |
| Level 2 — Learning | Knowledge/skill gain | Pre/post test or skills demo | Day of training | Facilitator |
| Level 3 — Behavior | On-the-job behavior change | Supervisor observation, system data | 30/60/90 days post | Supervisor |
| Level 4 — Results | KPI improvement | KPI data comparison (pre vs post cohort) | 90 days post | Department analyst |

**Baseline snapshot** (record before interventions begin):
- KPI value: [X] as of [date]
- Competency gap score: [X] as of [date]
- Related operational metrics: [list]

---

## 8. Risks & Dependencies

| Risk | Impact | Mitigation |
|------|--------|------------|
| Staff pulled for training → service coverage gap | Medium | Stagger training across shifts; use eLearning for K-domain gaps |
| Supervisors not reinforcing new behaviors | High | Include supervisor coaching module; add behavior metrics to supervisor scorecard |
| Union agreement limits cross-training | Medium | Engage labor relations early; frame as professional development opportunity |
| Budget not approved for external training | Medium | Prioritize internal modalities (OJT, mentoring, job aids) |

---

## 9. Executive Summary

> [3–5 sentence summary for department head or County Executive.
> Format: The KPI is underperforming because of [domain] gaps in [competency areas].
> Assessment of [N] staff found [key finding]. We recommend [top interventions]
> at an estimated cost of [$X], with KPI improvement expected within [timeline].]
```

---

## Completion Instructions

1. Start with the underperforming KPI — not with "we need training."
2. Use Section 5 of `references/workforce-development.md` to map KPI → competencies.
3. Assess using at least 2 methods (see Section 4 assessment methods).
4. Diagnose the primary KSAB domain — this determines intervention type.
5. Select interventions from Section 6 of the workforce-development reference, matched to domain.
6. Build measurement plan before launching interventions.
7. All illustrative data must be labeled `[ILLUSTRATIVE]`.
