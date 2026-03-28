#!/usr/bin/env python3
"""
Pipeline Runner — Unified entry point for STL County KPI scripts.

Chains scripts together in common workflows. Eliminates the need to
remember 7 separate CLI interfaces.

Usage:
    python scripts/run.py score --input kpis.json --department permits
    python scripts/run.py gaps --input assessments.json --department permits
    python scripts/run.py onboard --role "Customer Service Rep" --department customer
    python scripts/run.py benchmark --actuals actuals.json
    python scripts/run.py audit --input measurements.csv
    python scripts/run.py audit --sql
    python scripts/run.py journey --input journeys.json
    python scripts/run.py render --input scored.json --format html

    # Pipeline: score → render in one call
    python scripts/run.py pipeline --input kpis.json --department "Permits & Licensing"

    # Full diagnostic: score → benchmark → gap analysis → render
    python scripts/run.py diagnose --kpis kpis.json --assessments assessments.json --department permits
"""

import json
import subprocess
import sys
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
SKILL_DIR = SCRIPT_DIR.parent
BENCHMARK_CSV = SKILL_DIR / "assets" / "benchmark-data.csv"
SAMPLE_KPIS = SKILL_DIR / "assets" / "sample-kpis.json"
SAMPLE_ASSESSMENTS = SKILL_DIR / "assets" / "sample-assessments.json"


def run_script(script_name: str, args: list[str], capture=False) -> subprocess.CompletedProcess:
    """Run a script with args, inheriting or capturing stdout."""
    script_path = SCRIPT_DIR / script_name
    cmd = [sys.executable, str(script_path)] + args
    if capture:
        return subprocess.run(cmd, capture_output=True, text=True)
    else:
        return subprocess.run(cmd)


def cmd_score(args: list[str]):
    """Score KPIs."""
    run_script("kpi_scorer.py", args)


def cmd_gaps(args: list[str]):
    """Run KSAB gap analysis."""
    run_script("ksab_gap_calculator.py", args)


def cmd_onboard(args: list[str]):
    """Generate onboarding plan."""
    run_script("onboarding_plan_generator.py", args)


def cmd_benchmark(args: list[str]):
    """Compare to national benchmarks."""
    # Auto-inject benchmark CSV path if not provided
    if "--benchmarks" not in args and "-b" not in args:
        args = ["--benchmarks", str(BENCHMARK_CSV)] + args
    run_script("benchmark_comparator.py", args)


def cmd_audit(args: list[str]):
    """Run data quality audit."""
    if "--sql" in args:
        args.remove("--sql")
        args.append("--generate-sql")
    run_script("data_quality_auditor.py", args)


def cmd_journey(args: list[str]):
    """Score cross-department journeys."""
    run_script("journey_scorer.py", args)


def cmd_render(args: list[str]):
    """Render department scorecard."""
    run_script("scorecard_renderer.py", args)


def cmd_pipeline(args: list[str]):
    """Pipeline: score → render scorecard in one call."""
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument("--input", "-i", help="KPI data JSON")
    parser.add_argument("--department", "-d", default="unknown")
    parser.add_argument("--period", "-p", default="")
    parser.add_argument("--format", "-f", choices=["markdown", "html", "both"], default="both")
    parser.add_argument("--output-dir", "-o", default=".")
    parsed, _ = parser.parse_known_args(args)

    input_file = parsed.input or str(SAMPLE_KPIS)
    dept = parsed.department
    out_dir = Path(parsed.output_dir)
    out_dir.mkdir(parents=True, exist_ok=True)

    # Step 1: Score
    scored_path = out_dir / "scored-kpis.json"
    print(f"📊 Step 1: Scoring KPIs from {input_file}...")
    result = run_script(
        "kpi_scorer.py",
        [
            "--input",
            input_file,
            "--department",
            dept,
            "--format",
            "json",
            "--output",
            str(scored_path),
        ],
        capture=True,
    )
    if result.returncode != 0:
        print(f"❌ Scoring failed: {result.stderr}", file=sys.stderr)
        sys.exit(1)
    print(f"  ✅ Scored → {scored_path}")

    # Step 2: Render
    if parsed.format in ("markdown", "both"):
        md_path = out_dir / "scorecard.md"
        print("📝 Step 2a: Rendering markdown scorecard...")
        render_args = [
            "--input",
            str(scored_path),
            "--department",
            dept,
            "--format",
            "markdown",
            "--output",
            str(md_path),
        ]
        if parsed.period:
            render_args.extend(["--period", parsed.period])
        run_script("scorecard_renderer.py", render_args, capture=True)
        print(f"  ✅ Markdown → {md_path}")

    if parsed.format in ("html", "both"):
        html_path = out_dir / "scorecard.html"
        print("🌐 Step 2b: Rendering HTML scorecard...")
        render_args = [
            "--input",
            str(scored_path),
            "--department",
            dept,
            "--format",
            "html",
            "--output",
            str(html_path),
        ]
        if parsed.period:
            render_args.extend(["--period", parsed.period])
        run_script("scorecard_renderer.py", render_args, capture=True)
        print(f"  ✅ HTML → {html_path}")

    print(f"\n✅ Pipeline complete. Outputs in {out_dir}/")


def cmd_diagnose(args: list[str]):
    """Full diagnostic: score → benchmark → gap analysis → render."""
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument("--kpis", "-k", help="KPI data JSON")
    parser.add_argument("--assessments", "-a", help="KSAB assessments JSON")
    parser.add_argument("--department", "-d", default="unknown")
    parser.add_argument("--output-dir", "-o", default="diagnosis")
    parsed, _ = parser.parse_known_args(args)

    kpi_file = parsed.kpis or str(SAMPLE_KPIS)
    assessment_file = parsed.assessments or str(SAMPLE_ASSESSMENTS)
    dept = parsed.department
    out_dir = Path(parsed.output_dir)
    out_dir.mkdir(parents=True, exist_ok=True)

    print(f"🔍 Full Diagnostic — {dept}")
    print("=" * 50)

    # Step 1: Score KPIs
    scored_path = out_dir / "1-scored-kpis.json"
    print("\n📊 Step 1: Scoring KPIs...")
    run_script(
        "kpi_scorer.py",
        [
            "--input",
            kpi_file,
            "--department",
            dept,
            "--format",
            "json",
            "--output",
            str(scored_path),
        ],
        capture=True,
    )
    print(f"  ✅ → {scored_path}")

    # Step 2: Benchmark comparison
    print("\n📈 Step 2: Benchmark comparison...")
    # Extract kpi_ids and values for benchmark
    with open(kpi_file) as f:
        kpis = json.load(f)
    bench_input = [
        {"kpi_id": k.get("kpi_id", ""), "value": k.get("value"), "direction": k.get("direction", "higher_is_better")}
        for k in kpis
    ]
    bench_path = out_dir / "2-benchmark-report.md"
    run_script(
        "benchmark_comparator.py",
        [
            "--benchmarks",
            str(BENCHMARK_CSV),
            "--inline",
            json.dumps(bench_input),
            "--format",
            "markdown",
            "--output",
            str(bench_path),
        ],
        capture=True,
    )
    print(f"  ✅ → {bench_path}")

    # Step 3: KSAB gap analysis
    print("\n🧠 Step 3: KSAB gap analysis...")
    gap_path = out_dir / "3-gap-analysis.md"
    run_script(
        "ksab_gap_calculator.py",
        [
            "--input",
            assessment_file,
            "--department",
            dept,
            "--format",
            "markdown",
            "--output",
            str(gap_path),
        ],
        capture=True,
    )
    print(f"  ✅ → {gap_path}")

    # Step 4: Render scorecard
    print("\n📋 Step 4: Rendering scorecard...")
    html_path = out_dir / "4-scorecard.html"
    run_script(
        "scorecard_renderer.py",
        [
            "--input",
            str(scored_path),
            "--department",
            dept,
            "--format",
            "html",
            "--output",
            str(html_path),
        ],
        capture=True,
    )
    md_path = out_dir / "4-scorecard.md"
    run_script(
        "scorecard_renderer.py",
        [
            "--input",
            str(scored_path),
            "--department",
            dept,
            "--format",
            "markdown",
            "--output",
            str(md_path),
        ],
        capture=True,
    )
    print(f"  ✅ → {html_path}")
    print(f"  ✅ → {md_path}")

    print(f"\n{'=' * 50}")
    print(f"✅ Full diagnostic complete. Outputs in {out_dir}/")
    print("\nFiles:")
    for f in sorted(out_dir.iterdir()):
        size = f.stat().st_size
        print(f"  {f.name} ({size:,} bytes)")


COMMANDS = {
    "score": (cmd_score, "Score KPIs: status, gap, trend, composite"),
    "gaps": (cmd_gaps, "Run KSAB gap analysis with interventions"),
    "onboard": (cmd_onboard, "Generate 90-day onboarding plan"),
    "benchmark": (cmd_benchmark, "Compare to national benchmarks"),
    "audit": (cmd_audit, "Data quality audit (--sql for SQL templates)"),
    "journey": (cmd_journey, "Score cross-department journeys"),
    "render": (cmd_render, "Render scorecard (markdown or HTML)"),
    "pipeline": (cmd_pipeline, "Score → render in one call"),
    "diagnose": (cmd_diagnose, "Full diagnostic: score → benchmark → gaps → render"),
}


def main():
    if len(sys.argv) < 2 or sys.argv[1] in ("-h", "--help"):
        print("STL County KPI — Script Runner")
        print("=" * 40)
        print("\nUsage: python scripts/run.py <command> [args]\n")
        print("Commands:")
        for name, (_, desc) in COMMANDS.items():
            print(f"  {name:12s}  {desc}")
        print(f"\nSample data:  {SAMPLE_KPIS}")
        print(f"Benchmarks:   {BENCHMARK_CSV}")
        print("\nExamples:")
        print("  python scripts/run.py pipeline --input assets/sample-kpis.json -d 'Permits'")
        print("  python scripts/run.py diagnose  # uses sample data")
        print("  python scripts/run.py benchmark --actuals actuals.json")
        print("  python scripts/run.py audit --sql")
        sys.exit(0)

    command = sys.argv[1]
    remaining_args = sys.argv[2:]

    if command not in COMMANDS:
        print(f"Unknown command: {command}", file=sys.stderr)
        print(f"Available: {', '.join(COMMANDS.keys())}", file=sys.stderr)
        sys.exit(1)

    func, _ = COMMANDS[command]
    func(remaining_args)


if __name__ == "__main__":
    main()
