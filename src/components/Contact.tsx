"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, Calendar, Send, CheckCircle2, MessageSquare, Instagram, Linkedin, Twitter } from "lucide-react";
import Magnetic from "./Magnetic";

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("");
  const [message, setMessage] = useState("");
  
  // Validation States
  const [emailError, setEmailError] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Validate Email
  const validateEmail = (val: string) => {
    setEmail(val);
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(val.length > 0 && !regex.test(val));
  };

  // Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || emailError || !message) return;

    setSubmitting(true);
    // Simulate API pipeline render
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      // Reset form
      setName("");
      setEmail("");
      setProjectType("");
      setMessage("");
    }, 1800);
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-center bg-[#030306] px-6 py-24 lg:px-24 overflow-hidden border-t border-white/5"
    >
      {/* Background neon meshes */}
      <div className="absolute top-1/4 left-0 w-[450px] h-[450px] bg-radial from-[rgba(0,240,255,0.05)] to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[450px] h-[450px] bg-radial from-[rgba(189,0,255,0.05)] to-transparent blur-3xl pointer-events-none" />

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
              Initiate Project
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-bold font-syne text-white tracking-tight"
          >
            Let's Make Something <br />
            <span className="text-neutral-400">Cinematic Together.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Side: Contact Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass p-8 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden"
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-6">
                    <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold font-syne text-white mb-2">Message Rendered!</h3>
                  <p className="text-neutral-400 text-sm font-light max-w-sm leading-relaxed mb-6">
                    Thank you! I have received your request. I will review your project specs and get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="glass px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider text-white border border-white/10 hover:bg-white/5 cursor-none"
                    data-cursor="back"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Row 1: Name */}
                  <div className="relative w-full group">
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-transparent border-b border-white/10 py-3 text-sm text-white focus:outline-none focus:border-electric-blue transition-colors peer"
                    />
                    <label
                      className={`absolute left-0 bottom-3 text-neutral-500 text-sm pointer-events-none transition-all duration-300 peer-focus:bottom-9 peer-focus:text-xs peer-focus:text-electric-blue ${
                        name ? "bottom-9 text-xs text-electric-blue" : ""
                      }`}
                    >
                      Your Name *
                    </label>
                  </div>

                  {/* Row 2: Email */}
                  <div className="relative w-full group">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => validateEmail(e.target.value)}
                      className={`w-full bg-transparent border-b py-3 text-sm text-white focus:outline-none transition-colors peer ${
                        emailError ? "border-red-500/80 focus:border-red-500" : "border-white/10 focus:border-electric-blue"
                      }`}
                    />
                    <label
                      className={`absolute left-0 bottom-3 text-neutral-500 text-sm pointer-events-none transition-all duration-300 peer-focus:bottom-9 peer-focus:text-xs ${
                        emailError ? "peer-focus:text-red-400 text-red-400" : "peer-focus:text-electric-blue"
                      } ${email ? "bottom-9 text-xs" : ""}`}
                    >
                      Email Address *
                    </label>
                    {emailError && (
                      <span className="absolute right-0 bottom-3 text-[10px] font-mono text-red-400 uppercase tracking-wider">
                        Invalid Email format
                      </span>
                    )}
                  </div>

                  {/* Row 3: Project Type */}
                  <div className="relative w-full group">
                    <select
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="w-full bg-transparent border-b border-white/10 py-3 text-sm text-neutral-300 focus:outline-none focus:border-electric-blue transition-colors appearance-none peer cursor-none"
                    >
                      <option value="" disabled className="bg-[#030306]">Select Project Type</option>
                      <option value="Commercials" className="bg-[#030306]">Commercial Video Edit</option>
                      <option value="Motion" className="bg-[#030306]">Motion Graphics & VFX</option>
                      <option value="Color" className="bg-[#030306]">Color Grading (Resolve)</option>
                      <option value="Social" className="bg-[#030306]">Social Media Shorts / Retainer</option>
                      <option value="Other" className="bg-[#030306]">Other Visual Project</option>
                    </select>
                    <div className="absolute right-0 bottom-3 pointer-events-none text-neutral-500">▼</div>
                  </div>

                  {/* Row 4: Message */}
                  <div className="relative w-full group">
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-transparent border-b border-white/10 py-3 text-sm text-white focus:outline-none focus:border-electric-blue transition-colors peer resize-none"
                    />
                    <label
                      className={`absolute left-0 top-3 text-neutral-500 text-sm pointer-events-none transition-all duration-300 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-electric-blue ${
                        message ? "-top-4 text-xs text-electric-blue" : ""
                      }`}
                    >
                      Project brief / Message *
                    </label>
                  </div>

                  {/* Submit button */}
                  <div className="pt-4">
                    <Magnetic strength={0.15}>
                      <button
                        type="submit"
                        disabled={submitting || !name || !email || emailError || !message}
                        className="group relative px-8 py-4 rounded-xl bg-linear-to-r from-electric-blue to-neon-purple text-neutral-900 font-bold text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(0,240,255,0.2)] hover:shadow-[0_0_30px_rgba(189,0,255,0.4)] disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2 cursor-none select-none interactive-item"
                        data-cursor="submit"
                      >
                        {submitting ? (
                          <>
                            <span>RENDERING PIPELINE...</span>
                            <div className="w-3.5 h-3.5 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin" />
                          </>
                        ) : (
                          <>
                            <span>SUBMIT PROPOSAL</span>
                            <Send className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                          </>
                        )}
                      </button>
                    </Magnetic>
                  </div>
                </form>
              )}
            </motion.div>
          </div>

          {/* Right Side: Channels Info & Calendly Booking */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass p-6 rounded-3xl border border-white/5 flex flex-col gap-6"
            >
              <h3 className="text-xl font-bold font-syne text-white tracking-tight">Direct Channels</h3>
              
              {/* Email CTA */}
              <div className="flex gap-4 items-center group">
                <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-electric-blue group-hover:scale-110 group-hover:bg-white/10 transition-transform">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[9px] text-neutral-500 font-mono block">SEND EMAIL</span>
                  <a
                    href="mailto:yash@cinematic.art"
                    className="text-xs sm:text-sm font-semibold text-white hover:text-electric-blue transition-colors cursor-none interactive-item"
                    data-cursor="email"
                  >
                    yash@cinematic.art
                  </a>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="flex gap-4 items-center group">
                <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:bg-white/10 transition-transform">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[9px] text-neutral-500 font-mono block">WHATSAPP CHAT</span>
                  <a
                    href="https://wa.me/1234567890"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs sm:text-sm font-semibold text-white hover:text-emerald-400 transition-colors cursor-none interactive-item"
                    data-cursor="whatsapp"
                  >
                    +1 (234) 567-890
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Calendly Booking Card */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass p-6 rounded-3xl border border-neon-purple/20 flex flex-col justify-between shadow-[0_0_20px_rgba(189,0,255,0.05)] cursor-none"
              data-cursor="calendly"
            >
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-10 w-10 rounded-xl bg-neon-purple/10 border border-neon-purple/30 flex items-center justify-center text-neon-purple">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold font-syne text-white tracking-tight">Book a Call</h3>
                </div>
                <p className="text-xs text-neutral-400 font-light leading-relaxed mb-6">
                  Skip the emails. Book a quick 15-minute discovery video call via Calendly. We will walk through your project storyboard, review raw timelines scope, and align pricing structures.
                </p>
              </div>

              <Magnetic strength={0.15}>
                <a
                  href="https://calendly.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 rounded-xl bg-linear-to-r from-electric-blue to-neon-purple text-neutral-900 font-bold text-xs tracking-wider uppercase text-center block shadow-[0_0_15px_rgba(0,240,255,0.2)] hover:shadow-[0_0_25px_rgba(189,0,255,0.4)] transition-all duration-300 interactive-item"
                >
                  Schedule call
                </a>
              </Magnetic>
            </motion.div>

            {/* Social Icons links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex justify-start gap-4 mt-2"
            >
              {[
                { icon: <Instagram className="h-4.5 w-4.5" />, link: "https://instagram.com" },
                { icon: <Linkedin className="h-4.5 w-4.5" />, link: "https://linkedin.com" },
                { icon: <Twitter className="h-4.5 w-4.5" />, link: "https://twitter.com" }
              ].map((soc, i) => (
                <Magnetic key={i} strength={0.25}>
                  <a
                    href={soc.link}
                    target="_blank"
                    rel="noreferrer"
                    className="h-10 w-10 rounded-full glass border border-white/5 flex items-center justify-center hover:bg-white/5 hover:text-electric-blue hover:border-electric-blue/30 transition-all duration-300 cursor-none interactive-item"
                  >
                    {soc.icon}
                  </a>
                </Magnetic>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
