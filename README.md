# Wealth Hero — Card Optimizer Landing Page

A premium landing page for **Card Optimizer**, a credit card co-pilot for premium users in India. The app helps users route spend through the right card, channel, and merchant path to maximize reward yield across an 8-card portfolio.

## Live Sections

| Section | Description |
|---|---|
| **Hero** | Headline, CTA, and animated background |
| **Value Proposition** | Decision canvas with merchant-aware signals, channel-layered logic, and explainable output |
| **How It Works** | Scroll-linked 3D card carousel (HSBC Premier, ICICI Emeralde, Axis Atlas) with step-by-step walkthrough |
| **Features** | Spotlight cards for key product capabilities |
| **Security** | Trust and data-safety messaging |
| **FAQ** | Accordion-style frequently asked questions |

## Tech Stack

- **Framework:** React 19 + Vite 8 (beta)
- **Styling:** Tailwind CSS 4
- **Animation:** Framer Motion 12
- **3D:** Three.js r182, @react-three/fiber 9, @react-three/drei 10
- **Smooth Scroll:** Lenis

## Project Structure

```
src/
├── App.jsx                  # Root layout with section composition
├── main.jsx                 # Entry point with Lenis smooth scroll
├── content/
│   └── siteContent.js       # All copy, card data, and section content
├── components/
│   ├── sections/            # Page sections (Hero, Value, HowItWorks, etc.)
│   ├── three/
│   │   └── Experience.tsx   # 3D card carousel scene
│   └── ui/                  # Reusable UI components (Accordion, FadeIn, SpotlightCard, etc.)
public/
└── cards/                   # Card texture images for 3D carousel
```

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Key Features

- **Scroll-driven 3D carousel** — Three credit cards rotate on scroll using Framer Motion scroll progress and Three.js group transforms
- **Canvas-based card textures** — High-res card images rendered as `MeshPhysicalMaterial` textures with metallic edges
- **Section transitions** — Gradient fades between sections for seamless visual flow
- **Responsive design** — Tailwind-based layout adapting across screen sizes
- **Smooth scrolling** — Lenis integration for buttery scroll experience
