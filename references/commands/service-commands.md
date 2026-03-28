# Service Delivery Commands

Commands that directly improve service delivery for employees and residents.

---

## Employee Tools

### `/triage`

Show the service triage decision tree for routing constituents.

**Action:** Load `references/employee-toolkit.md` Section 1. Display the
routing tree. If user provides a specific scenario ("caller asking about
vehicle registration"), walk through the tree and give the answer.

### `/script <scenario>`

Show the phone or walk-in script for a specific scenario.

**Aliases**: `/script tax-payment`, `/script transfer`, `/script angry`, `/script senior-freeze`

**Available scripts:**
- `greeting` — Standard phone/walk-in greeting
- `tax-payment` — Walk caller through payment options (promote online)
- `senior-freeze` — Senior Tax Freeze inquiry and eligibility check
- `permit-inquiry` — "Where do I start?" for building projects
- `transfer` — Warm handoff to another department
- `callback` — Can't resolve now, scheduling callback
- `qless-greeting` — Walk-in arrival, Qless onboarding
- `pre-screen` — Check if walk-in has required documents before they wait
- `end-of-visit` — Close interaction, promote digital
- `angry` — De-escalation using LEAD framework
- `supervisor-request` — Constituent wants to speak to supervisor
- `sunshine` — Sunshine Law / records request

**Action:** Load `references/employee-toolkit.md` Section 2/3/7, display the relevant script.

### `/referral <from-dept> <to-dept>`

Show the warm handoff protocol and what context to pass.

**Action:** Load `references/employee-toolkit.md` Section 4. Show the
multi-department routing for the constituent's need, plus the warm handoff
script.

### `/escalate`

Show escalation protocols — when to escalate and to whom.

**Action:** Load `references/employee-toolkit.md` Section 5.

### `/faq <number>`

Show the quick answer for a common question.

**Action:** Load `references/employee-toolkit.md` Section 8. If a number
is given, show that specific FAQ. If no number, show the full top-25 list.

### `/job-aid <topic>`

Generate a printable one-page job aid card.

**Available cards**: `triage`, `phone`, `qless`, `escalation`, `senior-services`

**Action:**
1. Load `references/employee-toolkit.md` Section 10
2. Generate a single-page formatted reference card
3. Output as PDF (use pdf skill) or markdown
4. Designed to be laminated and kept at the service desk

### `/not-us <service>`

Quick lookup: "Is this county or state or municipal?"

**Action:** Load `references/employee-toolkit.md` Section 8.3 (Services That
Are NOT County). Show the correct redirect with phone number and URL.

---

## Resident Tools

### `/guide <life-event>`

Show the resident self-service guide for a life event.

**Aliases**: `/guide moved`, `/guide building`, `/guide senior`, `/guide business`,
`/guide help`, `/guide death`, `/guide reentry`, `/guide pet`

**Available guides:**
| Command | Guide |
|---------|-------|
| `/guide moved` | "I Just Moved to St. Louis County" |
| `/guide building` | "I Want to Build or Renovate My Home" |
| `/guide senior` | "I'm Turning 62+ / Senior Services" |
| `/guide help` | "I Need Help — Housing, Food, Emergency" |
| `/guide business` | "I Want to Start a Business" |
| `/guide death` | "Someone I Love Died" |
| `/guide reentry` | "I Was Recently Released from Incarceration" |
| `/guide pet` | "I Want to Adopt a Pet" |

**Action:** Load `references/resident-service-guides.md`, display the
relevant life-event guide.

### `/eligible <program>`

Run the service eligibility checker for a specific program.

**Aliases**: `/eligible tax-freeze`, `/eligible permit`, `/eligible all`

**Available checkers:**
- `tax-freeze` — Senior Property Tax Freeze eligibility
- `permit` — Do I need a permit for this project?
- `all` — General services screener (check all programs)

**Action:**
1. Load `references/resident-service-guides.md` Section 2
2. Walk through the decision tree with the user
3. If generating as artifact: create an interactive React component with the eligibility flow
4. Give clear YES/NO/MAYBE with next steps

### `/process <service>`

Show the step-by-step process map in plain language.

**Aliases**: `/process tax-payment`, `/process birth-certificate`, `/process permit`

**Action:** Load `references/resident-service-guides.md` Section 3.
Show the numbered steps with time estimates and tips.

### `/wait <service>`

Show expected wait times and processing times by channel.

**Action:** Load `references/resident-service-guides.md` Section 4.
Show the comparison table (online vs. phone vs. walk-in) for the service.

### `/contact <department>`

Show contact info for a department with tips on best time to call.

**Action:** Load `references/resident-service-guides.md` Section 7.

---

## Content Generation Commands

### `/web-content <topic>`

Generate website copy for a county service page, written in plain language
at 8th-grade reading level.

**Action:**
1. Load the relevant resident guide for the topic
2. Rewrite as web-ready content: scannable, mobile-friendly, action-oriented
3. Include: H2 headings, numbered steps, call-to-action buttons, FAQ accordion
4. Follow county brand voice: calm, professional, helpful

### `/chatbot-response <question>`

Generate a chatbot-ready response to a common resident question.

**Action:**
1. Check FAQ list (Section 5) and life-event guides (Section 1)
2. Write a response that is: ≤150 words, answers the question directly,
   provides one link or phone number, ends with "Is there anything else?"
3. Output as JSON with: `question`, `answer`, `links`, `followup_suggestions`

### `/handout <topic>`

Generate a printable handout for distribution at government centers,
libraries, or community events.

**Action:**
1. Load relevant guide content
2. Format as a one-page printable document (use pdf skill)
3. Include: QR code to online version, large font, simple language,
   county logo placeholder, key phone numbers
4. Suitable for: Qless waiting room display, community center bulletin board,
   library info rack
