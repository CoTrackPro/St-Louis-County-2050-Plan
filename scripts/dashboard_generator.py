#!/usr/bin/env python3
"""
Dashboard Generator — St. Louis County KPI Dashboard

Produces a working React JSX artifact from scored KPI JSON.
The output renders directly in Claude's artifact panel.

Usage:
    python scripts/dashboard_generator.py --input scored-kpis.json --department "Permits & Licensing"
    python scripts/dashboard_generator.py --all --output dashboard.jsx
    python scripts/dashboard_generator.py --demo  # Uses sample data
"""

import json
import sys
import argparse
from pathlib import Path
from datetime import datetime

SKILL_DIR = Path(__file__).parent.parent
SAMPLE_KPIS = SKILL_DIR / "assets" / "sample-kpis.json"

DEPARTMENT_DATA = {
    "permits": {"name": "Permits & Licensing", "icon": "📋", "color": "#2563EB"},
    "revenue": {"name": "Revenue & Taxation", "icon": "💰", "color": "#059669"},
    "parks": {"name": "Parks & Recreation", "icon": "🌳", "color": "#16A34A"},
    "animal": {"name": "Animal Services", "icon": "🐾", "color": "#D97706"},
    "records": {"name": "Vital Records", "icon": "📄", "color": "#7C3AED"},
    "elections": {"name": "Board of Elections", "icon": "🗳️", "color": "#DC2626"},
    "customer": {"name": "Customer Service", "icon": "📞", "color": "#0891B2"},
    "procurement": {"name": "Procurement", "icon": "🏗️", "color": "#4F46E5"},
    "planning": {"name": "Planning & Zoning", "icon": "🗺️", "color": "#0D9488"},
    "health": {"name": "Public Health", "icon": "🏥", "color": "#E11D48"},
    "transport": {"name": "Transportation", "icon": "🛣️", "color": "#CA8A04"},
    "police": {"name": "Police Department", "icon": "🛡️", "color": "#1E40AF"},
    "justice": {"name": "Justice Services", "icon": "⚖️", "color": "#6D28D9"},
    "human_svc": {"name": "Human Services", "icon": "🤝", "color": "#BE185D"},
}


def generate_dashboard(departments_data: dict, title: str = "St. Louis County") -> str:
    """Generate a complete React JSX dashboard artifact."""

    # Serialize department data for embedding
    data_json = json.dumps(departments_data, indent=2)

    return f'''import {{ useState, useMemo }} from "react";
import {{ LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine }} from "recharts";

const DEPARTMENTS_DATA = {data_json};

const StatusBadge = ({{ status }}) => {{
  const colors = {{
    "🟢": "bg-emerald-100 text-emerald-800 border-emerald-200",
    "🟡": "bg-amber-100 text-amber-800 border-amber-200",
    "🔴": "bg-red-100 text-red-800 border-red-200",
    "⚪": "bg-gray-100 text-gray-500 border-gray-200",
  }};
  return (
    <span className={{`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${{colors[status] || colors["⚪"]}}`}}>
      {{status}}
    </span>
  );
}};

const TrendArrow = ({{ pct, direction }}) => {{
  if (pct == null) return <span className="text-gray-400 text-xs">—</span>;
  const improving = direction === "improving";
  const color = improving ? "text-emerald-600" : direction === "declining" ? "text-red-600" : "text-gray-500";
  const arrow = pct > 0 ? "↑" : pct < 0 ? "↓" : "→";
  return <span className={{`text-xs font-medium ${{color}}`}}>{{arrow}} {{Math.abs(pct)}}%</span>;
}};

const Sparkline = ({{ data, color = "#2563EB" }}) => {{
  if (!data || data.length < 2) return null;
  const chartData = data.map((v, i) => ({{ i, v }}));
  return (
    <div className="h-8 w-24">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={{chartData}}>
          <Line type="monotone" dataKey="v" stroke={{color}} strokeWidth={{1.5}} dot={{false}} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}};

const KPICard = ({{ kpi }}) => {{
  const attPct = kpi.attainment_pct;
  const barColor = attPct >= 90 ? "#059669" : attPct >= 75 ? "#D97706" : "#DC2626";
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-sm font-medium text-gray-700 leading-tight">{{kpi.name}}</h4>
        <StatusBadge status={{kpi.status}} />
      </div>
      <div className="flex items-baseline gap-1 mb-1">
        <span className="text-2xl font-bold text-gray-900">{{kpi.value}}</span>
        <span className="text-sm text-gray-500">{{kpi.unit}}</span>
      </div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-gray-500">Target: {{kpi.target}} {{kpi.unit}}</span>
        <TrendArrow pct={{kpi.trend_pct}} direction={{kpi.trend_direction}} />
      </div>
      <div className="w-full bg-gray-100 rounded-full h-1.5">
        <div className="h-1.5 rounded-full transition-all" style={{{{ width: `${{Math.min(attPct || 0, 100)}}%`, backgroundColor: barColor }}}} />
      </div>
      <div className="flex justify-between items-center mt-2">
        <span className="text-xs text-gray-400">{{attPct}}% of target</span>
        <Sparkline data={{kpi.sparkline}} color={{barColor}} />
      </div>
    </div>
  );
}};

const DeptSelector = ({{ departments, selected, onSelect }}) => (
  <div className="flex flex-wrap gap-2">
    <button
      onClick={{() => onSelect("all")}}
      className={{`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${{
        selected === "all" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      }}`}}
    >
      All Departments
    </button>
    {{departments.map(d => (
      <button
        key={{d.id}}
        onClick={{() => onSelect(d.id)}}
        className={{`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${{
          selected === d.id ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }}`}}
      >
        {{d.icon}} {{d.name}}
      </button>
    ))}}
  </div>
);

const SummaryCards = ({{ data }}) => {{
  const allKpis = Object.values(data).flatMap(d => d.scored_kpis || []);
  const green = allKpis.filter(k => k.status === "🟢").length;
  const yellow = allKpis.filter(k => k.status === "🟡").length;
  const red = allKpis.filter(k => k.status === "🔴").length;
  const improving = allKpis.filter(k => k.trend_direction === "improving").length;
  const declining = allKpis.filter(k => k.trend_direction === "declining").length;

  const cards = [
    {{ label: "Total KPIs", value: allKpis.length, color: "text-gray-900" }},
    {{ label: "On Target", value: green, color: "text-emerald-600", emoji: "🟢" }},
    {{ label: "Warning", value: yellow, color: "text-amber-600", emoji: "🟡" }},
    {{ label: "Critical", value: red, color: "text-red-600", emoji: "🔴" }},
    {{ label: "Improving", value: improving, color: "text-emerald-600", prefix: "↑" }},
    {{ label: "Declining", value: declining, color: "text-red-600", prefix: "↓" }},
  ];

  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
      {{cards.map((c, i) => (
        <div key={{i}} className="bg-white rounded-lg border border-gray-200 p-3 text-center">
          <div className="text-xs text-gray-500 mb-1">{{c.label}}</div>
          <div className={{`text-xl font-bold ${{c.color}}`}}>
            {{c.prefix || c.emoji || ""}}{{c.value}}
          </div>
        </div>
      ))}}
    </div>
  );
}};

const AlertsList = ({{ data }}) => {{
  const alerts = Object.entries(data)
    .flatMap(([deptId, dept]) =>
      (dept.scored_kpis || [])
        .filter(k => k.status === "🔴" || k.status === "🟡")
        .map(k => ({{ ...k, deptId, deptName: dept.department_name || deptId }}))
    )
    .sort((a, b) => (a.attainment_pct || 100) - (b.attainment_pct || 100))
    .slice(0, 8);

  if (!alerts.length) return <p className="text-sm text-gray-500 italic">No active alerts</p>;

  return (
    <div className="space-y-2">
      {{alerts.map((a, i) => (
        <div key={{i}} className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
          <StatusBadge status={{a.status}} />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-gray-800 truncate">{{a.name}}</div>
            <div className="text-xs text-gray-500">{{a.deptName}}</div>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-gray-900">{{a.value}} {{a.unit}}</div>
            <div className="text-xs text-gray-400">target: {{a.target}}</div>
          </div>
        </div>
      ))}}
    </div>
  );
}};

export default function Dashboard() {{
  const [selectedDept, setSelectedDept] = useState("all");

  const departments = useMemo(() =>
    Object.entries(DEPARTMENTS_DATA).map(([id, d]) => ({{
      id,
      name: d.department_name || id,
      icon: d.icon || "🏛️",
      summary: d.department_summary || {{}},
      kpis: d.scored_kpis || [],
    }})),
    []
  );

  const filteredKpis = useMemo(() => {{
    if (selectedDept === "all") return departments.flatMap(d => d.kpis);
    const dept = departments.find(d => d.id === selectedDept);
    return dept ? dept.kpis : [];
  }}, [selectedDept, departments]);

  const updated = new Date().toLocaleDateString("en-US", {{ year: "numeric", month: "long", day: "numeric" }});

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {{/* Header */}}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">🏛️ {title} — Performance Dashboard</h1>
            <p className="text-sm text-gray-500">Updated {{updated}} • Data may be illustrative</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span>Mon–Thu 8am–3:30pm</span>
            <span>•</span>
            <span>No Friday service</span>
          </div>
        </div>

        {{/* Summary */}}
        <SummaryCards data={{DEPARTMENTS_DATA}} />

        {{/* Department selector */}}
        <DeptSelector departments={{departments}} selected={{selectedDept}} onSelect={{setSelectedDept}} />

        {{/* KPI Grid + Alerts */}}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              {{selectedDept === "all" ? "All KPIs" : departments.find(d => d.id === selectedDept)?.name || selectedDept}}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {{filteredKpis.map((kpi, i) => <KPICard key={{i}} kpi={{kpi}} />)}}
            </div>
            {{filteredKpis.length === 0 && (
              <p className="text-sm text-gray-500 italic py-8 text-center">No KPI data available for this department.</p>
            )}}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">🚨 Active Alerts</h2>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <AlertsList data={{DEPARTMENTS_DATA}} />
            </div>
          </div>
        </div>

        {{/* Footer */}}
        <div className="text-center text-xs text-gray-400 pt-4 border-t border-gray-200">
          St. Louis County Government • 523 sq mi • 979,595 residents • stlouiscountymo.gov
        </div>
      </div>
    </div>
  );
}}'''


def load_and_score(input_path: str) -> dict:
    """Load KPI data and organize by department."""
    import subprocess
    result = subprocess.run(
        [sys.executable, str(SKILL_DIR / "scripts" / "kpi_scorer.py"),
         "--input", input_path, "--format", "json"],
        capture_output=True, text=True
    )
    if result.returncode != 0:
        print(f"Scorer error: {result.stderr}", file=sys.stderr)
        sys.exit(1)

    # Parse scored output
    output = result.stdout
    # Find the JSON portion
    try:
        data = json.loads(output)
    except json.JSONDecodeError:
        # Try to find JSON in mixed output
        for line in output.split("\n"):
            line = line.strip()
            if line.startswith("{"):
                data = json.loads(line)
                break
        else:
            print("Could not parse scorer output", file=sys.stderr)
            sys.exit(1)

    dept_id = data.get("department_id", "unknown")
    dept_info = DEPARTMENT_DATA.get(dept_id, {"name": dept_id, "icon": "🏛️"})

    # Add icon and sparkline to each KPI
    for kpi in data.get("scored_kpis", []):
        if "sparkline" not in kpi:
            kpi["sparkline"] = []

    result_data = {
        dept_id: {
            "department_name": dept_info["name"],
            "icon": dept_info["icon"],
            "department_summary": data.get("department_summary", {}),
            "scored_kpis": data.get("scored_kpis", []),
        }
    }
    return result_data


def load_raw(input_path: str) -> dict:
    """Load pre-scored JSON organized by department."""
    with open(input_path) as f:
        raw = json.load(f)

    # If it's a single department scorer output
    if "scored_kpis" in raw:
        dept_id = raw.get("department_id", "unknown")
        dept_info = DEPARTMENT_DATA.get(dept_id, {"name": dept_id, "icon": "🏛️"})
        return {
            dept_id: {
                "department_name": dept_info["name"],
                "icon": dept_info["icon"],
                "department_summary": raw.get("department_summary", {}),
                "scored_kpis": raw.get("scored_kpis", []),
            }
        }

    # If it's already a multi-department dict
    if isinstance(raw, dict) and any("scored_kpis" in v for v in raw.values() if isinstance(v, dict)):
        return raw

    # If it's a flat list of KPIs, group by department and score
    if isinstance(raw, list):
        by_dept = {}
        for kpi in raw:
            dept = kpi.get("department_id", "unknown")
            if dept not in by_dept:
                by_dept[dept] = []
            by_dept[dept].append(kpi)

        # Score each department
        result = {}
        for dept_id, kpis in by_dept.items():
            dept_info = DEPARTMENT_DATA.get(dept_id, {"name": dept_id, "icon": "🏛️"})
            # Inline scoring
            scored = []
            for k in kpis:
                val = k.get("value")
                tgt = k.get("target")
                prior = k.get("prior")
                direction = k.get("direction", "higher_is_better")
                if val is not None and tgt is not None and tgt != 0:
                    if direction == "lower_is_better":
                        att = round((tgt / val) * 100, 1) if val > 0 else 100
                        gap = round(tgt - val, 2)
                    else:
                        att = round((val / tgt) * 100, 1)
                        gap = round(val - tgt, 2)
                    status = "🟢" if att >= 90 else "🟡" if att >= 75 else "🔴"
                    trend_pct = round(((val - prior) / abs(prior)) * 100, 1) if prior and prior != 0 else None
                    if direction == "lower_is_better":
                        trend_dir = "improving" if trend_pct and trend_pct < 0 else "declining" if trend_pct and trend_pct > 0 else "flat"
                    else:
                        trend_dir = "improving" if trend_pct and trend_pct > 0 else "declining" if trend_pct and trend_pct < 0 else "flat"
                else:
                    att = None; gap = None; status = "⚪"; trend_pct = None; trend_dir = None

                scored.append({**k, "attainment_pct": att, "gap": gap, "status": status,
                              "trend_pct": trend_pct, "trend_direction": trend_dir})

            atts = [s["attainment_pct"] for s in scored if s["attainment_pct"] is not None]
            composite = round(sum(min(a, 120) for a in atts) / len(atts), 1) if atts else None
            counts = {"🟢": 0, "🟡": 0, "🔴": 0}
            for s in scored:
                if s["status"] in counts: counts[s["status"]] += 1

            result[dept_id] = {
                "department_name": dept_info["name"],
                "icon": dept_info["icon"],
                "department_summary": {
                    "composite_score": composite,
                    "status_counts": counts,
                    "overall_status": "🔴" if counts["🔴"] >= 2 else "🟡" if counts["🔴"] >= 1 or counts["🟡"] >= 2 else "🟢",
                    "improving_count": sum(1 for s in scored if s.get("trend_direction") == "improving"),
                    "declining_count": sum(1 for s in scored if s.get("trend_direction") == "declining"),
                },
                "scored_kpis": scored,
            }
        return result

    return raw


def main():
    parser = argparse.ArgumentParser(description="Generate React KPI dashboard artifact")
    parser.add_argument("--input", "-i", help="Scored KPI JSON (single dept or multi)")
    parser.add_argument("--department", "-d", help="Department display name for title")
    parser.add_argument("--output", "-o", help="Output .jsx file path")
    parser.add_argument("--demo", action="store_true", help="Use sample data")
    parser.add_argument("--title", "-t", default="St. Louis County", help="Dashboard title")
    args = parser.parse_args()

    if args.demo:
        input_path = str(SAMPLE_KPIS)
    elif args.input:
        input_path = args.input
    else:
        print("Error: Provide --input file or --demo", file=sys.stderr)
        sys.exit(1)

    data = load_raw(input_path)
    title = args.department or args.title

    jsx = generate_dashboard(data, title)

    output_path = args.output or "/mnt/user-data/outputs/kpi-dashboard.jsx"
    with open(output_path, "w") as f:
        f.write(jsx)
    print(f"✅ Dashboard artifact written to {output_path}")
    print(f"   Departments: {len(data)}")
    print(f"   Total KPIs: {sum(len(d.get('scored_kpis', [])) for d in data.values())}")


if __name__ == "__main__":
    main()
