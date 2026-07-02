"use client";

import { useState, useEffect, useCallback } from "react";
import { KEYBOARD_SHORTCUTS } from "@/constants/shortcuts";

export function useCommandPalette() {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const shortcut = KEYBOARD_SHORTCUTS.commandPalette;
      if (
        e.key.toLowerCase() === shortcut.key &&
        (e.metaKey || e.ctrlKey)
      ) {
        e.preventDefault();
        toggle();
      }

      if (e.key === "Escape" && isOpen) {
        close();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggle, close, isOpen]);

  return { isOpen, open, close, toggle };
}
