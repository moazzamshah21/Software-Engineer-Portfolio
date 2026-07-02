"use client";

import { useScrollProgress } from "@/hooks";

export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 right-0 z-[9997] h-[2px] bg-surface/50">
      <div
        className="h-full bg-white"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}
