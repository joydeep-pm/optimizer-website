import { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import Experience from "../three/Experience";
import { carouselCards, channels, howItWorksRail, howItWorksSection } from "../../content/siteContent";

const EASE = [0.25, 0.1, 0.25, 1.0];

export default function HowItWorksSection() {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!reduceMotion) setProgress(latest);
  });

  return (
    <section id="how-it-works" ref={sectionRef} className="relative border-y border-white/[0.06] bg-[#050505] py-20 md:py-24">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-12 px-4 md:px-8 lg:grid-cols-2">
        <div className="pr-0 lg:pr-10">
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-white/48">{howItWorksSection.eyebrow}</p>
            <h2 className="display-font mt-3 max-w-3xl text-4xl font-bold tracking-tight text-white md:text-6xl">
              {howItWorksSection.title}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/62">{howItWorksSection.body}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {channels.map((channel) => (
                <span key={channel} className="rounded-full border border-white/14 px-3 py-1.5 text-xs text-white/68">
                  {channel}
                </span>
              ))}
            </div>
          </motion.header>

          <div className="mt-10 space-y-3">
            {howItWorksRail.map((step, index) => (
              <motion.article
                key={step.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: index * 0.05, ease: EASE }}
                className="rounded-2xl border border-white/8 bg-white/[0.02] p-5 md:p-6"
              >
                <p className="text-xs uppercase tracking-[0.17em] text-cyan-100/60">{step.step}</p>
                <h3 className="display-font mt-2 text-2xl font-semibold tracking-tight text-white md:text-3xl">
                  {step.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-white/58">{step.line}</p>
                <div className="mt-4 flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.12em] text-white/52">
                  {step.diagramNodes.map((node, nodeIndex) => (
                    <div key={node} className="flex items-center gap-2">
                      <span className="rounded-full border border-white/12 px-2.5 py-1">{node}</span>
                      {nodeIndex < step.diagramNodes.length - 1 ? <span>→</span> : null}
                    </div>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-3 gap-2 lg:hidden" aria-label="Example supported cards">
            {carouselCards.map((card, index) => (
              <div key={card.id} className="relative aspect-[1.58/1] overflow-hidden rounded-lg border border-white/10 bg-white/[0.03]">
                <img
                  src={card.textureUrl}
                  alt={card.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  style={{ transform: `rotate(${(index - 1) * 2}deg) scale(1.03)` }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="sticky top-16 flex h-[76vh] items-center justify-end">
            <div className="relative h-[64vh] w-full max-w-[540px]">
              <div className="absolute inset-0 rounded-2xl border border-white/10 bg-black/60" />
              <div className="relative h-full w-full">
                <Canvas camera={{ position: [0, 0, 4], fov: 38 }} dpr={[1, 1.5]}>
                  <Experience progress={reduceMotion ? 0 : progress} />
                </Canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
