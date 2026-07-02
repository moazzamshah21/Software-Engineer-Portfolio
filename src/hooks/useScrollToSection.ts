"use client";

import { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLenisContext } from "@/components/providers/LenisProvider";

export function useScrollToSection() {
  const { scrollTo } = useLenisContext();
  const router = useRouter();
  const pathname = usePathname();

  return useCallback(
    (href: string) => {
      if (!href.startsWith("#")) return;

      if (pathname !== "/") {
        router.push(`/${href}`);
        return;
      }

      scrollTo(href);
    },
    [pathname, router, scrollTo]
  );
}
