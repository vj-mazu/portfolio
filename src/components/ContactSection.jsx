"use client";
import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";

function ContactSphere() {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
    meshRef.current.rotation.y += 0.005;
    const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
    meshRef.current.scale.set(scale, scale, scale);
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.2, 32, 32]} />
      <meshPhysicalMaterial
        color="#00f2ff"
        roughness={0.05}
        metalness={0.95}
        transparent
        opacity={0.15}
        wireframe
      />
    </mesh>
  );
}

function ContactRings() {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.x = state.clock.elapsedTime * 0.1;
    groupRef.current.rotation.z = state.clock.elapsedTime * 0.05;
  });

  return (
    <group ref={groupRef}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.8, 2.2, 64]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.08} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <ringGeometry args={[2.2, 2.6, 64]} />
        <meshBasicMaterial color="#10b981" transparent opacity={0.06} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function ContactCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 3.5], fov: 40 }}>
      <ambientLight intensity={0.8} />
      <ContactSphere />
      <ContactRings />
    </Canvas>
  );
}

export default function ContactSection() {
  const sectionRef = useRef();
  const contentRef = useRef();
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null); // 'sending', 'success', 'error'

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" },
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    setTimeout(() => {
      setStatus("success");
      setFormState({ name: "", email: "", message: "" });
    }, 1500);
  };

  return (
    <section id="contact" ref={sectionRef} className="section contact-section">
      <div className="contact-bg-3d">
        <ContactCanvas />
      </div>
      <div className="contact-container" ref={contentRef}>
        <div className="section-header">
          <span className="badge">Connect</span>
          <h2>Let&apos;s Build Something <span className="gradient-text">Extraordinary</span></h2>
          <p className="contact-sub">Available for collaborations, freelance projects, and full-time opportunities.</p>
        </div>

        <div className="contact-grid">
          {/* Contact Details Column */}
          <div className="contact-details">
            <h3 className="contact-column-title">Direct Channels</h3>
            <div className="contact-cards">
              <a href="mailto:pmanjunath856@gmail.com" className="contact-card">
                <div className="contact-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 4l-10 8L2 4" />
                  </svg>
                </div>
                <div className="contact-card-info">
                  <span className="contact-label">Email</span>
                  <span className="contact-value">pmanjunath856@gmail.com</span>
                </div>
              </a>
              <a href="tel:9448986953" className="contact-card">
                <div className="contact-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </div>
                <div className="contact-card-info">
                  <span className="contact-label">Phone</span>
                  <span className="contact-value">+91 9448986953</span>
                </div>
              </a>
              <a href="https://wa.me/9448986953" target="_blank" rel="noopener noreferrer" className="contact-card">
                <div className="contact-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                  </svg>
                </div>
                <div className="contact-card-info">
                  <span className="contact-label">WhatsApp</span>
                  <span className="contact-value">Instant Chat</span>
                </div>
              </a>
            </div>
          </div>

          {/* Form Column */}
          <div className="contact-form-container">
            <h3 className="contact-column-title">Send a Message</h3>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  placeholder="Tell me about your project..."
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="form-input textarea"
                  rows="5"
                  required
                />
              </div>
              <button type="submit" className="btn-primary form-submit-btn" disabled={status === "sending"}>
                {status === "sending" ? "Sending..." : "Send Message"}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>

              {status === "success" && (
                <div className="form-status success">
                  Message sent successfully! I will get back to you shortly.
                </div>
              )}
              {status === "error" && (
                <div className="form-status error">
                  Please fill in all fields before sending.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
