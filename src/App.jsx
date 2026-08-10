/* ──────────────────────────────────────────────────────────
   ~/nullptr — Engineering Console Portfolio
   ────────────────────────────────────────────────────────── */

import { useState, useEffect } from "react";

/* ── Dummy Data ─────────────────────────────────────────── */

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const STATS = [
  { label: "Projects Built", value: "5+" },
  { label: "DSA Problems", value: "150+" },
  { label: "Stack", value: "MERN" },
  { label: "Open Source", value: "3 PRs" },
];

const PROJECTS = [
  {
    name: "auth-flow-api",
    description:
      "JWT-based authentication microservice with refresh tokens, role-based access, and rate limiting.",
    stack: ["Node.js", "Express", "MongoDB", "Redis"],
  },
  {
    name: "realtime-collab",
    description:
      "Real-time collaborative document editor powered by WebSockets with operational transform.",
    stack: ["React", "Socket.io", "Node.js", "PostgreSQL"],
  },
  {
    name: "deploy-pipeline",
    description:
      "CI/CD pipeline tool that auto-builds Docker images, runs tests, and deploys to staging.",
    stack: ["Docker", "GitHub Actions", "Shell", "Linux"],
  },
];

const SKILLS = [
  "React",
  "Node.js",
  "Express",
  "MongoDB",
  "PostgreSQL",
  "Docker",
  "Linux",
  "Git",
  "Redis",
  "TypeScript",
  "REST APIs",
  "GraphQL",
  "AWS",
  "Nginx",
  "Socket.io",
  "TailwindCSS",
];

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.11.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:hello@nullptr.dev",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
];

/* ── Blinking Cursor Component ──────────────────────────── */

function Cursor() {
  return (
    <span className="inline-block w-3 h-6 ml-1 bg-accent-primary align-middle animate-blink rounded-sm" />
  );
}

/* ── Typewriter Hook ────────────────────────────────────── */

function useTypewriter(text, speed = 60, startDelay = 400) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let timeout;
    let i = 0;
    setDisplayed("");
    setDone(false);

    const startTyping = () => {
      timeout = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(timeout);
          setDone(true);
        }
      }, speed);
    };

    const delay = setTimeout(startTyping, startDelay);
    return () => {
      clearTimeout(delay);
      clearInterval(timeout);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}

/* ── Navbar ─────────────────────────────────────────────── */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? "bg-bg-elevated/95 backdrop-blur-md border-border-subtle"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          className="font-mono text-lg font-semibold text-accent-primary hover:text-accent-hover transition-colors"
        >
          <span className="text-text-secondary">~/ </span>nullptr
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="font-mono text-sm text-text-secondary hover:text-accent-primary transition-colors relative group"
              >
                <span className="text-accent-muted group-hover:text-accent-primary transition-colors">
                  ./
                </span>
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent-primary transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger */}
        <button
          id="mobile-menu-toggle"
          className="md:hidden text-text-secondary hover:text-accent-primary transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-64 border-t border-border-subtle" : "max-h-0"
        }`}
      >
        <ul className="bg-bg-elevated/95 backdrop-blur-md px-6 py-4 space-y-4">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="block font-mono text-sm text-text-secondary hover:text-accent-primary transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                <span className="text-accent-muted">./</span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

/* ── Hero Section ───────────────────────────────────────── */

function Hero() {
  const { displayed: whoami, done: whoamiDone } = useTypewriter("$ whoami", 80, 300);
  const { displayed: name, done: nameDone } = useTypewriter(
    "nullptr",
    70,
    1200
  );
  const { displayed: tagline } = useTypewriter(
    "Full-Stack Developer | MERN + Backend Systems",
    30,
    2200
  );

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 pt-16 overflow-hidden"
    >
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-primary/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Terminal Prompt */}
        <div className="inline-block mb-4 px-4 py-1.5 bg-bg-surface border border-border-subtle rounded-full">
          <span className="font-mono text-sm text-success">●</span>
          <span className="font-mono text-sm text-text-secondary ml-2">
            system online — ready
          </span>
        </div>

        {/* Whoami */}
        <h1 className="font-mono text-4xl sm:text-5xl md:text-6xl font-bold text-text-primary mb-2 leading-tight">
          <span className="text-accent-primary">{whoami}</span>
          {!whoamiDone && <Cursor />}
        </h1>

        {/* Name */}
        <h2 className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
          <span
            className="bg-gradient-to-r from-accent-primary to-accent-cyan bg-clip-text text-transparent"
          >
            {name}
          </span>
          {whoamiDone && !nameDone && <Cursor />}
        </h2>

        {/* Tagline */}
        <p className="font-mono text-base sm:text-lg text-text-secondary mb-8 h-7">
          {tagline}
          {nameDone && <Cursor />}
        </p>

        {/* Description */}
        <p className="text-text-secondary text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed animate-fade-in" style={{ animationDelay: "3s" }}>
          I build performant backend systems, RESTful APIs, and full-stack
          applications. Passionate about clean architecture, developer tooling,
          and shipping code that scales.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: "3.3s" }}>
          <a
            href="#projects"
            id="cta-projects"
            className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-accent-primary text-white font-medium rounded-xl hover:bg-accent-hover transition-all duration-300 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
            View Projects
          </a>
          <a
            href="#contact"
            id="cta-contact"
            className="inline-flex items-center justify-center gap-2 px-7 py-3 border border-accent-primary text-accent-primary font-medium rounded-xl hover:bg-accent-primary/10 transition-all duration-300 hover:shadow-[0_0_25px_rgba(59,130,246,0.15)] active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
            </svg>
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── Stats Strip ────────────────────────────────────────── */

function StatsStrip() {
  return (
    <section id="stats" className="py-16 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className="group bg-bg-surface border border-border-subtle rounded-xl p-6 text-center hover:border-accent-muted transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.1)] animate-slide-up"
            style={{ animationDelay: `${0.1 * i}s` }}
          >
            <p className="font-mono text-2xl sm:text-3xl font-bold text-accent-primary mb-1 group-hover:text-accent-hover transition-colors">
              {stat.value}
            </p>
            <p className="text-sm text-text-secondary">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Featured Projects ──────────────────────────────────── */

function FeaturedProjects() {
  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <p className="font-mono text-sm text-accent-primary mb-2">
            <span className="text-accent-cyan">const</span> projects{" "}
            <span className="text-accent-cyan">=</span>{" "}
            <span className="text-warning">[</span>
          </p>
          <h2 className="font-mono text-3xl sm:text-4xl font-bold text-text-primary">
            Featured Projects
          </h2>
        </div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => (
            <article
              key={project.name}
              className="group bg-bg-surface border border-border-subtle rounded-xl p-6 flex flex-col transition-all duration-300 hover:border-accent-primary/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.12)] animate-slide-up"
              style={{ animationDelay: `${0.15 * i}s` }}
            >
              {/* Project Icon */}
              <div className="w-10 h-10 rounded-lg bg-accent-muted/50 flex items-center justify-center mb-4 group-hover:bg-accent-primary/20 transition-colors">
                <svg className="w-5 h-5 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                </svg>
              </div>

              {/* Name */}
              <h3 className="font-mono text-lg font-semibold text-text-primary mb-2 group-hover:text-accent-primary transition-colors">
                {project.name}
              </h3>

              {/* Description */}
              <p className="text-sm text-text-secondary leading-relaxed mb-5 flex-1">
                {project.description}
              </p>

              {/* Tech Stack Tags */}
              <div className="flex flex-wrap gap-2 mb-5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs px-2.5 py-1 bg-accent-muted/40 text-accent-hover rounded-md border border-accent-muted/60"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* View Code Link */}
              <a
                href="#"
                className="inline-flex items-center gap-1.5 font-mono text-sm text-accent-primary hover:text-accent-hover transition-colors group/link"
              >
                <span>View Code</span>
                <svg className="w-4 h-4 transition-transform group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </article>
          ))}
        </div>

        {/* Closing bracket */}
        <p className="font-mono text-sm text-warning text-center mt-8">];</p>
      </div>
    </section>
  );
}

/* ── Skills Section ─────────────────────────────────────── */

function Skills() {
  return (
    <section id="skills" className="py-20 px-6 bg-bg-surface/50">
      <div className="max-w-4xl mx-auto text-center">
        {/* Section Header */}
        <p className="font-mono text-sm text-accent-primary mb-2">
          <span className="text-accent-cyan">import</span>{" "}
          {"{ skills }"}{" "}
          <span className="text-accent-cyan">from</span>{" "}
          <span className="text-success">'./toolbox'</span>
        </p>
        <h2 className="font-mono text-3xl sm:text-4xl font-bold text-text-primary mb-12">
          Tech Stack
        </h2>

        {/* Skill Pills */}
        <div className="flex flex-wrap justify-center gap-3">
          {SKILLS.map((skill, i) => (
            <span
              key={skill}
              className="font-mono text-sm px-4 py-2 bg-bg-elevated border border-border-subtle rounded-xl text-text-secondary hover:text-accent-primary hover:border-accent-primary/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.1)] transition-all duration-300 cursor-default animate-slide-up"
              style={{ animationDelay: `${0.05 * i}s` }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Footer ─────────────────────────────────────────────── */

function Footer() {
  return (
    <footer id="contact" className="bg-bg-elevated border-t border-border-subtle py-12 px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Terminal Prompt */}
        <p className="font-mono text-sm text-text-secondary mb-6">
          <span className="text-success">nullptr</span>
          <span className="text-text-disabled">@</span>
          <span className="text-accent-primary">portfolio</span>
          <span className="text-text-disabled">:~$</span>{" "}
          <span className="text-text-secondary">echo $CONTACT</span>
        </p>

        {/* Social Links */}
        <div className="flex justify-center gap-4 mb-8">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              aria-label={link.label}
              className="w-11 h-11 flex items-center justify-center rounded-xl bg-bg-surface border border-border-subtle text-text-secondary hover:text-accent-primary hover:border-accent-primary/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.15)] transition-all duration-300"
            >
              {link.icon}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="w-16 h-px bg-border-subtle mx-auto mb-6" />

        {/* Attribution */}
        <p className="text-sm text-text-disabled">
          Built with{" "}
          <span className="text-accent-primary">React</span> +{" "}
          <span className="text-accent-cyan">Tailwind CSS</span>
        </p>
        <p className="text-xs text-text-disabled mt-1 font-mono">
          © {new Date().getFullYear()} nullptr. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

/* ── Main App ───────────────────────────────────────────── */

export default function App() {
  return (
    <div className="min-h-screen bg-bg-base text-text-primary">
      <Navbar />
      <Hero />
      <StatsStrip />
      <FeaturedProjects />
      <Skills />
      <Footer />
    </div>
  );
}
