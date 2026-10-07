export const videoUrls = [
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260207_050933_33e2620d-09cd-43a2-80ef-4cdbb42f4194.mp4",
];

export const navLinks = [
  { label: "Product", href: "#product" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Trust", href: "#security" },
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
  eyebrow: "Credit card co-pilot for premium users in India",
  headline: "Know exactly which credit card to use — before you pay.",
  subheadline:
    "Enter the merchant and how you're paying. Card Optimizer compares your cards, reward rules and payment routes to recommend the strongest option — with a clear reason why.",
  secondaryCtaLabel: "See a recommendation",
  secondaryCtaHref: "#product",
};

export const valueSection = {
  eyebrow: "See it in action",
  title: "One spend. One clear recommendation.",
  body:
    "Card Optimizer turns a messy rewards calculation into a simple decision: which card to use, how to pay and why that route ranks above the alternatives.",
  supportItems: [
    {
      title: "Tell us where you're spending",
      body: "Merchant and spend context set the starting point for the comparison.",
    },
    {
      title: "Choose how you're paying",
      body: "Online, offline, UPI and issuer portals can produce different outcomes.",
    },
    {
      title: "See the best route and why",
      body: "Get one recommended path with the relevant rule logic made visible.",
    },
  ],
};

export const howItWorksSection = {
  eyebrow: "How it works",
  title: "From spend intent to a decision in three steps",
  body: "The product does the comparison work before you pay, while keeping the recommendation understandable.",
};

export const howItWorksRail = [
  {
    step: "Step 01",
    title: "Enter the merchant and payment channel",
    line: "Start with where you're spending and whether you're paying online, offline, through UPI or via a portal.",
    diagramNodes: ["Merchant", "Channel", "Spend"],
  },
  {
    step: "Step 02",
    title: "Compare your eligible cards",
    line: "Card Optimizer evaluates relevant reward rules, exclusions, caps and route-specific benefits.",
    diagramNodes: ["Rules", "Cards", "Caps"],
  },
  {
    step: "Step 03",
    title: "Use the strongest route",
    line: "See the recommended card and payment path, plus a concise explanation of why it wins.",
    diagramNodes: ["Recommendation", "Reason", "Pay"],
  },
];

export const featuresSection = {
  eyebrow: "Built for real card decisions",
  title: "The parts of credit card optimization that are easy to miss",
  body: "A recommendation should account for the merchant, payment channel, current card rules and the trade-offs behind the final choice.",
};

export const featureRows = {
  row1: [
    {
      title: "Merchant-aware comparison",
      microCopy: "Avoid treating every transaction as if the same card always wins.",
      statusTag: "Merchant",
      iconKey: "merchant",
      badgeTone: "positive",
      tone: "mint",
      signalState: "Context",
      signalTone: "info",
    },
    {
      title: "Payment-route awareness",
      microCopy: "Compare online, offline, UPI and portal routes instead of only the card.",
      statusTag: "Channel",
      iconKey: "channel",
      badgeTone: "info",
      tone: "blue",
      signalState: "Adaptive",
      signalTone: "amber",
    },
  ],
  row2: [
    {
      title: "Reward comparison",
      microCopy: "See the relative reward direction before committing to a payment path.",
      statusTag: "Compare",
      iconKey: "yield",
      badgeTone: "info",
      tone: "amber",
      signalState: "Visible",
      signalTone: "info",
    },
    {
      title: "Portfolio-based recommendations",
      microCopy: "Keep recommendations relevant to the cards you actually hold.",
      statusTag: "Portfolio",
      iconKey: "vault",
      badgeTone: "info",
      tone: "mint",
      signalState: "Personal",
      signalTone: "amber",
    },
    {
      title: "One clear answer",
      microCopy: "Reduce the mental math to a single recommended route for the spend context.",
      statusTag: "Decision",
      iconKey: "clarity",
      badgeTone: "positive",
      tone: "blue",
      signalState: "Clear",
      signalTone: "info",
    },
  ],
  row3: {
    title: "Explainable by design",
    microCopy:
      "See the reason behind a recommendation instead of relying on an unexplained score.",
    statusTag: "Explainable",
    iconKey: "explain",
    badgeTone: "info",
    tone: "mint",
    signalState: "Transparent",
    signalTone: "amber",
  },
};

export const securitySection = {
  eyebrow: "Trust and accuracy",
  title: "Useful guidance needs clear boundaries.",
  body:
    "Card Optimizer is designed as a recommendation layer, not a payment executor. Recommendations should remain inspectable and account for the fact that issuer rules can change.",
  panels: [
    {
      title: "Recommendations, not payments",
      point: "The product is designed to help you choose a route before payment rather than execute the transaction itself.",
    },
    {
      title: "Show the reason",
      point: "A recommendation should identify the merchant, channel or rule context that materially affected the result.",
    },
    {
      title: "Issuer terms still apply",
      point: "Reward rates, caps, exclusions and eligibility can change. Recommendations should be checked against current issuer terms.",
    },
  ],
};

export const faqList = [
  {
    question: "How does Card Optimizer choose a recommendation?",
    answer:
      "It compares the merchant, payment channel and relevant card rules to rank the available routes and explain the strongest option.",
    tag: "How it works",
  },
  {
    question: "Does Card Optimizer make the payment for me?",
    answer:
      "No. Card Optimizer is designed to recommend a card and payment route before you pay; it does not execute the transaction.",
    tag: "Payments",
  },
  {
    question: "Are reward outcomes guaranteed?",
    answer:
      "No. Issuer terms, exclusions, caps, eligibility and program rules can change, so actual reward outcomes can differ.",
    tag: "Accuracy",
  },
  {
    question: "Which payment channels are considered?",
    answer:
      "The current product framing includes online, offline, UPI and issuer or merchant portal routes.",
    tag: "Coverage",
  },
  {
    question: "What happens after I join the waitlist?",
    answer:
      "You'll receive launch and onboarding updates as access becomes available.",
    tag: "Waitlist",
  },
];

export const disclaimer =
  "Illustrative examples only. Actual rewards depend on current issuer terms, exclusions, caps and eligibility.";
