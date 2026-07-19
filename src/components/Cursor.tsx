"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [hovered, setHovered] = useState(false);
  const [click, setClick] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const cursorRef = useRef<HTMLDivElement>(null);

  // Smooth mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 35, stiffness: 350, mass: 0.35 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Hidden on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const isInteractive = 
        target.closest("a") || 
        target.closest("button") || 
        target.closest("input") || 
        target.closest("textarea") || 
        target.closest('[role="button"]') || 
        target.closest(".interactive-item");

      if (isInteractive) {
        setHovered(true);
        // Look up for custom data-cursor text
        const customText = (target.closest("[data-cursor]") as HTMLElement)?.getAttribute("data-cursor");
        if (customText) {
          setCursorText(customText);
        } else {
          setCursorText("");
        }
      } else {
        setHovered(false);
        setCursorText("");
      }
    };

    const handleMouseDown = () => setClick(true);
    const handleMouseUp = () => setClick(false);

    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Ambient background light tracker */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-0 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-radial from-[rgba(0,240,255,0.07)] via-[rgba(189,0,255,0.03)] to-transparent blur-3xl"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      />

      {/* Interactive cursor ring */}
      <motion.div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-50 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(0,240,255,0.5)] bg-black/40 backdrop-blur-xs text-white"
        style={{
          x: cursorX,
          y: cursorY,
          width: hovered ? (cursorText ? 72 : 46) : 10,
          height: hovered ? (cursorText ? 72 : 46) : 10,
        }}
        animate={{
          scale: click ? 0.85 : 1,
          borderColor: hovered ? "rgba(189,0,255,0.6)" : "rgba(0,240,255,0.5)",
          boxShadow: hovered 
            ? "0 0 20px rgba(189,0,255,0.2)" 
            : "0 0 8px rgba(0,240,255,0.1)",
        }}
        transition={{ type: "tween", duration: 0.12 }}
      >
        {hovered && cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[9px] font-bold uppercase tracking-wider text-electric-blue text-center px-1 font-syne"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
