"use client";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";

function Counter({ target, suffix = "", label, color }) {
  const [count, setCount] = useState(0);
  const ref = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 2.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        onUpdate: () => setCount(Math.floor(obj.val)),
      });
    }, ref);
    return () => ctx.revert();
  }, [target]);

  return (
    <div ref={ref} className="stat-item" style={{ "--stat-color": color }}>
      <div className="stat-ring">
        <svg viewBox="0 0 120 120" className="stat-svg">
          <circle cx="60" cy="60" r="54" className="stat-ring-bg" />
          <circle cx="60" cy="60" r="54" className="stat-ring-fg" style={{
            strokeDasharray: `${2 * Math.PI * 54}`,
            strokeDashoffset: `${2 * Math.PI * 54 * (1 - count / (target * 1.2))}`,
          }} />
        </svg>
        <div className="stat-number">{count}{suffix}</div>
      </div>
      <p className="stat-label">{label}</p>
    </div>
  );
}

export default function StatsSection() {
  const sectionRef = useRef();
  const headingRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none reverse" },
        y: 40, opacity: 0, duration: 1, ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={sectionRef} className="section stats-section">
      <div className="section-header" ref={headingRef}>
        <span className="badge">Impact</span>
        <h2>By the Numbers</h2>
        <p>Delivering measurable value through every project</p>
      </div>
      <div className="stats-grid">
        <Counter target={15} suffix="+" label="Websites Developed" color="#00f2ff" />
        <Counter target={2} suffix="+" label="Web Applications" color="#8b5cf6" />
        <Counter target={2} suffix="+" label="AI Agents Deployed" color="#10b981" />
      </div>
    </section>
  );
}
