export const COLORS = {
  background: "#18181B",
  surface: "#212124",
  surfaceDark: "#19191B",
  surfaceDeep: "#0D0D0E",
  foreground: "#FFFFFF",
  muted: "rgba(255, 255, 255, 0.56)",
  mutedLight: "rgba(255, 255, 255, 0.8)",
  accent: {
    white: "#FFFFFF",
    gray: "#D8D8D8",
  },
} as const;

export const GRADIENTS = {
  overlay: "radial-gradient(circle, rgba(33,33,36,0.44) 0%, #121212 100%)",
  glass: "rgba(255, 255, 255, 0.05)",
} as const;

export const EASING = {
  morph: "cubic-bezier(0.25, 1.25, 0.5, 1)",
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;
