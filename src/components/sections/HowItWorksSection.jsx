import { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import Experience from "../three/Experience";
import { carouselCards, channels, howItWorksRail, howItWorksSection } from "../../content/siteContent";

const EASE = [0.25, 0.1, 0.25, 1.0];

export default function HowItWorksSection() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setProgress(latest);
  });

  return (
    <section id="how-it-works" ref={sectionRef} className="relative bg-[#020202]">
      {/* Top fade — blends with previous section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-32"
        style={{ background: "linear-gradient(to bottom, #020202, transparent)" }}
      />
      {/* Bottom fade — blends into next section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-32"
        style={{ background: "linear-gradient(to top, #020202, transparent)" }}
      />
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-10 px-4 md:px-8 lg:grid-cols-2">
        <div className="pr-0 lg:pr-10">
          <motion.header
            className="pt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <p className="text-left text-sm uppercase tracking-[0.2em] text-[#b49cff]">
              {howItWorksSection.eyebrow}
            </p>
            <h2 className="display-font mt-3 max-w-3xl text-left text-4xl font-bold tracking-tight text-white md:text-6xl">
              {howItWorksSection.title}
            </h2>
            <p className="mt-3 max-w-2xl text-left text-base leading-relaxed text-white/74">
              {howItWorksSection.body}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {channels.map((channel) => (
                <span
                  key={channel}
                  className="rounded-full border border-white/18 bg-black/40 px-3 py-1.5 text-xs uppercase tracking-[0.12em] text-white/84"
                >
                  {channel}
                </span>
              ))}
            </div>
          </motion.header>

          <div className="mt-3">
            {howItWorksRail.map((step, index) => (
              <div
                key={step.step}
                className={
                  index === 0
                    ? "flex min-h-[42vh] items-center md:min-h-[38vh]"
                    : "flex min-h-[38vh] items-center md:min-h-[34vh]"
                }
              >
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.45 }}
                  transition={{ duration: 0.55, delay: index * 0.05, ease: EASE }}
                  className="w-full text-left"
                >
                  <p className="text-left text-sm uppercase tracking-[0.17em] text-[#b49cff]">{step.step}</p>
                  <h3 className="display-font mt-3 max-w-xl text-left text-3xl font-semibold tracking-tight text-white md:text-5xl">
                    {step.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-left text-lg leading-relaxed text-white/72">
                    {step.line}
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-2 overflow-hidden rounded-full border border-white/16 bg-black/35 px-3 py-2">
                    {step.diagramNodes.map((node, nodeIndex) => (
                      <div key={node} className="flex items-center gap-2">
                        <span className="rounded-full border border-white/20 bg-white/[0.07] px-2.5 py-1 text-xs uppercase tracking-[0.12em] text-white/82">
                          {node}
                        </span>
                        {nodeIndex < step.diagramNodes.length - 1 ? (
                          <span className="text-white/45">→</span>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </motion.article>
              </div>
            ))}
          </div>
        </div>

        <div className="-mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 lg:hidden">
          {carouselCards.map((card) => (
            <img
              key={card.id}
              src={card.textureUrl}
              alt={`${card.name}, illustrative card`}
              loading="lazy"
              className="w-[78%] max-w-sm shrink-0 snap-center rounded-2xl shadow-[0_20px_60px_rgba(140,82,255,0.3)]"
            />
          ))}
        </div>

        <div className="relative hidden lg:block">
          <div className="sticky top-0 flex h-screen items-center justify-end">
            <div className="relative h-[70vh] w-full max-w-[540px]">
              {/* Background panel with border — sits behind the card */}
              <div className="absolute inset-0 rounded-2xl border border-white/12 bg-[radial-gradient(circle_at_50%_52%,rgba(140,82,255,0.38),rgba(2,2,2,0.92)_68%)]" />
              {/* Canvas sits on top — no overflow clip so card isn't cut during rotation */}
              <div className="relative h-full w-full">
                <Canvas camera={{ position: [0, 0, 3.9], fov: 38 }} dpr={[1, 1.75]} frameloop={reduceMotion ? "demand" : "always"}>
                  <Experience progress={progress} />
                </Canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
