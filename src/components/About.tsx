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
  const software = [
    {
      name: "After Effects",
      level: "95%",
      description: "Advanced VFX & Motion Graphics",
      color: "rgba(189, 0, 255, 0.4)",
      svg: (
        <svg viewBox="0 0 100 100" className="w-12 h-12">
          <rect x="10" y="10" width="80" height="80" rx="15" fill="#0c0720" stroke="#bd00ff" strokeWidth="2" />
          <text x="50" y="62" fill="#bd00ff" fontSize="36" fontWeight="bold" fontFamily="var(--font-syne)" textAnchor="middle">Ae</text>
          <filter id="glow-ae">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </svg>
      )
    },
    {
      name: "Premiere Pro",
      level: "98%",
      description: "Cinematic Editing & Pacing",
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
      level: "90%",
      description: "Lumetri & HDR Color Grading",
      color: "rgba(255, 120, 0, 0.4)",
      svg: (
        <svg viewBox="0 0 100 100" className="w-12 h-12">
          <rect x="10" y="10" width="80" height="80" rx="15" fill="#140f0c" stroke="#ff7800" strokeWidth="2" />
          <circle cx="50" cy="50" r="22" fill="none" stroke="#ff7800" strokeWidth="3" />
          <circle cx="50" cy="50" r="12" fill="#ff7800" />
          <line x1="50" y1="15" x2="50" y2="28" stroke="#ff7800" strokeWidth="3" />
          <line x1="50" y1="72" x2="50" y2="85" stroke="#ff7800" strokeWidth="3" />
          <line x1="15" y1="50" x2="28" y2="50" stroke="#ff7800" strokeWidth="3" />
          <line x1="72" y1="50" x2="85" y2="50" stroke="#ff7800" strokeWidth="3" />
        </svg>
      )
    },
    {
      name: "Cinema 4D",
      level: "85%",
      description: "3D Animation & Simulation",
      color: "rgba(0, 100, 255, 0.4)",
      svg: (
        <svg viewBox="0 0 100 100" className="w-12 h-12">
          <rect x="10" y="10" width="80" height="80" rx="15" fill="#050a1e" stroke="#0064ff" strokeWidth="2" />
          {/* C4D Cube outline */}
          <path d="M 50 25 L 75 38 L 75 62 L 50 75 L 25 62 L 25 38 Z" fill="none" stroke="#0064ff" strokeWidth="2" />
          <path d="M 50 25 L 50 75 M 25 38 L 50 50 L 75 38" fill="none" stroke="#0064ff" strokeWidth="1.5" />
        </svg>
      )
    },
    {
      name: "Blender 3D",
      level: "80%",
      description: "3D Modelling & Assets",
      color: "rgba(255, 165, 0, 0.4)",
      svg: (
        <svg viewBox="0 0 100 100" className="w-12 h-12">
          <rect x="10" y="10" width="80" height="80" rx="15" fill="#1c0f05" stroke="#ffa500" strokeWidth="2" />
          <path d="M 50 45 C 55 45, 65 50, 65 60 C 65 70, 50 75, 42 70 C 35 65, 38 52, 45 48 M 65 60 C 72 58, 80 50, 80 40 C 80 30, 70 35, 65 42 M 50 45 L 72 25" fill="none" stroke="#ffa500" strokeWidth="2" />
          <circle cx="48" cy="58" r="5" fill="#ffa500" />
        </svg>
      )
    },
    {
      name: "Illustrator",
      level: "92%",
      description: "Vector Assets & Typography",
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
                    8+ Years
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
                The Story Behind the Cuts
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-5xl font-bold font-syne text-white tracking-tight"
            >
              Crafting Cinematic Flow <br />
              <span className="text-neutral-400">& Creative Logic.</span>
            </motion.h2>
          </div>

          {/* Bio text */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 text-neutral-400 font-light leading-relaxed text-base"
          >
            <p>
              I am Yash, a freelance video editor, motion graphics director, and visual storyteller. With over 8 years of digital agency and independent studio experience, I partner with directors, content curators, and marketing leaders globally to translate raw footage into visual assets that convert.
            </p>
            <p>
              My design ideology blends <strong className="text-white">mathematical precision in timing</strong> with <strong className="text-white">cinematic visual composition</strong>. From initial timeline trimming and color correction to advanced 3D renders and keyframe-tracked animations, every pixel is calibrated to optimize user engagement.
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
                <span className="text-sm font-semibold text-white block">Audience Hooking Pacing</span>
                <span className="text-xs text-neutral-400">High-retention timing designed for social & commercial formats.</span>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <CheckCircle2 className="h-5 w-5 text-neon-purple shrink-0 mt-0.5" />
              <div>
                <span className="text-sm font-semibold text-white block">Lumetri & HDR Color Precision</span>
                <span className="text-xs text-neutral-400">Custom LUT grading sets the emotional mood and fits brand aesthetics.</span>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <CheckCircle2 className="h-5 w-5 text-neon-pink shrink-0 mt-0.5" />
              <div>
                <span className="text-sm font-semibold text-white block">Dynamic Motion Graphic Assets</span>
                <span className="text-xs text-neutral-400">Seamlessly integrated explainer charts, callouts, and typography.</span>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-sm font-semibold text-white block">Soundscape Design</span>
                <span className="text-xs text-neutral-400">Immersive foley, noise reduction, and sound layering.</span>
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
