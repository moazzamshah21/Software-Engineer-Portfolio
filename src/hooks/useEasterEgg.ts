"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { EASTER_EGG_SEQUENCE } from "@/constants/shortcuts";
import { gsap } from "@/lib/gsap";

export function useEasterEgg() {
  const [isActive, setIsActive] = useState(false);
  const sequenceRef = useRef<string[]>([]);

  const reset = useCallback(() => {
    sequenceRef.current = [];
    setIsActive(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const key = e.key.toLowerCase();
      const next = [...sequenceRef.current, key].slice(-EASTER_EGG_SEQUENCE.length);
      sequenceRef.current = next;

      const matches = EASTER_EGG_SEQUENCE.every((k, i) => next[i] === k);
      if (matches) {
        setIsActive(true);
        setTimeout(reset, 4000);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [reset]);

  useEffect(() => {
    if (!isActive) return;

    gsap.fromTo(
      ".easter-egg-particle",
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.05,
        ease: "back.out(2)",
      }
    );
  }, [isActive]);

  return { isActive, reset };
}
