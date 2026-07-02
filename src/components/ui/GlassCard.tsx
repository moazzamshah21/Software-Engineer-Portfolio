"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  glow?: boolean;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, hover = true, glow = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden p-6",
          "bg-surface-raised border border-glass-border shadow-card",
          hover &&
            "transition-all duration-700 hover:border-white/20 hover:bg-surface",
          className
        )}
        style={{ transitionTimingFunction: "cubic-bezier(0.25, 1.25, 0.5, 1)" }}
        {...props}
      >
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        <div className="relative z-10">{children}</div>
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";
