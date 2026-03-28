# Constituent Journey Maps — Cross-Department Service Paths

Residents don't experience government by department. They experience
journeys that cross multiple departments, with handoffs, waits, and
potential drop-offs at each stage. This reference defines the highest-volume
cross-department journeys, maps the touchpoints, identifies handoff
failure points, and establishes end-to-end KPIs that no single department
scorecard captures.

---

## Table of Contents

1. [Why Journey Maps Matter for KPIs](#1-why-journey-maps-matter)
2. [Journey 1: Homeowner Building Project](#2-journey-1-homeowner-building-project)
3. [Journey 2: New Resident Establishing Services](#3-journey-2-new-resident-establishing-services)
4. [Journey 3: Property Tax Lifecycle](#4-journey-3-property-tax-lifecycle)
5. [Journey 4: Justice-Involved Reentry](#5-journey-4-justice-involved-reentry)
6. [Journey 5: Senior Services Navigation](#6-journey-5-senior-services-navigation)
7. [Journey 6: Small Business Startup](#7-journey-6-small-business-startup)
8. [Journey 7: Crisis to Stability (Homelessness)](#8-journey-7-crisis-to-stability)
9. [Cross-Journey KPI Dashboard](#9-cross-journey-kpi-dashboard)
10. [Handoff Failure Pattern Library](#10-handoff-failure-pattern-library)

---

## 1. Why Journey Maps Matter

Department KPIs create perverse incentives when the real problem is handoffs.
Example: Permits may hit their 10-day processing target, but if the applicant
waited 15 days to get a zoning pre-check from Planning first, the *resident's*
experience is 25 days — and no department owns that number.

**Journey KPIs measure what the resident experiences, not what the department reports.**

### Journey KPI Principles
- Measure total elapsed time from first contact to resolution
- Count total touchpoints (visits, calls, forms, portals)
- Track drop-off rate at each handoff
- Identify which handoff has the highest failure rate
- Assign cross-department ownership (usually County Executive or a designated coordinator)

---

## 2. Journey 1: Homeowner Building Project

**Persona**: Homeowner adding a deck, finishing a basement, or building an addition.
**Volume**: ~5,000–8,000 residential permits/year (estimated)

### Journey Stages

```
Stage 1              Stage 2              Stage 3              Stage 4              Stage 5
RESEARCH             PRE-CHECK            APPLICATION          REVIEW &             INSPECTION &
                                                               APPROVAL             CLOSE-OUT
───────────────── ── ───────────────── ── ───────────────── ── ───────────────── ── ─────────────────
County website       Planning & Zoning    Permits portal       Plan review          Schedule inspection
Requirements page    Zoning verification  Submit application   Code compliance      Pass/fail/re-inspect
Fee schedule         Setback/easement     Upload plans         Fee payment          Certificate of
Contractor lookup    Variance needed?     Pay fees             Approval/revision      occupancy (if req'd)
                                                                                    Close permit
```

### Departments Touched
Planning & Zoning → Permits & Licensing → (Public Works if driveway/ROW) → Revenue (fees)

### Touchpoints & Pain Points

| Stage | Department | Channel | Avg Time | Pain Point |
|-------|-----------|---------|----------|------------|
| Research | Website / Customer Svc | Web / Phone | 1–3 days | Requirements unclear; residents don't know to check zoning first |
| Pre-check | Planning & Zoning | Walk-in / Phone | 3–10 days | No appointment system; may require site visit; applicant doesn't know zoning constraints |
| Application | Permits | Online / Walk-in | 1 day (if complete) | Incomplete applications (missing plans, wrong forms) → rejection → restart |
| Review | Permits | Internal | 5–15 days | Reviewer backlog; code questions bounced between reviewers; no status updates to applicant |
| Inspection | Permits | Scheduled | 1–5 days per inspection | Scheduling availability; failed inspections require rework and re-scheduling |

### End-to-End Journey KPIs

| KPI | Definition | Target | Current [ILLUSTRATIVE] |
|-----|-----------|--------|----------------------|
| Total elapsed time (research → close-out) | Calendar days from first contact to permit close | ≤30 days (simple residential) | 45–60 days |
| Total touchpoints | Number of separate interactions (visits, calls, portal sessions) | ≤5 | 8–12 |
| First-attempt submission success rate | % of applications accepted without return for revision | 80% | 55% |
| Zoning-to-permit handoff time | Days between zoning clearance and permit application | ≤3 days | 10 days (applicant delay from confusion) |
| Drop-off rate | % of residents who start but never complete the process | <15% | 25% |
| Resident satisfaction (end-to-end) | Post-completion survey | 4.0/5.0 | 3.2/5.0 |

### KSAB Connection
- **K gap**: Residents don't know to check zoning first → need better web guidance, pre-application checklist
- **S gap**: Staff can't cross-reference zoning and permit requirements in a single interaction → cross-training needed (CS-K1)
- **B gap**: No one proactively contacts applicants with incomplete submissions → requires process redesign (PL-B2)

### Improvement Opportunities
1. **Single intake portal**: Unified online application that auto-checks zoning, routes to correct reviewer, and provides real-time status
2. **Pre-application checklist**: Interactive web tool that walks homeowners through requirements before they apply
3. **Automatic notifications**: SMS/email at each stage transition (submitted → in review → approved → inspection scheduled)
4. **Cross-trained intake staff**: Customer Service staff who can answer basic zoning + permit questions in one call (reduces referral loops)

---

## 3. Journey 2: New Resident Establishing Services

**Persona**: Person or family who just moved to St. Louis County.
**Volume**: ~30,000 household moves/year (estimated from Census mobility data)

### Journey Stages

```
Stage 1              Stage 2              Stage 3              Stage 4
PROPERTY SETUP       CIVIC REGISTRATION   SERVICES ACCESS      COMMUNITY
                                                               ENGAGEMENT
───────────────── ── ───────────────── ── ───────────────── ── ─────────────────
Property tax         Voter registration   Trash/recycling      Parks & rec programs
  account setup      (Board of Elections)   (municipality or    Library card
Personal property    Vehicle registration   county contract)   Community events
  declaration        (state DMV, but       Utility setup        School enrollment
Address update         county often         Pet licensing         (DESE — separate)
  with county          asked about)        
```

### Departments Touched
Revenue → Elections → Customer Service → Parks → (Animal Services if pet owner)

### End-to-End Journey KPIs

| KPI | Definition | Target |
|-----|-----------|--------|
| Days to full county service enrollment | Calendar days from move-in to all applicable county accounts active | ≤14 days |
| Touchpoints to complete setup | Number of separate contacts needed | ≤3 (ideally 1 portal) |
| New resident awareness of services | % of new movers who register for ≥2 county services within 90 days | 60% |
| Voter registration within 90 days of move | % of new residents registered at new address | 75% |

### Improvement Opportunities
1. **New Resident Welcome Portal**: Single online form that triggers property tax account, voter registration update, parks program info, and pet licensing — all from one submission
2. **Welcome packet (digital + physical)**: Mailed to new property owners within 30 days of deed transfer with county services overview, online portal link, and key deadlines
3. **Qless "new resident" appointment type**: Dedicated service window for new residents to handle multiple departments in one visit

---

## 4. Journey 3: Property Tax Lifecycle

**Persona**: Property owner going through the annual tax cycle.
**Volume**: ~400,000 parcels in St. Louis County

### Journey Stages

```
Stage 1              Stage 2              Stage 3              Stage 4              Stage 5
ASSESSMENT           REVIEW               DECLARATION          BILLING &            RESOLUTION
                                                               PAYMENT
───────────────── ── ───────────────── ── ───────────────── ── ───────────────── ── ─────────────────
County assesses      Owner reviews        Personal property    Tax bill issued      Payment processed
  property value       assessment notice    declaration due     (Nov–Dec)           Receipt/confirmation
  (odd years)        Appeal window          (Mar 1 deadline)   Payment channels:    Delinquency process
                       (Board of           Online/mail/         - Online portal      (if unpaid)
                       Equalization)         walk-in             - Mail             Senior Freeze
                     Senior Freeze                              - Walk-in             application
                       application                              - Installment        (if eligible)
```

### Departments Touched
Revenue (Assessment) → Revenue (Collections) → Customer Service (support) → (Courts if appeal escalated)

### End-to-End Journey KPIs

| KPI | Definition | Target |
|-----|-----------|--------|
| Assessment-to-payment cycle clarity | % of owners who understand their bill without calling | 80% |
| Appeal resolution time | Days from appeal filing to Board of Equalization decision | ≤60 days |
| Online payment completion rate | % of online payment attempts successfully completed (no errors/abandonment) | 95% |
| Senior Freeze application-to-approval time | Days from application receipt to approval/denial notice | ≤30 days |
| Tax season call volume reduction YoY | % change in Revenue call volume during Nov–Feb | -10%/year |

### KSAB Connection
- **K gap**: Many residents don't understand assessment methodology → better communication materials, not more staff (Content, not training)
- **B gap**: Phone staff don't consistently promote online payment during calls → RT-B2 behavior gap, requires nudge design and supervisor monitoring

---

## 5. Journey 4: Justice-Involved Reentry

**Persona**: Person completing incarceration or probation, returning to community.
**Volume**: ~3,000–5,000 individuals/year re-entering STL County (estimated)

### Journey Stages

```
Stage 1              Stage 2              Stage 3              Stage 4              Stage 5
PRE-RELEASE          IMMEDIATE            STABILIZATION        INTEGRATION          SELF-SUFFICIENCY
PLANNING             NEEDS (0–72 hrs)     (1–12 weeks)         (3–12 months)
───────────────── ── ───────────────── ── ───────────────── ── ───────────────── ── ─────────────────
Discharge planning   ID documents         Housing placement    Employment           Close supervision
  (corrections)      (Vital Records)      Behavioral health    Education/training   Diversion completion
Risk assessment      Emergency shelter    Substance abuse tx   Family reunification Expungement
  (Justice Svc)      (Human Services)     Probation reporting  Community ties         eligibility
Benefits screening   Transportation       Benefits enrollment  Civic participation  Record clearing
                     Food access          Parenting support                           (if eligible)
```

### Departments Touched
Justice Services → Vital Records → Human Services → Public Health → (Customer Service for general navigation)

### End-to-End Journey KPIs

| KPI | Definition | Target |
|-----|-----------|--------|
| ID document acquisition time | Days from release to having valid state ID | ≤14 days |
| Housing placement within 90 days | % placed in stable housing within 90 days of release | 50% |
| Benefits enrollment within 30 days | % enrolled in eligible benefits within 30 days | 70% |
| Supervision compliance at 6 months | % meeting all supervision conditions at 6-month mark | 80% |
| 1-year recidivism rate | % re-arrested within 12 months | <30% (declining trend) |
| Total service touchpoints (first 90 days) | Number of separate appointments/contacts across all departments | Track only (baseline needed) |
| Warm handoff rate | % of cross-department referrals where receiving department confirms contact within 48 hours | 85% |

### KSAB Connection
- **K gap**: Justice Services staff may not know full Human Services resource landscape → JS/HS cross-training (HS-K2)
- **A gap**: Some staff may hold biases about justice-involved individuals → equity/inclusion development (Section 10 of workforce-development.md)
- **B gap**: Referrals sent by email but no follow-up confirmation → warm handoff protocol needed (process/behavior)

### Improvement Opportunities
1. **Reentry navigator role**: Single point of contact who coordinates across departments for first 90 days
2. **Vital Records priority processing**: Expedited birth certificate for individuals within 30 days of release
3. **Shared case management platform**: Justice Services and Human Services see same case file (data sharing agreement required)
4. **Expungement pipeline**: Connect to expunge-skill for eligible individuals — clear record to reduce employment barriers

---

## 6. Journey 5: Senior Services Navigation

**Persona**: Resident age 65+ or their adult children seeking county services.
**Volume**: ~150,000 residents age 65+ in STL County (Census estimate)

### Journey Stages

```
Stage 1              Stage 2              Stage 3              Stage 4
AWARENESS            ENROLLMENT           ONGOING ACCESS       CRISIS /
                                                               TRANSITION
───────────────── ── ───────────────── ── ───────────────── ── ─────────────────
Senior Tax Freeze    Benefits enrollment  Parks & rec programs  Emergency services
Homestead exemption  Aging services       Transportation       Nursing home
Medicare info          registration         assistance           transition
  (federal, but     Home modification    Meal programs         Elder abuse
  county asked)       referral            Social engagement       reporting
Property tax         Caregiver support    Health screenings     End-of-life
  payment help                                                    planning referral
```

### Departments Touched
Revenue (Tax Freeze) → Human Services (Aging) → Parks (senior programs) → Public Health (screenings) → Customer Service

### End-to-End Journey KPIs

| KPI | Definition | Target |
|-----|-----------|--------|
| Senior service awareness rate | % of 65+ residents aware of ≥3 county senior programs | 50% |
| Senior Tax Freeze uptake | % of eligible seniors who apply | 70% |
| Multi-service enrollment | % of seniors using 2+ county programs | 40% |
| Time from first contact to full enrollment | Days from initial inquiry to enrolled in applicable services | ≤21 days |
| Caregiver support referral completion | % of caregiver inquiries that result in service connection | 75% |

### Improvement Opportunities
1. **Senior Services Hotline**: Dedicated phone line with trained navigators who know all senior programs across departments
2. **Annual senior benefits checkup**: Proactive outreach to all 65+ property owners — "Are you getting everything you're eligible for?"
3. **Simplified Tax Freeze application**: Pre-populate from property records; allow online submission

---

## 7. Journey 6: Small Business Startup

**Persona**: Entrepreneur starting a business in unincorporated St. Louis County.
**Volume**: ~2,000–3,000 new business registrations/year (estimated)

### Journey Stages

```
Stage 1              Stage 2              Stage 3              Stage 4
RESEARCH &           LICENSING &          BUILD-OUT &          ONGOING
PLANNING             REGISTRATION         PERMITTING           COMPLIANCE
───────────────── ── ───────────────── ── ───────────────── ── ─────────────────
Zoning verification  Business license     Building permit      Personal property
County requirements  Occupancy permit     Health inspection       declaration
Small business       Signage permit         (if food service)  Tax payments
  counseling (SBA)   Sales tax setup      Fire inspection      License renewal
                       (state)            Certificate of       Health re-inspection
                                            occupancy
```

### Departments Touched
Planning & Zoning → Permits & Licensing → Public Health (food) → Revenue → Customer Service

### End-to-End Journey KPIs

| KPI | Definition | Target |
|-----|-----------|--------|
| Total startup time (concept to open) | Calendar days from first county contact to certificate of occupancy | ≤90 days (simple retail) |
| Total government interactions | Number of separate contacts across all departments | ≤8 |
| Business survival at 1 year | % of newly licensed businesses still active after 12 months | Track only |
| Small business satisfaction | Post-opening survey | 4.0/5.0 |

---

## 8. Journey 7: Crisis to Stability (Homelessness)

**Persona**: Individual or family experiencing homelessness.
**Volume**: ~1,500 individuals in STL County homeless system at any point (HMIS estimate)

### Journey Stages

```
Stage 1              Stage 2              Stage 3              Stage 4              Stage 5
CRISIS               ASSESSMENT           SHELTER /            HOUSING              STABILITY
                                          TRANSITIONAL         PLACEMENT
───────────────── ── ───────────────── ── ───────────────── ── ───────────────── ── ─────────────────
Street outreach      Coordinated entry    Emergency shelter    Rapid rehousing      Employment support
211 call             VI-SPDAT assessment  Transitional housing Permanent supportive Case management
Police encounter     Benefits screening   Behavioral health      housing              close-out
Hospital discharge   ID document needs    Substance abuse tx   Lease signing        Community connection
                     Mainstream benefits  Medical care         Furniture/supplies   Follow-up (12 mo)
                       enrollment         Job readiness        Benefits transfer
```

### Departments Touched
Human Services → Public Health → Justice Services (if involved) → Vital Records (ID) → Customer Service

### End-to-End Journey KPIs

| KPI | Definition | Target |
|-----|-----------|--------|
| Time from first contact to assessment | Days from initial system contact to completed VI-SPDAT | ≤3 days |
| Time from assessment to housing offer | Days from assessment to housing placement offer | ≤60 days (rapid rehousing) |
| Housing placement rate (90 days) | % placed in permanent housing within 90 days of shelter entry | 40% |
| Returns to homelessness (12 months) | % returning to homeless system within 12 months of placement | <15% |
| Warm handoff rate (cross-department) | % of referrals with confirmed receiving-end contact within 48 hours | 85% |
| Benefits enrollment completeness | % of eligible benefits actually enrolled at housing placement | 80% |

---

## 9. Cross-Journey KPI Dashboard

Summary view for County Executive or Council — how are residents experiencing
government across major life events?

| Journey | Total Time (Current) | Total Time (Target) | Touchpoints (Current) | Touchpoints (Target) | Drop-Off Rate | Satisfaction |
|---------|---------------------|--------------------|-----------------------|---------------------|--------------|-------------|
| Building project | [ILLUSTRATIVE] 50 days | 30 days | 10 | 5 | 25% | 3.2/5.0 |
| New resident setup | 30 days | 14 days | 6 | 3 | N/A | 3.5/5.0 |
| Property tax lifecycle | 120 days (cycle) | 90 days | 4 | 2 | N/A | 3.6/5.0 |
| Reentry | 180 days (to stable) | 120 days | 15+ | 10 | 40% | N/A |
| Senior services | 45 days | 21 days | 5 | 2 | 30% | 3.8/5.0 |
| Small business | 120 days | 90 days | 12 | 8 | 35% | 3.0/5.0 |
| Crisis to stability | 180 days | 120 days | 20+ | 12 | High | N/A |

**Note**: All values marked [ILLUSTRATIVE] — real measurement requires cross-department
data integration and journey tracking implementation.

---

## 10. Handoff Failure Pattern Library

Common failure modes at department boundaries. Use this to diagnose
cross-department KPI problems.

### Pattern 1: The Referral Black Hole
**Symptom**: Department A refers constituent to Department B, but no one
confirms arrival or follows up.
**Root cause**: No shared tracking system; referral is verbal or email with
no confirmation loop.
**Fix**: Warm handoff protocol — referring department stays on the line/in the
interaction until receiving department acknowledges. Shared CRM with referral
tracking.

### Pattern 2: The Repeat Explainer
**Symptom**: Constituent must re-explain their situation at every department.
**Root cause**: No shared case record or interaction history across departments.
**Fix**: Unified CRM or constituent profile accessible across departments.
At minimum, referral form captures context so constituent doesn't start from zero.

### Pattern 3: The Eligibility Maze
**Symptom**: Constituent is sent to 3+ departments before finding the right one.
**Root cause**: Front-line staff don't know eligibility criteria for programs
outside their department. Customer Service knowledge gap (CS-K1).
**Fix**: Decision-tree triage tool for Customer Service staff. Cross-department
eligibility reference guide. Regular cross-training sessions.

### Pattern 4: The Scheduling Collision
**Symptom**: Constituent needs sequential department visits but can't align schedules
within the Mon–Thu 8am–3:30pm window, especially post-Friday-closure.
**Root cause**: No coordinated scheduling across departments.
**Fix**: Multi-department appointment booking. "One-stop" days where related
departments co-locate. Or: handle earlier stages digitally so walk-in visits
are only needed once.

### Pattern 5: The Data Deadend
**Symptom**: Department B needs information that Department A has but can't share
due to system silos or policy barriers.
**Root cause**: Separate systems with no data sharing agreement.
**Fix**: Data sharing MOUs between departments for constituent-consented data.
API integrations between core systems. Minimum viable: secure shared spreadsheet
for active cases.

### Pattern 6: The Ownership Vacuum
**Symptom**: A cross-department problem exists but no single department head is
accountable for the end-to-end outcome.
**Root cause**: KPIs are department-scoped only.
**Fix**: Assign journey owners at the County Executive level. Cross-department
KPIs reported in council briefings with named accountability.
