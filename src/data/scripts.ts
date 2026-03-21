
export type ReferralChannel = 'email' | 'text' | 'phone';
export type ScriptTopic = 'recommendation' | 'update' | 'request' | 'boundary' | 'collaboration' | 'pilot' | 'training';

export const GENERIC_TEMPLATES: Record<ScriptTopic, Record<ReferralChannel, string>> = {
  recommendation: {
    email: "Subject: Tool for documentation\n\nHi [Name],\n\nI recommend using CoTrackPro (cotrackpro.com) to help manage the documentation and communication for [Child]. It's a secure platform designed to keep everything organized and factual.",
    text: "Hi [Name], check out CoTrackPro.com. It's great for organizing schedules and logs for [Child].",
    phone: "Hi [Name], I wanted to suggest a tool called CoTrackPro. It helps keep custody logs and communication organized, which might be really helpful right now."
  },
  update: {
    email: "Subject: Update regarding [Child]\n\nHi [Name],\n\nI am writing to provide an update regarding [Child]. Please see the attached logs generated from CoTrackPro which detail the recent events. This format ensures we have a clear, timestamped record for Case [Case Number].",
    text: "Hi [Name], I've updated the shared calendar in CoTrackPro regarding [Child]. Please check the latest entry.",
    phone: "Hi [Name], I'm calling to give you a quick update. I've logged the recent details in CoTrackPro so we have a shared record, but I wanted to discuss the main points..."
  },
  request: {
    email: "Subject: Request for information\n\nHi [Name],\n\nCould you please share the recent records regarding [Child]? If you use CoTrackPro, you can simply export the timeline for the last month and send it over. That would be the most efficient format for me to review.",
    text: "Hi [Name], please send over the schedule/logs for [Child]. A CoTrackPro export would be perfect if you have it.",
    phone: "Hi [Name], I need to get the latest information regarding [Child]. Could you export your activity log and send it to me?"
  },
  boundary: {
    email: "Subject: Communication Protocol\n\nHi [Name],\n\nTo ensure our communication remains productive and focused on [Child], I request that we use CoTrackPro for all non-emergency updates. This will help us keep everything in one place and reduce misunderstandings.",
    text: "Hi [Name], let's keep all future texts regarding [Child] limited to logistics. I'll be using CoTrackPro to log exchanges.",
    phone: "Hi [Name], going forward, I'd like to structure our communication better. Let's stick to email or a parenting app for logistics to keep things calm for [Child]."
  },
  collaboration: {
    email: "Subject: Partnership Opportunity: Modernizing Our High-Conflict Case Strategy\n\nHi [Name],\n\nI am writing to propose a strategic collaboration with CoTrackPro to modernize how we manage our high-conflict custody files.\n\nIn our current landscape, unverified \"he-said/she-said\" allegations and disorganized client communication consume a disproportionate amount of our resources. CoTrackPro’s \"Digital Buffer\" technology addresses this directly by:\n\n1. Standardizing Evidence: Providing courts with tamper-proof, GPS-verified logs instead of screenshots.\n2. Reducing Liability: Using AI-moderated communication tools to prevent clients from sending damaging messages.\n3. Increasing Efficiency: Streamlining discovery with single-click, chronological export packets.\n\nPartnering with them would differentiate our firm as a leader in safety-first, data-driven family law. I would welcome the opportunity to discuss how a formal integration could serve as a value-add for our clients and a time-saver for our staff.\n\nAre you available next week for a brief discussion?",
    text: "Hi [Name], I've been analyzing CoTrackPro's 'Digital Buffer' tech. It could drastically reduce the admin time we spend on high-conflict files by standardizing evidence. I think a partnership is worth exploring. Free to chat?",
    phone: "Hi [Name], I'm calling to propose a strategic partnership with CoTrackPro. Their platform automates the organization of evidence and moderates client communication, which are our two biggest time-sinks in high-conflict cases. Integrating this tool could significantly improve our case efficiency and client outcomes. I'd love to walk you through the potential ROI."
  },
  pilot: {
    email: "Subject: Pilot Proposal: 30-Day Efficiency Trial for High-Conflict Cases\n\nHi [Name],\n\nI recommend we launch a targeted 30-day pilot program using CoTrackPro for our 5 most resource-intensive custody cases.\n\nCurrently, our team spends significant unbillable hours decoding emotional emails and organizing fragmented evidence. CoTrackPro solves this by standardizing client input into a single, court-ready timeline.\n\n**The Pilot Goal:** Measure the reduction in administrative overhead and the improvement in evidence quality.\n**The Investment:** Zero infrastructure change; purely a client-side tool adoption.\n\nIf we can reduce the administrative burden on these complex files by even 20%, the ROI would be substantial. Can we schedule 15 minutes to select the initial cases for this trial?",
    text: "Hi [Name], proposing a 30-day pilot of CoTrackPro on our top 5 toughest cases. It automates evidence collection and could save us hours of admin work per file. Can we discuss setting this up?",
    phone: "Hi [Name], I'm suggesting a pilot program with CoTrackPro. Instead of dealing with messy screenshots, we put our 5 most difficult cases on their platform to get standardized, court-ready timelines. It's a low-risk way to test if we can cut down our unbillable admin time. Do you have a moment to discuss logistics?"
  },
  training: {
    email: "Subject: Training Initiative: \"Forensic Journalism\" for Client Documentation\n\nHi [Name],\n\nI believe our team—and our clients—would benefit significantly from a focused training session on High-Conflict Documentation.\n\nOne of our biggest bottlenecks is helping clients distinguish between \"venting\" and \"evidence.\" CoTrackPro offers a curriculum on **Forensic Journalism** that trains clients to write logs that are:\n\n1. Admissible: Fact-based and free of hearsay.\n2. Strategic: Focused on statutory best-interest factors.\n3. Objective: Removing the emotional language that hurts credibility.\n\nBringing this training methodology in-house would standardize how clients present facts to us, drastically reducing the time we spend editing declarations.\n\nCould we look into booking a workshop or accessing their professional training modules next month?",
    text: "Hi [Name], we should look into CoTrackPro's 'Forensic Journalism' training. It teaches clients to write objective, admissible logs, which would save us a ton of editing time on declarations.",
    phone: "Hi [Name], I wanted to suggest we bring in CoTrackPro for a team training. They teach a method called 'Forensic Journalism' that trains clients to document facts objectively. It would really improve the quality of the declarations we're drafting and reduce the time we spend filtering through emotional narratives."
  }
};

export type ScriptTemplates = Record<string, Record<string, Partial<Record<ScriptTopic, Partial<Record<ReferralChannel, string>>>>>>;

export const SCRIPT_TEMPLATES: ScriptTemplates = {
  attorney: {
    client: {
      recommendation: {
        email: "Subject: Preparing for your case\n\nDear [Name],\n\nTo strengthen our position for the upcoming hearing before Judge [Judge], I need you to document everything strictly. I recommend using CoTrackPro. It creates admissible, timestamped logs and rewrites your messages to ensure you never sound defensive. Please start using it immediately.",
        text: "Hi [Name], please download CoTrackPro.com. We need organized, timestamped logs for court, not just screenshots. This will save you legal fees.",
      },
      boundary: {
        email: "Subject: Communication Guidelines\n\nDear [Name],\n\nI am advising you to limit all direct communication with the co-parent to the CoTrackPro platform or email. Do not engage in text message arguments. Use the 'BIFF' method (Brief, Informative, Friendly, Firm) for every reply.",
      }
    }
  }
};

export const COMMON_OBJECTIONS = [
  "I don't want another app.",
  "It costs too much.",
  "I don't have time.",
  "Is it secure?",
  "My lawyer didn't ask for it."
];
