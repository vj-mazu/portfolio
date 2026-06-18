"use client";
import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";

function HeroShapes() {
  const torusRef = useRef();
  const knotRef = useRef();
  const sphereRef = useRef();
  const groupRef = useRef();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.3;
      torusRef.current.rotation.y = t * 0.5;
      torusRef.current.position.x = Math.sin(t * 0.2) * 0.5 + mouseRef.current.x * 0.5;
      torusRef.current.position.y = Math.sin(t * 0.3) * 0.3 + mouseRef.current.y * 0.5;
    }
    if (knotRef.current) {
      knotRef.current.rotation.x = t * 0.2;
      knotRef.current.rotation.z = t * 0.25;
      knotRef.current.position.x = -Math.sin(t * 0.15) * 0.3 - mouseRef.current.x * 0.3;
      knotRef.current.position.y = Math.cos(t * 0.2) * 0.4 - mouseRef.current.y * 0.3;
    }
    if (sphereRef.current) {
      sphereRef.current.position.y = Math.sin(t * 0.4) * 0.2;
      sphereRef.current.position.x = mouseRef.current.x * 0.2;
    }
    if (groupRef.current) {
      groupRef.current.rotation.y = mouseRef.current.x * 0.3;
      groupRef.current.rotation.x = mouseRef.current.y * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={torusRef} position={[1.5, 0.5, 0]}>
        <torusGeometry args={[1, 0.3, 16, 64]} />
        <meshPhysicalMaterial color="#00f2ff" roughness={0.1} metalness={0.9} transparent opacity={0.6} wireframe={false} envMapIntensity={1} />
      </mesh>
      <mesh ref={knotRef} position={[-1.8, -0.3, -0.5]}>
        <torusKnotGeometry args={[0.8, 0.25, 128, 16]} />
        <meshPhysicalMaterial color="#8b5cf6" roughness={0.05} metalness={0.95} transparent opacity={0.5} envMapIntensity={1} />
      </mesh>
      <mesh ref={sphereRef} position={[0, 1.8, -1]}>
        <icosahedronGeometry args={[0.5, 1]} />
        <meshPhysicalMaterial color="#10b981" roughness={0.2} metalness={0.8} wireframe transparent opacity={0.3} />
      </mesh>
      <mesh position={[2.8, -1, -2]}>
        <octahedronGeometry args={[0.4]} />
        <meshStandardMaterial color="#00f2ff" wireframe transparent opacity={0.15} />
      </mesh>
      <mesh position={[-2.5, 1.5, -2]}>
        <dodecahedronGeometry args={[0.35]} />
        <meshStandardMaterial color="#8b5cf6" wireframe transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

function FloatingRings() {
  const ringRef = useRef();

  useFrame((state) => {
    if (!ringRef.current) return;
    ringRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    ringRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
  });

  return (
    <mesh ref={ringRef} position={[0, -0.5, -2]}>
      <ringGeometry args={[1.8, 2, 64]} />
      <meshBasicMaterial color="#00f2ff" transparent opacity={0.08} side={THREE.DoubleSide} />
    </mesh>
  );
}

export default function Hero3D() {
  return (
    <div className="hero-canvas-wrapper">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <directionalLight position={[-5, -5, -5]} intensity={0.3} color="#8b5cf6" />
        <pointLight position={[0, 3, 2]} intensity={0.5} color="#00f2ff" />
        <HeroShapes />
        <FloatingRings />
      </Canvas>
    </div>
  );
}
