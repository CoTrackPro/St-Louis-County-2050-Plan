# Data Sources & Connectors — St. Louis County KPIs

Maps every KPI domain to its actual or likely data source, including
public data portals, state databases, federal systems, and internal
county systems. Provides URLs, API endpoints, data formats, refresh
frequencies, and extraction strategies.

---

## Table of Contents

1. [County Open Data & Internal Systems](#1-county-open-data--internal-systems)
2. [Missouri State Data Sources](#2-missouri-state-data-sources)
3. [Federal Data Sources](#3-federal-data-sources)
4. [Third-Party / National Benchmarking](#4-third-party--national-benchmarking)
5. [KPI-to-Source Mapping](#5-kpi-to-source-mapping)
6. [Data Quality Audit Checklist](#6-data-quality-audit-checklist)
7. [Data Integration Architecture](#7-data-integration-architecture)

---

## 1. County Open Data & Internal Systems

### 1.1 St. Louis County Open Data Portal
- **URL**: https://data.stlouisco.com (Socrata-based)
- **API**: Socrata Open Data API (SODA) — RESTful, JSON/CSV output
- **Auth**: Public datasets require no auth; some datasets may need app token for rate limits
- **Key datasets**:
  - Property assessment and tax records
  - Crime incident reports (mapped)
  - Election results and voter registration
  - GIS layers (parcels, zoning, boundaries)
  - Budget documents
  - Council meeting records
- **Refresh**: Varies by dataset — some daily, some annual
- **Extraction**: `GET https://data.stlouisco.com/resource/{dataset-id}.json?$limit=50000`

### 1.2 St. Louis County Real Estate Search
- **URL**: https://revenue.stlouisco.com/IAS/
- **Data**: Property records, assessment values, ownership, tax payment history
- **Format**: Web interface — no public API. Scraping possible but check ToS.
- **KPIs fed**: Assessment error rate (appeal patterns), collection rate (payment status)

### 1.3 Qless Queue Management
- **System**: Qless (cloud-based virtual queue platform)
- **API**: Qless REST API (requires county admin credentials)
- **Data available**: Wait times, service times, no-show rates, queue volume by time/location, staff throughput
- **Refresh**: Real-time
- **KPIs fed**: Customer wait time, service time, channel distribution, peak demand patterns
- **Note**: Rich data source — likely the most granular operational data available. Push for API access.

### 1.4 County Financial / ERP System
- **System**: Likely Tyler Technologies (Munis) or similar municipal ERP
- **Data**: Budget, expenditures, revenue, payroll, purchasing
- **Access**: Internal only — requires IT coordination
- **KPIs fed**: Permit revenue, cost-per-transaction, training budget, FTE counts

### 1.5 Permit Management System
- **System**: Likely Accela, Tyler EnerGov, or similar
- **Data**: Application dates, status transitions, review timestamps, inspector assignments, fee collection
- **Access**: Internal — may have public-facing portal with limited data
- **KPIs fed**: Processing time, first-pass rate, backlog, online submission rate, inspection completion
- **Extraction strategy**: Most permit systems have reporting modules with CSV export. Push for scheduled exports to data warehouse.

### 1.6 County HR / Payroll System
- **System**: Likely part of ERP or standalone (ADP, Workday, or Tyler)
- **Data**: Headcount, vacancies, hire dates, separation dates, training records, compensation
- **Access**: Internal — HR department controls access
- **KPIs fed**: Vacancy rate, time to fill, turnover, training hours, FTE counts
- **Privacy**: PII-sensitive — aggregate reporting only for KPI purposes

### 1.7 County Website Analytics
- **System**: Likely Google Analytics 4 or similar
- **Data**: Page views, session duration, online form completions, portal logins, search terms
- **KPIs fed**: Digital self-service rate, online adoption rates, constituent digital behavior

---

## 2. Missouri State Data Sources

### 2.1 Missouri Secretary of State — Elections
- **URL**: https://www.sos.mo.gov/elections
- **Data**: Certified election results, voter registration statistics, candidate filings
- **Format**: PDF reports, some CSV downloads
- **Refresh**: Per election cycle
- **KPIs fed**: Voter registration rate, turnout

### 2.2 Missouri Highway Patrol — Crime Statistics
- **URL**: https://www.mshp.dps.missouri.gov/HP71/SearchActivity
- **Data**: UCR/NIBRS crime data by jurisdiction
- **Format**: Web interface, PDF reports
- **KPIs fed**: Case clearance rate, crime trends
- **Also**: Missouri Uniform Crime Reporting Program annual reports

### 2.3 Missouri Department of Health and Senior Services (DHSS)
- **URL**: https://health.mo.gov/data/
- **Data portals**:
  - ShowMeVax (immunization registry) — restricted access
  - Missouri Information for Community Assessment (MICA): https://healthapps.dhss.mo.gov/MoPhims/MICATopic
  - Vital statistics (birth/death aggregate data)
  - Restaurant inspection results (some jurisdictions)
- **KPIs fed**: Immunization coverage, WIC participation, health outcomes

### 2.4 Missouri Department of Social Services
- **URL**: https://dss.mo.gov/
- **Data**: SNAP/TANF enrollment by county, child welfare statistics
- **KPIs fed**: Human Services context, benefit application volumes

### 2.5 Missouri Office of Administration — Budget
- **URL**: https://oa.mo.gov/budget-planning
- **Data**: State budget documents, county revenue sharing data
- **KPIs fed**: Budget context, state funding levels

### 2.6 Missouri Department of Corrections
- **URL**: https://doc.mo.gov/
- **Data**: Reentry statistics, probation/parole data by circuit
- **KPIs fed**: Recidivism context, justice services coordination

### 2.7 Missouri Court System (courts.mo.gov)
- **URL**: https://www.courts.mo.gov/casenet/
- **Data**: Case filings, dispositions, case type volumes (CaseNet — public access)
- **KPIs fed**: Justice Services caseload, diversion referral rates

---

## 3. Federal Data Sources

### 3.1 U.S. Census Bureau — American Community Survey
- **URL**: https://data.census.gov
- **API**: Census Data API — `https://api.census.gov/data/{year}/acs/acs5?get={variables}&for=county:189&in=state:29`
- **FIPS**: St. Louis County, MO = State 29, County 189
- **Data**: Population, demographics, income, housing, commuting, poverty, disability
- **Refresh**: Annual (1-year and 5-year estimates)
- **KPIs fed**: Denominators for per-capita KPIs, equity disaggregation, service demand estimation
- **Key tables**: B01001 (age/sex), B02001 (race), B19013 (median income), B25003 (tenure)

### 3.2 HUD — IDIS and HMIS
- **IDIS**: Integrated Disbursement and Information System — CDBG reporting
  - URL: https://idis.hud.gov
  - Access: County Human Services staff (grantee access)
  - KPIs fed: CDBG expenditure timeliness
- **HMIS**: Homeless Management Information System
  - URL: Varies by Continuum of Care (MO-600 for STL area)
  - KPIs fed: Housing placement rate, length of homelessness, returns to homelessness

### 3.3 FBI — Uniform Crime Reporting (UCR) / NIBRS
- **URL**: https://crime-data-explorer.fr.cloud.gov/
- **API**: UCR API — `https://api.usa.gov/crime/fbi/cde/`
- **Data**: Crime data by agency (ORI code for STL County PD)
- **KPIs fed**: Case clearance rate, crime volume, peer comparison

### 3.4 EPA — Environmental Data
- **URL**: https://www.epa.gov/enviro/
- **Data**: Facility inspections, environmental compliance, air/water quality
- **KPIs fed**: Environmental health complaint context

### 3.5 Bureau of Labor Statistics
- **URL**: https://www.bls.gov/
- **API**: BLS Public Data API — `https://api.bls.gov/publicAPI/v2/timeseries/data/`
- **Data**: Local area unemployment, employment by sector, wage data
- **KPIs fed**: Workforce context, government wage competitiveness

### 3.6 FEMA — Disaster/Emergency Data
- **URL**: https://www.fema.gov/api/open
- **Data**: Disaster declarations, public assistance grants
- **KPIs fed**: Crisis protocol triggers, emergency context

### 3.7 Department of Justice — RECA
- **URL**: https://www.justice.gov/civil/common/reca
- **Data**: RECA claim status, eligible areas (relevant to STL County nuclear contamination history)
- **KPIs fed**: Human Services RECA claim processing (currently highlighted on county website)
- **Note**: RECA reauthorized — county should track claims assisted and processed

---

## 4. Third-Party / National Benchmarking

### 4.1 ICMA — Center for Performance Analytics
- **URL**: https://icma.org/performance-analytics
- **Access**: Membership-based; annual benchmarking survey
- **Data**: Peer performance data for 200+ local government KPIs
- **Cost**: Varies by jurisdiction size
- **Peer selection**: Counties 500K–1M population, Midwest region

### 4.2 National Recreation and Park Association (NRPA)
- **URL**: https://www.nrpa.org/publications-research/ParkMetrics/
- **Data**: Park Metrics benchmarking — acres, spending, revenue recovery, FTE
- **Access**: Free participation; results available to participants

### 4.3 Best Friends Animal Society
- **URL**: https://bestfriends.org/no-kill-2025/animal-shelter-statistics
- **Data**: Shelter statistics by community — intake, outcomes, live release
- **Access**: Public aggregate data; detailed data available to shelters

### 4.4 GFOA — Government Finance Officers Association
- **URL**: https://www.gfoa.org/
- **Data**: Best practices, Distinguished Budget Presentation Award criteria
- **Access**: Membership

### 4.5 CALEA — Commission on Accreditation for Law Enforcement
- **URL**: https://www.calea.org/
- **Data**: Accreditation standards and peer benchmarks
- **Access**: Accreditation program participation

### 4.6 What Works Cities / Bloomberg Philanthropies
- **URL**: https://whatworkscities.bloomberg.org/
- **Data**: Certification framework, peer practices, case studies
- **Access**: Free certification program

### 4.7 NIGP — National Institute of Governmental Purchasing
- **URL**: https://www.nigp.org/
- **Data**: Procurement benchmarks, cycle time, bid response
- **Access**: Membership

### 4.8 ATD — Association for Talent Development
- **URL**: https://www.td.org/
- **Data**: Training investment benchmarks (hours, spending, ROI) — State of the Industry report
- **Access**: Annual report (paid)

---

## 5. KPI-to-Source Mapping

Quick reference: where does the data for each KPI actually come from?

| KPI Domain | Primary Source | Secondary Source | Access Level | Automation Potential |
|-----------|---------------|-----------------|-------------|---------------------|
| Permit processing time | Permit management system | Manual log | Internal | High — system timestamps |
| Online submission rate | Permit system + web analytics | Portal login data | Internal | High |
| Property tax collection | Tax collection system | ERP financial module | Internal | High |
| Online payment rate | Payment gateway logs | ERP | Internal | High |
| Call wait time | Phone ACD system | Qless (if phone queued) | Internal | High — automated |
| Senior Freeze apps | Application tracking | Manual intake log | Internal | Medium |
| Park attendance | Trail counters + facility sign-ins | Program registration system | Internal | Medium — partial automation |
| Program fill rate | Registration system | — | Internal | High |
| Visitor satisfaction | Survey platform (SurveyMonkey, Qualtrics) | Comment cards | Internal | Medium |
| Animal live release | Shelter management system (Chameleon/PetPoint) | — | Internal | High |
| Vital records turnaround | Records management system | Manual log | Internal | Medium |
| Voter registration rate | SOS voter file + Census ACS API | — | Public + Internal | Medium |
| Voter turnout | Certified election results (SOS) | County election board | Public | Low (per-event) |
| Qless wait time | Qless API | — | Internal (API) | High — real-time |
| First contact resolution | CRM/ticketing system | Post-interaction survey | Internal | Medium |
| Digital self-service rate | Web analytics + transaction system | — | Internal | High |
| Procurement cycle time | Procurement system | — | Internal | High |
| S/M/WBE participation | Vendor registration + contract awards | — | Internal | Medium |
| Police P1 response | CAD system | — | Internal | High — automated |
| Use-of-force rate | Internal affairs database | — | Internal (sensitive) | Medium |
| Case clearance | RMS (records management) + FBI UCR API | — | Internal + Public | Medium |
| Pothole repair time | 311/work order system | — | Internal | High |
| Road condition (PCI) | Biennial pavement assessment | — | Internal (contracted) | Low |
| Diversion completion | Case management system | — | Internal | Medium |
| Recidivism 1-year | MSHP criminal history + case system | — | Internal + State | Low |
| CDBG timeliness | HUD IDIS | — | Federal (grantee) | Medium |
| Housing placement | HMIS | — | Internal (CoC) | Medium |
| Restaurant inspection | Environmental health system | — | Internal | High |
| Immunization coverage | ShowMeVax (state registry) | — | State (restricted) | Medium |
| Vacancy rate | HR/payroll system | — | Internal | High |
| Turnover rate | HR/payroll system | — | Internal | High |
| Training hours | LMS / HR system | — | Internal | High |
| Engagement score | Survey platform | — | Internal | Low (annual) |

---

## 6. Data Quality Audit Checklist

Run monthly for each KPI data source:

### Completeness
- [ ] All expected records present for the reporting period?
- [ ] No blank/null values in required fields?
- [ ] All departments/locations represented?
- [ ] Denominator data available for rate KPIs?

### Timeliness
- [ ] Data available within expected refresh window?
- [ ] No records backdated more than 5 business days?
- [ ] Automated feeds running on schedule?
- [ ] Manual entry completed by reporting deadline?

### Accuracy
- [ ] Values within expected range (no outliers suggesting data error)?
- [ ] Spot-check 5% of records against source system?
- [ ] Calculated fields producing expected results?
- [ ] Year-over-year trends plausible (flag >50% swings for investigation)?

### Consistency
- [ ] Definitions applied uniformly across locations/staff?
- [ ] No duplicate records?
- [ ] Units consistent (days vs. business days, calendar vs. fiscal year)?
- [ ] Data matches between primary and secondary sources within 5% tolerance?

### Audit SQL Templates

```sql
-- Find missing periods (PostgreSQL)
SELECT kd.kpi_id, kd.name, expected_period
FROM kpi_definitions kd
CROSS JOIN generate_series(
  '2025-01-01'::date, CURRENT_DATE, '1 month'::interval
) AS expected_period
LEFT JOIN kpi_measurements km
  ON km.kpi_id = kd.kpi_id
  AND km.period_start = expected_period::date
WHERE km.measurement_id IS NULL
  AND kd.collection_frequency = 'monthly'
  AND kd.is_active = true
ORDER BY kd.kpi_id, expected_period;

-- Detect outliers (>2 standard deviations from rolling mean)
WITH stats AS (
  SELECT kpi_id, period_start, value,
    AVG(value) OVER (PARTITION BY kpi_id ORDER BY period_start ROWS BETWEEN 5 PRECEDING AND CURRENT ROW) as rolling_avg,
    STDDEV(value) OVER (PARTITION BY kpi_id ORDER BY period_start ROWS BETWEEN 5 PRECEDING AND CURRENT ROW) as rolling_std
  FROM kpi_measurements
)
SELECT kpi_id, period_start, value, rolling_avg, rolling_std
FROM stats
WHERE ABS(value - rolling_avg) > 2 * rolling_std
  AND rolling_std > 0
ORDER BY period_start DESC;

-- Check for duplicates
SELECT kpi_id, period_start, COUNT(*)
FROM kpi_measurements
GROUP BY kpi_id, period_start
HAVING COUNT(*) > 1;

-- Data freshness report
SELECT kd.kpi_id, kd.name, kd.collection_frequency,
  MAX(km.period_end) as latest_data,
  CURRENT_DATE - MAX(km.period_end) as days_stale
FROM kpi_definitions kd
LEFT JOIN kpi_measurements km ON km.kpi_id = kd.kpi_id
WHERE kd.is_active = true
GROUP BY kd.kpi_id, kd.name, kd.collection_frequency
ORDER BY days_stale DESC NULLS FIRST;
```

---

## 7. Data Integration Architecture

### Recommended Stack for KPI Platform

```
Data Sources                    Integration              Storage           Presentation
─────────────                   ───────────              ───────           ────────────
Permit System ──┐                                       ┌─ PostgreSQL ──── KPI Dashboard
Tax System ─────┤               ┌─────────────┐         │  (primary)       (React app)
Qless API ──────┤──── ETL/ELT ──│  Data        │────────┤                  │
HR System ──────┤    (scheduled) │  Warehouse   │        ├─ Redis ────────── Real-time
Phone ACD ──────┤               │  (Postgres   │        │  (cache)          alerts
CAD System ─────┤               │   or AWS     │        │                  │
HMIS ───────────┤               │   Redshift)  │        └─ S3 ──────────── Open Data
Web Analytics ──┤               └─────────────┘                            exports
Census API ─────┤                      │
FBI UCR API ────┤                      │
ICMA Benchmark ─┘               Transformation
                                (dbt or custom)
                                      │
                                      ▼
                                KPI Calculations
                                Trend Analysis
                                Alert Engine
                                Equity Scoring
```

### ETL Frequencies
| Source Type | Frequency | Method |
|------------|-----------|--------|
| Qless | Every 15 minutes | API poll |
| Phone ACD | Hourly | API or file drop |
| Permit/tax/HR systems | Daily (overnight batch) | Database extract or CSV export |
| Web analytics | Daily | GA4 API |
| CAD/RMS (police) | Daily | Database extract |
| Census/BLS | Monthly or on release | API pull |
| ICMA benchmarks | Annually | Manual upload |
| Surveys | On completion | Webhook or API |

### Security Requirements
- Internal system extracts over encrypted VPN or private network only
- API credentials stored in AWS SSM Parameter Store (SecureString) or equivalent
- PII stripped at extraction — only aggregate metrics in KPI warehouse
- Role-based access: analysts (read), department heads (read + comment), IT (admin)
- All data transfers logged for audit trail
