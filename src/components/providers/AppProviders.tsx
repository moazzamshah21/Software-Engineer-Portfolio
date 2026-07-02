"use client";

import dynamic from "next/dynamic";
import { useLoadingState, useCommandPalette, useEasterEgg } from "@/hooks";
import { AmbientBackground } from "@/components/layout/AmbientBackground";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { BackToTop } from "@/components/layout/BackToTop";
import { NoiseOverlay } from "@/components/layout/NoiseOverlay";
import { EasterEgg } from "@/components/ui/EasterEgg";

const BackgroundScene = dynamic(
  () => import("@/components/three/BackgroundScene").then((m) => m.BackgroundScene),
  { ssr: false }
);

export function AppProviders({ children }: { children: React.ReactNode }) {
  const { isLoading, isAnimatingOut, onAnimationComplete } = useLoadingState();
  const { isOpen, close } = useCommandPalette();
  const { isActive } = useEasterEgg();

  return (
    <>
      {isLoading && (
        <LoadingScreen
          isAnimatingOut={isAnimatingOut}
          onComplete={onAnimationComplete}
        />
      )}
      <AmbientBackground />
      <BackgroundScene />
      <NoiseOverlay />
      <CustomCursor />
      <ScrollProgress />
      <BackToTop />
      <CommandPalette isOpen={isOpen} onClose={close} />
      {isActive && <EasterEgg />}
      {children}
    </>
  );
}
