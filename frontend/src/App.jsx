import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProjectCard from './components/ProjectCard'
import { useState, useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'

const initialSkills = [
  { name: 'React', type: 'neon', color: 'var(--tn-cyan)', logo: '⚛️' },
  { name: 'Node.js', type: 'subway', letter: 'N', color: 'var(--tn-green)', logo: '⬢' },
  { name: 'Express', type: 'lantern', color: 'var(--tn-yellow)', logo: 'EX' },
  { name: 'MongoDB', type: 'billboard', color: 'var(--tn-teal)', logo: '🍃' },
  { name: 'Docker', type: 'ticket', color: 'var(--tn-blue)', logo: '🐳' },
  { name: 'Linux', type: 'neon', color: 'var(--tn-orange)', logo: '🐧' },
  { name: 'Git', type: 'subway', letter: 'G', color: 'var(--tn-red)', logo: '🐙' },
  { name: 'Python', type: 'lantern', color: 'var(--tn-purple)', logo: '🐍' },
  { name: 'PostgreSQL', type: 'ticket', color: 'var(--tn-aqua)', logo: '🐘' },
  { name: 'Redis', type: 'billboard', color: 'var(--tn-red)', logo: '🔴' },
  { name: 'TypeScript', type: 'neon', color: 'var(--tn-blue)', logo: 'TS' },
  { name: 'HTML', type: 'subway', letter: 'H', color: 'var(--tn-orange)', logo: '🌐' },
  { name: 'CSS', type: 'lantern', color: 'var(--tn-blue)', logo: '🎨' },
  { name: 'Tailwind', type: 'billboard', color: 'var(--tn-cyan)', logo: '🌊' },
  { name: 'Bootstrap', type: 'ticket', color: 'var(--tn-purple)', logo: 'B' },
  { name: 'GitHub', type: 'subway', letter: 'G', color: 'var(--tn-fg)', logo: '🐙' },
  { name: 'Docker Hub', type: 'neon', color: 'var(--tn-blue)', logo: '☁️' },
  { name: 'C++', type: 'lantern', color: 'var(--tn-blue)', logo: 'C++' },
  { name: 'Problem Solving', type: 'billboard', color: 'var(--tn-yellow)', logo: '🧠' },
  { name: 'Next.js', type: 'ticket', color: 'var(--tn-fg)', logo: 'N' },
  { name: 'C', type: 'subway', letter: 'C', color: 'var(--tn-blue)', logo: 'C' },
  { name: 'Authentication', type: 'neon', color: 'var(--tn-orange)', logo: '🔐' },
  { name: 'Deployment', type: 'lantern', color: 'var(--tn-green)', logo: '🚀' }
];
/* ── Intersection Observer hook for scroll-triggered animations ── */
const useInView = (options = {}) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.15, ...options });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, isInView];
};

const App = () => {
  const [currentSkills, setCurrentSkills] = useState(initialSkills);
  const [isShuffling, setIsShuffling] = useState(false);

  const shuffleSkills = () => {
    if (isShuffling) return;
    setIsShuffling(true);
    
    setTimeout(() => {
      const shuffled = [...currentSkills].sort(() => Math.random() - 0.5);
      setCurrentSkills(shuffled);
    }, 400); // wait for scale down / blur

    setTimeout(() => {
      setIsShuffling(false);
    }, 500); // slight overlap for a snappy bounce back
  };

  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [projects, setprojects] = useState([])
  const [loadingProjects, setLoadingProjects] = useState(true)
  const [sent, setSent] = useState(false);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setForm(prev => ({...prev , [name] : value}));
  };

  const handleSubmit = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/api/contact` , {
      method : 'POST', 
      headers : { 'Content-Type' : 'application/json'},
      body: JSON.stringify(form),
    });
    setForm({
      name: '',
      email: '',
      message: '',
    })
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  const fetchProjects = async () => {
    setLoadingProjects(true)
    let res = await fetch(`${import.meta.env.VITE_API_URL}/api/project`)
    let data = await res.json();
    setprojects(data);
    setLoadingProjects(false)
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  /* ── Scroll-triggered section refs ── */
  const [projectsRef, projectsInView] = useInView();
  const [skillsRef, skillsInView] = useInView();
  const [aboutRef, aboutInView] = useInView();
  const [contactRef, contactInView] = useInView();

  /* ── Terminal boot animation ── */
  const [visibleLines, setVisibleLines] = useState(0);
  const terminalLines = [
    { text: 'Started Network Manager', color: '#9ece6a' },
    { text: 'Mounted /home/nullptr', color: '#9ece6a' },
    { text: 'Reached target Graphical Interface', color: '#9ece6a' },
    { text: 'Loading kernel modules...', color: '#9ece6a' },
    { text: 'Backend service initialized on :5000', color: '#9ece6a' },
    { text: 'MongoDB connection established', color: '#9ece6a' },
  ];

  useEffect(() => {
    if (visibleLines < terminalLines.length) {
      const timer = setTimeout(() => {
        setVisibleLines(prev => prev + 1);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [visibleLines]);
  
  return (
    <div className="min-h-screen bg-[#1a1b26] text-[#c0caf5]">
    
      <Navbar />

      {/* ── Hero ── */}
      <section className="pt-32 md:pt-44 pb-24 md:pb-36 px-4 md:px-20 relative overflow-hidden">
        {/* Ambient glow background */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7aa2f7]/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#bb9af7]/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-16 items-center relative z-10">
          {/* Left — taglines + buttons */}
          <div className="w-full md:w-1/2 flex flex-col justify-center gap-6 animate-fade-in-left">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-px w-8 bg-[#7aa2f7]"></div>
              <span className="text-xs font-mono text-[#565f89] uppercase tracking-widest">full-stack developer</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.1] tracking-tighter text-[#c0caf5]">
              99% uptime,<br />
              <span className="tn-gradient-text">100% curiosity.</span>
            </h1>
            <p className="text-lg md:text-xl text-[#a9b1d6] font-light leading-relaxed">
              My code has fewer bugs than my Arch install.
            </p>
            <p className="text-sm text-[#565f89] font-mono">
              <span className="text-[#414868]">//</span> Segfaults taught me more than tutorials did.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <a href="#contact" className="no-underline tn-btn-primary rounded-none px-7 py-3.5 text-sm cursor-pointer text-center">
                Contact Me
              </a>
              <a href="/Dharmveer_Singh_Resume.pdf" target="_blank" rel="noopener noreferrer" className="no-underline tn-btn-outline rounded-none px-7 py-3.5 text-sm cursor-pointer text-center">
                View Resume
              </a>
            </div>
          </div>

          {/* Right — terminal boot log */}
          <div className="w-full md:w-1/2 flex justify-center items-center animate-fade-in-right delay-300">
            <div className="tn-terminal animate-glow w-full rounded-none p-0 flex flex-col">
              {/* Terminal title bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[#414868]/50">
                <div className="w-3 h-3 rounded-full bg-[#f7768e]"></div>
                <div className="w-3 h-3 rounded-full bg-[#e0af68]"></div>
                <div className="w-3 h-3 rounded-full bg-[#9ece6a]"></div>
                <span className="ml-3 text-xs text-[#565f89] font-mono">nullptr@arch:~</span>
              </div>
              {/* Terminal content */}
              <div className="p-5 md:p-6 flex flex-col gap-2 text-xs md:text-sm font-mono">
                {terminalLines.map((line, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-3 transition-all duration-500 ${
                      i < visibleLines ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                    }`}
                  >
                    <span className="tn-line-number">{i + 1}</span>
                    <span style={{ color: line.color }}>✓</span>
                    <span className="text-[#a9b1d6]">{line.text}</span>
                  </div>
                ))}
                {visibleLines >= terminalLines.length && (
                  <div className="flex items-start gap-3 pt-2">
                    <span className="tn-line-number">{terminalLines.length + 1}</span>
                    <span className="text-[#c0caf5]">system ready.</span>
                    <span className="terminal-cursor text-[#7aa2f7]">▊</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section id="projects" className="px-4 md:px-20 py-24 md:py-32" ref={projectsRef}>
        <div className={`max-w-7xl mx-auto ${projectsInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-2xl md:text-3xl font-bold text-[#c0caf5] tracking-tighter mb-12 tn-section-heading">
            Projects
          </h2>
          {loadingProjects ? (
            <div className="flex items-center gap-3 text-sm text-[#565f89] font-mono">
              <span className="animate-pulse text-[#7aa2f7]">▊</span>
              <span>fetching projects...</span>
            </div>
          ) : projects.length === 0 ? (
            <p className="text-sm text-[#565f89] font-mono">
              <span className="text-[#414868]">//</span> no projects yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, idx) => (
                <div key={project.name} className={projectsInView ? 'animate-fade-in-up' : 'opacity-0'} style={{ animationDelay: `${(idx + 1) * 150}ms` }}>
                  <ProjectCard
                    name={project.name}
                    discreption={project.discreption}
                    tech={project.tech}
                    github={project.github}
                    live={project.live}
                    docker={project.docker}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Skills ── */}
      <section id="skills" className="px-4 md:px-20 py-24 md:py-32" ref={skillsRef}>
        <div className={`max-w-7xl mx-auto ${skillsInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-2xl md:text-3xl font-bold text-[#c0caf5] tracking-tighter mb-12 tn-section-heading">
            Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-10 px-4 md:px-0">
                {currentSkills.map((skill, idx) => (
                  <div
                    key={skill.name}
                    className={`cursor-default w-full transition-all duration-500 ease-in-out ${
                      isShuffling 
                        ? 'opacity-0 scale-50 blur-md rotate-12 translate-y-10' 
                        : skillsInView ? 'opacity-100 scale-100 blur-0 rotate-0 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                    style={{ transitionDelay: isShuffling ? `${(idx % 3) * 50}ms` : '0ms' }}
                  >
                    <div className="w-full h-full animate-float hover:scale-105 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(0,0,0,0.6)] transition-all duration-300 relative z-10 hover:z-50" style={{ animationDelay: `${(idx % 5) * 400}ms` }}>
                      {skill.type === 'subway' ? (
                        <div className="tn-skill-subway flex flex-col items-center justify-center h-40 w-full shadow-[0_0_15px_rgba(0,0,0,0.3)]" style={{ '--skill-color': skill.color }}>
                          <span className="station-letter !w-14 !h-14 text-3xl shrink-0 mb-3">{skill.letter}</span>
                          <span className="font-bold text-xl tracking-wide">{skill.name}</span>
                        </div>
                      ) : skill.type === 'billboard' ? (
                        <div className="tn-skill-billboard flex flex-col items-center justify-center h-40 text-xl tracking-wider w-full text-center shadow-[0_0_15px_rgba(0,0,0,0.3)]" style={{ '--skill-color': skill.color }}>
                          <span className="text-5xl mb-3">{skill.logo}</span>
                          <span>{skill.name}</span>
                        </div>
                      ) : skill.type === 'ticket' ? (
                        <div className="tn-skill-ticket flex flex-col items-center justify-center h-40 text-xl w-full text-center shadow-[0_0_15px_rgba(0,0,0,0.3)]" style={{ '--skill-color': skill.color }}>
                          <span className="text-5xl mb-3">{skill.logo}</span>
                          <span>{skill.name}</span>
                        </div>
                      ) : skill.type === 'lantern' ? (
                        <div className="tn-skill-lantern flex flex-col items-center justify-center h-40 text-xl font-bold tracking-widest w-full text-center shadow-[0_0_15px_rgba(0,0,0,0.3)]" style={{ '--skill-color': skill.color }}>
                          <span className="text-5xl mb-3">{skill.logo}</span>
                          <span>{skill.name}</span>
                        </div>
                      ) : (
                        <div className="tn-skill-neon flex flex-col items-center justify-center h-40 font-bold text-xl tracking-widest w-full text-center shadow-[0_0_15px_rgba(0,0,0,0.3)]" style={{ '--skill-color': skill.color }}>
                          <span className="text-5xl mb-3">{skill.logo}</span>
                          <span>{skill.name}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
          </div>
          
          <div className="flex justify-center mt-16 pb-8">
            <button 
              onClick={shuffleSkills}
              className="tn-btn-primary px-8 py-4 text-base cursor-pointer rounded-none font-mono flex items-center gap-3 hover:shadow-[0_0_25px_rgba(122,162,247,0.4)] transition-all duration-300 hover:-translate-y-1"
            >
              <span className="text-xl">🔀</span> shuffle_skills()
            </button>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="px-4 md:px-20 py-24 md:py-32" ref={aboutRef}>
        <div className={`max-w-7xl mx-auto ${aboutInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-2xl md:text-3xl font-bold text-[#c0caf5] tracking-tighter mb-12 tn-section-heading">
            About
          </h2>
          <div className="tn-terminal rounded-none p-0 max-w-2xl">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#414868]/50">
              <div className="w-3 h-3 rounded-full bg-[#f7768e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#e0af68]"></div>
              <div className="w-3 h-3 rounded-full bg-[#9ece6a]"></div>
              <span className="ml-3 text-xs text-[#565f89] font-mono">about.md</span>
            </div>
            <div className="p-6 md:p-10 flex flex-col gap-5">
              <p className="text-base text-[#a9b1d6] leading-relaxed">
                <span className="text-[#bb9af7] font-mono text-sm mr-2">01</span>
                I'm a full-stack developer who treats every project like a system to be debugged. I started with bare-metal Linux installs, broke enough things to learn how they work, and turned that stubbornness into a career building reliable web services.
              </p>
              <p className="text-base text-[#a9b1d6] leading-relaxed">
                <span className="text-[#bb9af7] font-mono text-sm mr-2">02</span>
                Most of my work lives at the intersection of backend APIs, container orchestration, and whatever the frontend needs to not look terrible. I prefer tools that get out of the way — plain configs, composable scripts, no magic.
              </p>
              <p className="text-base text-[#a9b1d6] leading-relaxed">
                <span className="text-[#bb9af7] font-mono text-sm mr-2">03</span>
                When I'm not writing code, I'm probably reading man pages, ricing my window manager, or arguing about init systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="px-4 md:px-20 py-24 md:py-32" ref={contactRef}>
        <div className={`max-w-7xl mx-auto ${contactInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-2xl md:text-3xl font-bold text-[#c0caf5] tracking-tighter mb-12 tn-section-heading">
            Contact
          </h2>
          <div className="tn-terminal rounded-none p-0 max-w-lg">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#414868]/50">
              <div className="w-3 h-3 rounded-full bg-[#f7768e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#e0af68]"></div>
              <div className="w-3 h-3 rounded-full bg-[#9ece6a]"></div>
              <span className="ml-3 text-xs text-[#565f89] font-mono">contact.sh</span>
            </div>
            <div className="p-6 md:p-10">
              <form className="flex flex-col gap-6 w-full">
                <div className="flex flex-col gap-2">
                  <label className="tn-label">
                    <span className="text-[#414868] mr-1">//</span> name
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                    className="tn-input rounded-none text-sm px-4 py-3"
                    placeholder="Your name"
                    value={form.name}
                    name='name'
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="tn-label">
                    <span className="text-[#414868] mr-1">//</span> email
                  </label>
                  <input
                    onChange={handleChange}
                    type="email"
                    className="tn-input rounded-none text-sm px-4 py-3"
                    placeholder="you@example.com"
                    value={form.email}
                    name='email'
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="tn-label">
                    <span className="text-[#414868] mr-1">//</span> message
                  </label>
                  <textarea
                    onChange={handleChange}
                    rows="5"
                    className="tn-input rounded-none text-sm px-4 py-3 resize-none"
                    placeholder="Write something..."
                    value={form.message}
                    name='message'
                  ></textarea>
                </div>
                <button
                  onClick={handleSubmit}
                  type="button"
                  className="tn-btn-primary rounded-none px-7 py-3.5 text-sm cursor-pointer self-start"
                >
                  {sent ? '✓ Message Sent' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default App;