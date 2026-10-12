import { motion, useScroll, useSpring } from "framer-motion";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import SwipeScene from "./components/SwipeScene";
import Moments from "./components/Moments";
import SecuritySection from "./components/sections/SecuritySection";
import FaqSection from "./components/sections/FaqSection";
import FinalCtaSection from "./components/sections/FinalCtaSection";
import SiteFooter from "./components/SiteFooter";

export default function App() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.2 });

  return (
    <div className="bg-bone text-ink">
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[90] h-[3px] origin-left bg-violet"
      />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Marquee />
        <SwipeScene />
        <Moments />
        <SecuritySection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}
