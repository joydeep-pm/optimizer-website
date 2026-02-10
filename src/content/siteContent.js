export const videoUrls = [
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260207_050933_33e2620d-09cd-43a2-80ef-4cdbb42f4194.mp4",
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260207_%20050933_33e2620d-09cd-43a2-80ef-4cdbb42f4194.mp4",
];

export const navLinks = [
  { label: "Product", href: "#product" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Security", href: "#security" },
  { label: "FAQ", href: "#faq" },
];

export const channels = ["Online", "Offline", "UPI", "Portal"];

export const carouselCards = [
  {
    id: "hsbc-premier",
    name: "HSBC Premier",
    textureUrl: "/cards/hsbc-premier.png",
    edgeColor: "#cfd4dd",
  },
  {
    id: "icici-emeralde",
    name: "ICICI Emeralde",
    textureUrl: "/cards/icici-emeralde.png",
    edgeColor: "#c8a258",
  },
  {
    id: "axis-atlas",
    name: "Axis Atlas",
    textureUrl: "/cards/axis-atlas.png",
    edgeColor: "#949aa4",
  },
];

export const hero = {
  eyebrow: "Credit Card Co-Pilot for Premium Users in India",
  headline: "Turn Every Swipe Into Smarter Reward Yield",
  subheadline:
    "Card Optimizer helps you route spend through the right card, channel, and merchant path using a precision 8-card portfolio and merchant-specific reward logic.",
  secondaryCtaLabel: "See How It Works",
  secondaryCtaHref: "#how-it-works",
};

export const valueSection = {
  eyebrow: "Value Proposition",
  title: "Card strategy visualized as decisions, not paragraphs.",
  body: "Compact product signals show where default habits leak value and where recommendation logic finds stronger routes.",
  signalLabel: "Live decision surface",
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
  title: "A visual flow from spend intent to route decision",
  body: "Follow one guided rail from context capture to recommendation clarity.",
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
  eyebrow: "Feature Pillars",
  title: "Card-first capability tiles with high-signal visual cues",
  body: "Spotlight interaction is concentrated here so this section feels most premium and alive.",
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
      title: "Precision Card Vault Logic",
      microCopy: "Keep recommendations scoped to high-signal card configurations.",
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

export const securitySection = {
  eyebrow: "Security and Trust",
  title: "Trust signals designed into the decision layer",
  body: "Card Optimizer focuses on recommendation intelligence with transparent, responsible product framing.",
  bullets: [
    "Routing guidance is separated from payment execution paths.",
    "Decision logic is tied to interpretable context and card behavior.",
    "Claim language avoids guaranteed-return framing.",
  ],
  panels: [
    {
      title: "Transparent Logic Signals",
      point: "Each recommendation is tied to context clues users can inspect.",
      signalType: "trace",
      tag: "Trace",
    },
    {
      title: "Responsible Policy Framing",
      point: "Guidance is designed around issuer variability and evolving terms.",
      signalType: "policy",
      tag: "Policy",
    },
  ],
};

export const faqList = [
  {
    question: "How does Card Optimizer choose a recommendation?",
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
    question: "What happens after I join the waitlist?",
    answer: "You receive launch timing updates and onboarding instructions as access opens.",
    tag: "Waitlist",
  },
];

export const disclaimer =
  "Illustrative examples. Terms, exclusions, caps, and issuer rules apply.";
