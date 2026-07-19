"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Play, Sparkles, BarChart, FileText, Share2, Compass } from "lucide-react";

interface ShowcaseItem {
  id: number;
  title: string;
  category: string;
  icon: React.ReactNode;
  animationElement: React.ReactNode;
  description: string;
}

export default function MotionShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const marqueeWords = [
    "KEYFRAMES", "TIMELINE", "COLOR GRADING", "RENDER ENGINE", "60 FPS", 
    "MOTION BLUR", "SOUND DESIGN", "VFX PIPELINE", "VELOCITY RAMPS", "LUMETRI",
    "MASKING", "AUDIO CUES", "STORYBOARD", "TRACKING NODES"
  ];

  const showcaseItems: ShowcaseItem[] = [
    {
      id: 1,
      title: "Interactive Logo Animation",
      category: "Logo Reveal",
      icon: <Compass className="h-5 w-5 text-electric-blue" />,
      description: "Organic vector path sweep. Hover to trigger paths drawing and glow ignition.",
      animationElement: (
        <div className="relative w-full h-full flex items-center justify-center bg-black/60 rounded-xl overflow-hidden group/logo">
          <svg viewBox="0 0 100 100" className="w-24 h-24">
            {/* Background ring */}
            <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="4" />
            {/* Glow circle */}
            <circle cx="50" cy="50" r="30" fill="none" stroke="#bd00ff" strokeWidth="2" strokeDasharray="188" strokeDashoffset="188" className="group-hover/logo:stroke-dash-0 transition-all duration-1000 ease-in-out" />
            {/* Draw star lines */}
            <motion.path
              d="M 50 15 L 60 40 L 85 50 L 60 60 L 50 85 L 40 60 L 15 50 L 40 40 Z"
              fill="none"
              stroke="#00f0ff"
              strokeWidth="2.5"
              strokeDasharray="240"
              initial={{ strokeDashoffset: 240 }}
              whileHover={{ strokeDashoffset: 0, scale: 1.05 }}
              transition={{ duration: 0.8 }}
            />
            {/* Center dot */}
            <circle cx="50" cy="50" r="4" fill="#bd00ff" />
          </svg>
          <div className="absolute bottom-2 text-[8px] text-neutral-500 font-mono">HOVER TO INITIALIZE PATHS</div>
        </div>
      )
    },
    {
      id: 2,
      title: "Kinetic Typography Slice",
      category: "Text Animation",
      icon: <FileText className="h-5 w-5 text-neon-purple" />,
      description: "Dynamic typographic splits representing cutting motion. Hover to trigger slice animation.",
      animationElement: (
        <div className="relative w-full h-full flex flex-col items-center justify-center bg-black/60 rounded-xl overflow-hidden group/text p-4">
          <div className="text-center font-extrabold font-syne text-2xl tracking-tighter uppercase relative select-none">
            {/* Normal word */}
            <span className="block text-white group-hover/text:opacity-0 transition-opacity duration-300">CUT THE FLOW</span>
            
            {/* Slice simulation */}
            <div className="absolute inset-0 opacity-0 group-hover/text:opacity-100 transition-opacity duration-300">
              <span className="absolute top-0 left-0 right-0 h-1/2 overflow-hidden text-electric-blue translate-x-[-4px] translate-y-[-2px] border-b border-white/10">CUT THE FLOW</span>
              <span className="absolute bottom-0 left-0 right-0 h-1/2 overflow-hidden text-neon-purple translate-x-[4px] translate-y-[2px] flex items-end justify-center">CUT THE FLOW</span>
            </div>
          </div>
          <div className="absolute bottom-2 text-[8px] text-neutral-500 font-mono mt-2">HOVER TO TRIGGER SLICE</div>
        </div>
      )
    },
    {
      id: 3,
      title: "Interactive Infographics",
      category: "Infographic Motion",
      icon: <BarChart className="h-5 w-5 text-amber-500" />,
      description: "Interactive data rendering representing views. Hover to grow values.",
      animationElement: (
        <div className="relative w-full h-full flex flex-col items-center justify-center bg-black/60 rounded-xl overflow-hidden group/info p-6">
          <div className="w-full flex items-end justify-around h-24 gap-2 mb-2">
            {[40, 75, 55, 95, 65, 80].map((h, i) => (
              <div key={i} className="flex-1 bg-neutral-800 rounded-t-sm h-full flex items-end">
                <motion.div
                  className="w-full bg-linear-to-t from-electric-blue to-neon-purple rounded-t-sm"
                  initial={{ height: "15%" }}
                  whileHover={{ height: `${h}%` }}
                  transition={{ type: "spring", stiffness: 100, damping: 10 }}
                  style={{ height: "15%" }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between w-full text-[8px] font-mono text-neutral-400">
            <span>JAN</span>
            <span>MAR</span>
            <span>MAY</span>
            <span>JUL</span>
            <span>SEP</span>
            <span>NOV</span>
          </div>
          <div className="absolute bottom-2 text-[8px] text-neutral-500 font-mono">HOVER BARS TO ENERGIZE</div>
        </div>
      )
    },
    {
      id: 4,
      title: "Social Media Overlay Engine",
      category: "Social Motion",
      icon: <Share2 className="h-5 w-5 text-neon-pink" />,
      description: "Portrait mobile mock elements tracking dynamic notification sweeps. Hover to play templates.",
      animationElement: (
        <div className="relative w-full h-full flex items-center justify-center bg-black/60 rounded-xl overflow-hidden group/social p-4">
          {/* Simulated phone UI */}
          <div className="w-32 aspect-[9/16] glass border border-white/10 rounded-lg relative overflow-hidden p-2 flex flex-col justify-end">
            <div className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-red-500" />
            
            {/* Sliding overlays */}
            <motion.div
              className="glass border border-electric-blue/20 rounded p-1 mb-1.5"
              initial={{ x: -60, opacity: 0 }}
              whileHover={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="w-6 h-1.5 bg-electric-blue/20 rounded mb-0.5" />
              <div className="w-16 h-1 bg-white/20 rounded" />
            </motion.div>

            <motion.div
              className="glass border border-neon-purple/20 rounded p-1"
              initial={{ x: 60, opacity: 0 }}
              whileHover={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-8 h-1.5 bg-neon-purple/20 rounded mb-0.5" />
              <div className="w-12 h-1 bg-white/20 rounded" />
            </motion.div>
          </div>
          <div className="absolute bottom-2 text-[8px] text-neutral-500 font-mono">HOVER PHONE FOR CAPTION SWEEPS</div>
        </div>
      )
    }
  ];

  return (
    <section
      id="motion"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-center bg-[#030306] py-24 overflow-hidden border-t border-white/5"
    >
      {/* Background Glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-radial from-[rgba(0,240,255,0.04)] to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-radial from-[rgba(189,0,255,0.04)] to-transparent blur-3xl pointer-events-none" />

      {/* Infinite Scrolling Typography Marquee (Looped) */}
      <div className="w-full overflow-hidden border-y border-white/5 py-6 bg-black/35 backdrop-blur-md mb-20 relative select-none">
        {/* Double container for seamless wrap */}
        <div className="flex w-max animate-marquee">
          <div className="flex gap-16 pr-16 items-center">
            {marqueeWords.map((word, i) => (
              <span key={i} className="text-3xl md:text-5xl font-extrabold font-syne text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-700 tracking-wider">
                {word}
              </span>
            ))}
          </div>
          <div className="flex gap-16 pr-16 items-center">
            {marqueeWords.map((word, i) => (
              <span key={`dup-${i}`} className="text-3xl md:text-5xl font-extrabold font-syne text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-700 tracking-wider">
                {word}
              </span>
            ))}
          </div>
        </div>

        {/* CSS Animation embedded in a style block for compatibility */}
        <style jsx global>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 25s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}</style>
      </div>

      <div className="relative z-10 max-w-7xl w-full mx-auto px-6 lg:px-24">
        {/* Header */}
        <div className="text-left mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-3"
          >
            <span className="h-1 w-8 bg-electric-blue rounded-full" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-electric-blue font-syne">
              Animation Lab
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-bold font-syne text-white tracking-tight"
          >
            Motion Graphic Engine <br />
            <span className="text-neutral-400">Interactive Visual Experiments.</span>
          </motion.h2>
        </div>

        {/* Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {showcaseItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 35 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              className="glass p-6 rounded-2xl border border-white/5 hover:border-white/10 flex flex-col md:flex-row gap-6 items-center group cursor-none"
              data-cursor="interact"
            >
              {/* Animation Box */}
              <div className="w-full md:w-1/2 aspect-square max-w-[200px] shrink-0">
                {item.animationElement}
              </div>

              {/* Text Description Details */}
              <div className="flex-1 flex flex-col justify-between h-full py-2">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-electric-blue font-mono mb-1.5 block">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-bold font-syne text-white mb-2 tracking-tight group-hover:text-electric-blue transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
                
                {/* Trigger tag indicator */}
                <div className="mt-4 flex items-center gap-1.5 opacity-40 group-hover:opacity-100 transition-opacity duration-300">
                  <Sparkles className="h-3.5 w-3.5 text-neon-purple" />
                  <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest">
                    Ready to render
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
