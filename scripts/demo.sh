#!/bin/bash
# ============================================================
# STL County KPI Skill — Quick Start Demo
# Run this to validate the entire skill pipeline in 30 seconds.
#
# Usage:
#   cd stl-county-kpi
#   bash scripts/demo.sh
#
# Outputs: demo_output/ folder with scored KPIs, gap analysis,
#          benchmark report, onboarding plan, and HTML scorecard
# ============================================================

set -e
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SKILL_DIR="$(dirname "$SCRIPT_DIR")"
OUT="$SKILL_DIR/demo_output"

echo "🏛️  STL County KPI Skill — Quick Start Demo"
echo "============================================="
echo ""

mkdir -p "$OUT"

# Step 1: Score KPIs
echo "1️⃣  Scoring Permits & Licensing KPIs..."
python3 "$SCRIPT_DIR/kpi_scorer.py" \
  --input "$SKILL_DIR/assets/sample-kpis.json" \
  --department permits \
  --format json \
  --output "$OUT/scored-kpis.json"
echo ""

# Step 2: Render scorecard (markdown)
echo "2️⃣  Rendering department scorecard (markdown)..."
python3 "$SCRIPT_DIR/scorecard_renderer.py" \
  --input "$OUT/scored-kpis.json" \
  --department "Permits & Licensing" \
  --period "Q1 2026" \
  --format markdown \
  --output "$OUT/scorecard.md"
echo ""

# Step 3: Render scorecard (HTML)
echo "3️⃣  Rendering department scorecard (HTML)..."
python3 "$SCRIPT_DIR/scorecard_renderer.py" \
  --input "$OUT/scored-kpis.json" \
  --department "Permits & Licensing" \
  --period "Q1 2026" \
  --format html \
  --output "$OUT/scorecard.html"
echo ""

# Step 4: Compare to national benchmarks
echo "4️⃣  Comparing to national benchmarks..."
python3 "$SCRIPT_DIR/benchmark_comparator.py" \
  --benchmarks "$SKILL_DIR/assets/benchmark-data.csv" \
  --inline '[
    {"kpi_id":"permits_avg_processing","value":12.3,"direction":"lower_is_better"},
    {"kpi_id":"permits_online_adoption","value":67,"direction":"higher_is_better"},
    {"kpi_id":"permits_first_pass","value":74,"direction":"higher_is_better"},
    {"kpi_id":"customer_wait_time","value":25,"direction":"lower_is_better"},
    {"kpi_id":"customer_fcr","value":68,"direction":"higher_is_better"},
    {"kpi_id":"animal_live_release","value":89,"direction":"higher_is_better"},
    {"kpi_id":"police_p1_response","value":9.2,"direction":"lower_is_better"},
    {"kpi_id":"transport_pothole","value":11,"direction":"lower_is_better"}
  ]' \
  --format markdown \
  --output "$OUT/benchmark-report.md"
echo ""

# Step 5: Run KSAB gap analysis
echo "5️⃣  Running KSAB gap analysis on Permits..."
python3 "$SCRIPT_DIR/ksab_gap_calculator.py" \
  --input "$SKILL_DIR/assets/sample-assessments.json" \
  --department permits \
  --format markdown \
  --output "$OUT/gap-analysis.md"
echo ""

# Step 6: Generate onboarding plan
echo "6️⃣  Generating 90-day onboarding plan for new CSR..."
python3 "$SCRIPT_DIR/onboarding_plan_generator.py" \
  --role "Customer Service Rep" \
  --department customer \
  --start-date "2026-04-06" \
  --output "$OUT/onboarding-plan.md"
echo ""

# Step 7: Generate SQL audit templates
echo "7️⃣  Generating data quality audit SQL..."
python3 "$SCRIPT_DIR/data_quality_auditor.py" \
  --generate-sql \
  --output "$OUT/audit-queries.sql"
echo ""

# Step 8: Score journey data
echo "8️⃣  Scoring cross-department journeys..."
python3 "$SCRIPT_DIR/journey_scorer.py" \
  --input "$SKILL_DIR/assets/sample-journey.json" \
  --journey building_project \
  --format markdown \
  --output "$OUT/journey-analysis.md"
echo ""

# Step 9: Generate dashboard artifact
echo "9️⃣  Generating React KPI dashboard..."
python3 "$SCRIPT_DIR/dashboard_generator.py" \
  --input "$SKILL_DIR/assets/sample-kpis.json" \
  --title "St. Louis County" \
  --output "$OUT/kpi-dashboard.jsx"
echo ""

# Step 10: Generate service finder artifact
echo "🔟  Generating resident service finder..."
python3 "$SCRIPT_DIR/service_finder_generator.py" \
  --output "$OUT/service-finder.jsx"
echo ""

# Step 11: Capacity planning
echo "1️⃣1️⃣ Running capacity analysis (Friday closure impact)..."
python3 "$SCRIPT_DIR/capacity_calculator.py" \
  --arrival-rate 12 --service-time 15 --staff 3 \
  --scenario friday-closure \
  --format markdown \
  --output "$OUT/capacity-analysis.md"
echo ""

# Step 12: Chatbot export
echo "1️⃣2️⃣ Exporting chatbot knowledge base..."
python3 "$SCRIPT_DIR/chatbot_export.py" \
  --output "$OUT/chatbot-kb.json"
echo ""

# Summary
echo "============================================="
echo "✅ Demo complete! Outputs in: $OUT/"
echo ""
echo "Files generated:"
ls -lh "$OUT/" | tail -n +2 | awk '{print "  " $NF " (" $5 ")"}'
echo ""
echo "🔍 Open demo_output/scorecard.html in a browser to see the rendered scorecard."
echo "📊 Review demo_output/benchmark-report.md for peer comparison."
echo "🧠 Review demo_output/gap-analysis.md for KSAB diagnosis."
