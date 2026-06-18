"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function createParticleGeometry(count) {
  const pos = new Float32Array(count * 3);
  const col = new Float32Array(count * 3);
  let seed = 1;
  function pseudoRand() {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  }
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (pseudoRand() - 0.5) * 50;
    pos[i * 3 + 1] = (pseudoRand() - 0.5) * 50;
    pos[i * 3 + 2] = (pseudoRand() - 0.5) * 50;
    const t = pseudoRand();
    if (t < 0.33) {
      col[i * 3] = 0; col[i * 3 + 1] = 0.95; col[i * 3 + 2] = 1;
    } else if (t < 0.66) {
      col[i * 3] = 0.55; col[i * 3 + 1] = 0.36; col[i * 3 + 2] = 0.96;
    } else {
      col[i * 3] = 0.06; col[i * 3 + 1] = 0.73; col[i * 3 + 2] = 0.51;
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
  return geo;
}

const particleGeometry = createParticleGeometry(2000);

function ParticleField() {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
  });

  return (
    <points ref={meshRef} geometry={particleGeometry}>
      <pointsMaterial size={0.08} vertexColors sizeAttenuation transparent opacity={0.6} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

function FloatingGeometries() {
  const groupRef = useRef();
  const geo1Ref = useRef();
  const geo2Ref = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 1.5;
    groupRef.current.rotation.z = state.clock.elapsedTime * 0.05;
    if (geo1Ref.current) geo1Ref.current.rotation.x = state.clock.elapsedTime * 0.2;
    if (geo2Ref.current) geo2Ref.current.rotation.y = state.clock.elapsedTime * 0.15;
  });

  return (
    <group ref={groupRef} position={[8, 0, -5]}>
      <mesh ref={geo1Ref} position={[0, 0, 0]}>
        <icosahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial color="#00f2ff" wireframe roughness={0.1} metalness={0.8} transparent opacity={0.3} />
      </mesh>
      <mesh ref={geo2Ref} position={[2.5, 1, -1]}>
        <torusKnotGeometry args={[0.8, 0.3, 64, 8]} />
        <meshStandardMaterial color="#8b5cf6" wireframe roughness={0.1} metalness={0.8} transparent opacity={0.25} />
      </mesh>
      <mesh position={[-2, -1, 0.5]}>
        <octahedronGeometry args={[0.6]} />
        <meshStandardMaterial color="#10b981" wireframe roughness={0.2} metalness={0.6} transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

export default function ThreeBackground() {
  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }}>
      <Canvas camera={{ position: [0, 0, 20], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={0.3} />
        <ParticleField />
        <FloatingGeometries />
      </Canvas>
    </div>
  );
}
