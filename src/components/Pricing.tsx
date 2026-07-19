"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Check, Sparkles, AlertCircle, HelpCircle } from "lucide-react";
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

  const [isRetainer, setIsRetainer] = useState(false);

  const projectPlans: PricingPlan[] = [
    {
      name: "Starter Reel",
      price: "$499",
      period: "per project",
      description: "Ideal for short promotional clips, quick social reels, or basic editing mockups.",
      features: [
        "Up to 60 seconds runtime",
        "Raw footage assembly & pacing",
        "Basic motion graphics (titles/logo)",
        "Sound leveling & foley sync",
        "3 revision cycles",
        "4-day delivery turnaround"
      ],
      recommended: false,
      color: "border-white/5",
      glow: "rgba(0, 240, 255, 0.05)"
    },
    {
      name: "Cinematic Package",
      price: "$1,299",
      period: "per project",
      description: "Perfect for premium commercial ads, corporate brand narratives, or high-end music films.",
      features: [
        "Up to 5 minutes runtime",
        "Advanced visual rhythm pacing",
        "Custom tracking motion overlays",
        "DaVinci Resolve HDR color grading",
        "Immersive sound design & cleanup",
        "5 revision cycles",
        "Priority 7-day delivery"
      ],
      recommended: true,
      color: "border-neon-purple/40 shadow-[0_0_30px_rgba(189,0,255,0.15)]",
      glow: "rgba(189, 0, 255, 0.2)"
    },
    {
      name: "Advanced VFX Master",
      price: "$2,499",
      period: "per project",
      description: "Tailored for projects requiring heavy CGI integration, compositing, and visual overlays.",
      features: [
        "Up to 10 minutes runtime",
        "Complex 3D graphics integration",
        "Green-screen keying & rotoscoping",
        "High-fidelity custom grading curves",
        "Cinema-grade multi-channel audio",
        "Unlimited revisions (during editing)",
        "Dedicated project pipeline"
      ],
      recommended: false,
      color: "border-white/5",
      glow: "rgba(255, 0, 127, 0.05)"
    }
  ];

  const retainerPlans: PricingPlan[] = [
    {
      name: "Creator Kit",
      price: "$1,499",
      period: "per month",
      description: "For active creators needing a continuous pipeline of high-retention shorts and stories.",
      features: [
        "Up to 12 vertical shorts / reels per month",
        "Algorithmic hook formatting",
        "Kinetic subtitles & auto-emojis",
        "Audio trend synchronization",
        "Slack chat support channel",
        "48-hour turnarounds on edits"
      ],
      recommended: false,
      color: "border-white/5",
      glow: "rgba(0, 240, 255, 0.05)"
    },
    {
      name: "Studio retainer",
      price: "$2,999",
      period: "per month",
      description: "Your dedicated editing team. Ideal for channels publishing multiple long-form videos.",
      features: [
        "Up to 4 long-form videos (under 15m) + 8 shorts",
        "Full thumbnail integration (A/B testing ready)",
        "End-to-end sound design & color matching",
        "Dedicated asset templates libraries",
        "Same-day Slack communications",
        "72-hour turnarounds on long cuts"
      ],
      recommended: true,
      color: "border-neon-purple/40 shadow-[0_0_30px_rgba(189,0,255,0.15)]",
      glow: "rgba(189, 0, 255, 0.2)"
    },
    {
      name: "Agency Partner",
      price: "$5,499",
      period: "per month",
      description: "Scale your creative operations. Full bandwidth allocation for brands and creative agencies.",
      features: [
        "Unlimited short-form + up to 10 long-form videos",
        "Complete asset management & storage",
        "Dedicated weekly sync meetings",
        "Premium VFX & 3D renders included",
        "Priority emergency renders (24hr)",
        "Custom master templates layout"
      ],
      recommended: false,
      color: "border-white/5",
      glow: "rgba(255, 0, 127, 0.05)"
    }
  ];

  const activePlans = isRetainer ? retainerPlans : projectPlans;

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
        <div className="text-center mb-12">
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

        {/* Toggle Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center items-center gap-4 mb-16 select-none"
        >
          <span className={`text-xs font-semibold tracking-wider font-mono transition-colors duration-300 ${!isRetainer ? "text-white" : "text-neutral-500"}`}>
            PROJECT BASIS
          </span>
          
          <button
            onClick={() => setIsRetainer(!isRetainer)}
            className="w-14 h-8 rounded-full bg-neutral-900 border border-white/10 p-1 flex items-center transition-colors duration-300 relative cursor-none"
            data-cursor="toggle"
          >
            <motion.div
              layout
              className="w-5 h-5 rounded-full bg-linear-to-r from-electric-blue to-neon-purple shadow-[0_0_10px_rgba(0,240,255,0.4)]"
              animate={{ x: isRetainer ? 24 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          </button>

          <span className={`text-xs font-semibold tracking-wider font-mono transition-colors duration-300 ${isRetainer ? "text-white" : "text-neutral-500"} flex items-center gap-1.5`}>
            MONTHLY RETAINER
            <span className="glass border border-neon-pink/30 rounded px-1.5 py-0.5 text-[8px] font-bold text-neon-pink uppercase tracking-widest animate-pulse">
              Save 15%
            </span>
          </span>
        </motion.div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {activePlans.map((plan, index) => (
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
