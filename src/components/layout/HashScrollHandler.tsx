"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLenisContext } from "@/components/providers/LenisProvider";

export function HashScrollHandler() {
  const { scrollTo } = useLenisContext();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;

    const hash = window.location.hash;
    if (!hash) return;

    const timer = window.setTimeout(() => {
      if (document.querySelector(hash)) {
        scrollTo(hash);
      }
    }, 150);

    return () => window.clearTimeout(timer);
  }, [pathname, scrollTo]);

  return null;
}
