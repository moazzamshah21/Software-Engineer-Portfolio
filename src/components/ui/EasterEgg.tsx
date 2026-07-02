"use client";

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 8 + 4,
  color: ["#5B8CFF", "#7C4DFF", "#00D9FF"][i % 3],
}));

export function EasterEgg() {
  return (
    <div className="fixed inset-0 z-[9998] pointer-events-none flex items-center justify-center">
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          className="easter-egg-particle absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
          }}
        />
      ))}
      <p className="easter-egg-particle absolute text-2xl font-display font-light text-foreground">
        ✨ You found the secret!
      </p>
    </div>
  );
}
