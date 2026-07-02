"use client";

import { useState, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { FiArrowUp } from "react-icons/fi";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    gsap.to(".back-to-top", {
      opacity: visible ? 1 : 0,
      y: visible ? 0 : 20,
      scale: visible ? 1 : 0.8,
      duration: 0.4,
      ease: "power2.out",
      pointerEvents: visible ? "auto" : "none",
    });
  }, [visible]);

  return (
    <button
      onClick={scrollToTop}
      className="back-to-top fixed bottom-8 right-8 z-50 w-12 h-12 glass flex items-center justify-center opacity-0 hover:bg-white/10 transition-colors border border-glass-border"
      aria-label="Back to top"
      data-cursor="pointer"
    >
      <FiArrowUp className="text-white/80" />
    </button>
  );
}
