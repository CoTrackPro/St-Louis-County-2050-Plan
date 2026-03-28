# Workforce & Training Commands

## `/gaps <department>`

Run KSAB gap analysis for a department.

**Aliases**: `/gaps permits`, `/ksab permits`, `/competency permits`

**Action:**
1. Load `references/workforce-development.md` Section 3 for department competency map
2. If user provides assessment data, use it
3. If not, prompt: "Do you have proficiency ratings, or should I generate illustrative gaps based on your KPI data?"
4. Run `python scripts/run.py gaps --input <data> --department <dept>`
5. Output: gap scores, heat map, domain-matched interventions, anti-pattern warnings

**Key behavior:** Always diagnose the KSAB domain BEFORE recommending interventions.
Never default to "training" — it only fixes K and S gaps. A and B gaps need
different approaches (see anti-pattern warnings in script output).

---

## `/train <department>`

Generate training needs assessment for a department.

**Aliases**: `/train permits`, `/tna permits`, `/training-plan permits`

**Action:**
1. Load `templates/training-needs-assessment-template.md`
2. Load `references/workforce-development.md` Section 6 (modality guide)
3. If KSAB gap data available (from `/gaps`), use it to populate needs
4. If KPI scorecard available (from `/score`), link training needs to underperforming KPIs
5. Include mandatory compliance training inventory
6. Produce tiered plan (Tier 1 critical / Tier 2 important / Tier 3 developmental)
7. Include budget estimate and Kirkpatrick evaluation framework

**Output:** Complete TNA document per template. If producing as a file, use docx skill.

---

## `/onboard <role> <department>`

Generate a 90-day onboarding plan for a new employee.

**Aliases**: `/onboard "Customer Service Rep" customer`, `/90-day plan reviewer permits`

**Action:**
1. Run `python scripts/run.py onboard --role "<role>" --department <dept> --start-date <next_monday>`
2. Auto-detects matching role curriculum (CSR, plan reviewer, tax agent) or uses generic
3. Outputs: week-by-week plan with KSAB tags, compliance deadlines, assessment checkpoints, success criteria

**Supported roles with pre-built curricula:**
- Customer Service Rep / CSR → `customer_service`
- Plan Reviewer / Permit Reviewer → `plan_reviewer`
- Tax Agent / Revenue Agent → `tax_agent`
- Any other role → generic template with department competency map

**If user just says `/onboard`**, ask for role and department.

---

## `/idp`

Generate an individual development plan template.

**Aliases**: `/idp`, `/development-plan`, `/growth-plan`

**Action:**
1. Load `templates/individual-development-plan-template.md`
2. If department and role context available, pre-populate competency profile from `references/workforce-development.md`
3. Guide user through: current assessment → goals → activities → timeline → check-ins
4. Link goals to department KPIs where possible

**Key behavior:** IDPs are collaborative (employee + supervisor), not top-down.
Frame as development opportunity, not remediation. If this is for performance
improvement (not just growth), note that civil service procedures may apply —
see `references/missouri-legal-context.md` Section 4.

---

## `/succession <department>`

Assess succession risk for critical roles in a department.

**Aliases**: `/succession revenue`, `/knowledge-risk permits`, `/retirement-risk`

**Action:**
1. Load `references/workforce-development.md` Section 9 (Succession & Knowledge Transfer)
2. Walk through the Risk Assessment Matrix:
   - Retirement eligibility (<3 years = high risk)
   - Role criticality
   - Replacement difficulty
   - Knowledge documentation status
3. Score each critical role (4–20 scale)
4. For high-risk roles (15+), recommend immediate knowledge transfer methods:
   - Documentation sprint
   - Paired assignments
   - Video capture
   - Cross-training rotation
   - Decision log

**Output format:**
```
# Succession Risk Assessment — Revenue Department

| Role | Incumbent | Retire Eligible | Criticality | Replaceability | Documentation | Risk Score | Priority |
|------|-----------|----------------|-------------|---------------|--------------|-----------|----------|
| Senior Assessor | [Name] | <2 years | 5 | 5 | 1 (tribal knowledge) | 19/20 | ⛔ CRITICAL |
| Tax Systems Admin | [Name] | 3–5 years | 4 | 4 | 2 | 14/20 | 🟡 MEDIUM |

## Immediate Actions for Critical Roles:
1. Schedule documentation sprint with Senior Assessor + facilitator (2 weeks)
2. Assign junior assessor as paired backup starting next month
3. Begin video capture of complex commercial valuations
```

---

## `/why-failing <kpi>`

(Defined in kpi-commands.md — cross-referenced here because workforce users will look for it.)

Diagnose the root KSAB domain for an underperforming KPI. Always distinguish
whether the problem is Knowledge, Skill, Attitude, or Behavior before
recommending interventions.
