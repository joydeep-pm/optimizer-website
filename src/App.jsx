import HeroSection from "./components/sections/HeroSection";
import ValueSection from "./components/sections/ValueSection";
import HowItWorksSection from "./components/sections/HowItWorksSection";
import FeaturesSection from "./components/sections/FeaturesSection";
import SecuritySection from "./components/sections/SecuritySection";
import FaqSection from "./components/sections/FaqSection";

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
  return (
    <div className="bg-black text-white">
      <HeroSection />
      <main>
        <SectionFade from="#020202" to="#020202" height="40px" />
        <ValueSection />
        <SectionFade from="#020202" to="#020202" height="48px" />
        <HowItWorksSection />
        <SectionFade from="#020202" to="#020202" height="48px" />
        <FeaturesSection />
        <SecuritySection />
        <FaqSection />
      </main>
    </div>
  );
}
