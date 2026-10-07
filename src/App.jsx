import HeroSection from "./components/sections/HeroSection";
import ValueSection from "./components/sections/ValueSection";
import HowItWorksSection from "./components/sections/HowItWorksSection";
import FeaturesSection from "./components/sections/FeaturesSection";
import SecuritySection from "./components/sections/SecuritySection";
import FaqSection from "./components/sections/FaqSection";
import FinalCtaSection from "./components/sections/FinalCtaSection";
import FooterSection from "./components/sections/FooterSection";

export default function App() {
  return (
    <div className="bg-[#020202] text-white">
      <HeroSection />
      <main>
        <ValueSection />
        <HowItWorksSection />
        <FeaturesSection />
        <SecuritySection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <FooterSection />
    </div>
  );
}
