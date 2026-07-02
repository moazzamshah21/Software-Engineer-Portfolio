"use client";

import { useLenisContext } from "@/components/providers/LenisProvider";

export function useLenis() {
  return useLenisContext();
}
