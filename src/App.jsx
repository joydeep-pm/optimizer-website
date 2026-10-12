import { motion, useScroll, useSpring } from "framer-motion";
import HeroSection from "./components/sections/HeroSection";
import ValueSection from "./components/sections/ValueSection";
import HowItWorksSection from "./components/sections/HowItWorksSection";
import FeaturesSection from "./components/sections/FeaturesSection";
import SecuritySection from "./components/sections/SecuritySection";
import FaqSection from "./components/sections/FaqSection";
import FinalCtaSection from "./components/sections/FinalCtaSection";
import SiteFooter from "./components/SiteFooter";

function SectionFade({ from = "transparent", to = "transparent", height = "80px" }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative z-10"
      style={{
        height,
        background: `linear-gradient(to bottom, ${from}, ${to})`,
      }}
    />
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.2 });

  return (
    <div className="bg-black text-white">
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[90] h-[3px] origin-left bg-[#8c52ff]"
      />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-black"
      >
        Skip to content
      </a>
      <HeroSection />
      <main id="main">
        <SectionFade from="#020202" to="#020202" height="40px" />
        <ValueSection />
        <SectionFade from="#020202" to="#020202" height="48px" />
        <HowItWorksSection />
        <SectionFade from="#020202" to="#020202" height="48px" />
        <FeaturesSection />
        <SecuritySection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}
