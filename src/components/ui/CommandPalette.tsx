"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { commandPaletteContent } from "@/content/command-palette";
import { cn } from "@/lib/utils";
import { FiSearch, FiCommand } from "react-icons/fi";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

function CommandPaletteDialog({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filtered = commandPaletteContent.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  const groups = filtered.reduce(
    (acc, item) => {
      if (!acc[item.group]) acc[item.group] = [];
      acc[item.group].push(item);
      return acc;
    },
    {} as Record<string, typeof commandPaletteContent>
  );

  useEffect(() => {
    inputRef.current?.focus();

    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.2 }
    );

    gsap.fromTo(
      panelRef.current,
      { opacity: 0, y: -20, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "power3.out" }
    );
  }, []);

  const handleSelect = (action: string) => {
    onClose();

    if (action.startsWith("http") || action.startsWith("mailto")) {
      window.open(action, action.startsWith("http") ? "_blank" : "_self");
      return;
    }

    if (action.startsWith("#")) {
      const el = document.querySelector(action);
      el?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    router.push(action);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      handleSelect(filtered[selectedIndex].action);
    }
  };

  let flatIndex = -1;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-[20vh]"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        className="w-full max-w-lg glass rounded-2xl overflow-hidden shadow-2xl mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-glass-border">
          <FiSearch className="text-muted" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search commands..."
            className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted"
            autoFocus
          />
          <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 text-xs text-muted glass rounded">
            <FiCommand size={10} />K
          </kbd>
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          {Object.entries(groups).map(([group, items]) => (
            <div key={group}>
              <p className="px-3 py-2 text-xs text-muted uppercase tracking-wider">
                {group}
              </p>
              {items.map((item) => {
                flatIndex++;
                const currentIndex = flatIndex;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.action)}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors",
                      currentIndex === selectedIndex
                        ? "bg-white/10 text-foreground"
                        : "text-muted hover:text-foreground hover:bg-white/5"
                    )}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          ))}

          {filtered.length === 0 && (
            <p className="px-3 py-8 text-center text-muted text-sm">
              No results found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  if (!isOpen) return null;
  return <CommandPaletteDialog onClose={onClose} />;
}
