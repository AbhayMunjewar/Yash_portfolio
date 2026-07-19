"use client";

import { motion } from "framer-motion";
import { Play, ArrowRight, Video, Scissors, Award, Sparkles } from "lucide-react";
import Magnetic from "./Magnetic";
import ThreeCanvas from "./ThreeCanvas";

export default function Hero() {
  const words = "I Transform Raw Footage Into Cinematic Stories.".split(" ");

  // Container variants for staggered word animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  // Individual word variants
  const wordVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
      },
    },
  };

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030306] px-6 py-20 lg:px-24">
      {/* 3D WebGL background */}
      <ThreeCanvas />

      {/* Background radial glowing ambient lights */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-radial from-[rgba(0,240,255,0.08)] to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] rounded-full bg-radial from-[rgba(189,0,255,0.08)] to-transparent blur-3xl pointer-events-none" />

      {/* Grid overlay lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left side: Hero Text details */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">
          {/* Tag badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-white/10 w-fit mb-6"
          >
            <Sparkles className="h-4.5 w-4.5 text-electric-blue animate-pulse" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-electric-blue">
              Freelance Video Editor & Motion Graphics
            </span>
          </motion.div>

          {/* Heading word reveal */}
          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold font-syne leading-[1.1] tracking-tight bg-gradient-to-b from-white via-white to-neutral-400 bg-clip-text text-transparent"
          >
            {words.map((word, i) => (
              <span key={i} className="inline-block mr-[0.25em] overflow-hidden py-1">
                <motion.span variants={wordVariants} className="inline-block">
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-6 text-neutral-400 text-lg md:text-xl max-w-xl font-light leading-relaxed"
          >
            Creating premium cinematic cuts, dynamic explainer animations, and high-impact sound design that captures views and increases conversion.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="mt-10 flex flex-wrap gap-4 sm:gap-6 items-center"
          >
            <Magnetic strength={0.25}>
              <a
                href="#portfolio"
                data-cursor="view"
                className="group relative px-8 py-4 rounded-full bg-linear-to-r from-electric-blue to-neon-purple text-black font-semibold text-sm tracking-wide shadow-[0_0_30px_rgba(0,240,255,0.3)] hover:shadow-[0_0_40px_rgba(189,0,255,0.5)] transition-all duration-300 flex items-center gap-2 overflow-hidden interactive-item"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 text-neutral-900 font-bold">View Portfolio</span>
                <Play className="h-4 w-4 fill-neutral-900 stroke-neutral-900 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Magnetic>

            <Magnetic strength={0.25}>
              <a
                href="#contact"
                data-cursor="hire"
                className="group px-8 py-4 rounded-full border border-white/10 glass hover:bg-white/5 transition-all duration-300 flex items-center gap-2 interactive-item text-white font-medium"
              >
                <span>Let's Create</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 text-neon-purple" />
              </a>
            </Magnetic>
          </motion.div>
        </div>

        {/* Right side: Futuristic Post-Production Workspace UI */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ delay: 0.6, duration: 1.2, type: "spring" }}
          className="lg:col-span-5 relative w-full aspect-[4/3] max-w-lg mx-auto pointer-events-none select-none perspective-[1000px]"
        >
          {/* Glass Video Workspace container */}
          <div className="relative w-full h-full glass-premium rounded-2xl overflow-hidden border border-white/10 p-4 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            {/* Header: Timeline indicators */}
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
              </div>
              <div className="text-[10px] text-neutral-500 font-mono tracking-widest">
                00:04:12:18
              </div>
              <div className="flex items-center gap-1">
                <Video className="h-3.5 w-3.5 text-neon-purple" />
                <span className="text-[9px] text-neutral-400 uppercase tracking-widest font-mono">Sequencer_v2</span>
              </div>
            </div>

            {/* Video preview simulator box */}
            <div className="relative flex-1 my-3 bg-black/60 rounded-lg border border-white/5 overflow-hidden flex items-center justify-center">
              {/* Grid backdrop */}
              <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:15px_15px]" />
              
              {/* Mock tracking coordinates */}
              <div className="absolute top-2 left-2 text-[8px] text-white/40 font-mono">
                [X: 341.22] [Y: 104.90]
              </div>
              <div className="absolute bottom-2 right-2 text-[8px] text-electric-blue/60 font-mono">
                FX // LUMETRI_COLOR
              </div>

              {/* Central Motion Graphic vector wire animation */}
              <svg className="w-4/5 h-4/5 text-electric-blue/40" viewBox="0 0 200 150">
                {/* Motion track curve */}
                <motion.path
                  d="M 10 100 Q 60 20, 110 90 T 190 40"
                  fill="none"
                  stroke="rgba(0, 240, 255, 0.4)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
                {/* Connecting grid line */}
                <motion.line
                  x1="110" y1="90" x2="110" y2="10"
                  stroke="rgba(189, 0, 255, 0.3)"
                  strokeWidth="1"
                />
                {/* Keyframe vectors */}
                <motion.circle
                  cx="110" cy="90" r="4"
                  fill="#bd00ff"
                  animate={{ r: [4, 7, 4] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
                <motion.circle
                  cx="60" cy="55" r="3"
                  fill="#00f0ff"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }}
                />
                {/* Scanning sweep lines */}
                <motion.line
                  x1="0" y1="0" x2="200" y2="0"
                  stroke="rgba(0, 240, 255, 0.6)"
                  strokeWidth="1"
                  animate={{ y: [0, 150, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                />
              </svg>

              {/* Rendering tag */}
              <div className="absolute top-2 right-2 glass border border-electric-blue/20 rounded px-1.5 py-0.5 text-[8px] font-mono text-electric-blue flex items-center gap-1 animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-electric-blue" />
                RENDERING REEL_2026.mp4 (94%)
              </div>
            </div>

            {/* Bottom timeline track tracks */}
            <div className="space-y-1">
              {/* Timeline marker bar */}
              <div className="relative h-2 bg-neutral-900 rounded-xs overflow-hidden">
                <div className="absolute top-0 bottom-0 left-[62%] w-0.5 bg-red-500 shadow-[0_0_6px_red]" />
                <div className="absolute top-0 bottom-0 left-0 right-[40%] bg-electric-blue/15 rounded-xs" />
              </div>

              {/* V1 Track */}
              <div className="flex items-center gap-2">
                <span className="text-[8px] text-white/50 w-4 font-mono">V1</span>
                <div className="flex-1 grid grid-cols-12 gap-1 h-3.5">
                  <div className="col-span-4 bg-electric-blue/25 border border-electric-blue/35 rounded-xs" />
                  <div className="col-span-5 bg-neon-purple/20 border border-neon-purple/35 rounded-xs relative">
                    {/* Keyframe nodes inside */}
                    <div className="absolute top-1 left-3 w-1.5 h-1.5 bg-electric-blue rounded-full" />
                    <div className="absolute top-1 right-4 w-1.5 h-1.5 bg-white rounded-full" />
                  </div>
                  <div className="col-span-3 bg-neutral-800 border border-white/5 rounded-xs" />
                </div>
              </div>

              {/* A1 Track */}
              <div className="flex items-center gap-2">
                <span className="text-[8px] text-white/50 w-4 font-mono">A1</span>
                <div className="flex-1 grid grid-cols-12 gap-1 h-3.5">
                  <div className="col-span-3 bg-emerald-500/20 border border-emerald-500/35 rounded-xs" />
                  <div className="col-span-6 bg-emerald-500/20 border border-emerald-500/35 rounded-xs relative overflow-hidden">
                    {/* Simulated Waveform lines */}
                    <div className="absolute inset-0 flex items-center justify-around px-1 opacity-60">
                      {[1,3,2,4,2,3,1,2,3,4,1,2,3,2,1].map((h, i) => (
                        <div
                          key={i}
                          className="w-0.5 bg-emerald-400"
                          style={{ height: `${h * 20}%` }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="col-span-3 bg-neutral-800 border border-white/5 rounded-xs" />
                </div>
              </div>
            </div>
          </div>

          {/* Decorative floating stats elements around workspace */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -top-6 -right-6 glass border border-white/10 rounded-lg p-2.5 flex items-center gap-2 shadow-lg"
          >
            <div className="h-8 w-8 rounded-full bg-neon-purple/10 flex items-center justify-center border border-neon-purple/30">
              <Award className="h-4.5 w-4.5 text-neon-purple" />
            </div>
            <div>
              <div className="text-[9px] text-neutral-400 font-mono">CLIENT RATING</div>
              <div className="text-xs font-bold text-white leading-none">5.0 / 5.0 (Awwwards)</div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
            className="absolute -bottom-6 -left-6 glass border border-white/10 rounded-lg p-2.5 flex items-center gap-2 shadow-lg"
          >
            <div className="h-8 w-8 rounded-full bg-electric-blue/10 flex items-center justify-center border border-electric-blue/30">
              <Scissors className="h-4.5 w-4.5 text-electric-blue" />
            </div>
            <div>
              <div className="text-[9px] text-neutral-400 font-mono">KEYFRAMES COMPLETED</div>
              <div className="text-xs font-bold text-white leading-none">120K+ Frames</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Mouse Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-65">
        <span className="text-[9px] uppercase tracking-widest text-neutral-500 font-mono">
          Scroll Down
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-5 h-9 rounded-full border border-neutral-600 p-1 flex justify-center"
        >
          <div className="w-1 h-2 bg-electric-blue rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}
