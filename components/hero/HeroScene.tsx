'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTheme } from '@/lib/theme';

interface Palette {
  fog: string;
  particle: string;
  particleOpacity: number;
  additive: boolean;
  ringA: string;
  ringB: string;
  core: string;
  beam: number;
}

const DARK: Palette = {
  fog: '#030818',
  particle: '#FFB84D',
  particleOpacity: 0.75,
  additive: true,
  ringA: '#F5A524',
  ringB: '#3D6CC9',
  core: '#FFD285',
  beam: 0.05,
};

const LIGHT: Palette = {
  fog: '#ffffff',
  particle: '#2450A8',
  particleOpacity: 0.35,
  additive: false,
  ringA: '#D18A0F',
  ringB: '#1B3A80',
  core: '#D18A0F',
  beam: 0.07,
};

function Particles({ palette, count }: { palette: Palette; count: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 4.5 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.65;
      arr[i * 3 + 2] = r * Math.cos(phi) - 2;
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.02;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.04;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color={palette.particle}
        transparent
        opacity={palette.particleOpacity}
        sizeAttenuation
        depthWrite={false}
        blending={palette.additive ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </points>
  );
}

function Ring({
  radius,
  color,
  speed,
  tilt,
  opacity,
  additive,
}: {
  radius: number;
  color: string;
  speed: number;
  tilt: [number, number, number];
  opacity: number;
  additive: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * speed;
  });
  return (
    <mesh ref={ref} rotation={tilt}>
      <torusGeometry args={[radius, 0.012, 8, 140]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        depthWrite={false}
        blending={additive ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </mesh>
  );
}

function Core({ palette }: { palette: Palette }) {
  const outer = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (!outer.current || !inner.current) return;
    outer.current.rotation.y += delta * 0.25;
    outer.current.rotation.x += delta * 0.07;
    inner.current.rotation.y -= delta * 0.4;
    const t = state.clock.elapsedTime;
    const s = 1 + Math.sin(t * 1.3) * 0.035;
    outer.current.scale.setScalar(s);
    inner.current.scale.setScalar(1 / s);
  });
  return (
    <group>
      <mesh ref={outer}>
        <icosahedronGeometry args={[1.45, 1]} />
        <meshBasicMaterial
          wireframe
          color={palette.core}
          transparent
          opacity={0.55}
          depthWrite={false}
          blending={palette.additive ? THREE.AdditiveBlending : THREE.NormalBlending}
        />
      </mesh>
      <mesh ref={inner}>
        <icosahedronGeometry args={[0.72, 0]} />
        <meshBasicMaterial
          color={palette.core}
          transparent
          opacity={0.16}
          depthWrite={false}
          blending={palette.additive ? THREE.AdditiveBlending : THREE.NormalBlending}
        />
      </mesh>
    </group>
  );
}

/** Disque hologramme projeté sous le logo */
function HoloDisc({ palette }: { palette: Palette }) {
  const group = useRef<THREE.Group>(null);
  const mat = useRef<THREE.MeshBasicMaterial>(null);
  const mat2 = useRef<THREE.MeshBasicMaterial>(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (mat.current) mat.current.opacity = 0.35 + Math.sin(t * 1.6) * 0.2;
    if (mat2.current) mat2.current.opacity = 0.2 + Math.sin(t * 1.6 + 1.4) * 0.12;
  });
  return (
    <group ref={group} position={[0, -1.9, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh>
        <ringGeometry args={[1.9, 1.98, 72]} />
        <meshBasicMaterial ref={mat} color={palette.ringA} transparent opacity={0.4} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      <mesh>
        <ringGeometry args={[2.5, 2.55, 72]} />
        <meshBasicMaterial ref={mat2} color={palette.ringB} transparent opacity={0.25} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      <mesh>
        <ringGeometry args={[3.1, 3.13, 72]} />
        <meshBasicMaterial color={palette.ringA} transparent opacity={0.14} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
    </group>
  );
}

/** Cone lumineux « projecteur hologramme » */
function Beam({ palette }: { palette: Palette }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const m = ref.current.material as THREE.MeshBasicMaterial;
    m.opacity = palette.beam + Math.sin(state.clock.elapsedTime * 1.1) * palette.beam * 0.4;
  });
  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <coneGeometry args={[1.9, 3.6, 40, 1, true]} />
      <meshBasicMaterial
        color={palette.ringA}
        transparent
        opacity={palette.beam}
        side={THREE.DoubleSide}
        depthWrite={false}
        blending={palette.additive ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </mesh>
  );
}

function Rig({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y = THREE.MathUtils.damp(ref.current.rotation.y, state.pointer.x * 0.28, 2.2, delta);
    ref.current.rotation.x = THREE.MathUtils.damp(ref.current.rotation.x, -state.pointer.y * 0.16, 2.2, delta);
  });
  return <group ref={ref}>{children}</group>;
}

export default function HeroScene({
  variant = 'full',
}: {
  variant?: 'full' | 'compact';
}) {
  const { isDark } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setMounted(true);
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  const palette = isDark ? DARK : LIGHT;
  const compact = variant === 'compact' || typeof window !== 'undefined' && window.innerWidth < 640;
  const particleCount = reduced ? 120 : compact ? 260 : 620;

  if (!mounted) return <div className="absolute inset-0" />;

  return (
    <div className="absolute inset-0" aria-hidden>
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [0, 0, 7.2], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ position: 'absolute', inset: 0 }}
      >
        <fog attach="fog" args={[palette.fog, 9, 19]} />
        <Rig>
          {!reduced && <Particles palette={palette} count={particleCount} />}
          <Core palette={palette} />
          <Beam palette={palette} />
          <HoloDisc palette={palette} />
          <Ring radius={2.7} color={palette.ringA} speed={0.14} tilt={[Math.PI / 2.15, 0, 0.3]} opacity={0.5} additive={palette.additive} />
          <Ring radius={3.35} color={palette.ringB} speed={-0.1} tilt={[Math.PI / 1.85, 0.5, -0.2]} opacity={0.4} additive={palette.additive} />
          <Ring radius={4.05} color={palette.ringA} speed={0.07} tilt={[Math.PI / 2.5, -0.4, 0.5]} opacity={0.25} additive={palette.additive} />
        </Rig>
      </Canvas>
    </div>
  );
}
