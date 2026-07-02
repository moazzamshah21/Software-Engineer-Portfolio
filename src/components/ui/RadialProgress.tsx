"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, registerGsapPlugins } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface RadialProgressProps {
  percentage: number;
  label: string;
  icon?: ReactNode;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export function RadialProgress({
  percentage,
  label,
  icon,
  size = 120,
  strokeWidth = 4,
  className,
}: RadialProgressProps) {
  const circleRef = useRef<SVGCircleElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    registerGsapPlugins();
    if (!circleRef.current || !containerRef.current) return;

    gsap.fromTo(
      circleRef.current,
      { strokeDashoffset: circumference },
      {
        strokeDashoffset: circumference - (percentage / 100) * circumference,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, [percentage, circumference]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex flex-col items-center gap-3 group",
        className
      )}
    >
      <div className="relative transition-transform duration-500 group-hover:scale-105">
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={strokeWidth}
          />
          <circle
            ref={circleRef}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.85)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
          />
        </svg>
        <span className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
          {icon ? (
            <>
              <span className="text-white/80 group-hover:text-white transition-colors">
                {icon}
              </span>
              <span className="text-[10px] font-light text-muted">{percentage}%</span>
            </>
          ) : (
            <span className="text-sm font-light">{percentage}%</span>
          )}
        </span>
      </div>
      <span className="text-sm text-muted group-hover:text-foreground transition-colors font-light">
        {label}
      </span>
    </div>
  );
}
