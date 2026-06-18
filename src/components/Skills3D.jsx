"use client";
import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";

const skills = [
  { name: "React/Next.js", color: "#00f2ff", pos: [0, 0, 0] },
  { name: "Three.js", color: "#8b5cf6", pos: [2.5, 1, 0] },
  { name: "GSAP", color: "#10b981", pos: [-2.5, 1, 0] },
  { name: "AI/ML", color: "#f59e0b", pos: [1.8, -1.5, 1] },
  { name: "Node.js", color: "#00f2ff", pos: [-1.8, -1.5, 1] },
  { name: "Python", color: "#8b5cf6", pos: [0, 2, -0.5] },
];

function SkillCube({ position, color, label }) {
  const meshRef = useRef();
  const initialPos = useRef(new THREE.Vector3(...position));

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += 0.005;
    meshRef.current.rotation.y += 0.01;
    const float = Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.15;
    meshRef.current.position.y = initialPos.current.y + float;
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshPhysicalMaterial
          color={color}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.4}
          wireframe
        />
      </mesh>
      <mesh>
        <boxGeometry args={[0.65, 0.65, 0.65]} />
        <meshBasicMaterial color={color} transparent opacity={0.05} wireframe />
      </mesh>
    </group>
  );
}

function SkillConnections() {
  const lineRef = useRef();

  useFrame((state) => {
    if (!lineRef.current) return;
    lineRef.current.rotation.y = state.clock.elapsedTime * 0.05;
  });

  const points = skills.map((s) => new THREE.Vector3(...s.pos));
  const curve = new THREE.CatmullRomCurve3(points, true);

  return (
    <mesh ref={lineRef}>
      <tubeGeometry args={[curve, 64, 0.02, 8, true]} />
      <meshBasicMaterial color="#00f2ff" transparent opacity={0.1} />
    </mesh>
  );
}

function SkillsCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }}>
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={0.5} />
      <SkillConnections />
      {skills.map((s) => (
        <SkillCube key={s.name} position={s.pos} color={s.color} label={s.name} />
      ))}
    </Canvas>
  );
}

export default function Skills3D() {
  const sectionRef = useRef();
  const textRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="section skills-section">
      <div className="section-header" ref={textRef}>
        <span className="badge">Expertise</span>
        <h2>Technical Arsenal</h2>
        <p>Cutting-edge technologies I wield to build digital experiences</p>
      </div>
      <div className="skills-3d-container">
        <SkillsCanvas />
      </div>
    </section>
  );
}
