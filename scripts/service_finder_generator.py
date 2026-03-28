#!/usr/bin/env python3
"""
Service Finder Generator — Resident-Facing Service Navigation

Generates an interactive React JSX artifact where residents type what
they need and get routed to the right department with step-by-step
instructions, links, and phone numbers.

Usage:
    python scripts/service_finder_generator.py --output service-finder.jsx
"""

import argparse


def generate_service_finder() -> str:
    return """import { useState, useMemo } from "react";

const SERVICES = [
  { id: "tax-pay", keywords: ["pay tax", "property tax", "tax bill", "tax payment", "pay bill"], category: "Payments", title: "Pay Property Tax", dept: "Revenue", icon: "💰", online: true, url: "stlouiscountymo.gov/payments", steps: ["Look up your parcel number (on your tax bill or search by address)", "Go to stlouiscountymo.gov/payments", "Enter parcel number and payment info", "Get instant confirmation"], time: "2 min online", phone: "314-615-5000" },
  { id: "tax-freeze", keywords: ["senior tax", "tax freeze", "senior freeze", "property freeze", "62", "over 62"], category: "Benefits", title: "Senior Property Tax Freeze", dept: "Revenue", icon: "❄️", online: true, steps: ["Confirm eligibility: age 62+, own & occupy home, income below threshold", "Download application at county website", "Gather documents: ID, proof of age, income records", "Submit by mail or in person"], time: "15-30 days processing", phone: "314-615-5000" },
  { id: "permit", keywords: ["permit", "building permit", "renovation", "remodel", "addition", "deck", "fence", "build"], category: "Permits", title: "Building Permit", dept: "Permits & Licensing", icon: "🏗️", online: true, steps: ["Check zoning first — call Planning at 314-615-2500", "Prepare your plans (site plan for simple, architectural for complex)", "Submit online at permits portal (fastest) or walk-in", "Wait for review: 5-15 business days", "Schedule inspections when approved"], time: "5-30 business days", phone: "314-615-5000" },
  { id: "birth-cert", keywords: ["birth certificate", "birth record", "born"], category: "Documents", title: "Birth Certificate", dept: "Vital Records", icon: "📄", online: true, url: "vitalchek.com", steps: ["Order online via VitalChek (5-7 business days)", "OR walk-in at Clayton HQ (same day, Mon-Thu 8am-3:30pm)", "Bring photo ID and proof of relationship", "Cost: ~$13 per copy"], time: "Same day (walk-in) or 5-7 days (online)", phone: "314-615-0376" },
  { id: "death-cert", keywords: ["death certificate", "death record", "died", "passed away", "someone died"], category: "Documents", title: "Death Certificate", dept: "Vital Records", icon: "📄", online: true, url: "vitalchek.com", steps: ["Funeral home typically handles initial certificate", "For additional copies: order online via VitalChek or walk-in at Clayton", "Bring photo ID and proof of relationship", "Cost: ~$13 per copy"], time: "Same day (walk-in) or 5-7 days (online)", phone: "314-615-0376" },
  { id: "voter", keywords: ["vote", "voter", "register to vote", "election", "polling", "ballot"], category: "Civic", title: "Voter Registration", dept: "Board of Elections", icon: "🗳️", online: true, url: "sos.mo.gov/elections", steps: ["Register or update address online at sos.mo.gov/elections", "Takes about 3 minutes", "Deadline: 4th Wednesday before any election", "Find your polling place at the same website"], time: "3 min online", phone: "314-615-1800" },
  { id: "parks", keywords: ["parks", "recreation", "program", "class", "activity", "swim", "sports", "camp"], category: "Recreation", title: "Parks & Recreation Programs", dept: "Parks & Recreation", icon: "🌳", online: true, steps: ["Browse programs at parks website", "Register online — resident pricing available", "70+ parks and rec centers across the county"], time: "Instant online registration", phone: "314-615-4386" },
  { id: "adopt-pet", keywords: ["adopt", "pet", "dog", "cat", "animal", "shelter", "puppy", "kitten"], category: "Services", title: "Adopt a Pet", dept: "Animal Services", icon: "🐾", online: false, steps: ["Browse available animals online first", "Visit the Animal Shelter Mon-Thu 8am-3:30pm", "Complete adoption application", "Meet animals — most go home same day", "Fees include spay/neuter, vaccines, microchip"], time: "Same-day adoption available", phone: "314-615-0650" },
  { id: "pothole", keywords: ["pothole", "road", "street", "signal", "traffic light", "snow"], category: "Report", title: "Report Road Issue", dept: "Transportation", icon: "🛣️", online: false, steps: ["Call Transportation: 314-615-8500", "Describe location and issue", "Potholes: target repair within 7 days", "Signal/safety issues: target 4-hour response"], time: "7 days (routine) / 48 hrs (safety)", phone: "314-615-8500" },
  { id: "code-complaint", keywords: ["code violation", "code complaint", "neighbor", "property maintenance", "abandoned"], category: "Report", title: "Code Enforcement Complaint", dept: "Planning & Zoning", icon: "📋", online: false, steps: ["Call Planning & Zoning: 314-615-2500", "Describe the violation and property address", "Staff will investigate within 10 business days"], time: "10 business days initial response", phone: "314-615-2500" },
  { id: "animal-complaint", keywords: ["stray", "animal complaint", "barking", "animal cruelty", "loose dog", "bite"], category: "Report", title: "Animal Complaint", dept: "Animal Services", icon: "🐾", online: false, steps: ["Call Animal Services: 314-615-0650", "Urgent (bite, cruelty): priority dispatch ≤60 min", "Routine (stray, noise): response within 24 hrs"], time: "60 min (urgent) / 24 hrs (routine)", phone: "314-615-0650" },
  { id: "housing-help", keywords: ["housing", "rent", "homeless", "shelter", "emergency", "eviction", "utility"], category: "Help", title: "Housing & Emergency Assistance", dept: "Human Services", icon: "🏠", online: false, steps: ["Call Human Services: 314-615-4800", "OR dial 211 for 24/7 resource navigation", "Emergency shelter through Coordinated Entry", "Rent/utility assistance through CDBG programs"], time: "Varies — crisis services are priority", phone: "314-615-4800" },
  { id: "senior-services", keywords: ["senior", "elderly", "aging", "caregiver", "meals", "60", "65", "older"], category: "Help", title: "Senior & Aging Services", dept: "Human Services", icon: "👵", online: false, steps: ["Call Aging Services: 314-615-4800", "Ask for a senior services intake — covers all programs", "Programs: in-home help, meals, transportation, caregiver support", "Also check Senior Tax Freeze eligibility"], time: "Intake call: 15-20 min", phone: "314-615-4800" },
  { id: "business-license", keywords: ["business license", "start business", "open business", "LLC", "commercial"], category: "Business", title: "Business License", dept: "Permits & Licensing", icon: "💼", online: false, steps: ["Check zoning FIRST: call Planning 314-615-2500", "Register with MO Secretary of State (sos.mo.gov)", "Apply for county business license through Permits", "Health permit if food/salon (Public Health: 314-615-0600)", "Fire inspection may be required"], time: "60-120 days concept to open", phone: "314-615-5000" },
  { id: "property-lookup", keywords: ["property value", "assessment", "property search", "real estate", "property info"], category: "Information", title: "Property Information Lookup", dept: "Revenue", icon: "🏠", online: true, url: "revenue.stlouisco.com/IAS/", steps: ["Go to Real Estate Search on county website", "Search by address, parcel number, or owner name", "View: assessment value, tax history, property details"], time: "Instant online", phone: "314-615-5000" },
];

const NOT_COUNTY = [
  { keywords: ["vehicle registration", "car registration", "plates", "license plate", "tabs"], title: "Vehicle Registration", redirect: "MO Dept of Revenue (State)", url: "dor.mo.gov", note: "This is a STATE service, not county" },
  { keywords: ["driver license", "drivers license", "DL", "driving"], title: "Driver\\'s License", redirect: "MO Dept of Revenue (State)", url: "dor.mo.gov", note: "This is a STATE service, not county" },
  { keywords: ["marriage license", "marriage certificate", "get married"], title: "Marriage License", redirect: "Circuit Court", url: "stlcountycourts.com", note: "This is handled by the COURT, not county government" },
  { keywords: ["food stamps", "SNAP", "EBT", "food assistance"], title: "SNAP / Food Stamps", redirect: "MO Dept of Social Services (State)", url: "mydss.mo.gov", note: "This is a STATE program" },
  { keywords: ["medicaid", "MO HealthNet", "health insurance"], title: "Medicaid", redirect: "MO Dept of Social Services (State)", url: "mydss.mo.gov", note: "This is a STATE program" },
  { keywords: ["unemployment", "lost job", "unemployment benefits"], title: "Unemployment Benefits", redirect: "MO Dept of Labor (State)", url: "labor.mo.gov", note: "This is a STATE program" },
  { keywords: ["divorce", "custody", "child support", "court case", "lawsuit"], title: "Court Matters", redirect: "Circuit Court", url: "stlcountycourts.com", note: "This is handled by the COURT system" },
  { keywords: ["trash", "garbage", "recycling", "waste"], title: "Trash & Recycling", redirect: "Your municipality (city)", url: "", note: "Contact YOUR CITY hall — trash is handled by municipalities, not the county" },
];

function matchScore(query, keywords) {
  const q = query.toLowerCase();
  let score = 0;
  for (const kw of keywords) {
    if (q.includes(kw)) score += kw.split(" ").length * 10;
    for (const word of kw.split(" ")) {
      if (q.includes(word)) score += 3;
    }
  }
  return score;
}

function ServiceCard({ service }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all cursor-pointer" onClick={() => setExpanded(!expanded)}>
      <div className="flex items-start gap-3">
        <span className="text-2xl">{service.icon}</span>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{service.title}</h3>
          <p className="text-sm text-gray-500">{service.dept} • {service.time}</p>
          {service.online && <span className="inline-block mt-1 px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full font-medium">Available Online</span>}
        </div>
        <span className="text-gray-400 text-sm">{expanded ? "▲" : "▼"}</span>
      </div>
      {expanded && (
        <div className="mt-4 pt-3 border-t border-gray-100">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Steps:</h4>
          <ol className="space-y-1.5">
            {service.steps.map((step, i) => (
              <li key={i} className="text-sm text-gray-600 flex gap-2">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 text-gray-500 text-xs flex items-center justify-center font-medium">{i + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          <div className="mt-3 flex flex-wrap gap-3 text-sm">
            {service.phone && <a className="text-blue-600 hover:underline">📞 {service.phone}</a>}
            {service.url && <span className="text-blue-600">🌐 {service.url}</span>}
          </div>
        </div>
      )}
    </div>
  );
}

function NotCountyCard({ item }) {
  return (
    <div className="bg-amber-50 rounded-xl border border-amber-200 p-4">
      <div className="flex items-start gap-3">
        <span className="text-2xl">⚠️</span>
        <div>
          <h3 className="font-semibold text-amber-900">{item.title}</h3>
          <p className="text-sm text-amber-700 mt-1">{item.note}</p>
          <p className="text-sm text-amber-800 mt-2 font-medium">Go to: {item.redirect}</p>
          {item.url && <p className="text-sm text-blue-600 mt-1">🌐 {item.url}</p>}
        </div>
      </div>
    </div>
  );
}

export default function ServiceFinder() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const categories = useMemo(() => {
    const cats = new Set(SERVICES.map(s => s.category));
    return ["all", ...Array.from(cats).sort()];
  }, []);

  const results = useMemo(() => {
    let services = SERVICES;
    let notCounty = [];

    if (query.length >= 2) {
      const scored = services.map(s => ({ ...s, score: matchScore(query, s.keywords) })).filter(s => s.score > 0).sort((a, b) => b.score - a.score);
      const notCountyScored = NOT_COUNTY.map(s => ({ ...s, score: matchScore(query, s.keywords) })).filter(s => s.score > 0).sort((a, b) => b.score - a.score);
      return { services: scored, notCounty: notCountyScored };
    }

    if (category !== "all") {
      services = services.filter(s => s.category === category);
    }
    return { services, notCounty };
  }, [query, category]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">🏛️ St. Louis County Service Finder</h1>
          <p className="text-sm text-gray-500 mt-1">Find the right service, department, and next steps</p>
        </div>

        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="What do you need help with? (e.g., \\u0022pay taxes\\u0022, \\u0022building permit\\u0022, \\u0022adopt a pet\\u0022)"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
          {query && <button onClick={() => setQuery("")} className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">✕</button>}
        </div>

        {!query && (
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(c => (
              <button key={c} onClick={() => setCategory(c)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${category === c ? "bg-gray-900 text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"}`}>
                {c === "all" ? "All Services" : c}
              </button>
            ))}
          </div>
        )}

        {results.notCounty.length > 0 && (
          <div className="space-y-3">
            {results.notCounty.map((item, i) => <NotCountyCard key={i} item={item} />)}
          </div>
        )}

        <div className="space-y-3">
          {results.services.map((service, i) => <ServiceCard key={i} service={service} />)}
          {results.services.length === 0 && query.length >= 2 && results.notCounty.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p className="text-lg">No matching services found</p>
              <p className="text-sm mt-2">Try different words, or call 314-615-5000 for help</p>
            </div>
          )}
        </div>

        <div className="text-center text-xs text-gray-400 pt-4 border-t border-gray-200">
          <p>Hours: Mon–Thu 8am–3:30pm • No Friday service • West County: CLOSED</p>
          <p className="mt-1">General: 314-615-5000 • Emergency: 911 • Crisis: 314-469-6644</p>
        </div>
      </div>
    </div>
  );
}"""


def main():
    parser = argparse.ArgumentParser(description="Generate resident service finder artifact")
    parser.add_argument("--output", "-o", default="/mnt/user-data/outputs/service-finder.jsx")
    args = parser.parse_args()

    jsx = generate_service_finder()
    with open(args.output, "w") as f:
        f.write(jsx)
    print(f"✅ Service finder artifact written to {args.output}")


if __name__ == "__main__":
    main()
