import HeroSection from "./components/sections/HeroSection";
import ValueSection from "./components/sections/ValueSection";
import HowItWorksSection from "./components/sections/HowItWorksSection";
import FeaturesSection from "./components/sections/FeaturesSection";
import SecuritySection from "./components/sections/SecuritySection";
import FaqSection from "./components/sections/FaqSection";

export default function App() {
  return (
    <div className="bg-black text-white">
      <HeroSection />
      <main>
        <ValueSection />
        <HowItWorksSection />
        <FeaturesSection />
        <SecuritySection />
        <FaqSection />
      </main>
    </div>
  );
}
