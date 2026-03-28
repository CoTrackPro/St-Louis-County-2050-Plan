#!/usr/bin/env python3
"""
Capacity Planning Calculator — Government Service Operations

Queueing theory models for predicting wait times, staff utilization,
and capacity needs. Based on M/M/c queueing model adapted for
government service delivery.

Usage:
    python scripts/capacity_calculator.py --arrival-rate 12 --service-time 15 --staff 3
    python scripts/capacity_calculator.py --scenario friday-closure
    python scripts/capacity_calculator.py --scenario add-saturday
    python scripts/capacity_calculator.py --interactive
"""

import argparse
import json
import math


def factorial(n: int) -> int:
    return math.factorial(n)


def erlang_c(servers: int, traffic_intensity: float) -> float:
    """Calculate Erlang C probability (probability of queuing)."""
    if servers <= 0 or traffic_intensity <= 0:
        return 0
    rho = traffic_intensity / servers
    if rho >= 1:
        return 1.0  # System is overloaded

    sum_terms = sum((traffic_intensity**k) / factorial(k) for k in range(servers))
    last_term = (traffic_intensity**servers) / (factorial(servers) * (1 - rho))
    return last_term / (sum_terms + last_term)


def calculate_queue_metrics(
    arrival_rate_per_hour: float,
    avg_service_time_minutes: float,
    num_servers: int,
    hours_per_day: float = 7.5,
    days_per_week: int = 4,
) -> dict:
    """Calculate queue performance metrics using M/M/c model."""

    mu = 60 / avg_service_time_minutes  # Service rate per server per hour
    lam = arrival_rate_per_hour  # Arrival rate per hour
    c = num_servers
    rho = lam / (c * mu)  # Server utilization

    result = {
        "inputs": {
            "arrival_rate_per_hour": arrival_rate_per_hour,
            "avg_service_time_minutes": avg_service_time_minutes,
            "num_servers": num_servers,
            "hours_per_day": hours_per_day,
            "days_per_week": days_per_week,
        },
        "utilization_pct": round(rho * 100, 1),
        "overloaded": rho >= 1.0,
    }

    if rho >= 1.0:
        result.update(
            {
                "avg_wait_minutes": float("inf"),
                "avg_total_time_minutes": float("inf"),
                "prob_waiting": 1.0,
                "avg_queue_length": float("inf"),
                "daily_capacity": round(c * mu * hours_per_day),
                "daily_demand": round(lam * hours_per_day),
                "weekly_capacity": round(c * mu * hours_per_day * days_per_week),
                "weekly_demand": round(lam * hours_per_day * days_per_week),
                "capacity_margin_pct": round((1 - rho) * 100, 1),
                "status": "🔴 OVERLOADED — system cannot sustain this load",
                "recommendation": f"Need at least {math.ceil(lam / mu) + 1} servers (currently {c})",
                "recommendations": [f"Need at least {math.ceil(lam / mu) + 1} servers (currently {c})"],
            }
        )
        return result

    # Erlang C
    pc = erlang_c(c, lam / mu)

    # Average wait time in queue (minutes)
    avg_wait = (pc / (c * mu - lam)) * 60

    # Average time in system (wait + service)
    avg_system = avg_wait + avg_service_time_minutes

    # Average number in queue
    avg_queue = lam * avg_wait / 60

    # Daily and weekly capacity
    daily_capacity = c * mu * hours_per_day
    weekly_capacity = daily_capacity * days_per_week
    daily_demand = lam * hours_per_day
    weekly_demand = daily_demand * days_per_week

    # Status assessment
    if rho <= 0.70:
        status = "🟢 HEALTHY — comfortable capacity margin"
    elif rho <= 0.85:
        status = "🟡 ELEVATED — approaching capacity limits"
    elif rho < 1.0:
        status = "🔴 CRITICAL — near overload, wait times escalating exponentially"
    else:
        status = "🔴 OVERLOADED"

    result.update(
        {
            "avg_wait_minutes": round(avg_wait, 1),
            "avg_total_time_minutes": round(avg_system, 1),
            "prob_waiting": round(pc, 3),
            "prob_waiting_pct": round(pc * 100, 1),
            "avg_queue_length": round(avg_queue, 1),
            "daily_capacity": round(daily_capacity),
            "daily_demand": round(daily_demand),
            "weekly_capacity": round(weekly_capacity),
            "weekly_demand": round(weekly_demand),
            "capacity_margin_pct": round((1 - rho) * 100, 1),
            "status": status,
        }
    )

    # Staffing recommendations
    recs = []
    if rho > 0.85:
        needed = math.ceil(lam / (mu * 0.80))  # Target 80% utilization
        recs.append(f"Add {needed - c} staff to reach 80% utilization (from {c} to {needed})")
    if avg_wait > 20:
        # Binary search for staff needed to hit 20 min wait
        for test_c in range(c + 1, c + 20):
            test_rho = lam / (test_c * mu)
            if test_rho < 1:
                test_pc = erlang_c(test_c, lam / mu)
                test_wait = (test_pc / (test_c * mu - lam)) * 60
                if test_wait <= 20:
                    recs.append(f"Add {test_c - c} staff to reach ≤20 min avg wait (from {c} to {test_c})")
                    break
    if rho <= 0.60:
        # Check if we can reduce staff
        for test_c in range(c - 1, 0, -1):
            test_rho = lam / (test_c * mu)
            if test_rho < 0.85:
                test_pc = erlang_c(test_c, lam / mu)
                test_wait = (test_pc / (test_c * mu - lam)) * 60
                if test_wait <= 20:
                    recs.append(f"Could reduce to {test_c} staff while maintaining ≤20 min wait ({c} → {test_c})")
                    break

    result["recommendations"] = recs
    return result


def scenario_friday_closure(baseline_arrival: float, service_time: float, staff: int) -> dict:
    """Model impact of eliminating Friday service."""
    pre = calculate_queue_metrics(baseline_arrival, service_time, staff, 7.5, 5)

    # Friday demand redistributes to Mon-Thu (25% increase per day)
    adjusted_arrival = baseline_arrival * 5 / 4
    post = calculate_queue_metrics(adjusted_arrival, service_time, staff, 7.5, 4)

    return {
        "scenario": "Friday Service Closure",
        "description": "All Friday demand redistributes equally across Mon-Thu",
        "pre_closure": pre,
        "post_closure": post,
        "impact": {
            "arrival_rate_increase_pct": 25.0,
            "wait_time_change": f"{pre.get('avg_wait_minutes', '?')} → {'OVERLOADED' if post.get('overloaded') else post.get('avg_wait_minutes', '?')} min",
            "utilization_change": f"{pre.get('utilization_pct', '?')}% → {post.get('utilization_pct', '?')}%",
            "weekly_capacity_loss": f"{pre.get('weekly_capacity', '?')} → {post.get('weekly_capacity', '?')} transactions",
        },
    }


def scenario_digital_shift(baseline_arrival: float, service_time: float, staff: int, shift_pct: float = 15) -> dict:
    """Model impact of shifting X% of transactions to digital."""
    pre = calculate_queue_metrics(baseline_arrival, service_time, staff, 7.5, 4)
    reduced_arrival = baseline_arrival * (1 - shift_pct / 100)
    post = calculate_queue_metrics(reduced_arrival, service_time, staff, 7.5, 4)

    return {
        "scenario": f"Digital Shift — {shift_pct}% of transactions moved online",
        "pre_shift": pre,
        "post_shift": post,
        "impact": {
            "arrival_rate_reduction_pct": shift_pct,
            "wait_time_change": f"{pre['avg_wait_minutes']} → {post['avg_wait_minutes']} min",
            "utilization_change": f"{pre['utilization_pct']}% → {post['utilization_pct']}%",
        },
    }


def scenario_add_staff(baseline_arrival: float, service_time: float, current_staff: int, add_count: int = 1) -> dict:
    """Model impact of adding N staff."""
    pre = calculate_queue_metrics(baseline_arrival, service_time, current_staff, 7.5, 4)
    post = calculate_queue_metrics(baseline_arrival, service_time, current_staff + add_count, 7.5, 4)

    return {
        "scenario": f"Add {add_count} Staff",
        "pre": pre,
        "post": post,
        "impact": {
            "wait_time_change": f"{pre['avg_wait_minutes']} → {post['avg_wait_minutes']} min",
            "utilization_change": f"{pre['utilization_pct']}% → {post['utilization_pct']}%",
        },
    }


def format_report(metrics: dict) -> str:
    """Format queue metrics as markdown report."""
    lines = []

    if "scenario" in metrics:
        lines.append(f"# Scenario: {metrics['scenario']}")
        if "description" in metrics:
            lines.append(f"*{metrics['description']}*")
        lines.append("")

        if "impact" in metrics:
            lines.append("## Impact Summary")
            lines.append("")
            for k, v in metrics["impact"].items():
                label = k.replace("_", " ").title()
                lines.append(f"- **{label}**: {v}")
            lines.append("")

        for key in ["pre_closure", "post_closure", "pre_shift", "post_shift", "pre", "post"]:
            if key in metrics:
                label = key.replace("_", " ").title()
                lines.append(f"## {label}")
                lines.append("")
                lines.append(format_single_metrics(metrics[key]))
                lines.append("")
    else:
        lines.append("# Capacity Analysis")
        lines.append("")
        lines.append(format_single_metrics(metrics))

    return "\n".join(lines)


def format_single_metrics(m: dict) -> str:
    """Format a single set of queue metrics."""
    lines = [
        f"**Status**: {m.get('status', '?')}",
        "",
        "| Metric | Value |",
        "|--------|-------|",
        f"| Server utilization | {m.get('utilization_pct', '?')}% |",
        f"| Avg wait time | {m.get('avg_wait_minutes', '?')} min |",
        f"| Avg total time (wait + service) | {m.get('avg_total_time_minutes', '?')} min |",
        f"| Probability of waiting | {m.get('prob_waiting_pct', '?')}% |",
        f"| Avg queue length | {m.get('avg_queue_length', '?')} people |",
        f"| Daily capacity | {m.get('daily_capacity', '?')} transactions |",
        f"| Daily demand | {m.get('daily_demand', '?')} transactions |",
        f"| Capacity margin | {m.get('capacity_margin_pct', '?')}% |",
    ]

    recs = m.get("recommendations", [])
    if recs:
        lines.extend(["", "**Recommendations:**"])
        for r in recs:
            lines.append(f"- {r}")

    return "\n".join(lines)


def main():
    parser = argparse.ArgumentParser(description="Government service capacity planning")
    parser.add_argument("--arrival-rate", "-a", type=float, help="Arrivals per hour")
    parser.add_argument("--service-time", "-s", type=float, help="Avg service time in minutes")
    parser.add_argument("--staff", "-n", type=int, help="Number of service staff")
    parser.add_argument("--hours", type=float, default=7.5, help="Service hours per day")
    parser.add_argument("--days", type=int, default=4, help="Service days per week")
    parser.add_argument(
        "--scenario", choices=["friday-closure", "digital-shift", "add-staff"], help="Run a named scenario"
    )
    parser.add_argument("--shift-pct", type=float, default=15, help="Digital shift percentage")
    parser.add_argument("--add-count", type=int, default=1, help="Staff to add in add-staff scenario")
    parser.add_argument("--output", "-o", help="Output file path")
    parser.add_argument("--format", "-f", choices=["json", "markdown", "both"], default="both")
    args = parser.parse_args()

    arrival = args.arrival_rate or 12
    service = args.service_time or 15
    staff = args.staff or 3

    if args.scenario == "friday-closure":
        result = scenario_friday_closure(arrival, service, staff)
    elif args.scenario == "digital-shift":
        result = scenario_digital_shift(arrival, service, staff, args.shift_pct)
    elif args.scenario == "add-staff":
        result = scenario_add_staff(arrival, service, staff, args.add_count)
    else:
        result = calculate_queue_metrics(arrival, service, staff, args.hours, args.days)

    parts = []
    if args.format in ("markdown", "both"):
        parts.append(format_report(result))
    if args.format in ("json", "both"):
        # Handle inf for JSON
        def clean(obj):
            if isinstance(obj, float) and math.isinf(obj):
                return "infinity"
            if isinstance(obj, dict):
                return {k: clean(v) for k, v in obj.items()}
            if isinstance(obj, list):
                return [clean(v) for v in obj]
            return obj

        parts.append(json.dumps(clean(result), indent=2))

    output = "\n\n---\n\n".join(parts)
    if args.output:
        with open(args.output, "w") as f:
            f.write(output)
        print(f"✅ Output written to {args.output}")
    else:
        print(output)


if __name__ == "__main__":
    main()
