# Demand Forecasting & Seasonal Staffing — St. Louis County

Predictive models for service demand, seasonal staffing, and capacity
planning. Turns reactive staffing into proactive resource allocation.

---

## Seasonal Demand Patterns

### Revenue & Taxation
```
Jan ████████████████████  Peak (property tax deadline carryover, personal property inquiries)
Feb ██████████████        High (personal property declaration deadline approaching Mar 1)
Mar ████████████████      High (declaration deadline, assessment notices)
Apr ██████████            Moderate
May ████████              Normal
Jun ████████              Normal
Jul ████████████          Moderate (assessment appeal window — odd years)
Aug ██████████            Moderate (appeal hearings)
Sep ████████              Normal
Oct ████████              Normal
Nov ████████████████████  Peak (tax bills mailed, payment inquiries begin)
Dec ████████████████████████ Peak (payment deadline Dec 31)
```

**Staffing formula (Revenue phone lines)**:
```
Required_staff = (Hourly_call_volume × Avg_handle_time_min) / (60 × Target_utilization)

Peak months (Nov-Feb): multiply baseline staff × 1.5
Normal months: baseline staff
Consider: 15% of calls can be deflected to online with promotion scripts
```

### Permits & Licensing
```
Jan ██████████            Moderate (contractors planning spring projects)
Feb ██████████            Moderate
Mar ████████████████      High (spring construction season begins)
Apr ████████████████████  Peak
May ████████████████████  Peak
Jun ████████████████████  Peak
Jul ████████████████      High
Aug ████████████████      High
Sep ████████████          Moderate
Oct ██████████            Moderate (season winding down)
Nov ████████              Low
Dec ██████                Low
```

**Staffing formula (plan reviewers)**:
```
Required_reviewers = Monthly_applications / (Working_days × Reviews_per_reviewer_per_day)
Reviews_per_day varies: simple residential = 3-4, complex = 1-2, commercial = 0.5-1
Peak season: add 1-2 temporary reviewers or authorize overtime
```

### Parks & Recreation
```
Jan ██████████            Moderate (indoor programs)
Feb ██████████            Moderate (spring registration opens)
Mar ████████████████      High (registration surge)
Apr ████████████████      High
May ████████████████████  Peak (outdoor season + events)
Jun ████████████████████████ Peak (summer camps + programs)
Jul ████████████████████████ Peak
Aug ████████████████████  High (camps winding down)
Sep ████████████████      High (fall programs)
Oct ████████████          Moderate
Nov ████████              Low
Dec ██████████            Moderate (holiday events)
```

### Elections
```
Demand is event-driven, not seasonal:
- Presidential election year: EXTREME surge Aug-Nov
- Midterm year: High surge Sep-Nov
- Municipal election year: Moderate surge Mar-Apr
- Off-cycle: Minimal
```

**Staffing formula (elections)**:
```
Poll_workers_needed = Polling_locations × Workers_per_location × (1 + No_show_buffer_pct)
Typical: 5-8 workers per location, 15% no-show buffer
Start recruitment 6 months before major elections
```

### Customer Service (Qless / Walk-In)
```
Weekly pattern (post-Friday-closure):
Mon ████████████████████  Peak (Monday rush + weekend backlog)
Tue ████████████████      High
Wed ██████████████        Moderate
Thu ████████████████      High (last day of week effect)
Fri [CLOSED]

Daily pattern:
8:00-9:00  ████████████████████  Peak (opening rush)
9:00-10:00 ████████████████      High
10:00-11:00 ██████████████       Moderate
11:00-12:00 ████████████         Moderate
12:00-1:00  ██████████           Low (lunch)
1:00-2:00   ████████████████     High (afternoon rush)
2:00-3:00   ██████████████       Moderate
3:00-3:30   ████████████████     High (last-chance rush)
```

**Key insight**: Post-Friday-closure, Monday volume increased ~30%.
The lowest-demand period is Wednesday 10am-12pm — best time for staff
training, cross-training, and meetings.

---

## Capacity Planning Formulas

### Erlang C Calculator
The `scripts/capacity_calculator.py` implements the full M/M/c queueing
model. Key inputs:

```
λ (lambda) = arrival rate per hour
μ (mu) = service rate per server per hour = 60 / avg_service_time_minutes
c = number of servers (staff)
ρ (rho) = utilization = λ / (c × μ)
```

**Critical thresholds**:
- ρ < 70%: Healthy capacity margin
- ρ 70-85%: Elevated — plan for growth
- ρ 85-95%: Critical — wait times escalate exponentially
- ρ ≥ 100%: Overloaded — queue grows without bound

### Friday Closure Impact Formula
```
Pre-closure daily demand = Weekly_demand / 5
Post-closure daily demand = Weekly_demand / 4 = Pre-closure × 1.25

If pre-closure utilization was 80%:
Post-closure utilization = 80% × 1.25 = 100% → OVERLOADED

To maintain pre-closure wait times with 4-day week:
Required_staff = Current_staff × 1.25
OR
Required_digital_deflection = 20% of demand shifted online
```

### Staffing Cost Model
```
Annual_staff_cost = FTE × (Salary + Benefits_multiplier)
Benefits_multiplier: typically 1.35-1.45 for government (health, pension, FICA)

Cost_per_walk_in_transaction = Staff_cost_per_hour × Avg_service_time_min / 60
Cost_per_phone_transaction = Staff_cost_per_hour × Avg_handle_time_min / 60
Cost_per_online_transaction ≈ $0.50-$2.00 (system cost, near-zero marginal staff cost)

ROI_of_digital_shift:
  Annual_savings = Transactions_shifted × (Walk_in_cost - Online_cost)
  Example: 10,000 transactions × ($18 - $1.50) = $165,000/year
```

---

## Scenario Planning Templates

### Scenario 1: "What if online adoption reaches 80%?"
```
Current state: 67% online, 33% walk-in/phone
Target state: 80% online, 20% walk-in/phone
Demand reduction at service counters: (33% - 20%) / 33% = 39% fewer walk-ins

Impact:
- Qless wait time: -40% (fewer arrivals = lower utilization)
- Staff reallocation: 2 FTE could shift to backlog reduction or quality improvement
- Cost savings: ~$200K annually (13% of demand × avg transaction cost)
```

### Scenario 2: "What if we lose 3 experienced staff to retirement?"
```
Impact depends on knowledge concentration:
- If 3 staff are generalists: hire replacements, 60-day ramp (use onboarding curriculum)
- If 3 staff are specialists (e.g., commercial plan reviewers):
  - Processing time for their specialty: +50-100% during vacancy
  - Knowledge transfer must begin 6+ months before departure
  - Cross-training backup staff NOW (see succession planning)
  - Consider contractor reviewers for interim capacity
```

### Scenario 3: "What if we add Saturday hours at one location?"
```
Saturday hours (e.g., 9am-1pm at Clayton):
- Additional capacity: 4 hours × staff count
- Expected demand: ~60% of a normal weekday (based on peer jurisdictions)
- Staffing: Requires overtime or flex scheduling — check union agreement
- Cost: Staff overtime + facility operating cost
- Benefit: Serves residents who can't visit Mon-Thu
- Equity impact: Disproportionately benefits working families and hourly workers

Break-even: If Saturday hours reduce Mon-Thu peak demand by 15%,
the Monday wait time improvement alone may justify the cost.
```

---

## Early Warning Indicators

Don't wait for KPIs to go red. Watch these leading indicators:

| Leading Indicator | What It Predicts | Threshold | Action |
|-------------------|-----------------|-----------|--------|
| Application volume (3-month trend) | Future processing backlog | +20% vs. prior year | Add temp reviewer or authorize OT |
| Staff vacancy rate | Service capacity decline | >10% in any department | Expedite hiring; cross-train backups |
| Qless no-show rate | Queue system not working | >15% | Check notification delivery; simplify joining process |
| Online portal error rate | Digital adoption stalling | >5% of transactions fail | IT fix + usability testing |
| Training completion rate declining | Future competency gaps | <80% completion | Protect training time; address supervisor barriers |
| Constituent complaints trending up | CSAT about to drop | +25% vs. 3-month avg | Root cause analysis; process review |
| Retirement eligibility within 12 months | Knowledge loss coming | Any critical role | Activate succession plan immediately |
