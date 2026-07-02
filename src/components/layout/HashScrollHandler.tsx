"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLenisContext } from "@/components/providers/LenisProvider";
import { resolveSectionHash, clearPendingSectionScroll } from "@/lib/section-scroll";
import { ScrollTrigger } from "@/lib/gsap";

const MAX_ATTEMPTS = 40;
const RETRY_DELAY_MS = 100;

export function HashScrollHandler() {
  const { scrollTo, resize } = useLenisContext();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;

    const hash = resolveSectionHash();
    if (!hash) return;

    let attempts = 0;
    let timer: number | undefined;

    const tryScroll = () => {
      const target = document.querySelector(hash);
      if (target) {
        clearPendingSectionScroll();
        resize();
        ScrollTrigger.refresh();
        scrollTo(hash);
        return;
      }

      attempts += 1;
      if (attempts < MAX_ATTEMPTS) {
        timer = window.setTimeout(tryScroll, RETRY_DELAY_MS);
      }
    };

    timer = window.setTimeout(tryScroll, 50);

    return () => {
      if (timer !== undefined) {
        window.clearTimeout(timer);
      }
    };
  }, [pathname, resize, scrollTo]);

  return null;
}
