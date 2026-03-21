
import { 
  ShieldAlert, FileText, MessageSquare, Calendar, Lock, Users, FileCheck, HeartHandshake 
} from 'lucide-react';
import { FAQCategory, RichScheduleItem, Testimonial, MetricItem, QuizModule } from './types';

export const DETAILED_SCHEDULE: RichScheduleItem[] = [
  {
    day: "Day 1",
    title: "Stop the Bleeding",
    icon: ShieldAlert,
    color: "text-red-400",
    action: "Secure your accounts and lock down privacy settings.",
    tool: "Security Checklist",
    win: "No more digital stalking."
  },
  {
    day: "Day 2",
    title: "The Baseline",
    icon: FileText,
    color: "text-blue-400",
    action: "Log the last 3 incidents from memory while fresh.",
    tool: "Evidence Log",
    win: "Your timeline starts now."
  },
  {
    day: "Day 3",
    title: "Communication",
    icon: MessageSquare,
    color: "text-green-400",
    action: "Send your first BIFF response to a hostile text.",
    tool: "AI Message Rewriter",
    win: "Conflict de-escalated instantly."
  },
  {
    day: "Day 4",
    title: "The Calendar",
    icon: Calendar,
    color: "text-purple-400",
    action: "Map out the parenting schedule for the next month.",
    tool: "Custody Calendar",
    win: "Visual proof of parenting time."
  },
  {
    day: "Day 5",
    title: "Boundaries",
    icon: Lock,
    color: "text-gold-400",
    action: "Implement the 'Golden Hour' rule for checking messages.",
    tool: "Boundary Playbook",
    win: "Reclaimed mental peace."
  }
];

export const FAQ_CATEGORIES: FAQCategory[] = [
  {
    id: "general",
    label: "General",
    items: [
       { question: "Is this legal advice?", answer: "No. CoTrackPro is an educational and organizational tool. We provide the structure; you provide the facts. Always consult an attorney for legal strategy." },
       { question: "Is my data secure?", answer: "Yes. We use bank-level encryption. Your vault is private and we do not mine your case data." }
    ]
  },
  {
    id: "features",
    label: "Features",
    items: [
       { question: "How does the AI work?", answer: "We use Anthropic Claude to process text for tone and brevity. Data is not stored by the AI provider after processing." },
       { question: "Can I export my logs?", answer: "Yes. You can export PDF reports suitable for attorneys and court exhibits." }
    ]
  },
  {
    id: "billing",
    label: "Billing",
    items: [
       { question: "Can I cancel anytime?", answer: "Yes. You can manage your subscription via the Stripe portal in your account settings." },
       { question: "Do you offer financial aid?", answer: "Yes. We have a 'Pay What You Can' option for those in financial hardship." }
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "I stopped shaking every time my phone buzzed. The templates gave me my voice back.",
    author: "Sarah J.",
    role: "Protective Mom",
    initials: "SJ"
  },
  {
    quote: "The evidence log turned a chaotic 'he-said/she-said' hearing into a clear win for my client.",
    author: "Mark R.",
    role: "Family Law Attorney",
    initials: "MR"
  },
  {
    quote: "Finally, a tool that focuses on the child's safety instead of just fueling the fight.",
    author: "Dr. Elena T.",
    role: "Child Psychologist",
    initials: "ET"
  }
];

export const IMPACT_METRICS: MetricItem[] = [
  {
    value: "Global",
    label: "Parent Community",
    description: "Supporting families worldwide.",
    icon: Users
  },
  {
    value: "50k+",
    label: "Logs Created",
    description: "Immutable evidence entries secured.",
    icon: FileCheck
  },
  {
    value: "90%",
    label: "Conflict Reduction",
    description: "Reported by users after 3 months.",
    icon: HeartHandshake
  }
];

export const QUIZ_DATA: QuizModule[] = [
  {
    id: "parent-comm-101",
    title: "Communication 101",
    roleId: "parents",
    format: "Scenario",
    difficulty: 1,
    timeEstimate: "5 min",
    description: "Learn the basics of BIFF responses.",
    questions: [
        {
          id: 1,
          type: "single",
          prompt: "Your ex sends a text: 'You are the worst parent ever and late again!' How do you respond?",
          options: [
              { id: "a", text: "Defend yourself: 'I was not late!'" },
              { id: "b", text: "Ignore it completely." },
              { id: "c", text: "BIFF: 'I dropped off at 4:00 PM as scheduled. Have a good evening.'" }
          ],
          correctAnswerIds: ["c"],
          explanation: "Defending fuels the fight. Ignoring might look like lack of co-parenting. BIFF sets the record straight without emotion.",
          nextAction: "Use the AI Rewriter next time."
        }
    ],
    outcome: "Mastery of BIFF Basics"
  },
  {
    id: "atty-doc-101",
    title: "Documentation Strategy",
    roleId: "professionals",
    format: "Knowledge",
    difficulty: 2,
    timeEstimate: "3 min",
    description: "Best practices for client logs.",
    questions: [
        {
          id: 1,
          type: "single",
          prompt: "What makes a log entry admissible?",
          options: [
              { id: "a", text: "Emotional detail about how the client felt." },
              { id: "b", text: "Contemporaneous, factual, non-emotional recording of events." },
              { id: "c", text: "Writing it weeks later to summarize." }
          ],
          correctAnswerIds: ["b"],
          explanation: "Courts value contemporaneous notes (written at the time) that stick to facts.",
          nextAction: "Review client logs weekly."
        }
    ],
    outcome: "Evidence Quality Control"
  }
];
