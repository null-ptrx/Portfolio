import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProjectCard from './components/ProjectCard';
import SkillCard from './components/SkillCard';

const skills = [
  { name: 'React', icon: 'metasploit' },
  { name: 'Node.js', icon: 'nmap' },
  { name: 'Express', icon: 'burpsuite' },
  { name: 'MongoDB', icon: 'hydra' },
  { name: 'Docker', icon: 'wireshark' },
  { name: 'Linux', icon: 'kali' },
  { name: 'Git', icon: 'aircrackng' },
  { name: 'Python', icon: 'johntheripper' },
  { name: 'PostgreSQL', icon: 'sqlmap' },
  { name: 'Redis', icon: 'netcat' },
  { name: 'TypeScript', icon: 'nikto' },
  { name: 'HTML', icon: 'gobuster' },
];

const useInView = (options = {}) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, ...options }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, isInView];
};

const App = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setForm({
      name: '',
      email: '',
      message: '',
    });
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  const fetchProjects = async () => {
    setLoadingProjects(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/project`);
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch {
      setProjects([]);
    } finally {
      setLoadingProjects(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const [skillsRef, skillsInView] = useInView();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* ── Hero ── */}
        <section className="mono-hero-grid border-b border-border">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
              <div className="lg:col-span-8 flex flex-col gap-6">
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Dharmveer Singh — Backend Developer
                </p>

                <h1
                  className="font-display font-extrabold text-foreground"
                  style={{
                    fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
                    lineHeight: 0.98,
                    letterSpacing: '-0.04em',
                  }}
                >
                  Backend systems, Linux, and code that stays up.
                </h1>

                <p className="text-base sm:text-lg text-foreground-secondary max-w-2xl leading-relaxed">
                  My code has fewer bugs than my Arch install. Segfaults taught me more than tutorials did.
                </p>

                <div className="flex flex-wrap gap-4 pt-2">
                  <a
                    href="#contact"
                    className="mono-btn-primary no-underline px-6 py-3 text-sm cursor-pointer"
                  >
                    Contact
                  </a>
                  <a
                    href="/Dharmveer_Singh_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mono-btn-outline no-underline px-6 py-3 text-sm cursor-pointer"
                  >
                    Resume
                  </a>
                </div>
              </div>

              {/* Ruled Spec Cell */}
              <div className="lg:col-span-4 border border-border bg-card divide-y divide-border">
                <div className="px-5 py-3.5 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground font-mono uppercase tracking-wider">Handle</span>
                  <span className="font-mono text-foreground">nullptr</span>
                </div>
                <div className="px-5 py-3.5 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground font-mono uppercase tracking-wider">Primary Stack</span>
                  <span className="font-mono text-foreground">Node.js, Docker, Linux</span>
                </div>
                <div className="px-5 py-3.5 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground font-mono uppercase tracking-wider">Writing</span>
                  <Link to="/blog" className="mono-link font-mono text-xs">
                    Engineering Blog
                  </Link>
                </div>
                <div className="px-5 py-3.5 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground font-mono uppercase tracking-wider">Source</span>
                  <a
                    href="https://github.com/null-ptrx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mono-link font-mono text-xs"
                  >
                    github.com/null-ptrx
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Projects ── */}
        <section id="projects" className="border-b border-border">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-3 flex flex-col gap-3">
                <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
                  Projects
                </h2>
                <p className="text-sm text-foreground-secondary leading-relaxed">
                  Services, containers, and full-stack builds shipped from scratch.
                </p>
              </div>

              <div className="lg:col-span-9">
                {loadingProjects ? (
                  <div className="border border-border bg-card p-8 text-sm font-mono text-muted-foreground">
                    Loading projects...
                  </div>
                ) : projects.length === 0 ? (
                  <div className="border border-border bg-card p-8 text-sm font-mono text-muted-foreground">
                    No projects published yet.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
                    {projects.map((project, idx) => (
                      <ProjectCard
                        key={project._id || project.name}
                        name={project.name}
                        discreption={project.discreption}
                        tech={project.tech}
                        github={project.github}
                        live={project.live}
                        docker={project.docker}
                        featured={idx === 0 && projects.length > 1}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── Skills ── */}
        <section id="skills" ref={skillsRef} className="border-b border-border">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              <div className="lg:col-span-4 flex flex-col gap-3">
                <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
                  Toolkit
                </h2>
                <p className="text-sm text-foreground-secondary leading-relaxed max-w-sm">
                  Plain configs, composable scripts, and tools that stay out of the way.
                </p>
              </div>

              <div className="lg:col-span-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-px bg-border border border-border">
                  {skills.map((skill, idx) => (
                    <SkillCard
                      key={skill.name}
                      skill={skill}
                      index={idx}
                      isVisible={skillsInView}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── About ── */}
        <section id="about" className="border-b border-border">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              <div className="lg:col-span-5 flex flex-col gap-4">
                <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
                  About
                </h2>
                <p className="font-display text-xl sm:text-2xl text-foreground leading-snug tracking-tight">
                  Every project is a system to be debugged.
                </p>
              </div>

              <div className="lg:col-span-7 border-l border-border pl-6 sm:pl-10 flex flex-col gap-5 text-base text-foreground-secondary leading-relaxed">
                <p>
                  I'm a full-stack developer who treats every project like a system to be debugged. I started with bare-metal Linux installs, broke enough things to learn how they work, and turned that stubbornness into a career building reliable web services.
                </p>
                <p>
                  Most of my work lives at the intersection of backend APIs, container orchestration, and whatever the frontend needs to not look terrible. I prefer tools that get out of the way — plain configs, composable scripts, no magic.
                </p>
                <p>
                  When I'm not writing code, I'm probably reading man pages, ricing my window manager, or arguing about init systems.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Contact ── */}
        <section id="contact">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              <div className="lg:col-span-5 flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
                    Contact
                  </h2>
                  <p className="text-sm text-foreground-secondary leading-relaxed max-w-md">
                    Send a message directly or reach out through any of the channels below.
                  </p>
                </div>

                <div className="border border-border bg-card divide-y divide-border">
                  <a
                    href="mailto:ds331048@gmail.com"
                    className="px-5 py-3.5 flex items-center justify-between text-sm text-foreground-secondary hover:bg-secondary hover:text-foreground transition-colors no-underline"
                  >
                    <span className="font-mono text-xs text-muted-foreground uppercase">Email</span>
                    <span>ds331048@gmail.com</span>
                  </a>
                  <a
                    href="https://github.com/null-ptrx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3.5 flex items-center justify-between text-sm text-foreground-secondary hover:bg-secondary hover:text-foreground transition-colors no-underline"
                  >
                    <span className="font-mono text-xs text-muted-foreground uppercase">GitHub</span>
                    <span>null-ptrx</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/dharmveer-singh-34212732a/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3.5 flex items-center justify-between text-sm text-foreground-secondary hover:bg-secondary hover:text-foreground transition-colors no-underline"
                  >
                    <span className="font-mono text-xs text-muted-foreground uppercase">LinkedIn</span>
                    <span>Dharmveer Singh</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-7 border border-border bg-card p-6 sm:p-8">
                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                        Name
                      </label>
                      <input
                        onChange={handleChange}
                        type="text"
                        className="mono-input text-sm px-4 py-3"
                        placeholder="Your name"
                        value={form.name}
                        name="name"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                        Email
                      </label>
                      <input
                        onChange={handleChange}
                        type="email"
                        className="mono-input text-sm px-4 py-3"
                        placeholder="you@example.com"
                        value={form.email}
                        name="email"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                      Message
                    </label>
                    <textarea
                      onChange={handleChange}
                      rows="5"
                      className="mono-input text-sm px-4 py-3 resize-none"
                      placeholder="Write something..."
                      value={form.message}
                      name="message"
                      required
                    ></textarea>
                  </div>

                  <div className="flex items-center gap-4 pt-1">
                    <button
                      type="submit"
                      className="mono-btn-primary px-6 py-3 text-sm cursor-pointer"
                    >
                      {sent ? 'Message Sent' : 'Send Message'}
                    </button>
                    {sent && (
                      <span className="text-xs font-mono text-foreground-secondary">
                        Delivered.
                      </span>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default App;
