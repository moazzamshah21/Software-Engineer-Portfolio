"use client";

import { useRef, useEffect, useCallback } from "react";
import { gsap } from "@/lib/gsap";
import { lerp } from "@/lib/utils";

export function useMagneticButton(strength = 0.3) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(el, {
        x: x * strength,
        y: y * strength,
        duration: 0.4,
        ease: "power2.out",
      });
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.5)",
    });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.addEventListener("mousemove", handleMouseMove as EventListener);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove as EventListener);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return ref;
}

export function useMouseParallax(factor = 0.02) {
  const ref = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      target.current.x = (e.clientX - window.innerWidth / 2) * factor;
      target.current.y = (e.clientY - window.innerHeight / 2) * factor;
    };

    let rafId: number;
    const animate = () => {
      current.current.x = lerp(current.current.x, target.current.x, 0.08);
      current.current.y = lerp(current.current.y, target.current.y, 0.08);
      el.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`;
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, [factor]);

  return ref;
}
