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
          className="flex flex-wrap gap-3 mb-10 pb-6 border-b border-white/5 justify-center md:justify-start"
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

        {/* Instagram Reels Showcase Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            {
              id: 1,
              title: "Cinematic Color Grade & Edit",
              category: "Color Grading",
              url: "https://www.instagram.com/reel/DbV2IzLTPIJ/?igsh=MXd4NGswYmRibTJieA==",
              thumbnail: "/ig_thumb_DbV2IzLTPIJ.jpg",
              tag: "INSTAGRAM REEL",
              duration: "0:30"
            },
            {
              id: 2,
              title: "High-Retention Trading & Finance Edit",
              category: "Trading & Finance",
              url: "https://www.instagram.com/reel/DVeFUmEjGni/?igsh=MWNiczE2c3hpZjFlcQ==",
              thumbnail: "/ig_thumb_DVeFUmEjGni.jpg",
              tag: "INSTAGRAM REEL",
              duration: "0:45"
            },
            {
              id: 3,
              title: "Podcast Highlight & Sound Design",
              category: "Podcast Video Editing",
              url: "https://www.instagram.com/reel/DCbGttZNGPU/?igsh=MXhucGhibmpmbm42ZQ==",
              thumbnail: "/ig_thumb_DCbGttZNGPU.jpg",
              tag: "INSTAGRAM REEL",
              duration: "0:60"
            },
            {
              id: 4,
              title: "Short-Form Reel & Kinetic Motion",
              category: "Short-Form Reels & Shorts",
              url: "https://www.instagram.com/reel/DLokf5NCp7t/?igsh=OTI1MzdqenduaW9q",
              thumbnail: "/ig_thumb_DLokf5NCp7t.jpg",
              tag: "INSTAGRAM REEL",
              duration: "0:25"
            }
          ]
            .filter((item) => activeCategory === "All" || activeCategory === "Color Grading" || item.category === activeCategory)
            .map((item) => (
              <motion.a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -8 }}
                className="group relative glass rounded-2xl overflow-hidden border border-white/10 flex flex-col aspect-[9/16] max-w-sm mx-auto w-full shadow-[0_15px_30px_rgba(0,0,0,0.4)] interactive-item cursor-none"
                data-cursor="PLAY"
              >
                {/* Visible Thumbnail Image */}
                <div className="relative flex-1 w-full h-full overflow-hidden">
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-108 opacity-90 group-hover:opacity-100"
                    sizes="(max-w-768px) 100vw, 300px"
                  />
                  {/* Subtle gradient vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030306] via-black/20 to-transparent opacity-90" />

                  {/* Top Badge: Instagram Tag */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
                    <div className="glass px-2.5 py-1 rounded-full text-[9px] font-bold text-electric-blue uppercase tracking-widest border border-white/15 backdrop-blur-md flex items-center gap-1.5">
                      <svg className="w-3 h-3 fill-current text-pink-400" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      {item.tag}
                    </div>
                  </div>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 z-20">
                    <div className="w-14 h-14 rounded-full bg-linear-to-r from-electric-blue to-neon-purple flex items-center justify-center shadow-[0_0_30px_rgba(0,240,255,0.5)] group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 fill-neutral-900 text-neutral-900 ml-0.5" viewBox="0 0 24 24">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-white tracking-widest bg-black/70 px-3 py-1 rounded-full border border-white/20 backdrop-blur-md group-hover:border-electric-blue transition-colors">
                      WATCH ON INSTAGRAM
                    </span>
                  </div>
                </div>

                {/* Bottom Details Panel */}
                <div className="relative z-20 p-4 bg-black/80 backdrop-blur-md border-t border-white/10 flex flex-col justify-between">
                  <span className="text-[10px] text-electric-blue font-mono font-semibold uppercase tracking-wider block mb-1">
                    {item.category}
                  </span>
                  <h4 className="text-sm font-bold font-syne text-white tracking-tight group-hover:text-electric-blue transition-colors line-clamp-1">
                    {item.title}
                  </h4>
                </div>
              </motion.a>
            ))}
        </motion.div>
      </div>
    </section>
  );
}
