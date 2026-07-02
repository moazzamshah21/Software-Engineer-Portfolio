"use client";

import { cn } from "@/lib/utils";

interface AnimatedBorderProps {
  children: React.ReactNode;
  className?: string;
  active?: boolean;
}

export function AnimatedBorder({ children, className, active = false }: AnimatedBorderProps) {
  return (
    <div className={cn("relative rounded-2xl p-px overflow-hidden group", className)}>
      <div
        className={cn(
          "absolute -inset-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 border-spin",
          active && "opacity-100"
        )}
        style={{
          background:
            "conic-gradient(from 0deg, transparent 60%, #6B9FFF, #9B6FFF, #22E3FF, transparent 80%)",
        }}
      />
      <div className="relative bg-background rounded-2xl">{children}</div>
    </div>
  );
}
