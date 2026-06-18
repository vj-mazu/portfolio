"use client";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";

export default function Navbar() {
  const navRef = useRef();
  const logoRef = useRef();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, { y: -50, opacity: 0, duration: 1, ease: "power4.out", delay: 0.2 });
      gsap.from(logoRef.current, { scale: 0, rotation: -180, duration: 1.2, ease: "elastic.out(1, 0.5)", delay: 0.5 });
    });

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Section tracking for active state
      const sections = ["work", "projects", "skills", "contact"];
      let currentActive = "";
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            currentActive = section;
            break;
          }
        }
      }
      setActiveSection(currentActive);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      ctx.revert();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const offset = 80; // height of fixed navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <nav ref={navRef} className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="nav-inner">
        <div ref={logoRef} className="nav-logo" style={{ cursor: "pointer" }} onClick={(e) => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <span className="logo-icon">M</span>
          <span className="logo-text">ANJUNATH</span>
          <span className="logo-dot" />
        </div>
        <div className="nav-links">
          <a href="#work" onClick={(e) => handleClick(e, "work")} className={activeSection === "work" ? "active" : ""}>Impact</a>
          <a href="#projects" onClick={(e) => handleClick(e, "projects")} className={activeSection === "projects" ? "active" : ""}>Projects</a>
          <a href="#skills" onClick={(e) => handleClick(e, "skills")} className={activeSection === "skills" ? "active" : ""}>Skills</a>
          <a href="#contact" onClick={(e) => handleClick(e, "contact")} className="nav-cta">Let&apos;s Talk</a>
        </div>
      </div>
    </nav>
  );
}

