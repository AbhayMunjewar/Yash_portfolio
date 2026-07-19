"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Search, PenTool, Film, Sparkles, RefreshCw, CheckSquare, PlayCircle } from "lucide-react";

interface WorkflowStep {
  number: string;
  title: string;
  duration: string;
  description: string;
  icon: React.ReactNode;
  details: string[];
  color: string;
}

export default function Workflow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // Track scroll position of the workflow section to animate playhead
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Animate playhead height down the center track line
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const steps: WorkflowStep[] = [
    {
      number: "01",
      title: "Discovery & Storyboard",
      duration: "Day 1-2",
      description: "Gather references, establish grading moods, define raw assets structures, and create dynamic storyboard guides.",
      icon: <Search className="h-5 w-5 text-electric-blue" />,
      details: ["Asset inventory & sorting", "Styleframe mood boards", "Timeline sound references", "Aspect ratio guidelines"],
      color: "border-electric-blue/30 text-electric-blue"
    },
    {
      number: "02",
      title: "Scripting & Audio Lock",
      duration: "Day 3",
      description: "Map voiceover reads, time pacing cues, layout soundtracks, and establish the narrative A-Roll track.",
      icon: <PenTool className="h-5 w-5 text-neon-purple" />,
      details: ["Voice noise cleaning", "Beat mapping & pacing lock", "Foley sound effects layout", "Pacing markers placement"],
      color: "border-neon-purple/30 text-neon-purple"
    },
    {
      number: "03",
      title: "Rough Cut & Editing",
      duration: "Day 4-6",
      description: "Assemble core clips, slice dead spaces, match transitions, and lock visual flow down to milliseconds.",
      icon: <Film className="h-5 w-5 text-amber-500" />,
      details: ["Velocity ramping cuts", "Visual matches transitions", "Sound triggers sync", "A-Roll/B-Roll layering"],
      color: "border-amber-500/30 text-amber-500"
    },
    {
      number: "04",
      title: "Motion Graphics & VFX",
      duration: "Day 7-8",
      description: "Compositing glowing callouts, tracking typography, rendering 3D assets, and overlaying VFX nodes.",
      icon: <Sparkles className="h-5 w-5 text-neon-pink" />,
      details: ["3D render composites", "Kinetic caption tracking", "Vector chart graphics", "Rotoscoping & cleanup"],
      color: "border-neon-pink/30 text-neon-pink"
    },
    {
      number: "05",
      title: "Collaborative Review",
      duration: "Day 9",
      description: "Utilize Frame.io for frame-specific client notes. Adjust micro-cuts and timing parameters based on comments.",
      icon: <RefreshCw className="h-5 w-5 text-emerald-400" />,
      details: ["Frame.io timestamp notes", "Color correction adjustments", "Volume balancing", "Subtitles translation"],
      color: "border-emerald-400/30 text-emerald-400"
    },
    {
      number: "06",
      title: "Final Render & Delivery",
      duration: "Day 10",
      description: "Export cinematic master copies in ProRes, render social crop variants (9:16, 1:1), and deliver client packages.",
      icon: <CheckSquare className="h-5 w-5 text-electric-blue" />,
      details: ["ProRes HDR master copy", "Vertical reels exports", "Metadata injection", "Cloud delivery setup"],
      color: "border-electric-blue/30 text-electric-blue"
    }
  ];

  return (
    <section
      id="workflow"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-center bg-[#05050a] px-6 py-24 lg:px-24 overflow-hidden border-t border-white/5"
    >
      {/* Background Glows */}
      <div className="absolute top-1/4 left-0 w-[450px] h-[450px] bg-radial from-[rgba(189,0,255,0.04)] to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[450px] h-[450px] bg-radial from-[rgba(0,240,255,0.04)] to-transparent blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl w-full mx-auto">
        {/* Header */}
        <div className="text-left mb-20 md:text-center md:mb-24">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-3 md:justify-center"
          >
            <span className="h-1 w-8 bg-electric-blue rounded-full" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-electric-blue font-syne">
              Post-Production Pipeline
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-bold font-syne text-white tracking-tight"
          >
            How We Translate Raw Ideas <br />
            <span className="text-neutral-400">Into Polished Visual Assets.</span>
          </motion.h2>
        </div>

        {/* Timeline Grid Container */}
        <div className="relative w-full">
          {/* Vertical Track Line (Centered on desktops, left on mobile) */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-neutral-900 -translate-x-1/2 z-0">
            {/* Scroll-bound glowing active track */}
            <motion.div
              style={{ scaleY, transformOrigin: "top" }}
              className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-b from-electric-blue via-neon-purple to-neon-pink z-10 shadow-[0_0_8px_rgba(0,240,255,0.5)]"
            />
          </div>

          {/* Workflow Steps */}
          <div className="space-y-16 relative z-10">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={step.number} className="flex flex-col md:flex-row w-full relative">
                  {/* Timeline Node Point (centered on desktop, left on mobile) */}
                  <div className="absolute left-4 md:left-1/2 top-6 -translate-x-1/2 z-20">
                    <motion.div
                      whileHover={{ scale: 1.25 }}
                      className="h-8 w-8 rounded-full bg-black border-2 border-neutral-700 flex items-center justify-center cursor-none group shadow-lg"
                      data-cursor="step"
                    >
                      <div className="h-2 w-2 rounded-full bg-neutral-500 group-hover:bg-electric-blue transition-colors" />
                    </motion.div>
                  </div>

                  {/* Left Side spacer/container */}
                  <div className="w-full md:w-1/2 pr-0 md:pr-12 md:text-right flex justify-start md:justify-end">
                    {isEven ? (
                      <WorkflowCard step={step} isEven={isEven} isInView={isInView} index={index} />
                    ) : (
                      // Spacer on desktop
                      <div className="hidden md:block w-full" />
                    )}
                  </div>

                  {/* Right Side spacer/container */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-12 text-left flex justify-start">
                    {!isEven ? (
                      <WorkflowCard step={step} isEven={isEven} isInView={isInView} index={index} />
                    ) : (
                      // Spacer on desktop
                      <div className="hidden md:block w-full" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// Sub-component: Individual Timeline Card
function WorkflowCard({ step, isEven, isInView, index }: { step: WorkflowStep; isEven: boolean; isInView: boolean; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -40 : 40, y: 20 }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="glass p-6 rounded-2xl border border-white/5 hover:border-white/10 w-full max-w-md shadow-lg group hover:bg-white/2 transition-colors cursor-none"
      data-cursor="details"
    >
      <div className="flex justify-between items-center mb-4">
        {/* Step index */}
        <span className="text-3xl font-extrabold font-syne text-neutral-800 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-electric-blue group-hover:to-neon-purple transition-all duration-300">
          {step.number}
        </span>
        {/* Step Duration */}
        <span className="glass px-2.5 py-1 rounded-md text-[9px] font-bold text-neutral-400 uppercase tracking-widest border border-white/10">
          {step.duration}
        </span>
      </div>

      {/* Step title */}
      <h3 className="text-lg font-bold font-syne text-white mb-2 tracking-tight flex items-center gap-2">
        <div className={`w-8 h-8 rounded-lg bg-white/5 border ${step.color} flex items-center justify-center`}>
          {step.icon}
        </div>
        {step.title}
      </h3>

      {/* Step description */}
      <p className="text-xs text-neutral-400 font-light leading-relaxed mb-4">
        {step.description}
      </p>

      {/* Subtasks checklist */}
      <ul className="grid grid-cols-2 gap-2 pt-4 border-t border-white/5 text-[10px] text-neutral-500 font-mono">
        {step.details.map((detail) => (
          <li key={detail} className="flex items-center gap-1.5">
            <div className="w-1 h-1 bg-neon-purple rounded-full shrink-0" />
            <span className="truncate">{detail}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
