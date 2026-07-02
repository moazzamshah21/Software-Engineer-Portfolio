"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface LoadingScreenProps {
  isAnimatingOut: boolean;
  onComplete: () => void;
}

export function LoadingScreen({ isAnimatingOut, onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.to(progressRef.current, {
      width: "100%",
      duration: 2,
      ease: "power2.inOut",
    });

    tl.to(
      textRef.current,
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
      0.3
    );

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    if (!isAnimatingOut || !containerRef.current) return;

    const tl = gsap.timeline({ onComplete });

    tl.to(containerRef.current, {
      y: "-100%",
      duration: 1,
      ease: "power4.inOut",
    });

    return () => {
      tl.kill();
    };
  }, [isAnimatingOut, onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] bg-background flex flex-col items-center justify-center"
    >
      <div ref={textRef} className="relative z-10 opacity-0 translate-y-4 text-center">
        <span className="text-5xl md:text-7xl font-display font-light text-foreground">
          MSK
        </span>
        <p className="mt-4 text-subtle text-xs tracking-[0.35em] uppercase font-light">
          Loading Experience
        </p>
      </div>

      <div className="absolute bottom-12 left-8 right-8 md:left-16 md:right-16">
        <div className="h-px bg-white/10 relative overflow-hidden">
          <div
            ref={progressRef}
            className="absolute inset-y-0 left-0 w-0 bg-white"
          />
        </div>
      </div>
    </div>
  );
}
