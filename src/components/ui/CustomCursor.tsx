"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsTouchDevice } from "@/hooks";
import { cn } from "@/lib/utils";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouchDevice();

  useEffect(() => {
    if (isTouch) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    document.body.classList.add("hide-cursor");

    const onMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });

      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    const onEnterInteractive = () => {
      gsap.to(follower, { scale: 2, opacity: 0.5, duration: 0.3 });
      gsap.to(cursor, { scale: 0.5, duration: 0.3 });
    };

    const onLeaveInteractive = () => {
      gsap.to(follower, { scale: 1, opacity: 1, duration: 0.3 });
      gsap.to(cursor, { scale: 1, duration: 0.3 });
    };

    window.addEventListener("mousemove", onMove);

    const interactives = document.querySelectorAll(
      'a, button, [data-cursor="pointer"], input, textarea'
    );

    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnterInteractive);
      el.addEventListener("mouseleave", onLeaveInteractive);
    });

    return () => {
      document.body.classList.remove("hide-cursor");
      window.removeEventListener("mousemove", onMove);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterInteractive);
        el.removeEventListener("mouseleave", onLeaveInteractive);
      });
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 bg-white pointer-events-none z-[9999] mix-blend-difference"
        style={{ transform: "translate(-100px, -100px)" }}
      />
      <div
        ref={followerRef}
        className={cn(
          "fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4",
          "border border-white/50 pointer-events-none z-[9998]",
          "mix-blend-difference"
        )}
        style={{ transform: "translate(-100px, -100px)" }}
      />
    </>
  );
}
