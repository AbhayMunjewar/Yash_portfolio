"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp, Heart, Mail, Smartphone } from "lucide-react";
import Magnetic from "./Magnetic";

export default function Footer() {
  const [time, setTime] = useState("");

  // Clock widget to display editor's local time (Awwwards-style)
  useEffect(() => {
    const updateClock = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata", // UTC+5:30
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      };
      setTime(new Date().toLocaleTimeString("en-US", options));
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleScrollTop = () => {
    if (typeof window !== "undefined") {
      (window as any).lenis?.scrollTo(0);
    }
  };

  const footerMarquee = [
    "LET'S WORK", "HIRE YASH", "START A PROJECT", "DISCOVERY CALL",
    "RENDER ASSETS", "MOTION LAB", "COLOR GRADING", "CUT THE FLOW"
  ];

  return (
    <footer className="relative bg-[#030306] overflow-hidden border-t border-white/5 pt-16 pb-12 w-full">
      {/* Footer Marquee Banner */}
      <div className="w-full overflow-hidden border-b border-white/5 py-8 bg-black/40 backdrop-blur-md mb-12 select-none">
        <div className="flex w-max animate-footer-marquee">
          <div className="flex gap-20 pr-20 items-center">
            {footerMarquee.map((word, i) => (
              <span key={i} className="text-2xl md:text-4xl font-extrabold font-syne text-neutral-800 tracking-wider hover:text-white transition-colors duration-300">
                {word} •
              </span>
            ))}
          </div>
          <div className="flex gap-20 pr-20 items-center">
            {footerMarquee.map((word, i) => (
              <span key={`dup-${i}`} className="text-2xl md:text-4xl font-extrabold font-syne text-neutral-800 tracking-wider hover:text-white transition-colors duration-300">
                {word} •
              </span>
            ))}
          </div>
        </div>

        <style jsx global>{`
          @keyframes footer-marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-footer-marquee {
            animation: footer-marquee 20s linear infinite;
          }
        `}</style>
      </div>

      <div className="max-w-7xl w-full mx-auto px-6 lg:px-24 grid grid-cols-1 md:grid-cols-12 gap-12 items-start relative z-10">
        {/* Left Side: Branding */}
        <div className="md:col-span-5 flex flex-col justify-between h-full">
          <div>
            <div className="text-2xl font-extrabold font-syne text-white tracking-tight mb-4 flex items-center gap-1.5">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-neon-purple">YASH.</span>
              <span>STUDIO</span>
            </div>
            <p className="text-xs text-neutral-500 font-light max-w-sm leading-relaxed mb-6">
              Bespoke visual post-production suite specialized in cutting-edge editing rhythm, motion graphic layers, and film grading curves.
            </p>
          </div>
          
          {/* Time Zone clock Widget */}
          <div className="glass bg-white/2 rounded-2xl p-4 border border-white/5 w-fit">
            <span className="text-[8px] text-neutral-500 font-mono block mb-1">LOCAL TIME (UTC+5:30)</span>
            <span className="text-sm font-extrabold font-mono text-electric-blue tracking-widest">
              {time || "12:00:00"}
            </span>
          </div>
        </div>

        {/* Center: Navigation Links */}
        <div className="md:col-span-4 grid grid-cols-2 gap-6">
          <div>
            <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest font-mono block mb-4">
              Explore
            </span>
            <ul className="space-y-3">
              {[
                { name: "About Me", href: "#about" },
                { name: "Capabilities", href: "#services" },
                { name: "Portfolio", href: "#portfolio" },
                { name: "Timeline", href: "#workflow" }
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-xs text-neutral-400 hover:text-white transition-colors cursor-none interactive-item"
                    data-cursor="goto"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest font-mono block mb-4">
              Invest
            </span>
            <ul className="space-y-3">
              {[
                { name: "Pricing Plans", href: "#pricing" },
                { name: "FAQ Answers", href: "#faq" },
                { name: "Initiate Proposal", href: "#contact" }
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-xs text-neutral-400 hover:text-white transition-colors cursor-none interactive-item"
                    data-cursor="goto"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Side: Back to top */}
        <div className="md:col-span-3 flex md:justify-end items-center">
          <Magnetic strength={0.35}>
            <button
              onClick={handleScrollTop}
              className="h-14 w-14 rounded-full bg-neutral-900 border border-white/10 text-white hover:text-electric-blue hover:border-electric-blue/40 transition-colors flex items-center justify-center cursor-none interactive-item shadow-lg"
              data-cursor="top"
            >
              <ArrowUp className="h-5 w-5 animate-pulse" />
            </button>
          </Magnetic>
        </div>
      </div>

      {/* Copyright row */}
      <div className="max-w-7xl w-full mx-auto px-6 lg:px-24 mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10 text-[10px] text-neutral-600 font-mono">
        <span>© {new Date().getFullYear()} YASH.ART. ALL KEYFRAMES RESERVED.</span>
        <span className="flex items-center gap-1">
          DESIGNED WITH <Heart className="h-3 w-3 fill-red-500 stroke-red-500" /> & CODE FOR CREATIVES.
        </span>
      </div>
    </footer>
  );
}
