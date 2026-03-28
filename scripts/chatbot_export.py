#!/usr/bin/env python3
"""
Chatbot Knowledge Base Export — St. Louis County

Generates structured JSON that can power a county website chatbot.
Each entry has: intent, patterns, response, links, follow-ups, and
escalation triggers.

Usage:
    python scripts/chatbot_export.py --output chatbot-kb.json
    python scripts/chatbot_export.py --format dialogflow  # Dialogflow-compatible
    python scripts/chatbot_export.py --format markdown     # Human-readable review
"""

import argparse
import json
from datetime import datetime

KB = [
    {
        "intent": "pay_property_tax",
        "category": "payments",
        "patterns": [
            "pay property tax",
            "pay my taxes",
            "tax payment",
            "pay tax bill",
            "where to pay taxes",
            "how to pay property tax",
        ],
        "response": "You can pay your property tax online at stlouiscountymo.gov/payments — it takes about 2 minutes and you'll get instant confirmation. You can also pay by mail or in person at Clayton, NW Crossings, or South County (Mon-Thu 8am-3:30pm).",
        "links": [{"label": "Pay Online", "url": "https://stlouiscountymo.gov/payments"}],
        "follow_ups": ["When are taxes due?", "Can I pay in installments?", "Where do I find my parcel number?"],
        "escalation": None,
        "department": "Revenue",
    },
    {
        "intent": "tax_due_date",
        "category": "payments",
        "patterns": ["when are taxes due", "tax deadline", "property tax due date", "when do I pay taxes"],
        "response": "Property taxes are due December 31. You can also pay in installments: first half by December 31, second half by March. Bills are mailed in November. Late payments incur penalty and interest.",
        "links": [],
        "follow_ups": ["How do I pay online?", "What if I can't pay on time?"],
        "escalation": None,
        "department": "Revenue",
    },
    {
        "intent": "senior_tax_freeze",
        "category": "benefits",
        "patterns": [
            "senior tax freeze",
            "tax freeze",
            "property tax freeze",
            "senior property tax",
            "am I eligible for tax freeze",
            "over 62 tax",
        ],
        "response": "The Senior Property Tax Freeze may be available if you're 62 or older, own and live in your home, and meet the income threshold. Applications open annually. Would you like to check your eligibility?",
        "links": [{"label": "Application Info", "url": "https://stlouiscountymo.gov/senior-tax-freeze"}],
        "follow_ups": ["What's the income limit?", "Where do I apply?", "What documents do I need?"],
        "escalation": {"trigger": "eligibility_question", "to": "Revenue", "phone": "314-615-5000"},
        "department": "Revenue",
    },
    {
        "intent": "need_permit",
        "category": "permits",
        "patterns": [
            "do I need a permit",
            "building permit",
            "permit required",
            "renovation permit",
            "deck permit",
            "fence permit",
        ],
        "response": "Permits are required for structural work (additions, decks, basements), electrical, plumbing, and HVAC. Interior cosmetic work (paint, flooring, cabinets) generally doesn't need a permit. The first step is always checking your zoning. Would you like to know more about a specific project?",
        "links": [{"label": "Permit Portal", "url": "https://stlouiscountymo.gov/permits"}],
        "follow_ups": ["How do I check zoning?", "How long does a permit take?", "How much does it cost?"],
        "escalation": {"trigger": "complex_project", "to": "Permits", "phone": "314-615-5000"},
        "department": "Permits & Licensing",
    },
    {
        "intent": "permit_status",
        "category": "permits",
        "patterns": ["permit status", "check my permit", "where is my permit", "how long for permit"],
        "response": "You can check your permit status anytime at the online permits portal. Processing times: simple residential 5-7 business days, complex residential 10-15 days, commercial 20-30 days.",
        "links": [{"label": "Check Status", "url": "https://stlouiscountymo.gov/permits"}],
        "follow_ups": ["Why was my permit denied?", "How do I resubmit?"],
        "escalation": {"trigger": "denied_or_delayed", "to": "Permits", "phone": "314-615-5000"},
        "department": "Permits & Licensing",
    },
    {
        "intent": "birth_certificate",
        "category": "documents",
        "patterns": ["birth certificate", "get birth certificate", "order birth certificate", "birth record"],
        "response": "Birth certificates for people born in St. Louis County can be ordered online via VitalChek (5-7 business days, ~$15) or in person at Clayton HQ (same day, Mon-Thu 8am-3:30pm, ~$13). Bring photo ID and proof of relationship.",
        "links": [{"label": "Order Online (VitalChek)", "url": "https://www.vitalchek.com"}],
        "follow_ups": ["Can I get it same day?", "What ID do I need?", "What if I was born in another county?"],
        "escalation": None,
        "department": "Vital Records",
    },
    {
        "intent": "death_certificate",
        "category": "documents",
        "patterns": ["death certificate", "someone died", "death record", "loved one passed"],
        "response": "I'm sorry for your loss. The funeral home typically handles the initial death certificate. For additional copies, you can order online via VitalChek or visit Vital Records at Clayton HQ (same day, Mon-Thu). Cost is about $13 per copy. Bring photo ID and proof of relationship.",
        "links": [{"label": "Order Online (VitalChek)", "url": "https://www.vitalchek.com"}],
        "follow_ups": ["What about property taxes?", "How do I update the property deed?"],
        "escalation": None,
        "department": "Vital Records",
    },
    {
        "intent": "voter_registration",
        "category": "civic",
        "patterns": [
            "register to vote",
            "voter registration",
            "update voter address",
            "where do I vote",
            "polling place",
        ],
        "response": "Register to vote or update your address online at sos.mo.gov/elections — it takes about 3 minutes. The deadline is the 4th Wednesday before any election. You can also look up your polling place at the same site.",
        "links": [{"label": "Register Online", "url": "https://www.sos.mo.gov/elections"}],
        "follow_ups": ["When is the next election?", "Can I vote early?"],
        "escalation": None,
        "department": "Board of Elections",
    },
    {
        "intent": "adopt_pet",
        "category": "services",
        "patterns": ["adopt pet", "adopt dog", "adopt cat", "animal shelter", "pet adoption"],
        "response": "Visit the St. Louis County Animal Shelter Mon-Thu 8am-3:30pm to meet available animals. Same-day adoption is available in most cases. Fees include spay/neuter, vaccinations, and microchip. You can browse animals online first!",
        "links": [{"label": "View Available Animals", "url": "https://stlouiscountymo.gov/adopt"}],
        "follow_ups": ["What does adoption cost?", "Can I foster instead?", "Do you have puppies?"],
        "escalation": None,
        "department": "Animal Services",
    },
    {
        "intent": "report_pothole",
        "category": "report",
        "patterns": ["pothole", "road damage", "road repair", "broken road", "street problem"],
        "response": "Report potholes and road issues by calling Transportation at 314-615-8500. Routine repairs are targeted within 7 days. Safety hazards are prioritized within 48 hours.",
        "links": [],
        "follow_ups": ["What about traffic signals?", "Who handles snow removal?"],
        "escalation": None,
        "department": "Transportation",
    },
    {
        "intent": "hours_locations",
        "category": "general",
        "patterns": [
            "hours",
            "when are you open",
            "locations",
            "where",
            "office hours",
            "are you open friday",
            "government center",
        ],
        "response": "County offices are open Monday through Thursday, 8am to 3:30pm. There is no Friday service at any location. West County Government Center is permanently closed. Open locations: Clayton Government HQ, Northwest Crossings, and South County Government Center.",
        "links": [],
        "follow_ups": ["How do I avoid waiting in line?", "Which location is closest to me?"],
        "escalation": None,
        "department": "General",
    },
    {
        "intent": "qless",
        "category": "general",
        "patterns": ["qless", "virtual line", "wait time", "how long is the wait", "avoid the line", "queue"],
        "response": "You can join our virtual line using QLess! Join online or scan the QR code at any location. You'll get a text when your turn is coming up, so you can wait wherever you want instead of sitting in the office.",
        "links": [{"label": "Join QLess", "url": "https://stlouiscountymo.gov/qless"}],
        "follow_ups": ["What's the current wait time?", "Which location has the shortest wait?"],
        "escalation": None,
        "department": "Customer Service",
    },
    {
        "intent": "housing_help",
        "category": "help",
        "patterns": [
            "housing help",
            "rent help",
            "homeless",
            "eviction",
            "emergency shelter",
            "can't pay rent",
            "need help",
        ],
        "response": "For housing assistance, emergency shelter, or rent/utility help, contact Human Services at 314-615-4800. You can also dial 211 anytime for 24/7 resource navigation. If you're in immediate danger, call 911.",
        "links": [],
        "follow_ups": ["What about food assistance?", "Are there programs for seniors?"],
        "escalation": {"trigger": "crisis", "to": "Human Services", "phone": "314-615-4800"},
        "department": "Human Services",
    },
    {
        "intent": "not_county_vehicle",
        "category": "redirect",
        "patterns": ["vehicle registration", "car registration", "license plates", "renew plates", "register my car"],
        "response": "Vehicle registration is handled by the Missouri Department of Revenue (state government), not St. Louis County. Visit dor.mo.gov or your nearest license office.",
        "links": [{"label": "MO Dept of Revenue", "url": "https://dor.mo.gov"}],
        "follow_ups": [],
        "escalation": None,
        "department": "NOT COUNTY — State",
    },
    {
        "intent": "not_county_marriage",
        "category": "redirect",
        "patterns": ["marriage license", "get married", "marriage certificate"],
        "response": "Marriage licenses are issued by the Circuit Court, not St. Louis County government. Visit stlcountycourts.com or call the court clerk.",
        "links": [{"label": "Circuit Court", "url": "https://stlcountycourts.com"}],
        "follow_ups": [],
        "escalation": None,
        "department": "NOT COUNTY — Court",
    },
    {
        "intent": "not_county_snap",
        "category": "redirect",
        "patterns": ["food stamps", "SNAP", "EBT", "food assistance"],
        "response": "SNAP (food stamps) is a state program managed by the Missouri Department of Social Services. Apply online at mydss.mo.gov or call 855-373-4636. If you need immediate food help, dial 211 for local food pantries.",
        "links": [{"label": "Apply for SNAP", "url": "https://mydss.mo.gov"}],
        "follow_ups": ["Are there food pantries near me?"],
        "escalation": None,
        "department": "NOT COUNTY — State",
    },
    {
        "intent": "not_county_trash",
        "category": "redirect",
        "patterns": ["trash", "garbage", "recycling", "waste pickup", "missed trash"],
        "response": "Trash and recycling pickup is handled by your city (municipality), not St. Louis County. If you're in unincorporated St. Louis County, contact your waste hauler directly. If you're not sure, tell me your city and I can help.",
        "links": [],
        "follow_ups": ["How do I know if I'm in unincorporated county?"],
        "escalation": None,
        "department": "NOT COUNTY — Municipal",
    },
]

METADATA = {
    "version": "1.0.0",
    "generated": datetime.now().isoformat(),
    "county": "St. Louis County, Missouri",
    "intents": len(KB),
    "categories": list(set(k["category"] for k in KB)),
    "notes": [
        "All responses are under 150 words for chatbot display",
        "Links should open in new tabs",
        "Escalation triggers suggest when to offer live agent transfer",
        "NOT COUNTY intents handle the #1 source of misdirected calls",
        "Hours current as of March 2025: Mon-Thu 8am-3:30pm, no Friday, West County closed",
    ],
}


def export_standard(output_path: str):
    """Export as standard JSON knowledge base."""
    data = {"metadata": METADATA, "intents": KB}
    with open(output_path, "w") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"✅ Chatbot KB exported to {output_path}")
    print(f"   Intents: {len(KB)}")
    print(f"   Categories: {', '.join(METADATA['categories'])}")


def export_markdown(output_path: str):
    """Export as human-readable markdown for review."""
    lines = ["# Chatbot Knowledge Base — Review", "", f"**Intents**: {len(KB)}", ""]
    for k in KB:
        lines.append(f"## {k['intent']}")
        lines.append(f"**Category**: {k['category']} | **Department**: {k['department']}")
        lines.append(f"**Patterns**: {', '.join(k['patterns'])}")
        lines.append(f"**Response**: {k['response']}")
        if k["links"]:
            lines.append(f"**Links**: {', '.join(link['label'] + ' → ' + link['url'] for link in k['links'])}")
        if k["follow_ups"]:
            lines.append(f"**Follow-ups**: {', '.join(k['follow_ups'])}")
        if k["escalation"]:
            lines.append(f"**Escalation**: {k['escalation']}")
        lines.append("")
    with open(output_path, "w") as f:
        f.write("\n".join(lines))
    print(f"✅ Markdown review exported to {output_path}")


def main():
    parser = argparse.ArgumentParser(description="Export chatbot knowledge base")
    parser.add_argument("--output", "-o", default="chatbot-kb.json")
    parser.add_argument("--format", "-f", choices=["json", "markdown", "dialogflow"], default="json")
    args = parser.parse_args()

    if args.format == "markdown":
        if not args.output.endswith(".md"):
            args.output = args.output.rsplit(".", 1)[0] + ".md"
        export_markdown(args.output)
    else:
        export_standard(args.output)


if __name__ == "__main__":
    main()
