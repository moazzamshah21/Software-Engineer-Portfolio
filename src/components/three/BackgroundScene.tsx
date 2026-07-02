"use client";

import { Suspense, useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { generateSpherePoints } from "@/lib/particles";

const COLORS = {
  primary: "#FFFFFF",
  secondary: "#A8A8B0",
  tertiary: "#6B6B72",
};

function FloatingTorus({
  position,
  rotation,
  scale,
  color,
  speed,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  color: string;
  speed: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed;
    ref.current.rotation.x = rotation[0] + t * 0.3;
    ref.current.rotation.y = rotation[1] + t * 0.5;
    ref.current.position.y = position[1] + Math.sin(t) * 0.4;
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <torusGeometry args={[1, 0.04, 8, 64]} />
      <meshBasicMaterial color={color} transparent opacity={0.22} wireframe={false} />
    </mesh>
  );
}

function WireframeSphere({ position, scale, color }: { position: [number, number, number]; scale: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.08;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.2;
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 1]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.1} />
    </mesh>
  );
}

function StarField({ count = 400 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(
    () => generateSpherePoints(count, { minRadius: 15, radiusRange: 25, zOffset: -10 }),
    [count]
  );

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.008;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#FFFFFF"
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function BackgroundContent({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouse.current.x * 0.15,
      0.02
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mouse.current.y * 0.08,
      0.02
    );
  });

  const rings = useMemo(
    () => [
      { position: [-3, 1, -8] as [number, number, number], rotation: [1, 0, 0.5] as [number, number, number], scale: 1.2, color: COLORS.primary, speed: 0.4 },
      { position: [4, -0.5, -10] as [number, number, number], rotation: [0.5, 1, 0] as [number, number, number], scale: 1.8, color: COLORS.secondary, speed: 0.25 },
      { position: [0, 2, -12] as [number, number, number], rotation: [0, 0.5, 1] as [number, number, number], scale: 2.2, color: COLORS.tertiary, speed: 0.15 },
      { position: [-5, -2, -6] as [number, number, number], rotation: [1, 1, 0] as [number, number, number], scale: 0.9, color: COLORS.primary, speed: 0.55 },
    ],
    []
  );

  return (
    <group ref={groupRef}>
      <StarField count={350} />
      {rings.map((r, i) => (
        <FloatingTorus key={i} {...r} />
      ))}
      <WireframeSphere position={[5, 0, -9]} scale={2.5} color={COLORS.secondary} />
      <WireframeSphere position={[-4, -1, -7]} scale={1.5} color={COLORS.tertiary} />
      <fog attach="fog" args={["#18181B", 12, 35]} />
    </group>
  );
}

export function BackgroundScene() {
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none opacity-60">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 55 }}
        dpr={[1, 1.25]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <BackgroundContent mouse={mouseRef} />
        </Suspense>
      </Canvas>
    </div>
  );
}
