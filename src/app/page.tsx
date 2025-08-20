"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { JSX, useRef } from "react";
import Ground from "../components/Ground";

function Car(props: JSX.IntrinsicElements["group"]) {
  const gltf = useGLTF("/models/race-car/model.gltf") as GLTF;
  return <primitive object={gltf.scene} {...props} />;
}

function Tree(props: JSX.IntrinsicElements["group"]) {
  const gltf = useGLTF("/models/trees/model.gltf") as GLTF;
  return <primitive object={gltf.scene} {...props} />;
}

export default function Home() {
  const treeRefs = useRef<any[]>([]);
  const treeCount = 20;

  // Initialize tree positions
  const treePositions = Array.from({ length: treeCount }, (_, i) => ({
    x: (Math.random() > 0.5 ? 1 : -1) * (3 + Math.random() * 2),
    y: 0,
    z: -i * 5,
    scale: 0.2 + Math.random() * 0.1, // smaller scale
  }));

  // Animate trees
  useFrame((state, delta) => {
    treeRefs.current.forEach((tree, i) => {
      if (!tree) return;
      tree.position.z += delta * 10; // move forward
      if (tree.position.z > 10) tree.position.z = -100; // loop behind
    });
  });

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas
        shadows
        camera={{ position: [10, 10, 10], fov: 60 }}
        gl={{ antialias: true }}
      >
        <directionalLight
          position={[10, 15, 10]}
          intensity={1.5}
          color={"#FFEFA1"}
          castShadow
        />
        <ambientLight intensity={0.5} color={"#FFF8E1"} />
        <color attach="background" args={["#FFF3CC"]} />
        <fog attach="fog" args={["#FFF3CC", 10, 50]} />

        <Car position={[0, 0, 0]} scale={0.5} />
        <Ground />

        {/* Trees */}
        {treePositions.map((pos, idx) => (
          <Tree
            key={idx}
            ref={(el) => (treeRefs.current[idx] = el)}
            position={[pos.x, pos.y, pos.z]}
            scale={pos.scale}
          />
        ))}

        <OrbitControls />
      </Canvas>
    </div>
  );
}
