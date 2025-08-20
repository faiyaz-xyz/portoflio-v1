"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { JSX } from "react";
import Ground from "../components/Ground";

function Car(props: JSX.IntrinsicElements["group"]) {
  const gltf = useGLTF("/models/race-car/model.gltf") as GLTF;
  return <primitive object={gltf.scene} {...props} />;
}

export default function Home() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas
        shadows
        camera={{ position: [10, 5, 10], fov: 60 }}
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
        <OrbitControls />
      </Canvas>
    </div>
  );
}
