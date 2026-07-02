"use client";

import { useState, useEffect, useCallback } from "react";
import { LOADING_DURATION } from "@/constants/animation";

type LoadingState = "loading" | "animating-out" | "complete";

export function useLoadingState() {
  const [state, setState] = useState<LoadingState>("loading");

  useEffect(() => {
    const timer = setTimeout(() => {
      setState("animating-out");
    }, LOADING_DURATION);

    return () => clearTimeout(timer);
  }, []);

  const onAnimationComplete = useCallback(() => {
    setState("complete");
  }, []);

  return {
    isLoading: state !== "complete",
    isAnimatingOut: state === "animating-out",
    onAnimationComplete,
  };
}
