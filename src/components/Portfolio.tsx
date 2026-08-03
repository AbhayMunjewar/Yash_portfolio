"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Sliders } from "lucide-react";

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [activeCategory, setActiveCategory] = useState("All");

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
          className="flex flex-wrap gap-3 mb-6 pb-6 border-b border-white/5 justify-center md:justify-start"
        >
          {[
            "All",
            "Color Grading",
            "Podcast Video Editing",
            "Trading & Finance",
            "Short-Form Reels & Shorts",
            "Long-Form YouTube",
            "Animated Captions",
            "Sound Design"
          ].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 interactive-item ${
                activeCategory === cat
                  ? "bg-linear-to-r from-electric-blue to-neon-purple text-neutral-900 shadow-[0_0_15px_rgba(0,240,255,0.25)] font-bold"
                  : "glass text-neutral-400 border-white/5 hover:text-white hover:bg-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
