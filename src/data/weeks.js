export const weeks = [
  {
    id: 1,
    title: "Foundations & Mindset Shift",
    dateRange: "March 1 – 7",
    goal: "Understand what a PM does. Start reading Inspired. Set up learning infrastructure.",
    days: [
      {
        label: "Monday-Tuesday",
        tasks: [
          { id: "w1-t1", text: "Read \"Inspired\" chapters 1-15 (Product Manager role, how great teams work)", type: "reading" },
          { id: "w1-t2", text: "Watch: Product School \"What is Product Management?\" on YouTube (1 hour)", type: "video" },
          { id: "w1-t3", text: "Subscribe to Lenny's Newsletter, Product Compass, SVPG blog", type: "setup" },
        ]
      },
      {
        label: "Wednesday-Thursday",
        tasks: [
          { id: "w1-t4", text: "Continue \"Inspired\" chapters 16-30 (Product Discovery)", type: "reading" },
          { id: "w1-t5", text: "Create a Notion workspace — set up pages for: Reading Notes, Frameworks, Portfolio", type: "setup" },
          { id: "w1-t6", text: "Sign up for Coursera \"Digital Product Management\" course, complete Module 1", type: "course" },
        ]
      },
      {
        label: "Friday-Saturday",
        tasks: [
          { id: "w1-t7", text: "Continue \"Inspired\" chapters 31-45", type: "reading" },
          { id: "w1-t8", text: "With Arman: Have a 1-hour session where Arman explains how his engineering team works with PMs. What frustrates engineers about PMs? What do good PMs do?", type: "mentor" },
        ]
      },
      {
        label: "Sunday",
        tasks: [
          { id: "w1-t9", text: "Rest. Casual browsing of PM Twitter/LinkedIn only.", type: "rest" }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Finish Inspired + First Frameworks",
    dateRange: "March 8 – 14",
    goal: "Finish Inspired. Learn JTBD and RICE. Start thinking like a PM.",
    days: [
      {
        label: "Monday-Tuesday",
        tasks: [
          { id: "w2-t1", text: "Finish \"Inspired\" — take notes on key concepts in Notion", type: "reading" },
          { id: "w2-t2", text: "Study JTBD framework in depth: read articles, watch Clayton Christensen's milkshake video on YouTube", type: "framework" },
          { id: "w2-t3", text: "Write JTBD statements for 5 apps you use (Idram, Telegram, Instagram, etc.)", type: "practice" },
        ]
      },
      {
        label: "Wednesday-Thursday",
        tasks: [
          { id: "w2-t4", text: "Learn RICE prioritization: read Intercom's original RICE article", type: "framework" },
          { id: "w2-t5", text: "Practice: list 10 features for an imaginary Armenian food delivery app, score them with RICE", type: "practice" },
          { id: "w2-t6", text: "Coursera course: complete Modules 2-3", type: "course" },
        ]
      },
      {
        label: "Friday-Saturday",
        tasks: [
          { id: "w2-t7", text: "Study OKRs: read \"Measure What Matters\" summary (don't need the full book)", type: "framework" },
          { id: "w2-t8", text: "Write OKRs for a hypothetical feature launch at a fintech app", type: "practice" },
          { id: "w2-t9", text: "With Arman: Walk through a real Jira backlog. Explain: what makes a good ticket? What's missing from bad PRDs? How do engineers estimate work?", type: "mentor" },
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Lean Product Playbook + User Research",
    dateRange: "March 15 – 21",
    goal: "Start second book. Learn user research and interviewing techniques.",
    days: [
      {
        label: "Monday-Tuesday",
        tasks: [
          { id: "w3-t1", text: "Start \"The Lean Product Playbook\" chapters 1-6 (Problem Space)", type: "reading" },
          { id: "w3-t2", text: "Study user interview techniques: Teresa Torres' blog posts on interviewing", type: "framework" },
          { id: "w3-t3", text: "Write 10 open-ended interview questions about mobile banking pain points", type: "practice" },
        ]
      },
      {
        label: "Wednesday-Thursday",
        tasks: [
          { id: "w3-t4", text: "Continue Lean Product Playbook chapters 7-12 (Solution Space, MVP)", type: "reading" },
          { id: "w3-t5", text: "Practice interview: interview 2 friends/family about their banking app frustrations", type: "practice" },
          { id: "w3-t6", text: "Create user personas based on the interviews in Notion", type: "practice" },
        ]
      },
      {
        label: "Friday-Saturday",
        tasks: [
          { id: "w3-t7", text: "Learn User Journey Mapping — watch Miro's tutorial videos", type: "video" },
          { id: "w3-t8", text: "Sign up for Miro (free) and create your first user journey map: \"Opening a bank account\"", type: "practice" },
          { id: "w3-t9", text: "With Arman: Explain APIs, frontend vs backend, databases at a high level. Draw a simple system architecture of a banking app together.", type: "mentor" },
        ]
      }
    ]
  },
  {
    id: 4,
    title: "UX Thinking + Figma Basics",
    dateRange: "March 22 – 28",
    goal: "Read Don't Make Me Think. Learn Figma basics. Start seeing products through a UX lens.",
    days: [
      {
        label: "Monday-Tuesday",
        tasks: [
          { id: "w4-t1", text: "Read \"Don't Make Me Think\" (short book, can finish in 1-2 days)", type: "reading" },
          { id: "w4-t2", text: "Sign up for Figma (free). Complete Figma's official beginner tutorials.", type: "tool" },
          { id: "w4-t3", text: "Finish Lean Product Playbook", type: "reading" },
        ]
      },
      {
        label: "Wednesday-Thursday",
        tasks: [
          { id: "w4-t4", text: "Figma practice: wireframe 3 screens of a simple app (login, home, profile)", type: "practice" },
          { id: "w4-t5", text: "Study: what's the difference between wireframe, mockup, and prototype?", type: "framework" },
          { id: "w4-t6", text: "Coursera course: complete Modules 4-5", type: "course" },
        ]
      },
      {
        label: "Friday-Saturday",
        tasks: [
          { id: "w4-t7", text: "Sign up for Amplitude free tier. Explore their demo project to understand product analytics", type: "tool" },
          { id: "w4-t8", text: "Learn funnel analysis and cohort analysis concepts", type: "framework" },
          { id: "w4-t9", text: "With Arman: Review her Figma wireframes. Give feedback from an engineer's perspective: \"This would be hard to build because...\" \"This is a simple API call\" etc.", type: "mentor" },
        ]
      }
    ]
  },
  {
    id: 5,
    title: "Product Discovery + Portfolio Start",
    dateRange: "March 29 – April 4",
    goal: "Start Continuous Discovery Habits. Begin first portfolio piece.",
    days: [
      {
        label: "Monday-Tuesday",
        tasks: [
          { id: "w5-t1", text: "Start \"Continuous Discovery Habits\" chapters 1-6", type: "reading" },
          { id: "w5-t2", text: "Learn the Opportunity Solution Tree framework from the book", type: "framework" },
          { id: "w5-t3", text: "Sign up for Hotjar free tier, explore a demo to understand heatmaps", type: "tool" },
        ]
      },
      {
        label: "Wednesday-Thursday",
        tasks: [
          { id: "w5-t4", text: "START PORTFOLIO PIECE #1: Product Teardown", type: "portfolio" },
          { id: "w5-t5", text: "Pick an Armenian app (Idram, Telcell, SoloLearn, or GG) and analyze: problem, target users, business model", type: "portfolio" },
          { id: "w5-t6", text: "Identify 3 UX problems using what you learned from \"Don't Make Me Think\"", type: "portfolio" },
        ]
      },
      {
        label: "Friday-Saturday",
        tasks: [
          { id: "w5-t7", text: "Continue Portfolio Piece #1: propose 3 improvements with RICE prioritization", type: "portfolio" },
          { id: "w5-t8", text: "Create wireframes for your top improvement in Figma", type: "portfolio" },
          { id: "w5-t9", text: "With Arman: Review the teardown together. Challenge technical assumptions: \"Could this actually be built? What would the data model look like?\"", type: "mentor" },
        ]
      }
    ]
  },
  {
    id: 6,
    title: "Portfolio #1 Complete + Analytics Deep Dive",
    dateRange: "April 5 – 11",
    goal: "Finish and publish first portfolio piece. Go deeper on product metrics.",
    days: [
      {
        label: "Monday-Tuesday",
        tasks: [
          { id: "w6-t1", text: "Finish \"Continuous Discovery Habits\"", type: "reading" },
          { id: "w6-t2", text: "Polish Portfolio Piece #1 — write it up in Notion with screenshots and wireframes", type: "portfolio" },
          { id: "w6-t3", text: "Study SaaS metrics: MRR, ARR, CAC, LTV, Churn. Read ProfitWell's free guides.", type: "framework" },
        ]
      },
      {
        label: "Wednesday-Thursday",
        tasks: [
          { id: "w6-t4", text: "Publish Portfolio Piece #1 on LinkedIn as a long post or article", type: "portfolio" },
          { id: "w6-t5", text: "Amplitude deep dive: learn how to set up events, create funnels, build dashboards", type: "tool" },
          { id: "w6-t6", text: "Practice: define 5 key metrics you'd track for the app you did the teardown on", type: "practice" },
        ]
      },
      {
        label: "Friday-Saturday",
        tasks: [
          { id: "w6-t7", text: "Learn A/B testing concepts: what to test, sample size, statistical significance basics", type: "framework" },
          { id: "w6-t8", text: "Study North Star Metric framework — define North Star for 5 different products", type: "practice" },
          { id: "w6-t9", text: "With Arman: Explain event tracking and analytics from an engineer's perspective. How are events implemented? What's realistic to track?", type: "mentor" },
        ]
      }
    ]
  },
  {
    id: 7,
    title: "Portfolio #2: PRD Writing",
    dateRange: "April 12 – 18",
    goal: "Write a professional Product Requirements Document. Learn Productboard.",
    days: [
      {
        label: "Monday-Tuesday",
        tasks: [
          { id: "w7-t1", text: "Study PRD templates: read Lenny's Newsletter article on PRDs", type: "reading" },
          { id: "w7-t2", text: "Sign up for Productboard free trial. Explore the interface.", type: "tool" },
          { id: "w7-t3", text: "Choose a feature to spec: pick something for a real product you'd improve", type: "portfolio" },
        ]
      },
      {
        label: "Wednesday-Thursday",
        tasks: [
          { id: "w7-t4", text: "Write PRD in Notion: Problem statement, user stories, acceptance criteria, success metrics", type: "portfolio" },
          { id: "w7-t5", text: "Create wireframes in Figma for the feature", type: "portfolio" },
          { id: "w7-t6", text: "Learn to write proper user stories: \"As a [user], I want [action], so that [benefit]\"", type: "framework" },
        ]
      },
      {
        label: "Friday-Saturday",
        tasks: [
          { id: "w7-t7", text: "Polish PRD: add technical considerations section, edge cases, launch plan", type: "portfolio" },
          { id: "w7-t8", text: "Learn about Productboard: feature scoring, roadmap views, feedback collection", type: "tool" },
          { id: "w7-t9", text: "With Arman: Review the PRD as if you were the engineer receiving it. Is it clear? Are acceptance criteria testable? What questions would engineers ask?", type: "mentor" },
        ]
      }
    ]
  },
  {
    id: 8,
    title: "Portfolio #3 + Interview Prep Start",
    dateRange: "April 19 – 25",
    goal: "Complete banking-to-fintech case study. Start interview book.",
    days: [
      {
        label: "Monday-Tuesday",
        tasks: [
          { id: "w8-t1", text: "START PORTFOLIO PIECE #3: Banking-to-Fintech Case Study", type: "portfolio" },
          { id: "w8-t2", text: "Use your AraratBank experience: \"How a traditional banking process could be reimagined as a digital product\"", type: "portfolio" },
          { id: "w8-t3", text: "Important: Don't share confidential info. Keep it conceptual based on public knowledge.", type: "note" },
        ]
      },
      {
        label: "Wednesday-Thursday",
        tasks: [
          { id: "w8-t4", text: "Complete case study with user research insights, proposed solution, metrics, wireframes", type: "portfolio" },
          { id: "w8-t5", text: "Start \"Cracking the PM Interview\" — Part 1 (the PM role) and Part 2 (Product Design questions)", type: "reading" },
          { id: "w8-t6", text: "Publish Portfolio Piece #2 (PRD) on LinkedIn", type: "portfolio" },
        ]
      },
      {
        label: "Friday-Saturday",
        tasks: [
          { id: "w8-t7", text: "Publish Portfolio Piece #3 (case study) on LinkedIn", type: "portfolio" },
          { id: "w8-t8", text: "Continue \"Cracking the PM Interview\" — Part 3 (Estimation) and Part 4 (Behavioral)", type: "reading" },
          { id: "w8-t9", text: "With Arman: First mock interview. Ask: \"How would you improve Idram?\" Practice: clarify → user segments → pain points → solutions → prioritize → metrics.", type: "mentor" },
        ]
      }
    ]
  },
  {
    id: 9,
    title: "Interview Prep Intensive",
    dateRange: "April 26 – May 2",
    goal: "Practice PM interview frameworks. Prepare behavioral stories.",
    days: [
      {
        label: "Monday-Tuesday",
        tasks: [
          { id: "w9-t1", text: "Finish \"Cracking the PM Interview\"", type: "reading" },
          { id: "w9-t2", text: "Write out 5 STAR stories from AraratBank: conflict resolution, influencing stakeholders, tough prioritization, failure/learning, cross-team collaboration", type: "practice" },
          { id: "w9-t3", text: "Practice Product Sense questions: pick 3 random apps, practice \"how would you improve X?\"", type: "practice" },
        ]
      },
      {
        label: "Wednesday-Thursday",
        tasks: [
          { id: "w9-t4", text: "Study common PM case questions: market sizing, go-to-market strategy, competitive analysis", type: "framework" },
          { id: "w9-t5", text: "Practice metrics questions: \"You're PM at Idram. Signups dropped 20% this week. What do you do?\"", type: "practice" },
          { id: "w9-t6", text: "Watch Exponent YouTube channel: PM mock interview videos", type: "video" },
        ]
      },
      {
        label: "Friday-Saturday",
        tasks: [
          { id: "w9-t7", text: "Start \"Escaping the Build Trap\" (short book, finish by next week)", type: "reading" },
          { id: "w9-t8", text: "Practice the \"technical question\": how would you explain to a PM what an API is? What's a database migration?", type: "practice" },
          { id: "w9-t9", text: "With Arman: Full mock interview session (45 min). Cover: 1 product sense, 1 technical, 1 behavioral question. Give honest, detailed feedback.", type: "mentor" },
        ]
      }
    ]
  },
  {
    id: 10,
    title: "Resume + LinkedIn + Applications Start",
    dateRange: "May 3 – 9",
    goal: "Transform resume from Project Manager to Product Manager language. Start applying.",
    days: [
      {
        label: "Monday-Tuesday",
        tasks: [
          { id: "w10-t1", text: "Rewrite resume completely in PM language", type: "practice" },
          { id: "w10-t2", text: "Optimize LinkedIn: headline = \"Product Manager | Fintech | Ex-Banking PM\", PM keywords throughout", type: "practice" },
          { id: "w10-t3", text: "Finish \"Escaping the Build Trap\"", type: "reading" },
        ]
      },
      {
        label: "Wednesday-Thursday",
        tasks: [
          { id: "w10-t4", text: "Research target companies in Yerevan", type: "jobsearch" },
          { id: "w10-t5", text: "Set up job alerts on LinkedIn and Staff.am for \"Product Manager\" \"Product Owner\"", type: "jobsearch" },
          { id: "w10-t6", text: "Apply to first 5 positions", type: "jobsearch" },
        ]
      },
      {
        label: "Friday-Saturday",
        tasks: [
          { id: "w10-t7", text: "Start direct outreach: message 5 PMs at target companies on LinkedIn for coffee chats", type: "jobsearch" },
          { id: "w10-t8", text: "Join Armenian IT Telegram groups, start engaging in discussions", type: "jobsearch" },
          { id: "w10-t9", text: "With Arman: Review resume together. Share your professional network — introduce her to any PMs or product people you know.", type: "mentor" },
        ]
      }
    ]
  },
  {
    id: 11,
    title: "Active Job Search + Networking",
    dateRange: "May 10 – 16",
    goal: "Apply aggressively. Network. Get interviews scheduled.",
    days: [
      {
        label: "Monday-Tuesday",
        tasks: [
          { id: "w11-t1", text: "Apply to 5-10 more positions", type: "jobsearch" },
          { id: "w11-t2", text: "Personalize each application: mention something specific about the company's product", type: "jobsearch" },
          { id: "w11-t3", text: "Follow up with anyone who hasn't responded to your LinkedIn outreach", type: "jobsearch" },
        ]
      },
      {
        label: "Wednesday-Thursday",
        tasks: [
          { id: "w11-t4", text: "Attend any local tech meetups (TUMO, HIVE, Barcamp events)", type: "jobsearch" },
          { id: "w11-t5", text: "Continue practicing interview questions daily (2-3 questions per day)", type: "practice" },
          { id: "w11-t6", text: "Read about target companies' products in depth before interviews", type: "jobsearch" },
        ]
      },
      {
        label: "Friday-Saturday",
        tasks: [
          { id: "w11-t7", text: "Review and refine portfolio pieces based on any feedback received", type: "portfolio" },
          { id: "w11-t8", text: "Practice take-home case study: give yourself 4 hours to complete a mini product challenge", type: "practice" },
          { id: "w11-t9", text: "With Arman: Mock interview #3 — full-length simulation. Include a take-home presentation if relevant to target companies.", type: "mentor" },
        ]
      }
    ]
  },
  {
    id: 12,
    title: "Interview & Close",
    dateRange: "May 17 – 23+",
    goal: "Interview confidently. Negotiate offers. Continue applying until offer accepted.",
    days: [
      {
        label: "Monday-Tuesday",
        tasks: [
          { id: "w12-t1", text: "Company-specific prep for any scheduled interviews", type: "jobsearch" },
          { id: "w12-t2", text: "Research each company's product, competitors, recent news, and business model", type: "jobsearch" },
          { id: "w12-t3", text: "Prepare thoughtful questions to ask interviewers", type: "practice" },
        ]
      },
      {
        label: "Wednesday-Thursday",
        tasks: [
          { id: "w12-t4", text: "Continue applying — never stop until you sign an offer", type: "jobsearch" },
          { id: "w12-t5", text: "Send thank-you notes after every interview within 24 hours", type: "jobsearch" },
          { id: "w12-t6", text: "Debrief each interview: what went well, what to improve", type: "practice" },
        ]
      },
      {
        label: "Friday-Saturday",
        tasks: [
          { id: "w12-t7", text: "If no interviews yet: expand search to remote roles, consider Associate PM or Product Owner titles", type: "jobsearch" },
          { id: "w12-t8", text: "Continue networking — every conversation is a potential referral", type: "jobsearch" },
          { id: "w12-t9", text: "With Arman: Help evaluate any offers: comp, product area, growth opportunity, team quality. If no offers yet, adjust strategy together.", type: "mentor" },
        ]
      }
    ]
  }
];