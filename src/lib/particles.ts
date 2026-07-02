/** Deterministic-ish seeded random for stable particle layouts */
function seededRandom(seed: number) {
  const x = Math.sin(seed * 127.1 + seed * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

export function generateSpherePoints(
  count: number,
  options?: { minRadius?: number; radiusRange?: number; zOffset?: number }
) {
  const minRadius = options?.minRadius ?? 15;
  const radiusRange = options?.radiusRange ?? 25;
  const zOffset = options?.zOffset ?? -10;

  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const radius = minRadius + seededRandom(i * 3 + 1) * radiusRange;
    const theta = seededRandom(i * 3 + 2) * Math.PI * 2;
    const phi = Math.acos(2 * seededRandom(i * 3 + 3) - 1);
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi) + zOffset;
  }

  return positions;
}

export function generateColoredSpherePoints(
  count: number,
  palette: string[],
  options?: { minRadius?: number; radiusRange?: number }
) {
  const minRadius = options?.minRadius ?? 2;
  const radiusRange = options?.radiusRange ?? 4;

  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const r = minRadius + seededRandom(i * 5 + 1) * radiusRange;
    const theta = seededRandom(i * 5 + 2) * Math.PI * 2;
    const phi = Math.acos(2 * seededRandom(i * 5 + 3) - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);

    const paletteIndex = Math.floor(seededRandom(i * 5 + 4) * palette.length);
    const hex = palette[paletteIndex] ?? palette[0];
    const color = parseInt(hex.replace("#", ""), 16);
    colors[i * 3] = ((color >> 16) & 255) / 255;
    colors[i * 3 + 1] = ((color >> 8) & 255) / 255;
    colors[i * 3 + 2] = (color & 255) / 255;
  }

  return { positions, colors };
}
