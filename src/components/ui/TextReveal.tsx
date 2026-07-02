"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsapPlugins } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  splitBy?: "words" | "chars";
}

export function TextReveal({
  children,
  className,
  as: Tag = "h2",
  delay = 0,
  splitBy = "words",
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsapPlugins();
    if (!ref.current) return;

    const el = ref.current;
    const items =
      splitBy === "words"
        ? children.split(" ").map((word) => `<span class="inline-block overflow-hidden"><span class="inline-block translate-y-full">${word}&nbsp;</span></span>`)
        : children.split("").map((char) => `<span class="inline-block overflow-hidden"><span class="inline-block translate-y-full">${char === " " ? "&nbsp;" : char}</span></span>`);

    el.innerHTML = items.join("");

    const spans = el.querySelectorAll("span > span");

    gsap.to(spans, {
      y: 0,
      duration: 0.8,
      stagger: splitBy === "words" ? 0.05 : 0.02,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  }, [children, delay, splitBy]);

  return (
    <Tag ref={ref as React.RefObject<HTMLHeadingElement>} className={cn(className)}>
      {children}
    </Tag>
  );
}
