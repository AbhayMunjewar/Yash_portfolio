"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Sparkles, CheckCircle2, Monitor, Cpu, Workflow } from "lucide-react";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  // Interactive 3D tilt coordinates
  const tiltRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tiltRef.current) return;
    const { left, top, width, height } = tiltRef.current.getBoundingClientRect();
    const clientX = e.clientX - left;
    const clientY = e.clientY - top;
    
    // Normalize coordinates from -0.5 to 0.5
    const xVal = (clientX / width) - 0.5;
    const yVal = (clientY / height) - 0.5;
    
    // Limit tilt degree (max 8 degrees)
    setTilt({
      x: xVal * 16,
      y: -yVal * 16,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Software stack data
  // Software stack data
  const software = [
    {
      name: "After Effects",
      level: "1.5+ Yrs Exp",
      description: "Advanced VFX & Motion Graphics",
      color: "rgba(189, 0, 255, 0.4)",
      svg: (
        <svg viewBox="0 0 100 100" className="w-12 h-12">
          <rect x="10" y="10" width="80" height="80" rx="15" fill="#0c0720" stroke="#bd00ff" strokeWidth="2" />
          <text x="50" y="62" fill="#bd00ff" fontSize="36" fontWeight="bold" fontFamily="var(--font-syne)" textAnchor="middle">Ae</text>
        </svg>
      )
    },
    {
      name: "CapCut Pro",
      level: "3+ Yrs Exp",
      description: "Short-Form Hooks & Fast Cuts",
      color: "rgba(0, 240, 255, 0.4)",
      svg: (
        <svg viewBox="0 0 100 100" className="w-12 h-12">
          <rect x="10" y="10" width="80" height="80" rx="15" fill="#05141e" stroke="#00f0ff" strokeWidth="2" />
          <path d="M30 35 L50 25 L70 35 L70 65 L50 75 L30 65 Z" fill="none" stroke="#00f0ff" strokeWidth="3" />
          <path d="M40 45 L60 55 M60 45 L40 55" stroke="#00f0ff" strokeWidth="3" strokeLinecap="round" />
        </svg>
      )
    },
    {
      name: "Premiere Pro",
      level: "3+ Yrs Exp",
      description: "Long-Form & Multi-Cam Pacing",
      color: "rgba(0, 240, 255, 0.4)",
      svg: (
        <svg viewBox="0 0 100 100" className="w-12 h-12">
          <rect x="10" y="10" width="80" height="80" rx="15" fill="#05141e" stroke="#00f0ff" strokeWidth="2" />
          <text x="50" y="62" fill="#00f0ff" fontSize="36" fontWeight="bold" fontFamily="var(--font-syne)" textAnchor="middle">Pr</text>
        </svg>
      )
    },
    {
      name: "DaVinci Resolve",
      level: "Professional",
      description: "Color Correction & Grading",
      color: "rgba(255, 120, 0, 0.4)",
      svg: (
        <svg viewBox="0 0 100 100" className="w-12 h-12">
          <rect x="10" y="10" width="80" height="80" rx="15" fill="#140f0c" stroke="#ff7800" strokeWidth="2" />
          <circle cx="50" cy="50" r="22" fill="none" stroke="#ff7800" strokeWidth="3" />
          <circle cx="50" cy="50" r="12" fill="#ff7800" />
        </svg>
      )
    },
    {
      name: "Sound Design",
      level: "Professional",
      description: "Audio Cleanup & Foley Layers",
      color: "rgba(16, 185, 129, 0.4)",
      svg: (
        <svg viewBox="0 0 100 100" className="w-12 h-12">
          <rect x="10" y="10" width="80" height="80" rx="15" fill="#041f17" stroke="#10b981" strokeWidth="2" />
          <path d="M30 50 L40 50 L45 30 L55 70 L60 40 L65 55 L70 50" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
        </svg>
      )
    },
    {
      name: "Illustrator",
      level: "Vector Assets",
      description: "Graphics & Title Elements",
      color: "rgba(255, 200, 0, 0.4)",
      svg: (
        <svg viewBox="0 0 100 100" className="w-12 h-12">
          <rect x="10" y="10" width="80" height="80" rx="15" fill="#1a1402" stroke="#ffc800" strokeWidth="2" />
          <text x="50" y="62" fill="#ffc800" fontSize="36" fontWeight="bold" fontFamily="var(--font-syne)" textAnchor="middle">Ai</text>
        </svg>
      )
    }
  ];

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-center bg-[#05050a] px-6 py-24 lg:px-24 overflow-hidden border-t border-white/5"
    >
      {/* Background neon glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-radial from-[rgba(189,0,255,0.06)] to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-radial from-[rgba(0,240,255,0.06)] to-transparent blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left Side: 3D Tilt Image Reveal */}
        <div className="lg:col-span-5 flex justify-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-md perspective-[1000px]"
          >
            <div
              ref={tiltRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
                transformStyle: "preserve-3d",
              }}
              className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden glass border border-white/10 group cursor-none transition-transform duration-200 ease-out shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
              data-cursor="creative"
            >
              {/* Subtle shining border on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-10" />

              <Image
                src="/yash_editor_portrait.png"
                alt="Yash Portrait"
                fill
                priority
                className="object-cover scale-102 transition-transform duration-700 group-hover:scale-108"
                sizes="(max-w-768px) 100vw, 450px"
              />

              {/* Glowing Overlay inside card */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#030306] via-transparent to-transparent opacity-80" />

              {/* Custom Experience Tag Floating inside card */}
              <div
                style={{ transform: "translateZ(50px)" }}
                className="absolute bottom-8 left-8 right-8 p-6 glass border border-white/15 rounded-2xl flex items-center justify-between"
              >
                <div>
                  <div className="text-3xl font-extrabold font-syne text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-neon-purple leading-none">
                    3+ Years
                  </div>
                  <div className="text-[10px] text-neutral-400 font-semibold uppercase tracking-wider mt-1.5">
                    Cutting Cinematic Art
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full bg-electric-blue/10 border border-electric-blue/30 flex items-center justify-center">
                  <Workflow className="h-6 w-6 text-electric-blue" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Introduction & Creative Philosophy */}
        <div className="lg:col-span-7 flex flex-col">
          {/* Header */}
          <div className="text-left mb-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-3"
            >
              <span className="h-1 w-8 bg-electric-blue rounded-full" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-electric-blue font-syne">
                THE CREATIVE ENGINE BEHIND YXEDITZ
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-5xl font-bold font-syne text-white tracking-tight"
            >
              I'm Yash Satav, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue via-white to-neon-purple">
                Known as YXEDITZ.
              </span>
            </motion.h2>
          </div>

          {/* Bio text */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 text-neutral-300 font-light leading-relaxed text-base"
          >
            <p>
              I specialize in high-end <strong className="text-white font-semibold">Adobe After Effects video editing</strong>, with a hyper-focused niche in <strong className="text-electric-blue font-semibold">podcasts</strong> and <strong className="text-neon-purple font-semibold font-mono">trading & finance content</strong>.
            </p>
            <p>
              In today's fast-moving digital ecosystem, attention is the ultimate currency. My core mission is to turn complex ideas and long conversations into <strong className="text-white font-semibold">ultra-clean, engaging, and high-retention videos</strong> that capture audiences within seconds, establish brand authority, and turn casual viewers into loyal subscribers.
            </p>
            <p>
              Whether it's transforming intricate financial charts into sleek animated infographics or cutting multi-cam podcast discussions with razor-sharp audio timing and kinetic captions, I engineer every keyframe to help creators and brands scale efficiently.
            </p>
          </motion.div>

          {/* Core Values checklist */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8"
          >
            <div className="flex gap-3 items-start">
              <CheckCircle2 className="h-5 w-5 text-electric-blue shrink-0 mt-0.5" />
              <div>
                <span className="text-sm font-semibold text-white block">Trading & Finance Editing</span>
                <span className="text-xs text-neutral-400">Market chart motion graphics, financial breakdown animations, & clear visual data.</span>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <CheckCircle2 className="h-5 w-5 text-neon-purple shrink-0 mt-0.5" />
              <div>
                <span className="text-sm font-semibold text-white block">Podcast & Multi-Cam Pacing</span>
                <span className="text-xs text-neutral-400">High-retention dialogue cuts, audio cleaning, & viral short-form clipping.</span>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <CheckCircle2 className="h-5 w-5 text-neon-pink shrink-0 mt-0.5" />
              <div>
                <span className="text-sm font-semibold text-white block">After Effects Motion Design</span>
                <span className="text-xs text-neutral-400">Custom kinetic typography, lower thirds, callouts, & sound-synced VFX.</span>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-sm font-semibold text-white block">High-Retention Growth Focus</span>
                <span className="text-xs text-neutral-400">Structured pacing designed to maximize AVD (Average View Duration) & conversion.</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Software Proficiency Segment */}
      <div className="relative z-10 max-w-7xl w-full mx-auto mt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mb-12"
        >
          <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest font-mono block mb-2">
            POST-PRODUCTION PIPELINE
          </span>
          <h3 className="text-2xl font-bold font-syne text-white">
            Software Engine Stack
          </h3>
        </motion.div>

        {/* Software grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
        >
          {software.map((sw, i) => (
            <motion.div
              key={sw.name}
              whileHover={{ y: -6 }}
              className="glass-card hover:bg-neutral-900/60 rounded-2xl p-5 flex flex-col items-center justify-between border border-white/5 group interactive-item"
              data-cursor="expert"
            >
              {/* SVG Icon base with glow */}
              <div
                className="relative mb-4 group-hover:scale-110 transition-transform duration-300"
                style={{ filter: `drop-shadow(0 0 10px ${sw.color})` }}
              >
                {sw.svg}
              </div>

              {/* Title and stats */}
              <div className="text-center">
                <span className="font-semibold text-sm text-white block mb-0.5 group-hover:text-electric-blue transition-colors">
                  {sw.name}
                </span>
                <span className="text-[10px] text-neutral-500 block mb-2">
                  {sw.description}
                </span>
                <div className="w-full bg-neutral-900 rounded-full h-1.5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: sw.level } : {}}
                    transition={{ duration: 1.2, delay: 0.5 + i * 0.1 }}
                    className="h-full bg-linear-to-r from-electric-blue to-neon-purple rounded-full"
                  />
                </div>
                <span className="text-[9px] font-bold text-neutral-400 mt-1.5 block font-mono">
                  {sw.level} Proficiency
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
