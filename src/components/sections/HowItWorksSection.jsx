import { Canvas } from "@react-three/fiber";
import { Scroll, ScrollControls } from "@react-three/drei";
import { motion } from "framer-motion";
import Experience from "../three/Experience";
import { channels, howItWorksRail, howItWorksSection } from "../../content/siteContent";

const EASE = [0.25, 0.1, 0.25, 1.0];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative h-[300vh] bg-[#020202]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <Canvas
          className="pointer-events-none h-full w-full"
          camera={{ position: [0, 0, 4], fov: 34 }}
          dpr={[1, 1.8]}
          gl={{ antialias: true, alpha: true }}
        >
          <color attach="background" args={["#020202"]} />

          <ScrollControls pages={3} damping={0.14}>
            <Scroll>
              <Experience />
            </Scroll>

            <Scroll html>
              <div className="mx-auto grid h-[300vh] max-w-[1240px] grid-cols-1 gap-8 px-4 md:px-8 lg:grid-cols-2">
                <div className="z-20 pr-0 lg:pr-12">
                  {howItWorksRail.map((step, index) => (
                    <div key={step.step} className="flex h-screen items-center">
                      <motion.article
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.45 }}
                        transition={{ duration: 0.55, delay: index * 0.05, ease: EASE }}
                        className="pointer-events-auto w-full text-left"
                      >
                        {index === 0 ? (
                          <>
                            <p className="text-left text-xs uppercase tracking-[0.2em] text-white/55">
                              {howItWorksSection.eyebrow}
                            </p>
                            <h2 className="display-font mt-4 max-w-3xl text-left text-4xl font-bold tracking-tight text-white md:text-6xl">
                              {howItWorksSection.title}
                            </h2>
                            <p className="mt-4 max-w-2xl text-left text-base leading-relaxed text-white/74">
                              {howItWorksSection.body}
                            </p>

                            <div className="mt-5 flex flex-wrap gap-2">
                              {channels.map((channel) => (
                                <span
                                  key={channel}
                                  className="rounded-full border border-white/18 bg-black/40 px-3 py-1.5 text-xs uppercase tracking-[0.12em] text-white/84"
                                >
                                  {channel}
                                </span>
                              ))}
                            </div>
                          </>
                        ) : null}

                        <div className={index === 0 ? "mt-8" : ""}>
                          <p className="text-left text-xs uppercase tracking-[0.17em] text-cyan-100/75">{step.step}</p>
                          <h3 className="display-font mt-3 max-w-xl text-left text-4xl font-semibold tracking-tight text-white md:text-5xl">
                            {step.title}
                          </h3>
                          <p className="mt-4 max-w-xl text-left text-lg leading-relaxed text-white/72">
                            {step.line}
                          </p>

                          <div className="mt-6 flex items-center gap-2 overflow-hidden rounded-full border border-white/16 bg-black/35 px-3 py-2">
                            {step.diagramNodes.map((node, nodeIndex) => (
                              <div key={node} className="flex items-center gap-2">
                                <span className="rounded-full border border-white/20 bg-white/[0.07] px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-white/82">
                                  {node}
                                </span>
                                {nodeIndex < step.diagramNodes.length - 1 ? (
                                  <span className="text-white/45">→</span>
                                ) : null}
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.article>
                    </div>
                  ))}
                </div>

                <div className="hidden lg:block" />
              </div>
            </Scroll>
          </ScrollControls>
        </Canvas>
      </div>
    </section>
  );
}
