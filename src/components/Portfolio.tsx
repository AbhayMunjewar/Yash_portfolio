"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Play, X, Camera, Film, Sliders, Layers, Clock } from "lucide-react";

interface ProjectItem {
  id: number;
  title: string;
  category: string; // "Commercials" | "Motion Graphics" | "Color Grading" | "Social Media"
  thumbnail: string;
  specs: {
    camera: string;
    software: string;
    duration: string;
    role: string;
  };
  description: string;
}

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Before/After Slider State
  const sliderRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 to 100)
  const [isDragging, setIsDragging] = useState(false);

  const handleSliderMove = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging || e.buttons === 1) {
      handleSliderMove(e.clientX);
    }
  };

  const categories = ["All", "Commercials", "Motion Graphics", "Color Grading", "Social Media"];

  const projects: ProjectItem[] = [
    {
      id: 1,
      title: "Cyberpunk City Cut",
      category: "Commercials",
      thumbnail: "/portfolio_cyberpunk.png",
      specs: {
        camera: "RED V-Raptor 8K",
        software: "Premiere + AE",
        duration: "0:30",
        role: "Lead Editor & VFX"
      },
      description: "A fast-paced streetwear promo video set in Tokyo. Heavy audio sync, split-screen layouts, and custom chromatic aberration transitions to fit a futuristic cyberpunk aesthetic.",
    },
    {
      id: 2,
      title: "Hyper-Drive 3D Spheres",
      category: "Motion Graphics",
      thumbnail: "/portfolio_motion.png",
      specs: {
        camera: "Cinema 4D Octane",
        software: "C4D + After Effects",
        duration: "0:15",
        role: "3D Motion Designer"
      },
      description: "Abstract loops for a SaaS dashboard header. Utilized complex spline effectors and soft-body dynamics to generate organic rolling movements with deep glass refraction shaders.",
    },
    {
      id: 3,
      title: "Automotive Coast Grade",
      category: "Color Grading",
      thumbnail: "/portfolio_car.png",
      specs: {
        camera: "ARRI Alexa Mini LF",
        software: "DaVinci Resolve",
        duration: "1:00",
        role: "Colorist"
      },
      description: "Color matching across drone shots and close-ups under rapidly shifting sunset conditions. Created custom warm highlights and cool shadow balances for a classic cinematic look.",
    },
    {
      id: 4,
      title: "Neon Nexus Intro",
      category: "Motion Graphics",
      thumbnail: "/portfolio_motion.png",
      specs: {
        camera: "After Effects Vector",
        software: "AE + Illustrator",
        duration: "0:08",
        role: "Logo Animator"
      },
      description: "Kinetic logo reveal utilizing glowing paths and vector math. Synchronized to custom synthetic risers and mechanical foley layers for a premium corporate sign-off.",
    },
    {
      id: 5,
      title: "Electric Highway",
      category: "Commercials",
      thumbnail: "/portfolio_car.png",
      specs: {
        camera: "RED Komodo 6K",
        software: "Premiere Pro",
        duration: "0:45",
        role: "Editor & sound designer"
      },
      description: "An action commercial edit highlighting battery efficiency. Tight velocity ramps and rapid sound transitions build tension alongside the rising vehicle speed.",
    },
    {
      id: 6,
      title: "Tokyo Neon Vibe",
      category: "Social Media",
      thumbnail: "/portfolio_cyberpunk.png",
      specs: {
        camera: "Sony FX3 4K",
        software: "After Effects",
        duration: "0:15",
        role: "Reels / Shorts Editor"
      },
      description: "A viral portrait edit crafted with high-hook pacing and glowing vector text indicators. Optimized for social algorithms and mobile viewing screen spaces.",
    }
  ];

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section
      id="portfolio"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-center bg-[#05050a] px-6 py-24 lg:px-24 overflow-hidden border-t border-white/5"
    >
      {/* Background Neon light glows */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-radial from-[rgba(0,240,255,0.06)] to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] bg-radial from-[rgba(189,0,255,0.06)] to-transparent blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl w-full mx-auto">
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
              Selected Projects
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-bold font-syne text-white tracking-tight"
          >
            Cinematic Portfolio <br />
            <span className="text-neutral-400">Where Pixels Tell Stories.</span>
          </motion.h2>
        </div>

        {/* Dynamic Before/After Color Grading Slider Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20 w-full"
        >
          <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] text-neutral-500 font-mono tracking-widest block mb-1">
                LUMETRI ENGINE SIMULATOR
              </span>
              <h3 className="text-xl font-bold font-syne text-white flex items-center gap-2">
                <Sliders className="h-5 w-5 text-electric-blue" />
                Interactive Color Grading slider
              </h3>
            </div>
            <p className="text-xs text-neutral-400 max-w-sm font-light">
              Drag the central boundary handle to compare the flat camera RAW profile (Log format) against the final graded cinematic movie look.
            </p>
          </div>

          {/* Slider Core Container */}
          <div
            ref={sliderRef}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden border border-white/10 select-none shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-none"
            data-cursor="drag"
          >
            {/* After: Graded (Base Image) */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src="/cinematic_grading_shot.png"
                alt="After Grading (Cinematic Film Profile)"
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
              {/* After label */}
              <div className="absolute bottom-4 right-4 glass px-3 py-1.5 rounded-md text-[10px] font-bold text-white uppercase tracking-widest border border-white/10 z-20">
                Graded Rec.709
              </div>
            </div>

            {/* Before: Flat Log (Overlay Image) */}
            <div
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
            >
              <Image
                src="/cinematic_grading_shot.png"
                alt="Before Grading (RAW Camera Log)"
                fill
                priority
                className="object-cover"
                style={{
                  filter: "saturate(0.35) contrast(0.7) brightness(1.05) sepia(0.08) hue-rotate(8deg)"
                }}
                sizes="100vw"
              />
              {/* Before label */}
              <div className="absolute bottom-4 left-4 glass px-3 py-1.5 rounded-md text-[10px] font-bold text-neutral-400 uppercase tracking-widest border border-white/10 z-20">
                RAW Flat S-Log3
              </div>
            </div>

            {/* Slider Boundary Handle Line */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-30 shadow-[0_0_20px_rgba(0,0,0,0.8)] flex items-center justify-center"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="h-10 w-10 rounded-full bg-white text-black border-2 border-white flex items-center justify-center shadow-lg -translate-x-1/2 select-none pointer-events-none transform scale-90 group-hover:scale-100 transition-transform">
                <Sliders className="h-4 w-4 rotate-90" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Category Filters Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap gap-3 mb-10 pb-4 border-b border-white/5"
        >
          {categories.map((cat, i) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 interactive-item ${
                activeCategory === cat
                  ? "bg-linear-to-r from-electric-blue to-neon-purple text-neutral-900 shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                  : "glass text-neutral-400 border-white/5 hover:text-white hover:bg-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Masonry Grid Layout */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedProject(project)}
                className="relative glass rounded-2xl overflow-hidden border border-white/5 group cursor-none flex flex-col aspect-[4/3] shadow-[0_15px_30px_rgba(0,0,0,0.3)]"
                data-cursor="play"
              >
                {/* Image base with hover zoom */}
                <div className="relative flex-1 w-full h-full overflow-hidden">
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    sizes="(max-w-768px) 100vw, (max-w-1024px) 50vw, 380px"
                  />
                  {/* Subtle grading tint overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030306] via-black/10 to-transparent opacity-80 z-10" />

                  {/* Custom specs on top overlay */}
                  <div className="absolute top-4 left-4 z-20 flex gap-2">
                    <div className="glass px-2.5 py-1 rounded text-[9px] font-bold text-electric-blue uppercase tracking-widest border border-white/10">
                      {project.category}
                    </div>
                  </div>

                  {/* Play Button hover indicator */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <div className="w-14 h-14 rounded-full bg-linear-to-r from-electric-blue to-neon-purple flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                      <Play className="h-6 w-6 fill-neutral-900 stroke-neutral-900" />
                    </div>
                  </div>
                </div>

                {/* Bottom title details */}
                <div className="relative z-20 p-5 bg-black/60 backdrop-blur-md border-t border-white/5 flex flex-col justify-between">
                  <div>
                    <h4 className="text-base font-bold font-syne text-white tracking-tight mb-1 group-hover:text-electric-blue transition-colors">
                      {project.title}
                    </h4>
                    <div className="flex gap-4 text-[10px] text-neutral-400 font-mono">
                      <span className="flex items-center gap-1">
                        <Camera className="h-3 w-3 text-neutral-500" />
                        {project.specs.camera.split(" ")[0]}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-neutral-500" />
                        {project.specs.duration}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox / Details Modal Dialog */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          >
            {/* Inner frame */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl glass-premium rounded-3xl overflow-hidden border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.8)] flex flex-col max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-40 h-10 w-10 rounded-full bg-black/50 border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-center cursor-none"
                data-cursor="close"
              >
                <X className="h-5 w-5 text-white" />
              </button>

              {/* Simulated video playback showcase */}
              <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden border-b border-white/5">
                <Image
                  src={selectedProject.thumbnail}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />

                {/* Tracking frames animation overlay */}
                <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/60 pointer-events-none" />
                
                {/* Oscillating Sound level indicator */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between z-20">
                  <div className="glass px-3 py-1 rounded text-[9px] font-mono text-emerald-400 border border-emerald-400/20 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    SIMULATING PLAYBACK
                  </div>
                  
                  {/* Waveform visualizer */}
                  <div className="flex gap-0.5 items-end h-6 opacity-80">
                    {[3,6,2,7,4,9,2,6,3,8,4,9,1,6,3,8,2,6,4].map((h, i) => (
                      <motion.div
                        key={i}
                        className="w-0.5 bg-electric-blue"
                        animate={{ height: [`${h * 10}%`, `${(h * 1.5) % 10 * 10}%`, `${h * 10}%`] }}
                        transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.05 }}
                        style={{ height: `${h * 10}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Specs & Description details panel */}
              <div className="p-6 md:p-8 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* Text Description */}
                  <div className="md:col-span-8">
                    <span className="text-[10px] text-electric-blue font-mono font-bold uppercase tracking-wider block mb-1">
                      {selectedProject.category}
                    </span>
                    <h3 className="text-2xl font-bold font-syne text-white tracking-tight mb-4">
                      {selectedProject.title}
                    </h3>
                    <p className="text-neutral-400 text-sm font-light leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>

                  {/* Metadata Sidebar */}
                  <div className="md:col-span-4 glass bg-white/2 rounded-2xl p-4 border border-white/5 flex flex-col gap-4">
                    <div className="flex gap-3 items-center">
                      <Camera className="h-4.5 w-4.5 text-electric-blue shrink-0" />
                      <div>
                        <span className="text-[9px] text-neutral-500 font-mono block">CAMERA SETUP</span>
                        <span className="text-xs font-semibold text-white">{selectedProject.specs.camera}</span>
                      </div>
                    </div>
                    <div className="flex gap-3 items-center">
                      <Film className="h-4.5 w-4.5 text-neon-purple shrink-0" />
                      <div>
                        <span className="text-[9px] text-neutral-500 font-mono block">PIPELINE TOOLS</span>
                        <span className="text-xs font-semibold text-white">{selectedProject.specs.software}</span>
                      </div>
                    </div>
                    <div className="flex gap-3 items-center">
                      <Clock className="h-4.5 w-4.5 text-amber-500 shrink-0" />
                      <div>
                        <span className="text-[9px] text-neutral-500 font-mono block">RUN TIME</span>
                        <span className="text-xs font-semibold text-white">{selectedProject.specs.duration} SEC</span>
                      </div>
                    </div>
                    <div className="flex gap-3 items-center">
                      <Layers className="h-4.5 w-4.5 text-emerald-400 shrink-0" />
                      <div>
                        <span className="text-[9px] text-neutral-500 font-mono block">MY RESPONSIBILITY</span>
                        <span className="text-xs font-semibold text-white">{selectedProject.specs.role}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
