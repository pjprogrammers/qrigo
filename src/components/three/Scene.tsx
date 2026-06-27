"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { ParticleField } from "./ParticleField";
import { FloatingShapes } from "./FloatingShapes";

export function Scene() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60, near: 0.1, far: 100 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.3} />
        <ParticleField />
        <FloatingShapes />
        <fog attach="fog" args={["#000", 15, 35]} />
      </Canvas>
    </div>
  );
}
