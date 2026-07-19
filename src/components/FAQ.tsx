"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "What is your typical turnaround time on edits?",
      answer: "Turnaround times vary based on the complexity of the project. For social media shorts and simple reels, edits are completed within 48 hours. Long-form video editing and commercial packages typically take between 4 to 7 business days, including sound design and color grading."
    },
    {
      question: "How do we collaborate on edits and give feedback?",
      answer: "We use Frame.io for all review sessions. You will receive a secure web link to watch the cut in real-time. You can write feedback comments at exact seconds and draw on the screen directly to highlight elements. This eliminates email back-and-forth and secures quick iterations."
    },
    {
      question: "What raw files do I need to send you?",
      answer: "You can upload files to a shared folder (Google Drive, Dropbox, or Frame.io). I accept all camera formats including MP4, MOV, and high-fidelity camera files (RED RAW, ProRes). For best audio results, send separate voiceover WAV records alongside script documents."
    },
    {
      question: "Do you handle custom motion graphics and 3D scenes?",
      answer: "Yes, motion design is a core part of my workflow. I create kinetic title cards, lower thirds, 3D text layouts, map tracking markers, and infographic curves using After Effects and Cinema 4D. Subtle effects are built-in, while heavy CGI is calculated in custom VFX packages."
    },
    {
      question: "What is your revision policy if I need changes?",
      answer: "Each pricing package contains a fixed number of revision cycles (3 to 5). A revision cycle represents a batch of edits based on your notes. If you select a Monthly Retainer plan, you receive unlimited revisions to guarantee total alignment."
    },
    {
      question: "How do we handle color grading and LUT styles?",
      answer: "Every timeline is graded in DaVinci Resolve. We align on the project mood board in the storyboard phase. If you have a specific brand color palette or corporate guidelines, I match those color values. Otherwise, I custom grade to establish a cinematic look."
    }
  ];

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      ref={containerRef}
      className="relative w-full bg-[#05050a] px-6 py-24 lg:px-24 overflow-hidden border-t border-white/5"
    >
      {/* Background glow meshes */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-radial from-[rgba(189,0,255,0.03)] to-transparent blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl w-full mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-3 justify-center"
          >
            <span className="h-1 w-8 bg-electric-blue rounded-full" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-electric-blue font-syne">
              Production FAQ
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-bold font-syne text-white tracking-tight"
          >
            Frequently Asked Queries <br />
            <span className="text-neutral-400">Clear Answers For Creators.</span>
          </motion.h2>
        </div>

        {/* Accordions container */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="glass rounded-2xl border border-white/5 overflow-hidden transition-all duration-300"
              >
                {/* Trigger Row */}
                <button
                  onClick={() => handleToggle(index)}
                  className="w-full p-6 text-left flex justify-between items-center cursor-none hover:bg-white/2 transition-colors relative z-10"
                  data-cursor={isOpen ? "collapse" : "expand"}
                >
                  <span className="text-sm sm:text-base font-bold font-syne text-white tracking-tight flex items-center gap-3">
                    <HelpCircle className={`h-4.5 w-4.5 shrink-0 ${isOpen ? "text-electric-blue" : "text-neutral-500"} transition-colors`} />
                    {faq.question}
                  </span>
                  <ChevronDown className={`h-4.5 w-4.5 text-neutral-500 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-electric-blue" : ""}`} />
                </button>

                {/* Content Panel (Animated Height) */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-6 pb-6 text-neutral-400 text-xs sm:text-sm font-light leading-relaxed border-t border-white/5 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
