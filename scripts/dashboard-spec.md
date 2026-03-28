# Dashboard Specification — STL County KPI Platform

Technical specification for building KPI dashboards as React artifacts,
static sites, or BI tool configurations.

---

## Dashboard Types

### 1. Executive Dashboard (County-Wide)
**Audience**: County Executive, Council members, public
**Refresh**: Daily
**Components**:
- County health score (composite of all department statuses)
- Department status grid (14 departments × status indicator)
- Top 5 alerts (KPIs in red/yellow)
- Initiative progress summary (% complete, on track, blocked)
- Constituent satisfaction trend (CSAT over last 12 months)
- Channel distribution chart (walk-in / phone / digital over time)

### 2. Department Scorecard Dashboard
**Audience**: Department heads, analysts
**Refresh**: Real-time where system data available, otherwise daily
**Components**:
- 6–8 KPI cards with current value, target, trend sparkline, status
- Trend chart (selected KPI, last 12 months, with target line)
- Initiative tracker (kanban or table)
- Equity breakdown (geographic zone comparison)
- Benchmark comparison (STL County vs. peer median)
- Alert feed

### 3. Public Transparency Dashboard
**Audience**: Residents, media, civic tech community
**Refresh**: Monthly
**Components**:
- Simplified KPI summary (plain language, no jargon)
- Department report cards (letter grade or star rating)
- "How are we doing?" trend charts
- Constituent feedback highlights
- Open data download links

---

## React Artifact Structure

When building as a React artifact (.jsx), use this component architecture:

```
Dashboard
├── Header (title, period selector, department filter)
├── ScoreGrid (department status cards)
├── KPICard (value, target, sparkline, status badge)
├── TrendChart (recharts LineChart with target reference line)
├── InitiativeTable (status, owner, due date)
├── EquityPanel (geographic zone comparison bars)
├── BenchmarkComparison (STL County vs. peer median)
├── AlertFeed (recent alerts with severity)
└── Footer (methodology notes, data sources, last updated)
```

### Technical Requirements
- Use Recharts for charts (available in React artifacts)
- Use Tailwind utility classes for layout
- Use lucide-react for icons
- Responsive design (mobile-friendly)
- Color scheme: Use semantic colors for status (green/yellow/red)
  with a neutral professional base palette
- Accessibility: WCAG 2.1 AA color contrast; screen reader labels

### Data Loading
- For artifacts: Import data as JSON constants or use persistent storage API
- For production: Fetch from API routes defined in `schemas/api-routes.json`

---

## KPI Card Component Spec

```
┌──────────────────────────────┐
│ [Icon] KPI Name        [🟢] │
│                              │
│     42.3 days                │
│     Target: 30 days          │
│                              │
│  ▁▂▃▅▇█▇▅  (sparkline)     │
│  ↓ 8% vs prior period       │
└──────────────────────────────┘
```

Fields:
- `icon`: Department or category emoji/icon
- `name`: KPI display name
- `value`: Current value with unit
- `target`: Target value with unit
- `sparkline`: Last 6–12 data points
- `trend`: Percentage change vs. prior period with direction arrow
- `status`: Color badge (green/yellow/red) based on thresholds

---

## Color Palette (Government / Civic)

```css
:root {
  --stl-primary: #1B3A5C;     /* Navy — authority, trust */
  --stl-secondary: #2E7D9B;   /* Teal — civic, modern */
  --stl-accent: #E8913A;      /* Gold — St. Louis flag nod */
  --stl-bg: #F5F6F8;          /* Light gray background */
  --stl-card: #FFFFFF;
  --stl-text: #1A1A2E;
  --stl-text-muted: #6B7280;
  --stl-green: #059669;
  --stl-yellow: #D97706;
  --stl-red: #DC2626;
  --stl-border: #E5E7EB;
}
```

---

## Sample Data Format for Dashboard

```json
{
  "department": "permits",
  "department_name": "Permits & Licensing",
  "period": "2026-Q1",
  "overall_status": "yellow",
  "kpis": [
    {
      "id": "permits_avg_processing",
      "name": "Avg Processing Time",
      "value": 12.3,
      "target": 10,
      "unit": "days",
      "direction": "lower_is_better",
      "trend_pct": -8,
      "status": "yellow",
      "sparkline": [15.1, 14.2, 13.8, 13.1, 12.7, 12.3],
      "benchmark_median": 12,
      "benchmark_p75": 18
    }
  ],
  "initiatives": [
    {
      "title": "Launch digital permit portal v2",
      "status": "in_progress",
      "impact": "high",
      "owner": "IT + Planning",
      "due": "2026-Q2",
      "pct_complete": 65
    }
  ]
}
```
