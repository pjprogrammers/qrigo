"use client";

import React from "react";
import { Float } from "@react-three/drei";
import * as THREE from "three";

const shapes = [
  { position: [-5, -2, -8], color: "#7C3AED", scale: 1.2, speed: 1.5, rotationIntensity: 0.6, floatIntensity: 0.5 },
  { position: [6, 3, -10], color: "#DB2777", scale: 0.9, speed: 2, rotationIntensity: 0.8, floatIntensity: 0.6 },
  { position: [-4, 4, -12], color: "#FB923C", scale: 1, speed: 1.2, rotationIntensity: 0.4, floatIntensity: 0.4 },
  { position: [5, -3, -14], color: "#A855F7", scale: 0.7, speed: 2.5, rotationIntensity: 1, floatIntensity: 0.7 },
  { position: [0, -5, -16], color: "#6366F1", scale: 1.5, speed: 1, rotationIntensity: 0.3, floatIntensity: 0.3 },
];

function Shape({ config }: { config: typeof shapes[number] }) {
  const meshRef = React.useRef<THREE.Mesh>(null);
  const geometry = React.useMemo(() => {
    const types = [
      () => new THREE.TorusGeometry(1, 0.3, 16, 32),
      () => new THREE.OctahedronGeometry(1),
      () => new THREE.DodecahedronGeometry(1),
      () => new THREE.TorusKnotGeometry(0.8, 0.3, 64, 8),
      () => new THREE.IcosahedronGeometry(1),
    ];
    return types[Math.floor(Math.random() * types.length)]();
  }, []);

  return (
    <Float
      speed={config.speed}
      rotationIntensity={config.rotationIntensity}
      floatIntensity={config.floatIntensity}
      position={config.position as [number, number, number]}
    >
      <mesh ref={meshRef} geometry={geometry} scale={config.scale}>
        <meshPhysicalMaterial
          color={config.color}
          wireframe
          transparent
          opacity={0.15}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>
    </Float>
  );
}

export function FloatingShapes() {
  return (
    <group>
      {shapes.map((config, i) => (
        <Shape key={i} config={config} />
      ))}
    </group>
  );
}
