"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import Magnetic from "./Magnetic";

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  recommended: boolean;
  color: string;
  glow: string;
}

export default function Pricing() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const projectPlans: PricingPlan[] = [
    {
      name: "Starter Reel / Shorts",
      price: "₹500",
      period: "per project",
      description: "Ideal for short viral clips, quick social reels, and high-retention short-form edits.",
      features: [
        "Up to 60 seconds runtime",
        "Kinetic captions & hook editing",
        "Pacing cuts & audio balancing",
        "Basic visual overlays & transitions",
        "2 revision cycles",
        "Fast 24-48hr turnaround"
      ],
      recommended: false,
      color: "border-white/5",
      glow: "rgba(0, 240, 255, 0.05)"
    },
    {
      name: "Cinematic Package",
      price: "₹1,500",
      period: "per project",
      description: "Perfect for premium commercial ads, brand narratives, and high-end video edits.",
      features: [
        "Up to 5 minutes runtime",
        "DaVinci Resolve HDR color grading",
        "Advanced visual rhythm & pacing",
        "Custom motion tracking overlays",
        "Immersive sound design & cleanup",
        "Priority 3-5 day delivery"
      ],
      recommended: true,
      color: "border-neon-purple/40 shadow-[0_0_30px_rgba(189,0,255,0.15)]",
      glow: "rgba(189, 0, 255, 0.2)"
    },
    {
      name: "Shoot + Edit Package",
      price: "₹2,500",
      period: "per session",
      description: "Complete end-to-end production featuring professional on-location video shooting and complete editing.",
      features: [
        "On-location video shoot & camera setup",
        "Professional audio & mic recording",
        "Full video editing & cinematic color grade",
        "Kinetic captions & motion graphics",
        "Multi-angle framing & storyboarding",
        "Raw footage + final rendered exports"
      ],
      recommended: false,
      color: "border-white/5",
      glow: "rgba(255, 0, 127, 0.05)"
    }
  ];

  return (
    <section
      id="pricing"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-center bg-[#030306] px-6 py-24 lg:px-24 overflow-hidden border-t border-white/5"
    >
      {/* Background Neon glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-radial from-[rgba(0,240,255,0.04)] to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-radial from-[rgba(189,0,255,0.04)] to-transparent blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl w-full mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-3 justify-center"
          >
            <span className="h-1 w-8 bg-electric-blue rounded-full" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-electric-blue font-syne">
              Investment Guides
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-bold font-syne text-white tracking-tight"
          >
            Transparent Pricing <br />
            <span className="text-neutral-400">Engineered For Value.</span>
          </motion.h2>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {projectPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 35 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              whileHover={{ y: -8 }}
              className={`relative rounded-3xl p-8 glass flex flex-col justify-between border cursor-none shadow-lg ${plan.color}`}
              data-cursor={plan.recommended ? "popular" : "invest"}
            >
              {/* Highlight badge for recommended */}
              {plan.recommended && (
                <div className="absolute top-0 right-8 -translate-y-1/2 glass border border-neon-purple/40 rounded-full px-3 py-1 text-[9px] font-bold text-neon-purple uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-neon-purple animate-pulse" />
                  Highly Recommended
                </div>
              )}

              {/* Top Plan Headers */}
              <div>
                <h3 className="text-xl font-bold font-syne text-white tracking-tight mb-2">
                  {plan.name}
                </h3>
                <p className="text-xs text-neutral-400 font-light leading-relaxed mb-6">
                  {plan.description}
                </p>
                
                {/* Price tag */}
                <div className="flex items-baseline gap-2 mb-8 pb-6 border-b border-white/5">
                  <span className="text-4xl sm:text-5xl font-extrabold font-syne text-white tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-xs text-neutral-500 font-medium font-mono uppercase tracking-wider">
                    / {plan.period}
                  </span>
                </div>

                {/* Features list */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex gap-3 items-center text-xs text-neutral-300">
                      <div className="h-4.5 w-4.5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                        <Check className="h-3 w-3 text-electric-blue" />
                      </div>
                      <span className="font-light">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Order Button CTA */}
              <div className="mt-auto pt-6 border-t border-white/5">
                <Magnetic strength={0.15}>
                  <a
                    href="#contact"
                    className={`w-full py-3.5 rounded-xl font-bold text-xs tracking-wider uppercase text-center block transition-all duration-300 interactive-item ${
                      plan.recommended
                        ? "bg-linear-to-r from-electric-blue to-neon-purple text-neutral-900 shadow-[0_0_20px_rgba(189,0,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)]"
                        : "glass text-white border-white/10 hover:bg-white/5"
                    }`}
                  >
                    Select Plan
                  </a>
                </Magnetic>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
