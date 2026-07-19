"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Magnetic from "./Magnetic";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Showcase", href: "#motion" },
    { name: "Timeline", href: "#workflow" },
    { name: "Pricing", href: "#pricing" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(target);
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 w-full ${
        scrolled
          ? "bg-[#030306]/75 backdrop-blur-md border-b border-white/5 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-24 flex items-center justify-between">
        {/* Brand Logo */}
        <a 
          href="#" 
          onClick={(e) => handleLinkClick(e, "body")}
          className="text-xl font-extrabold font-syne text-white tracking-tight flex items-center gap-1.5 cursor-none interactive-item" 
          data-cursor="home"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-neon-purple">YASH.</span>
          <span className="text-[10px] text-neutral-400 font-mono tracking-widest self-end pb-0.5">STUDIO</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 hover:text-white transition-colors cursor-none interactive-item"
              data-cursor="goto"
            >
              {link.name}
            </a>
          ))}
          <Magnetic strength={0.2}>
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, "#contact")}
              className="px-5 py-2.5 rounded-full bg-linear-to-r from-electric-blue to-neon-purple text-neutral-900 font-bold text-[11px] uppercase tracking-wider shadow-[0_0_15px_rgba(0,240,255,0.2)] hover:shadow-[0_0_25px_rgba(189,0,255,0.4)] transition-all duration-300 cursor-none interactive-item"
              data-cursor="hire"
            >
              Let's Create
            </a>
          </Magnetic>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white cursor-none"
          data-cursor="menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-[65px] bg-[#030306]/95 backdrop-blur-lg z-30 flex flex-col p-8 border-b border-white/5"
          >
            <nav className="flex flex-col gap-6 items-center justify-center flex-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-lg font-bold font-syne uppercase tracking-wider text-neutral-300 hover:text-electric-blue transition-colors cursor-none"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, "#contact")}
                className="px-8 py-3.5 rounded-full bg-linear-to-r from-electric-blue to-neon-purple text-neutral-900 font-bold text-sm uppercase tracking-wide shadow-lg"
              >
                Let's Create
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
