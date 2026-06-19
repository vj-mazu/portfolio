"use client";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";

const ThreeBackground = dynamic(() => import("@/components/ThreeBackground"), { ssr: false });
const Hero3D = dynamic(() => import("@/components/Hero3D"), { ssr: false });
const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false });
const ProjectCard = dynamic(() => import("@/components/ProjectCard"), { ssr: false });
const Skills3D = dynamic(() => import("@/components/Skills3D"), { ssr: false });
const StatsSection = dynamic(() => import("@/components/StatsSection"), { ssr: false });
const ContactSection = dynamic(() => import("@/components/ContactSection"), { ssr: false });
import { websites, webapps } from "@/components/projectsData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const heroRef = useRef(null);
  const heroContentRef = useRef(null);
  const projectsRef = useRef(null);
  const footerRef = useRef(null);
  const [activeTab, setActiveTab] = useState("all");

  const allProjects = [...websites, ...webapps];
  const filteredProjects = allProjects.filter((p) => {
    if (activeTab === "all") return true;
    if (activeTab === "featured") return p.featured;
    return p.category === activeTab;
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = heroContentRef.current?.querySelectorAll(".animate-hero");
      if (items) {
        gsap.from(items, {
          y: 80,
          opacity: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: "power4.out",
          delay: 0.3,
        });
      }

      gsap.from(".section-header-anim", {
        scrollTrigger: { trigger: projectsRef.current, start: "top 80%", toggleActions: "play none none reverse" },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <ThreeBackground />
      <Navbar />

      <main className="main-content">
        <section ref={heroRef} className="hero-section">
          <div className="hero-grid-container">
            <div className="hero-text-side" ref={heroContentRef}>
              <span className="badge animate-hero">Enterprise Systems & Web Developer</span>
              <h1 className="hero-title animate-hero">
                Engineering Custom <span className="gradient-text">Business Software</span> & Portals
              </h1>
              <p className="hero-desc animate-hero">
                I design and build tailor-made digital systems &mdash; specializing in industrial mill software, stock-tracking dashboards, clinical portals, and custom web applications.
              </p>
              <div className="hero-actions animate-hero">
                <a href="#projects" className="btn-primary" onClick={(e) => { e.preventDefault(); const el = document.getElementById("projects"); if(el) window.scrollTo({ top: el.getBoundingClientRect().top - 80 + window.scrollY, behavior: "smooth" }); }}>
                  Explore My Work
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
                <a href="#contact" className="btn-secondary" onClick={(e) => { e.preventDefault(); const el = document.getElementById("contact"); if(el) window.scrollTo({ top: el.getBoundingClientRect().top - 80 + window.scrollY, behavior: "smooth" }); }}>
                  Let&apos;s Talk
                </a>
              </div>
            </div>
            <div className="hero-3d-side animate-hero">
              <Hero3D />
            </div>
          </div>
          <div className="hero-marquee-container animate-hero">
            <div className="hero-marquee">
              <span>Next.js &bull; React &bull; Node.js &bull; Mill Systems &bull; Stock Dashboards &bull; Clinical Portals &bull; Tailwind CSS &bull; Database Design &bull; </span>
              <span>Next.js &bull; React &bull; Node.js &bull; Mill Systems &bull; Stock Dashboards &bull; Clinical Portals &bull; Tailwind CSS &bull; Database Design &bull; </span>
            </div>
          </div>
        </section>

        {/* Stats */}
        <StatsSection />

        {/* Projects Showcase */}
        <section id="projects" ref={projectsRef} className="section projects-section">
          <div className="section-header section-header-anim">
            <span className="badge">Portfolio</span>
            <h2>Selected <span className="gradient-text">Creations</span></h2>
            <p>A catalog of premium products, SaaS platforms, and websites shipped with distinction</p>
            
            {/* Filter Tabs */}
            <div className="projects-tabs">
              <button className={`tab-btn ${activeTab === "all" ? "active" : ""}`} onClick={() => setActiveTab("all")}>All projects</button>
              <button className={`tab-btn ${activeTab === "featured" ? "active" : ""}`} onClick={() => setActiveTab("featured")}>Featured</button>
              <button className={`tab-btn ${activeTab === "app" ? "active" : ""}`} onClick={() => setActiveTab("app")}>Web Apps</button>
              <button className={`tab-btn ${activeTab === "web" ? "active" : ""}`} onClick={() => setActiveTab("web")}>Websites</button>
            </div>
          </div>

          <div className="projects-grid">
            {filteredProjects.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </div>
        </section>


        {/* Skills 3D */}
        <Skills3D />

        {/* Contact */}
        <ContactSection />
      </main>

      <footer ref={footerRef} className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="logo-icon">M</span>
            <span>ANJUNATH STUDIOS</span>
          </div>
          <p>&copy; 2026 Manjunath. All rights reserved.</p>
          <div className="footer-links">
            <a href="mailto:pmanjunath856@gmail.com">Email</a>
            <a href="tel:9448986953">Call</a>
            <a href="https://wa.me/9448986953" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
        </div>
      </footer>
    </>
  );
}
