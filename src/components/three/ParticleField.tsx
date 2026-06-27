"use client";

import React from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 2500;
const COLORS = [
  new THREE.Color("#7C3AED"),
  new THREE.Color("#A855F7"),
  new THREE.Color("#DB2777"),
  new THREE.Color("#FB923C"),
  new THREE.Color("#6366F1"),
];

function createParticleTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.2, "rgba(255,255,255,0.8)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 32, 32);
  return new THREE.CanvasTexture(canvas);
}

interface Particle {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  color: THREE.Color;
  size: number;
  phase: number;
  layer: number;
}

export function ParticleField() {
  const meshRef = React.useRef<THREE.Points>(null);
  const mouseRef = React.useRef({ x: 0, y: 0 });
  const particlesRef = React.useRef<Particle[]>([]);
  const { viewport } = useThree();

  const [positions, colors, sizes] = React.useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const col = new Float32Array(PARTICLE_COUNT * 3);
    const siz = new Float32Array(PARTICLE_COUNT);
    const particles: Particle[] = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const layer = Math.random();
      const spread = 15 + layer * 40;
      const p = {
        position: new THREE.Vector3(
          (Math.random() - 0.5) * spread,
          (Math.random() - 0.5) * spread,
          (Math.random() - 0.5) * spread * 0.5 - 5,
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.003,
          (Math.random() - 0.5) * 0.003,
          (Math.random() - 0.5) * 0.002,
        ),
        color: COLORS[Math.floor(Math.random() * COLORS.length)].clone(),
        size: 0.04 + layer * 0.12,
        phase: Math.random() * Math.PI * 2,
        layer,
      };
      particles.push(p);
      pos[i * 3] = p.position.x;
      pos[i * 3 + 1] = p.position.y;
      pos[i * 3 + 2] = p.position.z;
      col[i * 3] = p.color.r;
      col[i * 3 + 1] = p.color.g;
      col[i * 3 + 2] = p.color.b;
      siz[i] = p.size;
    }
    particlesRef.current = particles;
    return [pos, col, siz];
  }, []);

  React.useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const pos = meshRef.current.geometry.attributes.position.array as Float32Array;
    const particle = particlesRef.current;
    const mouse = mouseRef.current;
    const time = performance.now() * 0.001;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = particle[i];
      const wave = Math.sin(time * 0.2 + p.phase) * 0.003;
      const wave2 = Math.cos(time * 0.15 + p.phase * 1.3) * 0.003;

      p.position.x += p.velocity.x + wave + mouse.x * 0.002 * (1 + p.layer);
      p.position.y += p.velocity.y + wave2 + mouse.y * 0.002 * (1 + p.layer);
      p.position.z += p.velocity.z;

      const bound = 15 + p.layer * 40;
      if (Math.abs(p.position.x) > bound) p.velocity.x *= -1;
      if (Math.abs(p.position.y) > bound) p.velocity.y *= -1;
      if (Math.abs(p.position.z) > bound * 0.5) p.velocity.z *= -1;

      pos[i * 3] = p.position.x;
      pos[i * 3 + 1] = p.position.y;
      pos[i * 3 + 2] = p.position.z;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  const texture = React.useMemo(createParticleTexture, []);

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
        map={texture}
      />
    </points>
  );
}
