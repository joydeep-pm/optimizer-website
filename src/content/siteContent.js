export const videoUrls = ["/media/hero.mp4"];
export const heroPoster = "/media/hero-poster.jpg";

export const navLinks = [
  { label: "Product", href: "#product" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Your data", href: "#your-data" },
  { label: "FAQ", href: "#faq" },
];

export const channels = ["Online", "Offline", "UPI", "Portal"];

export const carouselCards = [
  {
    id: "premium-travel",
    name: "Premium Travel",
    textureUrl: "/cards/premium-travel.png",
    edgeColor: "#cfd4dd",
  },
  {
    id: "metal-rewards",
    name: "Metal Rewards",
    textureUrl: "/cards/metal-rewards.png",
    edgeColor: "#c8a258",
  },
  {
    id: "everyday-cashback",
    name: "Everyday Cashback",
    textureUrl: "/cards/everyday-cashback.png",
    edgeColor: "#949aa4",
  },
];

export const hero = {
  eyebrow: "For premium credit card users in India",
  headline: "Turn Every Swipe Into Smarter Reward Yield",
  subheadline:
    "Tell it where you are spending and how you are paying. Card Co-Pilot shows which of your cards to use, and why.",
  secondaryCtaLabel: "See How It Works",
  secondaryCtaHref: "#how-it-works",
};

export const valueSection = {
  eyebrow: "Why Card Co-Pilot",
  title: "Know which card to use before you pay.",
  body: "Most people default to one card for everything. Card Co-Pilot weighs the merchant, the channel and each card's reward rules so the better route is obvious.",
  signalLabel: "Try it",
  decisionPanel: {
    title: "Decision Canvas",
    subtitle: "Merchant context, channel intent, and rule logic converge into one clear recommendation lane.",
    stages: ["Intent", "Rule Match", "Route Choice"],
    traces: [
      "from-cyan-300/70 via-cyan-300/20 to-transparent",
      "from-fuchsia-300/65 via-fuchsia-300/20 to-transparent",
      "from-emerald-300/70 via-emerald-300/20 to-transparent",
    ],
  },
  supportItems: [
    {
      title: "Merchant-aware signal",
      body: "Recommendations flex to merchant-specific reward behavior.",
      badge: "Signal",
    },
    {
      title: "Channel-layered logic",
      body: "Online, offline, UPI, and portal routes are evaluated differently.",
      badge: "Layer",
    },
    {
      title: "Explainable output",
      body: "Each route ships with concise reasoning, not black-box scoring.",
      badge: "Explain",
    },
  ],
};

export const howItWorksSection = {
  eyebrow: "How It Works",
  title: "Three steps from merchant to the right card",
  body: "Say where you are spending, let the rules run, then pick a route.",
};

export const howItWorksRail = [
  {
    step: "Step A",
    title: "Search Merchant + Spend Channel",
    line: "Start with merchant context and channel intent.",
    diagramNodes: ["Merchant", "Channel", "Context"],
  },
  {
    step: "Step B",
    title: "Evaluate Reward Intelligence",
    line: "Run rule-aware checks before you decide to pay.",
    diagramNodes: ["Rule Set", "Card Fit", "Signal"],
  },
  {
    step: "Step C",
    title: "Choose the Best Card Route",
    line: "Select one route with clear recommendation support.",
    diagramNodes: ["Recommendation", "Action", "Review"],
  },
];

export const featuresSection = {
  eyebrow: "What you get",
  title: "Built around how you actually spend",
  body: "Merchant, channel and card rules weighed together, so one card is not your answer to everything.",
};

export const featureRows = {
  row1: [
    {
      title: "Merchant-Aware Optimization",
      microCopy: "Use merchant signals to avoid flat one-card behavior.",
      statusTag: "Merchant-aware",
      iconKey: "merchant",
      badgeTone: "positive",
      tone: "mint",
      signalState: "Active",
      signalTone: "info",
    },
    {
      title: "Channel Strategy Layer",
      microCopy: "Treat spend channels as strategic routing variables.",
      statusTag: "Channel-layered",
      iconKey: "channel",
      badgeTone: "info",
      tone: "blue",
      signalState: "Adaptive",
      signalTone: "amber",
    },
  ],
  row2: [
    {
      title: "Yield Visibility",
      microCopy: "Read reward direction before finalizing your payment path.",
      statusTag: "Signal clarity",
      iconKey: "yield",
      badgeTone: "info",
      tone: "amber",
      signalState: "Ready",
      signalTone: "info",
    },
    {
      title: "Milestones and expiring points",
      microCopy: "Track spend milestones and points before they expire.",
      statusTag: "Portfolio fit",
      iconKey: "vault",
      badgeTone: "info",
      tone: "mint",
      signalState: "Active",
      signalTone: "amber",
    },
    {
      title: "Recommendation Clarity",
      microCopy: "Get one clear route with concise decision rationale.",
      statusTag: "Decision ready",
      iconKey: "clarity",
      badgeTone: "positive",
      tone: "blue",
      signalState: "Adaptive",
      signalTone: "info",
    },
  ],
  row3: {
    title: "Explainability by Design",
    microCopy:
      "Understand why a recommendation wins for the chosen context through concise, human-readable logic traces.",
    statusTag: "Explainable",
    iconKey: "explain",
    badgeTone: "info",
    tone: "mint",
    signalState: "Ready",
    signalTone: "amber",
  },
};

export const trustLedger = {
  eyebrow: "Your data",
  title: "What it reads, and what it never does",
  body: "Card Co-Pilot is still in development. This is how it is planned to work, and details may change before launch.",
  reads: {
    heading: "What it reads",
    items: [
      {
        title: "The cards you add and the merchants you search",
        note: "So it can recommend from the cards you actually hold.",
        tag: "Core",
      },
      {
        title: "Gmail, read-only",
        note: "Only if you connect it, and you can skip it during setup. Used to decode card statements so milestones and expiring points can be tracked.",
        tag: "Optional, planned",
      },
      {
        title: "Bank transaction SMS",
        note: "Only if you turn it on, where your phone supports it. Parsed on your phone, with an option to confirm each one before it is saved.",
        tag: "Optional, planned",
      },
    ],
  },
  never: {
    heading: "What it never does",
    items: [
      {
        title: "Make payments for you",
        note: "Routing guidance is kept separate from payment execution. You pay as usual.",
      },
      {
        title: "Promise returns",
        note: "Rewards depend on issuer terms, caps and exclusions that change over time.",
      },
    ],
  },
  privacyLabel: "Read the privacy notice",
};

export const faqList = [
  {
    question: "How does Card Co-Pilot choose a recommendation?",
    answer:
      "Recommendations blend merchant context, channel intent, and rule-aware card behavior into one route suggestion.",
    tag: "Decision logic",
  },
  {
    question: "Are recommendation outcomes guaranteed?",
    answer:
      "No. Outcomes depend on issuer terms, exclusions, caps, and program updates that can change over time.",
    tag: "Expectations",
  },
  {
    question: "Which spend channels are covered?",
    answer: "Current channel modeling includes online, offline, UPI, and portal routes.",
    tag: "Coverage",
  },
  {
    question: "Does Card Co-Pilot make payments for me?",
    answer:
      "No. Routing guidance is kept separate from payment execution. It tells you which card route to use, and you pay as usual.",
    tag: "Payments",
  },
  {
    question: "Does Card Co-Pilot read my email or SMS?",
    answer:
      "Only if you choose to. You can connect Gmail with read-only access so card statements can be decoded to track milestones and expiring points, and you can skip this during setup. Bank transaction SMS can be parsed on your phone, with an option to confirm each one before it is saved.",
    tag: "Your data",
  },
  {
    question: "When can I use it?",
    answer:
      "Card Co-Pilot is still in development. Joining the waitlist means you hear about launch timing first.",
    tag: "Status",
  },
  {
    question: "What happens after I join the waitlist?",
    answer: "You receive launch timing updates and onboarding instructions as access opens.",
    tag: "Waitlist",
  },
];

export const disclaimer =
  "Illustrative examples. Terms, exclusions, caps, and issuer rules apply.";
