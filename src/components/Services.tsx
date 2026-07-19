"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Scissors,
  Sparkles,
  Eye,
  Play,
  Smartphone,
  Zap,
  Flame,
  Heart,
  Mic,
  Cpu,
  Volume2,
  Image as ImageIcon
} from "lucide-react";

interface ServiceItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  accent: string;
}

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const services: ServiceItem[] = [
    {
      title: "Video Editing",
      description: "Pacing-driven, high-retention cuts that lock viewers. Multi-cam sequencing, sound triggers, and visual storytelling.",
      icon: <Scissors className="h-6 w-6" />,
      color: "from-[rgba(0,240,255,0.15)] to-transparent",
      accent: "text-electric-blue"
    },
    {
      title: "Motion Graphics",
      description: "Custom explainer elements, kinetic subtitles, and floating 2D/3D visual overlays designed to structure content.",
      icon: <Sparkles className="h-6 w-6" />,
      color: "from-[rgba(189,0,255,0.15)] to-transparent",
      accent: "text-neon-purple"
    },
    {
      title: "Color Grading",
      description: "Professional Lumetri & HDR grading. Creative mood setups, exposure matching, and skin-tone optimization.",
      icon: <Eye className="h-6 w-6" />,
      color: "from-[rgba(255,120,0,0.15)] to-transparent",
      accent: "text-amber-500"
    },
    {
      title: "Commercial Ads",
      description: "High-converting promo video assets for product launches, SaaS dashboards, and commercial agency campaigns.",
      icon: <Flame className="h-6 w-6" />,
      color: "from-[rgba(255,0,127,0.15)] to-transparent",
      accent: "text-neon-pink"
    },
    {
      title: "Instagram Reels",
      description: "Fast-paced vertical videos optimized for the algorithm. Includes micro-cuts, dynamic subtitles, and zoom hacks.",
      icon: <Smartphone className="h-6 w-6" />,
      color: "from-[rgba(0,240,255,0.15)] to-transparent",
      accent: "text-cyan-400"
    },
    {
      title: "YouTube Editing",
      description: "Long-form pacing designed for high Average View Duration (AVD). Integrated narrative arcs and sound cues.",
      icon: <Play className="h-6 w-6" />,
      color: "from-[rgba(189,0,255,0.15)] to-transparent",
      accent: "text-purple-400"
    },
    {
      title: "TikTok Videos",
      description: "Viral hook pacing within the first 3 seconds, matched with trending audio tracks and high-impact captions.",
      icon: <Zap className="h-6 w-6" />,
      color: "from-[rgba(255,230,0,0.15)] to-transparent",
      accent: "text-yellow-400"
    },
    {
      title: "VFX",
      description: "Seamless compositing, green screen keying, rotoscoping, object removal, and clean screen replacements.",
      icon: <Cpu className="h-6 w-6" />,
      color: "from-[rgba(0,100,255,0.15)] to-transparent",
      accent: "text-blue-500"
    },
    {
      title: "Sound Design",
      description: "Immersive foley layers, riser transitions, atmospheric rumble, voice gating, noise cleanup, and sound leveling.",
      icon: <Volume2 className="h-6 w-6" />,
      color: "from-[rgba(16,185,129,0.15)] to-transparent",
      accent: "text-emerald-400"
    },
    {
      title: "Wedding Films",
      description: "Emotional, cinematic highlight reels and feature cuts, meticulously colored and paced to wedding soundtracks.",
      icon: <Heart className="h-6 w-6" />,
      color: "from-[rgba(244,63,94,0.15)] to-transparent",
      accent: "text-rose-400"
    },
    {
      title: "Podcast Editing",
      description: "Clean multi-cam dialogue cuts, audio repair, dead air clipping, and highlights formatted for social shorts.",
      icon: <Mic className="h-6 w-6" />,
      color: "from-[rgba(236,72,153,0.15)] to-transparent",
      accent: "text-pink-400"
    },
    {
      title: "Thumbnail Design",
      description: "High-CTR, narrative-matched graphic design. Combines custom editing layers, masks, and bold text layouts.",
      icon: <ImageIcon className="h-6 w-6" />,
      color: "from-[rgba(0,240,255,0.15)] to-transparent",
      accent: "text-electric-blue"
    }
  ];

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-center bg-[#030306] px-6 py-24 lg:px-24 overflow-hidden border-t border-white/5"
    >
      {/* Background neon glows */}
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-radial from-[rgba(189,0,255,0.05)] to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[450px] h-[450px] bg-radial from-[rgba(0,240,255,0.05)] to-transparent blur-3xl pointer-events-none" />

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
              Post-Production Capabilities
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-bold font-syne text-white tracking-tight"
          >
            Bespoke Services <br />
            <span className="text-neutral-400">Tailored For Creative Impact.</span>
          </motion.h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Sub-component: Service Card with Mouse-following Glow Tracker
interface ServiceCardProps {
  service: ServiceItem;
  index: number;
  isInView: boolean;
}

function ServiceCard({ service, index, isInView }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    setCoords({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 35 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.05, ease: "easeOut" }}
      className="relative overflow-hidden glass-card rounded-2xl p-6 border border-white/5 hover:border-white/10 group cursor-none flex flex-col justify-between aspect-[1.25/1] sm:aspect-auto sm:min-h-[220px]"
      data-cursor="expand"
    >
      {/* Background glow base tracking coordinates */}
      <motion.div
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-radial to-transparent blur-3xl z-0"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{
          left: `${coords.x}px`,
          top: `${coords.y}px`,
          background: `radial-gradient(circle, ${service.accent === 'text-electric-blue' ? 'rgba(0, 240, 255, 0.15)' : service.accent === 'text-neon-purple' ? 'rgba(189, 0, 255, 0.15)' : 'rgba(255, 120, 0, 0.15)'} 0%, transparent 70%)`
        }}
      />

      {/* Decorative gradient corners */}
      <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-transparent via-transparent to-black/30 pointer-events-none z-0" />

      {/* Card Contents */}
      <div className="relative z-10">
        {/* Icon Base */}
        <div className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 ${service.accent} group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300`}>
          {service.icon}
        </div>

        {/* Text Details */}
        <h3 className="text-lg font-bold font-syne text-white tracking-tight mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-neutral-400 transition-all duration-300">
          {service.title}
        </h3>
        <p className="text-xs text-neutral-400 font-light leading-relaxed">
          {service.description}
        </p>
      </div>

      {/* Interactive indicator (small dots on bottom) */}
      <div className="relative z-10 flex justify-end items-center mt-4">
        <span className={`text-[10px] font-mono ${service.accent} font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
          Order →
        </span>
      </div>
    </motion.div>
  );
}
