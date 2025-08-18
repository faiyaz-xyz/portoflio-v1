"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { OrbitControls } from "@react-three/drei";

function AnimatedCube() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [active, setActive] = useState(false);

  return (
    <mesh ref={meshRef} onClick={() => setActive(!active)}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={active ? "hotpink" : "skyblue"} />
    </mesh>
  );
}

export default function Home() {
  return (
    <div className="w-screen h-screen">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <AnimatedCube />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
