"use client";

import { cn } from "@/lib/utils";
import { TextReveal } from "./TextReveal";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
  label?: string;
}

export function SectionHeading({
  title,
  subtitle,
  className,
  align = "left",
  label,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-16 lg:mb-20",
        align === "center" && "text-center",
        className
      )}
    >
      {label && (
        <p
          className={cn(
            "morph-heading-label mb-3",
            align === "center" && "mx-auto"
          )}
        >
          {label}
        </p>
      )}
      <TextReveal
        as="h2"
        className="morph-heading-title text-3xl md:text-4xl lg:text-5xl xl:text-[3.25rem]"
      >
        {title}
      </TextReveal>
      {subtitle && (
        <p
          className={cn(
            "mt-5 text-muted text-base md:text-lg max-w-2xl leading-relaxed text-balance font-light",
            align === "center" && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
