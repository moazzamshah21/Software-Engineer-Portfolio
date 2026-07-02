"use client";

import { useSyncExternalStore } from "react";

function subscribeToMediaQuery(query: string, callback: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function getMediaQuerySnapshot(query: string) {
  return window.matchMedia(query).matches;
}

function getServerSnapshot() {
  return false;
}

export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (callback) => subscribeToMediaQuery(query, callback),
    () => getMediaQuerySnapshot(query),
    getServerSnapshot
  );
}

export function useIsMobile() {
  return useMediaQuery("(max-width: 768px)");
}

export function useIsTouchDevice() {
  return useMediaQuery("(hover: none)");
}
