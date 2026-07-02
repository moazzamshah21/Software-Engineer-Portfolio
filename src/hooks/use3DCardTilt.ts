"use client";

import { useRef, useCallback } from "react";
import { gsap } from "@/lib/gsap";

interface Use3DCardTiltOptions {
  maxRotate?: number;
  perspective?: number;
}

export function use3DCardTilt(options: Use3DCardTiltOptions = {}) {
  const { maxRotate = 8, perspective = 1000 } = options;
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -maxRotate;
      const rotateY = ((x - centerX) / centerX) * maxRotate;

      gsap.to(el, {
        rotateX,
        rotateY,
        duration: 0.4,
        ease: "power2.out",
        transformPerspective: perspective,
      });
    },
    [maxRotate, perspective]
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    gsap.to(el, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.5)",
    });
  }, []);

  return { ref, handleMouseMove, handleMouseLeave };
}
