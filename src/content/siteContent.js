export const navLinks = [
  { label: "Moments", href: "#moments" },
  { label: "Your data", href: "#your-data" },
  { label: "FAQ", href: "#faq" },
];

export const carouselCards = [
  {
    id: "premium-travel",
    name: "Premium Travel",
    textureUrl: "/cards/premium-travel.webp",
    edgeColor: "#cfd4dd",
  },
  {
    id: "metal-rewards",
    name: "Metal Rewards",
    textureUrl: "/cards/metal-rewards.webp",
    edgeColor: "#c8a258",
  },
  {
    id: "everyday-cashback",
    name: "Everyday Cashback",
    textureUrl: "/cards/everyday-cashback.webp",
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
        title: "Your Google account name and email",
        note: "To sign you in to the app.",
        tag: "Required for the app",
      },
      {
        title: "Gmail, read-only",
        note: "Only if you connect it, and you can skip it during setup. Used to decode card statements and transaction alerts so milestones and expiring points can be tracked.",
        tag: "Optional, planned",
      },
      {
        title: "Bank transaction SMS",
        note: "Only if you turn it on, and on Android only. Parsed on your phone, with an option to review each one before it counts.",
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
      "Only if you choose to. You can connect Gmail with read-only access so card statements can be decoded to track milestones and expiring points, and you can skip this during setup. Bank transaction SMS can be parsed on your Android phone, with an option to review each one before it counts.",
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

export const pickerSpends = [
  { id: "food", label: "Food delivery", winner: 2, why: "Everyday spend suits the cashback card." },
  { id: "travel", label: "Travel", winner: 0, why: "Travel spend is where a travel card earns most." },
  { id: "shopping", label: "Online shopping", winner: 1, why: "A rewards card can lead on larger online purchases." },
  { id: "fuel", label: "Fuel", winner: 2, why: "Small, frequent spends favour simple cashback." },
  { id: "hotels", label: "Hotels", winner: 0, why: "Hotel stays are a travel-card category." },
];

export const marqueeItems = [
  "Food delivery",
  "Online shopping",
  "Travel",
  "Hotels",
  "Fuel",
  "Groceries",
  "UPI",
  "Utilities",
  "Dining out",
  "Subscriptions",
];

export const moments = [
  {
    n: "01",
    kicker: "Before you pay",
    title: "Know the card before the cashier asks.",
    body: "Search the merchant and see which of your cards fits, with the reason in one line.",
  },
  {
    n: "02",
    kicker: "Across the month",
    title: "Milestones and points, noticed in time.",
    body: "Track spend milestones and points that expire, so a bonus is not missed by a few days.",
  },
  {
    n: "03",
    kicker: "Behind the scenes",
    title: "You choose what it reads.",
    body: "Connect Gmail or turn on SMS only if you want to. Both start off.",
  },
];
