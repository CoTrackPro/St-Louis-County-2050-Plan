
export interface QuizItem {
  q: string; // Question Text
  r: string; // Rationale (Used as the correct answer basis in offline mode)
  c: string; // Principle Category
}

export const QUIZ_BANK: Record<string, QuizItem[]> = {
  "Parent": [
    { q: "What is the difference between an observed fact and an interpretation in a parenting conflict?", r: "Facts are verifiable (camera recording, text log); interpretations are feelings or assumptions about motives.", c: "General CoTrackPro Principles" },
    { q: "Which detail makes an incident log more credible: feelings, opinions, or time-stamped observations?", r: "Time-stamped observations create a timeline the court can verify.", c: "Documentation & Evidence" },
    { q: "What is a “weak handoff,” and how does it escalate conflict?", r: "A weak handoff is vague or lacks a specific owner/deadline, creating ambiguity that high-conflict personalities exploit.", c: "Collaboration & Handoffs" },
    { q: "When should you document something even if you’re unsure it “matters” yet?", r: "Document immediately while details are fresh; patterns only emerge over time.", c: "Documentation & Evidence" },
    { q: "What makes a message “child-centered” rather than “parent-centered”?", r: "It focuses on the child's logistics, needs, or schedule, removing adult emotions, blame, or defense.", c: "Communication & Tone" },
    { q: "Which is safer to write: “You’re manipulating,” or “You cancelled the exchange 15 minutes before pickup”?", r: "Stating the specific action (cancelled 15 mins before) is a fact; labeling behavior is an opinion that invites argument.", c: "Supervised Visitation Practice" },
    { q: "What is the risk of using diagnoses or labels in co-parent communication?", r: "It damages your credibility, makes you look hostile, and is often inadmissible.", c: "Communication & Tone" },
    { q: "What is the “best-interests” test you can apply before sending a message?", r: "Ask: 'Does this message help solve a problem for my child, or does it just relieve my own stress?'", c: "Communication & Tone" },
    { q: "What are 3 triggers that indicate a conversation is becoming unsafe or unproductive?", r: "Circular arguing, personal insults/labels, and threats (legal or physical).", c: "General CoTrackPro Principles" },
    { q: "What is the most useful “next step” to include at the end of a difficult message?", r: "A clear, closed-ended proposal (e.g., 'Please confirm by 5 PM') to force a decision.", c: "Communication & Tone" },
    { q: "In a conflict, why does specificity reduce escalation?", r: "Specificity (dates, times, locations) leaves less room for gaslighting or reinterpretation.", c: "Institutional Navigation" },
    { q: "What is “procedural gaslighting,” and how can you protect yourself from it?", r: "When systems deny established rules. Protect yourself by quoting the specific order or policy in writing.", c: "Institutional Navigation" },
    { q: "What is the safest way to request schedule clarity without blaming?", r: "Use neutral inquiry: 'Please clarify the pickup time,' rather than 'Why didn't you tell me?'", c: "General CoTrackPro Principles" },
    { q: "When should you move a conflict from texting to a structured written summary?", r: "When the text thread becomes circular, emotional, or contains threats.", c: "General CoTrackPro Principles" },
    { q: "What is “timeline discipline,” and why does it matter for court credibility?", r: "Presenting facts in strict chronological order helps courts determine cause-and-effect.", c: "Court & Orders" },
    { q: "What is the purpose of a “single-issue message”?", r: "It prevents 'kitchen-sinking' and forces a response to the immediate logistical need.", c: "Communication & Tone" },
    { q: "What is the best way to document denied parenting time?", r: "Log the specific start/end time of the denial and your attempt to exercise the time.", c: "Documentation & Evidence" },
    { q: "What are examples of “weaponized ambiguity” in co-parenting?", r: "Vague agreements like 'we'll see' or 'flexible drop-off' that allow arbitrary control.", c: "General CoTrackPro Principles" },
    { q: "What is the safest way to propose a compromise without appearing to admit fault?", r: "Frame it as a 'one-time exception' focused on the child's specific need that day.", c: "General CoTrackPro Principles" },
    { q: "When is it appropriate to stop responding and switch to documentation mode?", r: "When the communication is repetitive, abusive, or offers no new logistical information.", c: "Documentation & Evidence" }
  ],
  "Survivor": [
    { q: "What is the difference between fear as an emotion and threat as a documented event?", r: "Fear is subjective; a threat is an objective action or statement ('I will hurt you') that can be proven.", c: "General CoTrackPro Principles" },
    { q: "Why is it safer to write “He followed me from X to Y” than “He’s stalking me”?", r: "'Stalking' is a legal conclusion; describing behavior allows the court to draw that conclusion.", c: "General CoTrackPro Principles" },
    { q: "What should an incident log include to preserve credibility?", r: "Date, time, location, witnesses, direct quotes, and immediate impact/action taken.", c: "Documentation & Evidence" },
    { q: "What is the safest way to document coercive control patterns?", r: "Focus on the frequency and method of control (e.g., '15 calls in 1 hour') rather than diagnosis.", c: "Documentation & Evidence" },
    { q: "What does “trauma-informed documentation” mean in practice?", r: "Documenting in short bursts to avoid re-traumatization and focusing on facts.", c: "Trauma-Informed & Regulation" },
    { q: "What is a “trigger stack,” and how can you recognize it before you react?", r: "Accumulated stress that lowers your threshold. Recognize physical signs like heart rate.", c: "Trauma-Informed & Regulation" },
    { q: "When is it safer to delay responding and document first?", r: "When you are dysregulated or the message is a 'bait' designed to elicit anger.", c: "Documentation & Evidence" },
    { q: "What is “reactive abuse,” and how do you prevent it?", r: "Reacting to abuse with aggression. Prevent it by using BIFF responses.", c: "General CoTrackPro Principles" },
    { q: "What does “minimum contact, maximum clarity” look like?", r: "Communicating only when necessary, using specific language to avoid follow-up.", c: "General CoTrackPro Principles" },
    { q: "What is a “safe channel” and why does it matter?", r: "A monitored platform (like CoTrackPro) where behavior is visible.", c: "General CoTrackPro Principles" },
    { q: "How do you create a boundary statement that is enforceable?", r: "State the rule, the consequence, and the action you will take.", c: "General CoTrackPro Principles" },
    { q: "What is the role of “predictable scripts” in high-risk communication?", r: "Using pre-written responses prevents emotional slip-ups.", c: "Communication & Tone" },
    { q: "What is the safest way to say “stop contacting me”?", r: "'Please restrict communication to logistical issues regarding [Child] only.'", c: "Court & Orders" },
    { q: "What does “time-stamped evidence” mean for screenshots?", r: "Evidence that includes metadata or visual proof of exactly when it occurred.", c: "Documentation & Evidence" },
    { q: "What is the first step if an online post about you appears?", r: "Screenshot it immediately (including URL and time) before it is deleted.", c: "Cyber Safety" }
  ],
  "Family Supporter": [
    { q: "What is the difference between supporting someone and escalating conflict?", r: "Support validates feelings; escalation involves joining the fight (e.g., sending angry texts).", c: "General CoTrackPro Principles" },
    { q: "What is the safest way to respond when you hear a one-sided story?", r: "Ask clarifying questions ('What happened next?') rather than validating anger.", c: "General CoTrackPro Principles" },
    { q: "What is one way family members accidentally become part of triangulation?", r: "By passing messages between parents or taking sides in front of the children.", c: "General CoTrackPro Principles" },
    { q: "What boundaries should you set if you’re asked to be a witness?", r: "Agree to state only what you personally observed, not what you were told.", c: "General CoTrackPro Principles" },
    { q: "What makes a witness statement credible?", r: "Specific dates, times, and sensory details (saw/heard), avoiding opinions.", c: "General CoTrackPro Principles" },
    { q: "How can you support a child without interrogating them?", r: "Create a safe, neutral space and let them speak if they want.", c: "General CoTrackPro Principles" },
    { q: "What are child-centered questions that do not pressure loyalty?", r: "'Did you have fun?' or 'How was school?' instead of parent-specific questions.", c: "Child-Centered Practice" },
    { q: "What does predictability do for a stressed child?", r: "It lowers cortisol/anxiety. Knowing what comes next is a safety signal.", c: "General CoTrackPro Principles" },
    { q: "How do you document what a child said without leading?", r: "Write down exact quotes immediately without interpreting meaning.", c: "Documentation & Evidence" },
    { q: "What is secondary trauma and how can supporters manage it?", r: "Absorbing the trauma of the person you support. Manage with boundaries.", c: "Trauma-Informed & Regulation" }
  ],
  "Attorney": [
    { q: "What is the most common documentation error clients make?", r: "Mixing emotion/opinion with fact, making logs look like a diary.", c: "Documentation & Evidence" },
    { q: "How do you teach facts vs interpretations in intake?", r: "Ask 'Could a camera see that?' If not, it's likely an interpretation.", c: "General CoTrackPro Principles" },
    { q: "What elements define an admissible-ready incident log?", r: "Timestamp, location, objective description, and absence of editorializing.", c: "Documentation & Evidence" },
    { q: "When does aggressive messaging create strategic risk?", r: "When it makes the client look like the high-conflict party.", c: "General CoTrackPro Principles" },
    { q: "What is the best way to coach tone?", r: "The 'BIFF' method: Brief, Informative, Friendly, Firm.", c: "Communication & Tone" },
    { q: "How do you detect institutional closed-rank dynamics?", r: "When agencies refuse records or minimize documented safety concerns.", c: "Institutional Navigation" },
    { q: "What does procedural justice require in communication?", r: "Transparency about the process and validating their experience.", c: "Institutional Navigation" },
    { q: "How do you prevent client self-incrimination in messages?", r: "Rule: Draft in a safe app, review after 1 hour, then send.", c: "General CoTrackPro Principles" },
    { q: "What is the best practice for preserving digital evidence?", r: "Exporting metadata-rich files, not just cropping screenshots.", c: "Cyber Safety" },
    { q: "How do you advise clients about social media?", r: "Go dark or assume the judge is reading every post.", c: "Court & Orders" }
  ],
  "Guardian ad Litem (GAL)": [
    { q: "What is the difference between best interests and best narrative?", r: "Narrative is what parents tell you; best interests is what evidence shows the child needs.", c: "Child-Centered Practice" },
    { q: "How do you separate allegations into facts vs interpretations?", r: "Triangulate with third-party records (school, police, medical).", c: "General CoTrackPro Principles" },
    { q: "What are red flags for coaching in child statements?", r: "Adult language, rehearsed stories, or anxiety about 'telling the truth' correctly.", c: "Child-Centered Practice" },
    { q: "What interview practices reduce suggestibility?", r: "Open-ended questions ('Tell me about school') rather than leading ones.", c: "General CoTrackPro Principles" },
    { q: "What does a trauma-informed child interview look like?", r: "Safe environment, building rapport, allowing breaks, not forcing recitals.", c: "Trauma-Informed & Regulation" },
    { q: "What are signs of coercive control without labels?", r: "Isolation tactics, financial monitoring, and micro-management of time.", c: "General CoTrackPro Principles" },
    { q: "What evidence standards apply before endorsing a claim?", r: "Corroboration. A single source is a lead, not a fact.", c: "Documentation & Evidence" },
    { q: "What is the risk of closed-rank alignment?", r: "Missing systemic failures because you trust the 'system' over the parent.", c: "Institutional Navigation" },
    { q: "How do you document institutional behavior objectively?", r: "Log response times, tone of refusal, and adherence to policies.", c: "Documentation & Evidence" },
    { q: "What is a strong handoff to court?", r: "Specific factual findings linked directly to statutory best-interest factors.", c: "Court & Orders" }
  ],
  "Mental Health Professional": [
    { q: "What is the difference between clinical impressions and courtroom facts?", r: "Impressions are subjective; facts are behavioral observations (e.g., 'Client was crying').", c: "General CoTrackPro Principles" },
    { q: "How do you document sessions without forensic conclusions?", r: "Stick to patient report ('Patient stated...') and observed affect.", c: "Documentation & Evidence" },
    { q: "What is the ethical boundary between therapy and evaluation?", r: "Therapists treat; evaluators assess. Blurring causes ethical violations.", c: "Ethics & Bias" },
    { q: "What language reduces risk of notes being misused?", r: "Neutral, descriptive language. Avoid absolutes or adopting the client's narrative as truth.", c: "Court & Orders" },
    { q: "What is the risk of diagnosing a non-client?", r: "It is unethical and destroys your credibility in court.", c: "General CoTrackPro Principles" },
    { q: "How do you avoid alignment with one narrative?", r: "Maintain a systemic view. Validate feelings without validating unobserved facts.", c: "General CoTrackPro Principles" },
    { q: "What is the safest way to document a child disclosure?", r: "Verbatim quotes, context, and demeanor. Do not interpret meaning.", c: "Documentation & Evidence" },
    { q: "What does loyalty bind look like clinically?", r: "A child appearing anxious about pleasing one parent or parroting adult language.", c: "Child-Centered Practice" },
    { q: "How do routines reduce child symptoms?", r: "They provide external regulation when internal regulation is overwhelmed.", c: "General CoTrackPro Principles" },
    { q: "What is a pause protocol for dysregulated messaging?", r: "Waiting 24 hours or using a draft folder before sending.", c: "General CoTrackPro Principles" }
  ],
  "School Administrator / Educator": [
    { q: "What is the difference between a parent’s allegation and a school fact?", r: "Allegations are reported; facts are what staff saw/heard on school grounds.", c: "Institutional Navigation" },
    { q: "What documentation protects the child and school?", r: "Incident reports filled out immediately with objective details and signatures.", c: "Documentation & Evidence" },
    { q: "What is minimum necessary disclosure for custody?", r: "Staff need to know pickup rights and orders, not the divorce drama.", c: "General CoTrackPro Principles" },
    { q: "How should a school verify custody orders?", r: "Require a certified copy of the most recent court order for the file.", c: "Institutional Navigation" },
    { q: "What is the safest way to communicate with high-conflict parents?", r: "Duplicate all communications to both parents simultaneously.", c: "General CoTrackPro Principles" },
    { q: "What is a strong handoff between staff?", r: "Documented transfer of information regarding safety plans.", c: "Collaboration & Handoffs" },
    { q: "What evidence can the school collect?", r: "Incidents on school grounds/devices. Parents handle home evidence.", c: "Documentation & Evidence" },
    { q: "What is the risk of leading questions to a child?", r: "It can contaminate memory or put them in a loyalty bind.", c: "General CoTrackPro Principles" },
    { q: "What is a trauma-informed check-in?", r: "Observation first ('You seem quiet') rather than probing questions.", c: "Trauma-Informed & Regulation" },
    { q: "How do you prevent staff triangulation?", r: "Refuse to pass verbal messages between parents.", c: "General CoTrackPro Principles" }
  ],
  "Judge / Court Role": [
    { q: "What is the difference between narrative and fact?", r: "Narrative appeals to emotion; fact is supported by evidence (logs, records).", c: "General CoTrackPro Principles" },
    { q: "What documentation signals reliability?", r: "Consistency over time, lack of hyperbole, and admission of minor faults.", c: "Documentation & Evidence" },
    { q: "What are credibility red flags?", r: "Using 'always/never', assigning intent, or using clinical terms without qualification.", c: "General CoTrackPro Principles" },
    { q: "How does a fact/interpretation split improve clarity?", r: "It separates what happened from why, allowing the court to decide.", c: "General CoTrackPro Principles" },
    { q: "What does trauma-informed practice reduce?", r: "Re-traumatization of victims and escalation of high-conflict behavior.", c: "Trauma-Informed & Regulation" },
    { q: "How can courts reduce conflict via orders?", r: "Standardized, specific orders reduce ambiguity that fuels conflict.", c: "Court & Orders" },
    { q: "What is the harm of vague orders?", r: "They create loopholes for high-conflict parents to exploit.", c: "General CoTrackPro Principles" },
    { q: "What makes an order enforceable?", r: "Specific times, locations, and consequences vs 'reasonable visitation'.", c: "Court & Orders" },
    { q: "What is weaponized ambiguity?", r: "Terms like 'flexible' which become tools for control.", c: "General CoTrackPro Principles" },
    { q: "When should communication limits be ordered?", r: "When communication is abusive, excessive, or irrelevant to the child.", c: "Communication & Tone" }
  ],
  "Coordinator (Parenting Coordinator / Mediator)": [
    { q: "What is the primary goal of a Parenting Coordinator compared to a therapist?", r: "To implement the parenting plan and resolve disputes, not to treat mental health.", c: "Role Definition" },
    { q: "How do you handle an impasse where both parents refuse to budge?", r: "Refer to the specific clause in the court order or parenting plan that dictates the tie-breaking procedure.", c: "Dispute Resolution" },
    { q: "What is 'drafting for neutrality'?", r: "Writing agreements that use objective criteria rather than subjective language (e.g., '30 minutes late' vs 'unreasonably late').", c: "Documentation" },
    { q: "Why is 'shuttle diplomacy' often safer in high-conflict mediation?", r: "It prevents direct emotional escalation between parties, keeping focus on the issues.", c: "Conflict Management" },
    { q: "What is the best response to a parent attempting to triangulate you?", r: "Direct them back to the joint communication protocol and refuse to keep secrets.", c: "Boundaries" }
  ],
  "Supervisor (Supervised Visitation / Exchanges)": [
    { q: "What is the difference between 'observation' and 'interpretation' in your notes?", r: "Observation is 'Father raised voice to decibel X'; interpretation is 'Father was angry'.", c: "Documentation" },
    { q: "When is immediate intervention required during a visit?", r: "When there is an immediate threat to physical safety or a severe violation of the visit rules (e.g., whispering threats).", c: "Safety" },
    { q: "How do you document a child's refusal to visit?", r: "Record the child's exact words and physical demeanor, and the parents' reactions, without forcing the child physically.", c: "Child-Centered" },
    { q: "Why is neutrality critical in your reports?", r: "Bias can lead to reports being dismissed by the court; facts stand on their own.", c: "Credibility" },
    { q: "What should you do if a parent tries to pass a note to the child?", r: "Intercept it according to protocol, review it, and document the attempt.", c: "Security" }
  ],
  "Advocate (Nonprofit / Community / Victim Advocate)": [
    { q: "What is the first step in safety planning with a survivor?", r: "Assess immediate lethality risks and identify a safe communication channel.", c: "Safety Planning" },
    { q: "How do you distinguish between legal advice and legal information?", r: "Information explains the process (e.g., 'This form is for X'); advice suggests strategy (e.g., 'You should file X').", c: "Ethics" },
    { q: "Why is client autonomy central to advocacy?", r: "The survivor is the expert on their own life; taking control away replicates the dynamics of abuse.", c: "Empowerment" },
    { q: "What is the best way to help a client prepare for court?", r: "Help them organize their evidence chronologically and practice staying calm.", c: "Court Prep" },
    { q: "How do you handle a client returning to an abuser?", r: "Maintain a non-judgmental stance and keep the door open for safety planning.", c: "Support" }
  ],
  "Police / Law Enforcement": [
    { q: "What is the primary role of police in a 'civil standby' for custody?", r: "To keep the peace and prevent violence, not to interpret complex custody orders.", c: "Role Definition" },
    { q: "How do you verify a custody order on the scene?", r: "Look for a judge's signature, a court seal, and the most recent date.", c: "Verification" },
    { q: "What constitutes 'custodial interference' vs a civil dispute?", r: "Interference usually involves taking/keeping a child in violation of a clear order with intent to deprive custody; often requires specific intent.", c: "Legal Distinction" },
    { q: "How should you document a 'no-show' exchange?", r: "Create an incident report stating you were present, verified the order, and the other party did not appear.", c: "Documentation" },
    { q: "What is the best de-escalation tactic for high-conflict parents?", r: "Separate the parties immediately and speak to them individually.", c: "De-escalation" }
  ],
  "Court Clerk / Administrative": [
    { q: "What is the difference between legal advice and procedural assistance?", r: "Procedural assistance helps with forms and process; advice suggests what to do to win.", c: "Ethics" },
    { q: "How do you handle a pro-se litigant with an incomplete filing?", r: "Clearly state what is missing based on the checklist without judging the content.", c: "Procedure" },
    { q: "Why is docket management critical for high-conflict cases?", r: "Delays increase tension and risk; efficient scheduling protects families.", c: "Efficiency" },
    { q: "How do you maintain neutrality when a litigant is rude?", r: "Stick to the script, remain calm, and focus on the business at hand.", c: "Professionalism" },
    { q: "What is the best way to handle a request for 'ex parte' communication with the judge?", r: "Explain that all communications must be filed and served to the other party.", c: "Due Process" }
  ]
};
