"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function ProjectCard({ project, index }) {
  const cardRef = useRef();
  const glowRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top bottom-=80",
          toggleActions: "play none none reverse",
        },
        y: 60,
        opacity: 0,
        rotationX: 15,
        duration: 1,
        delay: index * 0.08,
        ease: "power3.out",
      });
    }, cardRef);
    return () => ctx.revert();
  }, [index]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(cardRef.current, {
      rotateY: x * 10,
      rotateX: -y * 10,
      duration: 0.6,
      ease: "power2.out",
    });
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        background: `radial-gradient(circle at ${(e.clientX - rect.left) / rect.width * 100}% ${(e.clientY - rect.top) / rect.height * 100}%, ${project.color}18, transparent 70%)`,
        duration: 0.3,
      });
    }
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.4)",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="project-card"
      style={{ perspective: "1000px" }}
    >
      <div ref={glowRef} className="project-glow" />
      
      {/* Premium Browser Header Mockup */}
      <div className="project-browser-header">
        <div className="browser-dots">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
        </div>
        <div className="browser-address-bar">
          {project.link !== "#" ? project.link.replace("https://", "") : `${project.title.toLowerCase().replace(/\s+/g, "")}.dev`}
        </div>
      </div>

      {/* Website Preview Representation */}
      <div className="project-preview-area" style={{ "--project-color": project.color }}>
        <div className="project-preview-gradient" />
        <div className="project-preview-content">
          <span className="project-preview-logo">{project.title[0]}</span>
          <div className="project-preview-decorations">
            <div className="decor-line short" />
            <div className="decor-line long" />
          </div>
        </div>
      </div>

      {/* Card Body Info */}
      <div className="project-body">
        <div className="project-type-row">
          <span className="project-type">{project.type}</span>
          <span className="project-color-badge" style={{ backgroundColor: project.color }} />
        </div>
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.description}</p>
        
        <div className="project-techs">
          {project.techs.map((tech) => (
            <span key={tech} className="project-tech">{tech}</span>
          ))}
        </div>
      </div>

      {/* Project Action Links */}
      {(project.link !== "#" || project.github !== "#") && (
        <div className="project-actions-row">
          {project.link !== "#" && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-action-btn primary">
              Live Demo
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          )}
          {project.github !== "#" && (
            <a href={project.github} className="project-action-btn secondary">
              Code
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </a>
          )}
        </div>
      )}
    </div>
  );
}

