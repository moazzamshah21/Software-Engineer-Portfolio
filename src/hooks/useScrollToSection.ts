"use client";

import { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLenisContext } from "@/components/providers/LenisProvider";
import { setPendingSectionScroll } from "@/lib/section-scroll";

export function useScrollToSection() {
  const { scrollTo } = useLenisContext();
  const router = useRouter();
  const pathname = usePathname();

  return useCallback(
    (href: string) => {
      if (!href.startsWith("#")) return;

      if (pathname !== "/") {
        setPendingSectionScroll(href);
        router.push("/");
        return;
      }

      scrollTo(href);
    },
    [pathname, router, scrollTo]
  );
}
