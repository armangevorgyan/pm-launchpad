# PROMPT: Build a PM Career Transition Learning Platform (React)

## Project Overview

Build a single-page React application that serves as a personal learning platform for someone transitioning from Banking Project Manager to IT Product Manager. The platform should feel like a focused, beautiful, interactive study dashboard — not a generic LMS. Think of it as a personal "mission control" for a 12-week career change.

Tech stack: React + Vite + Tailwind CSS + localStorage for persistence (no backend needed).

---

## Core Architecture

```
src/
├── App.jsx                    # Main app with routing
├── index.css                  # Tailwind + custom styles
├── data/
│   ├── weeks.js               # All 12 weeks data (tasks, descriptions)
│   ├── books.js               # Book list with metadata
│   ├── frameworks.js          # PM frameworks data
│   ├── tools.js               # PM tools data
│   └── resources.js           # Links, newsletters, YouTube channels
├── context/
│   └── ProgressContext.jsx     # Global progress state (localStorage backed)
├── hooks/
│   └── useProgress.js         # Custom hook for progress tracking
├── components/
│   ├── Layout/
│   │   ├── Sidebar.jsx        # Navigation sidebar
│   │   ├── Header.jsx         # Top bar with progress summary
│   │   └── MobileNav.jsx      # Bottom nav for mobile
│   ├── Dashboard/
│   │   ├── DashboardPage.jsx  # Main overview page
│   │   ├── ProgressRing.jsx   # Circular progress indicator
│   │   ├── WeekCard.jsx       # Week summary card for dashboard
│   │   ├── StreakCounter.jsx  # Days of consecutive learning
│   │   └── UpcomingTasks.jsx  # Next 5 uncompleted tasks
│   ├── Weeks/
│   │   ├── WeeksPage.jsx      # All 12 weeks overview
│   │   ├── WeekDetail.jsx     # Single week expanded view
│   │   ├── DayBlock.jsx       # Day's tasks with checkboxes
│   │   └── TaskItem.jsx       # Individual checkable task
│   ├── Library/
│   │   ├── LibraryPage.jsx    # Books & reading materials
│   │   ├── BookCard.jsx       # Individual book with progress
│   │   ├── PDFReader.jsx      # Embedded PDF viewer
│   │   └── ReadingList.jsx    # Prioritized reading queue
│   ├── Frameworks/
│   │   ├── FrameworksPage.jsx # PM frameworks reference
│   │   ├── FrameworkCard.jsx  # Expandable framework detail
│   │   └── PracticePrompt.jsx # Practice exercise for each framework
│   ├── Tools/
│   │   ├── ToolsPage.jsx      # PM tools overview
│   │   └── ToolCard.jsx       # Tool with links and learning status
│   ├── Mentor/
│   │   ├── MentorPage.jsx     # "How Arman Can Help" section
│   │   ├── WeeklySession.jsx  # What to cover this week
│   │   └── TechConcepts.jsx   # Technical concepts to teach
│   ├── JobSearch/
│   │   ├── JobSearchPage.jsx  # Job search tracker
│   │   ├── CompanyCard.jsx    # Target company info
│   │   ├── ApplicationTracker.jsx # Track applications sent
│   │   └── InterviewPrep.jsx  # Interview frameworks & practice
│   ├── Notes/
│   │   ├── NotesPage.jsx      # Personal notes / journal
│   │   └── NoteEditor.jsx     # Simple markdown note editor
│   └── Portfolio/
│       ├── PortfolioPage.jsx  # Portfolio pieces tracker
│       └── PortfolioPiece.jsx # Individual piece with checklist
└── utils/
    ├── storage.js             # localStorage helpers
    └── dates.js               # Week date calculations
```

---

## Pages & Features (Detailed)

### 1. Dashboard Page (`/`)

The first thing she sees. Should feel motivating and clear.

**Components:**
- **Overall progress ring** — big circular chart showing % of all tasks completed across 12 weeks
- **Current week highlight** — automatically detects which week based on start date (March 1, 2026), shows current week's progress prominently
- **Streak counter** — shows consecutive days where at least 1 task was checked off. Motivational.
- **Quick stats row** — 4 cards: "Books Read: 2/6", "Frameworks Learned: 8/18", "Portfolio Pieces: 1/3", "Applications Sent: 0"
- **Upcoming tasks** — next 5 uncompleted tasks from the current week, clickable to go to that week
- **Weekly overview grid** — 12 small cards (3×4 grid), each showing week number, title, and a mini progress bar. Color-coded: gray=future, blue=current, green=completed
- **Motivational quote** — rotating PM-related quotes at the top (optional)

**Interactions:**
- Click any week card → navigates to that week's detail page
- Click upcoming task → navigates to the week and scrolls to that task
- Start date picker — let user set their actual start date (defaults to March 1, 2026)

---

### 2. Weeks Page (`/weeks`)

Overview of all 12 weeks with ability to drill into each one.

**Week List View:**
- 12 week cards in a vertical list
- Each card shows: week number, title, date range, progress bar, task count (e.g., "8/14 tasks done")
- Visual status: locked/upcoming (gray), current (blue pulse), in-progress (blue), completed (green with checkmark)
- Expand/collapse each week inline OR click to go to full week detail

**Week Detail View (`/weeks/:weekNumber`):**
- Header with week number, title, date range, overall progress for this week
- **Goal statement** — highlighted box showing the week's goal (e.g., "Goal: Understand what a PM does. Start reading Inspired.")
- **Day blocks** — Monday-Tuesday, Wednesday-Thursday, Friday-Saturday grouped
  - Each day block has a colored header
  - Tasks listed as checkboxes below
  - Tasks with "With Arman:" prefix should be visually distinct (different icon, highlighted border) to indicate mentor sessions
  - Sunday shown as a rest day with light styling
- **Checkbox behavior:**
  - Click to toggle complete/incomplete
  - Completed tasks show strikethrough + green check
  - Progress bar at top updates in real-time
  - Completion state persists in localStorage
- **Week navigation** — Previous/Next week arrows at bottom
- **Notes section** — small text area at bottom of each week for personal notes (saved to localStorage)

**Data for all 12 weeks (embed this content):**

```javascript
// weeks.js — export this data structure
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
```

---

### 3. Library Page (`/library`)

A personal bookshelf and reading tracker with an embedded PDF viewer.

**Book List View:**
- Grid or list of all 6 books with:
  - Cover image (use placeholder or book cover URL)
  - Title, author
  - Status badge: "Not Started" / "In Progress" / "Completed"
  - Scheduled week (e.g., "Week 1-2")
  - Reading progress slider (0-100%)
  - "Open PDF" button (if PDF file is uploaded)
- Sorted by priority order (same as the reading plan)

**PDF Reader:**
- Full-screen or split-pane PDF viewer
- Use `react-pdf` or `@react-pdf-viewer/core` library
- Features needed:
  - Page navigation (prev/next, jump to page)
  - Zoom in/out
  - Remembers last read page per book (localStorage)
  - Bookmark pages
  - Reading progress auto-updates based on current page / total pages
- **Upload mechanism:** Drag-and-drop or file picker to upload PDF files locally. Store file references in localStorage (use File API / IndexedDB for actual PDF storage since localStorage has size limits)
- Books without uploaded PDFs show: "Upload PDF" button + external purchase link

**Additional Reading Section:**
- Daily newsletters with links (Lenny's, Product Compass, SVPG, Department of Product)
- YouTube channels with links
- Quick-add for custom reading resources

**Book data:**
```javascript
export const books = [
  {
    id: "inspired",
    title: "Inspired",
    author: "Marty Cagan",
    description: "THE PM bible. How great product teams work, product discovery vs delivery.",
    weeks: "Week 1-2",
    priority: 1,
    purchaseUrl: "https://www.amazon.com/INSPIRED-Create-Tech-Products-Customers/dp/1119387507",
    coverColor: "#1a365d" // fallback color if no image
  },
  {
    id: "lean-playbook",
    title: "The Lean Product Playbook",
    author: "Dan Olsen",
    description: "Practical step-by-step framework: problem space, solution space, MVP, iteration.",
    weeks: "Week 3-4",
    priority: 2,
    purchaseUrl: "https://www.amazon.com/Lean-Product-Playbook-Innovate-Products/dp/1118960874",
    coverColor: "#2d6a4f"
  },
  {
    id: "dont-make-me-think",
    title: "Don't Make Me Think",
    author: "Steve Krug",
    description: "UX thinking for PMs. Quick read. Changes how you look at every product.",
    weeks: "Week 4",
    priority: 3,
    purchaseUrl: "https://www.amazon.com/Dont-Make-Think-Revisited-Usability/dp/0321965515",
    coverColor: "#9c4221"
  },
  {
    id: "continuous-discovery",
    title: "Continuous Discovery Habits",
    author: "Teresa Torres",
    description: "How PMs talk to users every week. Modern product discovery approach.",
    weeks: "Week 5-6",
    priority: 4,
    purchaseUrl: "https://www.amazon.com/Continuous-Discovery-Habits-Discover-Products/dp/1736633309",
    coverColor: "#553c9a"
  },
  {
    id: "cracking-pm-interview",
    title: "Cracking the PM Interview",
    author: "Gayle McDowell",
    description: "Interview-specific prep. Real questions, frameworks, answer structures.",
    weeks: "Week 8-9",
    priority: 5,
    purchaseUrl: "https://www.amazon.com/Cracking-PM-Interview-Product-Technology/dp/0984782818",
    coverColor: "#b91c1c"
  },
  {
    id: "escaping-build-trap",
    title: "Escaping the Build Trap",
    author: "Melissa Perri",
    description: "How to be a strategic PM, not a feature factory. Great for interviews.",
    weeks: "Week 10",
    priority: 6,
    purchaseUrl: "https://www.amazon.com/Escaping-Build-Trap-Effective-Management/dp/149197379X",
    coverColor: "#0e7490"
  }
];
```

---

### 4. Frameworks Page (`/frameworks`)

A reference wiki of all PM frameworks she needs to learn.

**Layout:** Card grid, each framework expandable to full detail.

**Each framework card shows:**
- Framework name
- Category badge (Discovery, Prioritization, Metrics)
- One-line description
- "Learned" toggle (checkbox, persisted)
- Expand → shows:
  - Full explanation
  - How to practice it
  - Interview tip
  - Related week in the curriculum

**Organize by category tabs:**
- Product Discovery & User Research (JTBD, User Interviews, Personas, Journey Mapping, Problem Validation)
- Prioritization & Strategy (RICE, North Star, OKRs, Roadmaps, Opportunity Solution Tree, Value vs Effort)
- Product Metrics & Analytics (Funnel, Cohort, A/B Testing, SaaS Metrics, CAC/LTV/Churn, DAU/MAU)

**Search/filter:** Simple text search across all frameworks.

---

### 5. Tools Page (`/tools`)

PM tools reference with learning status tracking.

**Two sections:**
1. **Must-Know Tools** — Amplitude, Productboard, Figma, Notion, Miro/FigJam, Hotjar, Maze
2. **Good to Understand** — Jira/Linear, Mixpanel, Google Analytics, Looker/Metabase

**Each tool card:**
- Tool name and icon/logo
- What PMs use it for (1-2 sentences)
- Free tier availability
- Estimated learning time
- Status: Not Started / Learning / Comfortable (selectable, persisted)
- "Open Tool" link to the tool's website
- "Tutorial" link (link to official tutorials or YouTube)

---

### 6. Mentor Page (`/mentor`)

The "How Arman Can Help" section — organized by week.

**Layout:**
- Current week's session highlighted at top
- All 12 weekly sessions listed below
- Each session shows:
  - Week number
  - Arman's role that week (e.g., "Review her PRD as an engineer")
  - Detailed description of what to do
  - Checkbox: "Session completed"
  - Notes text area for session takeaways

**Technical Concepts Reference:**
- Table/cards of 7 technical concepts Arman should teach
- Each shows: concept name, simple analogy explanation, why PM needs it
- Toggle: "She understands this" (tracked)

---

### 7. Job Search Page (`/jobs`)

Job application tracker and interview prep hub.

**Application Tracker:**
- Add new application: company name, role, date applied, link, status
- Status options: Applied → Phone Screen → Interview → Take-Home → Offer → Rejected
- Kanban board view (drag between columns) OR simple table view
- Stats: total applied, response rate, interviews scheduled

**Target Companies Section:**
- Pre-populated list of Yerevan companies from the plan:
  - Fintech: Ameriabank Digital, IDBank, Converse Digital, Telcell, Idram, FastShift
  - SaaS/B2B: Krisp, SoloLearn, Podcastle, ServiceTitan
  - Consumer: PicsArt, SuperApp/Menu.am, GG
  - Startups: HIVE, EPIC, EIF incubators
- Each with: company type tag, "Why apply" note, "Applied" toggle

**Where to Search:**
- Links to LinkedIn, Staff.am, CareerCenter.am, company career pages
- Saved search queries

**Interview Prep Section:**
- Interview types: Product Sense, Analytical/Metrics, Technical, Behavioral, Strategy, Case Study
- Each type has: description, sample questions, preparation tips
- Resume transformation reference table (Project Manager → Product Manager language)

---

### 8. Portfolio Page (`/portfolio`)

Track the 3 portfolio pieces with detailed checklists.

**Three portfolio pieces:**

1. **Product Teardown**
   - Checklist: Choose app → Analyze problem/users/business model → Identify 3 UX issues → Propose improvements → RICE scoring → Figma wireframes → Write up in Notion → Publish on LinkedIn
   - Status: Not Started / In Progress / Published
   - Link field: LinkedIn post URL

2. **PRD (Product Requirements Document)**
   - Checklist: Choose feature → Problem statement → User stories → Acceptance criteria → Wireframes → Success metrics → Technical considerations → Engineer review → Publish
   - Status tracking + link field

3. **Banking-to-Fintech Case Study**
   - Checklist: Choose topic → Research → User insights → Proposed solution → Metrics → Wireframes → Write up → Publish
   - Status tracking + link field
   - Warning badge: "Don't share confidential info"

---

### 9. Notes Page (`/notes`)

Simple personal journal for the learning journey.

**Features:**
- Create new note with title and date
- Simple rich text or markdown editor
- Tag notes by week (Week 1-12) or category (Book Notes, Framework Notes, Interview Prep, Ideas)
- Search through notes
- All persisted in localStorage

---

## Design System

### Visual Style
- **Theme:** Clean, modern, slightly playful but professional. Think Linear or Notion aesthetic.
- **Primary color:** Blue (#2563EB) — trust, professionalism
- **Accent color:** Violet (#7C3AED) — for mentor sessions, special highlights
- **Success:** Green (#16A34A) — completed items
- **Warning:** Amber (#D97706) — deadlines approaching
- **Danger:** Red (#DC2626) — important notes, alerts
- **Background:** Very light gray (#F8FAFC) with white cards
- **Dark mode support** — toggle in header

### Task Type Color Coding
Each task type should have a subtle color indicator (small dot or left border):
- 📖 `reading` — Blue
- 🎥 `video` — Purple
- 🧠 `framework` — Teal
- ✏️ `practice` — Orange
- 🛠️ `tool` — Gray
- 📋 `portfolio` — Green
- 👨‍💻 `mentor` — Violet (highlighted with border)
- 🔧 `setup` — Light blue
- 📝 `course` — Indigo
- 💼 `jobsearch` — Amber
- 😴 `rest` — Light gray, muted
- 📌 `note` — Yellow

### Typography
- Headings: Inter or system font, bold
- Body: 16px base, good line height (1.6)
- Monospace for any code/technical references

### Components
- Cards with subtle shadows and rounded corners (8px)
- Progress bars: rounded, animated fill
- Checkboxes: custom styled, satisfying animation on check (small scale bounce + checkmark draw)
- Sidebar: collapsible on desktop, bottom nav on mobile
- Toast notifications for achievements ("Week 3 completed! 🎉")

### Responsive
- Desktop: Sidebar + main content
- Tablet: Collapsible sidebar
- Mobile: Bottom tab navigation, full-width cards

---

## State Management & Persistence

### localStorage Schema
```javascript
{
  // Task completion
  "pm-tracker-tasks": {
    "w1-t1": { completed: true, completedAt: "2026-03-01T10:30:00Z" },
    "w1-t2": { completed: false },
    // ... all task IDs
  },
  
  // Book progress
  "pm-tracker-books": {
    "inspired": { status: "in-progress", progress: 65, lastPage: 142, bookmarks: [12, 45, 89] },
    "lean-playbook": { status: "not-started", progress: 0 },
    // ...
  },
  
  // PDF files stored in IndexedDB (too large for localStorage)
  // Key: book ID, Value: ArrayBuffer of PDF
  
  // Framework learning status
  "pm-tracker-frameworks": {
    "jtbd": { learned: true, learnedAt: "2026-03-10" },
    "rice": { learned: true },
    // ...
  },
  
  // Tool learning status
  "pm-tracker-tools": {
    "amplitude": { status: "learning" },
    "figma": { status: "comfortable" },
    // ...
  },
  
  // Job applications
  "pm-tracker-applications": [
    { id: "app-1", company: "Krisp", role: "Product Manager", dateApplied: "2026-05-03", status: "applied", link: "https://..." },
    // ...
  ],
  
  // Notes
  "pm-tracker-notes": [
    { id: "note-1", title: "JTBD for Idram", content: "...", date: "2026-03-10", tags: ["Week 2", "Framework Notes"] },
    // ...
  ],
  
  // Mentor sessions
  "pm-tracker-mentor": {
    "week-1": { completed: true, notes: "Arman explained..." },
    // ...
  },
  
  // Portfolio pieces
  "pm-tracker-portfolio": {
    "teardown": { status: "in-progress", checklist: { "choose-app": true, "analyze": true, "ux-issues": false }, linkedInUrl: "" },
    // ...
  },
  
  // Settings
  "pm-tracker-settings": {
    startDate: "2026-03-01",
    darkMode: false,
    name: "" // optional personalization
  },
  
  // Streak tracking
  "pm-tracker-streak": {
    currentStreak: 5,
    longestStreak: 12,
    lastActiveDate: "2026-03-15",
    activeDates: ["2026-03-01", "2026-03-02", ...] // for heatmap
  }
}
```

---

## Key NPM Dependencies

```json
{
  "dependencies": {
    "react": "^18.x",
    "react-dom": "^18.x",
    "react-router-dom": "^6.x",
    "react-pdf": "^7.x",       // PDF viewer
    "idb-keyval": "^6.x",       // IndexedDB for PDF storage
    "lucide-react": "^0.x",     // Icons
    "framer-motion": "^10.x",   // Animations (optional)
    "date-fns": "^3.x",         // Date utilities
    "react-beautiful-dnd": "^13.x", // Drag and drop for kanban (optional)
    "react-markdown": "^9.x"    // For notes editor
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.x",
    "tailwindcss": "^3.x",
    "autoprefixer": "^10.x",
    "postcss": "^8.x",
    "vite": "^5.x"
  }
}
```

---

## Implementation Priority

Build in this order:

1. **Project setup** — Vite + React + Tailwind + Router + localStorage utils
2. **Data files** — All weeks, books, frameworks, tools data
3. **Sidebar/Layout** — Navigation shell
4. **Weeks page + task checkboxes** — Core functionality, this is the most important page
5. **Dashboard** — Progress tracking, stats, streak
6. **Library** — Book list with progress tracking
7. **PDF Reader** — Upload + view PDFs with progress memory
8. **Frameworks page** — Reference cards with learned toggle
9. **Tools page** — Tools with status tracking
10. **Mentor page** — Weekly sessions
11. **Portfolio page** — Piece tracking with checklists
12. **Job Search** — Application tracker
13. **Notes** — Journal
14. **Polish** — Animations, dark mode, responsive fixes, achievements/toasts

---

## Bonus Features (If Time Allows)

- **Achievement system** — Unlock badges: "First Task Done", "Week 1 Complete", "All Books Read", "Portfolio Published", "10 Applications Sent"
- **Activity heatmap** — GitHub-style contribution graph showing daily activity
- **Timer/Pomodoro** — Built-in focus timer for study sessions
- **Export progress** — Download progress as JSON for backup or sharing
- **Import/Export** — Full data backup and restore
- **Confetti animation** — When completing a full week
- **Spaced repetition** — Flash cards for PM frameworks
