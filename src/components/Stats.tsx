"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Video, Award, Eye, Calendar } from "lucide-react";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  glow: string;
}

export default function Stats() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const stats: StatItem[] = [
    {
      value: 500,
      suffix: "+",
      label: "Projects Completed",
      icon: <Video className="h-6 w-6 text-electric-blue" />,
      color: "text-electric-blue",
      glow: "rgba(0, 240, 255, 0.15)"
    },
    {
      value: 100,
      suffix: "+",
      label: "Happy Clients",
      icon: <Award className="h-6 w-6 text-neon-purple" />,
      color: "text-neon-purple",
      glow: "rgba(189, 0, 255, 0.15)"
    },
    {
      value: 20,
      suffix: "M+",
      label: "Views Generated",
      icon: <Eye className="h-6 w-6 text-neon-pink" />,
      color: "text-neon-pink",
      glow: "rgba(255, 0, 127, 0.15)"
    },
    {
      value: 8,
      suffix: "+",
      label: "Years Experience",
      icon: <Calendar className="h-6 w-6 text-amber-500" />,
      color: "text-amber-500",
      glow: "rgba(245, 158, 11, 0.15)"
    }
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#030306] px-6 py-20 lg:px-24 overflow-hidden border-t border-white/5"
    >
      {/* Background glow tracker */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-radial from-[rgba(189,0,255,0.03)] to-transparent blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl w-full mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <div key={stat.label} className="relative flex justify-center">
            <StatCard stat={stat} index={index} isInView={isInView} />
          </div>
        ))}
      </div>
    </section>
  );
}

// Sub-component: Individual Stat Card with auto-counting
function StatCard({ stat, index, isInView }: { stat: StatItem; index: number; isInView: boolean }) {
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!isInView) return;
    const node = numberRef.current;
    if (!node) return;

    // Run counting animation
    const controls = animate(0, stat.value, {
      duration: 2.2,
      ease: "easeOut",
      onUpdate(value) {
        node.textContent = Math.floor(value).toLocaleString();
      }
    });

    return () => controls.stop();
  }, [isInView, stat.value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
      whileHover={{ y: -5 }}
      className="glass p-6 rounded-2xl border border-white/5 w-full max-w-[250px] flex flex-col items-center text-center group cursor-none"
      data-cursor="stats"
      style={{
        boxShadow: `0 10px 30px -10px rgba(0, 0, 0, 0.5)`
      }}
    >
      {/* Glow highlight on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow: `inset 0 0 20px ${stat.glow}, 0 0 30px -5px ${stat.glow}`
        }}
      />

      {/* Icon frame */}
      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300">
        {stat.icon}
      </div>

      {/* Counter number */}
      <div className="text-3xl sm:text-5xl font-extrabold font-syne text-white tracking-tight mb-2 flex items-baseline justify-center">
        <span ref={numberRef}>0</span>
        <span className={stat.color}>{stat.suffix}</span>
      </div>

      {/* Label */}
      <span className="text-xs text-neutral-400 font-medium uppercase tracking-wider font-syne">
        {stat.label}
      </span>
    </motion.div>
  );
}
