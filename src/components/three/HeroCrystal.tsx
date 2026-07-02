"use client";

import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Environment, Torus } from "@react-three/drei";
import * as THREE from "three";
import { generateColoredSpherePoints } from "@/lib/particles";

const COLORS = {
  primary: "#E8E8EC",
  secondary: "#A8A8B0",
  accent: "#FFFFFF",
};

function Crystal({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.x = t * 0.12 + mouse.current.y * 0.25;
    meshRef.current.rotation.y = t * 0.18 + mouse.current.x * 0.25;
  });

  return (
    <Float speed={1.8} rotationIntensity={0.3} floatIntensity={1.2}>
      <mesh ref={meshRef} scale={1.6}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshTransmissionMaterial
          backside
          samples={6}
          thickness={0.8}
          chromaticAberration={0.04}
          anisotropy={0.4}
          distortion={0.12}
          distortionScale={0.12}
          temporalDistortion={0.06}
          iridescence={0.6}
          iridescenceIOR={1.1}
          iridescenceThicknessRange={[0, 800]}
          color={COLORS.primary}
          roughness={0.08}
          metalness={0.15}
        />
      </mesh>
    </Float>
  );
}

function OrbitingRings({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = t * 0.25 + mouse.current.x * 0.2;
    groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.15 + mouse.current.y * 0.1;
  });

  return (
    <group ref={groupRef}>
      <Torus args={[2.2, 0.015, 8, 100]} rotation={[Math.PI / 2.5, 0, 0]}>
        <meshBasicMaterial color={COLORS.accent} transparent opacity={0.35} />
      </Torus>
      <Torus args={[2.6, 0.012, 8, 100]} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <meshBasicMaterial color={COLORS.secondary} transparent opacity={0.28} />
      </Torus>
      <Torus args={[3, 0.008, 8, 100]} rotation={[Math.PI / 1.8, -Math.PI / 6, Math.PI / 3]}>
        <meshBasicMaterial color={COLORS.primary} transparent opacity={0.22} />
      </Torus>
    </group>
  );
}

function InnerOctahedron() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = -state.clock.elapsedTime * 0.4;
    ref.current.rotation.z = state.clock.elapsedTime * 0.2;
  });

  return (
    <Float speed={3} floatIntensity={0.5}>
      <mesh ref={ref} scale={0.35}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={COLORS.accent}
          emissive={COLORS.primary}
          emissiveIntensity={0.4}
          metalness={0.85}
          roughness={0.12}
          transparent
          opacity={0.75}
        />
      </mesh>
    </Float>
  );
}

function Particles({ count = 120 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(
    () =>
      generateColoredSpherePoints(count, [COLORS.accent, COLORS.primary, COLORS.secondary], {
        minRadius: 2,
        radiusRange: 4,
      }),
    [count]
  );

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.015;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        vertexColors
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function SceneContent({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  useFrame(({ camera }) => {
    const targetX = mouse.current.x * 0.4;
    const targetY = mouse.current.y * 0.25 + 0.3;
    camera.position.set(
      THREE.MathUtils.lerp(camera.position.x, targetX, 0.04),
      THREE.MathUtils.lerp(camera.position.y, targetY, 0.04),
      camera.position.z
    );
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[4, 4, 4]} intensity={1} color={COLORS.accent} />
      <pointLight position={[-4, -2, 3]} intensity={0.5} color={COLORS.secondary} />
      <pointLight position={[0, 2, -4]} intensity={0.35} color={COLORS.primary} />
      <spotLight position={[0, 5, 0]} intensity={0.4} color="#FFFFFF" angle={0.5} penumbra={1} />
      <OrbitingRings mouse={mouse} />
      <Crystal mouse={mouse} />
      <InnerOctahedron />
      <Particles count={100} />
      <Environment preset="night" />
    </>
  );
}

export function HeroCrystalScene() {
  const mouse = useRef({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  };

  return (
    <div className="relative w-full h-full" onPointerMove={handlePointerMove}>
      <div className="absolute inset-[15%] bg-white/[0.03] blur-3xl" />

      <div className="relative w-full h-full overflow-hidden border border-glass-border bg-surface-overlay/80 backdrop-blur-sm">
        <Canvas
          camera={{ position: [0, 0.2, 6], fov: 42 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          style={{ background: "transparent" }}
        >
          <Suspense fallback={null}>
            <SceneContent mouse={mouse} />
          </Suspense>
        </Canvas>

        <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-white/25" />
        <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-white/25" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-white/25" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-white/25" />
      </div>
    </div>
  );
}
