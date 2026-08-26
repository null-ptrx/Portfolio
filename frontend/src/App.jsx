import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProjectCard from './components/ProjectCard'
import { useState, useEffect} from 'react'
import LoginForm from './components/LoginForm'

// const projects = [
//   {
//     name: 'devboard',
//     description: 'A real-time developer dashboard that aggregates GitHub activity, CI/CD pipeline status, and server health metrics into a single terminal-style interface.',
//     tech: 'React, Node.js, WebSocket, Redis',
//   },
//   {
//     name: 'pktsniff',
//     description: 'Lightweight network packet analyzer with filtering, protocol detection, and exportable capture logs. Built for quick local debugging sessions.',
//     tech: 'Python, Scapy, Docker, SQLite',
//   },
//   {
//     name: 'deployd',
//     description: 'Zero-config deployment daemon that watches a Git repo, builds containers, and rolls out updates with health checks and automatic rollback.',
//     tech: 'Go, Docker, Nginx, Bash',
//   },
// ]

const skills = ['React', 'Node.js', 'Express', 'MongoDB', 'Docker', 'Linux', 'Git', 'Python', 'PostgreSQL', 'Redis']

const App = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [projects, setprojects] = useState([])
  const [loadingProjects, setLoadingProjects] = useState(true)
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
  
  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#FAFAFA]">
    
      <Navbar />
      {/* ── Hero ── */}
      <section className="pt-32 md:pt-40 pb-24 md:pb-32 px-4 md:px-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-16 items-center">
          {/* Left — taglines + buttons */}
          <div className="w-full md:w-1/2 flex flex-col justify-center gap-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight text-[#FAFAFA]">
              99% uptime,<br />100% curiosity.
            </h1>
            <p className="text-lg md:text-xl text-[#A1A1AA]">My code has fewer bugs than my Arch install.</p>
            <p className="text-base text-[#A1A1AA]">Segfaults taught me more than tutorials did.</p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href="#contact" className="no-underline bg-[#3B82F6] text-white rounded-none px-6 py-3 text-sm font-medium cursor-pointer hover:bg-[#60A5FA] transition-colors duration-200 text-center" onClick={() => setIsOpen(false)}>Contact Me</a>
              <a href="/Dharmveer_Singh_Resume.pdf" target="_blank" rel="noopener noreferrer" className="no-underline border border-[#27272A] rounded-none px-6 py-3 text-sm font-medium text-[#FAFAFA] bg-transparent cursor-pointer hover:border-[#3F3F46] hover:bg-[#1F1F23] transition-colors duration-200 text-center">
                View Resume
              </a>
            </div>
          </div>

          {/* Right — terminal boot log */}
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <div className="border border-[#27272A] bg-[#141416] rounded-none shadow-[0_0_20px_rgba(59,130,246,0.15)] w-full p-5 md:p-8 flex flex-col gap-2.5 text-xs md:text-sm text-[#A1A1AA] font-mono">
              <span className="text-[#FAFAFA] text-xs font-sans font-medium mb-2">System Boot Log</span>
              <div className="flex items-center gap-2"><span className="text-[#22C55E]">✓</span> Started Network Manager</div>
              <div className="flex items-center gap-2"><span className="text-[#22C55E]">✓</span> Mounted /home/nullptr</div>
              <div className="flex items-center gap-2"><span className="text-[#22C55E]">✓</span> Reached target Graphical Interface</div>
              <div className="flex items-center gap-2"><span className="text-[#22C55E]">✓</span> Loading kernel modules...</div>
              <div className="flex items-center gap-2"><span className="text-[#22C55E]">✓</span> Backend service initialized on :5000</div>
              <div className="flex items-center gap-2"><span className="text-[#22C55E]">✓</span> MongoDB connection established</div>
              <span className="text-[#FAFAFA] pt-2 font-sans">system ready. _</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section id="projects" className="px-4 md:px-20 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#FAFAFA] tracking-tight mb-10">Projects</h2>
          {loadingProjects ? (
            <p className="text-sm text-[#A1A1AA]">Loading projects...</p>
          ) : projects.length === 0 ? (
            <p className="text-sm text-[#A1A1AA]">No projects yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard
                  key={project.name}
                  name={project.name}
                  discreption={project.discreption}
                  tech={project.tech}
                  github={project.github}
                  live={project.live}
                  docker={project.docker}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Skills ── */}
      <section id="skills" className="px-4 md:px-20 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#FAFAFA] tracking-tight mb-10">Skills</h2>
          <div className="border border-[#27272A] bg-[#141416] rounded-none shadow-[0_0_20px_rgba(59,130,246,0.15)] p-6 md:p-8">
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="border border-[#27272A] rounded-none px-4 py-2 text-sm text-[#FAFAFA] hover:border-[#3F3F46] hover:bg-[#1F1F23] transition-colors duration-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="px-4 md:px-20 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#FAFAFA] tracking-tight mb-10">About</h2>
          <div className="border border-[#27272A] bg-[#141416] rounded-none shadow-[0_0_20px_rgba(59,130,246,0.15)] p-6 md:p-10 max-w-2xl">
            <p className="text-base text-[#A1A1AA] leading-relaxed mb-4">
              I'm a full-stack developer who treats every project like a system to be debugged. I started with bare-metal Linux installs, broke enough things to learn how they work, and turned that stubbornness into a career building reliable web services.
            </p>
            <p className="text-base text-[#A1A1AA] leading-relaxed mb-4">
              Most of my work lives at the intersection of backend APIs, container orchestration, and whatever the frontend needs to not look terrible. I prefer tools that get out of the way — plain configs, composable scripts, no magic.
            </p>
            <p className="text-base text-[#A1A1AA] leading-relaxed">
              When I'm not writing code, I'm probably reading man pages, ricing my window manager, or arguing about init systems.
            </p>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="px-4 md:px-20 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#FAFAFA] tracking-tight mb-10">Contact</h2>
          <div className="border border-[#27272A] bg-[#141416] rounded-none shadow-[0_0_20px_rgba(59,130,246,0.15)] p-6 md:p-10">
            <form className="flex flex-col gap-5 w-full max-w-lg">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#A1A1AA]">Name</label>
                <input
                  onChange = {handleChange}
                  type="text"
                  className="border border-[#27272A] rounded-none bg-[#0A0A0B] text-[#FAFAFA] text-sm px-4 py-3 outline-none focus:border-[#3B82F6] transition-colors duration-200 placeholder-[#A1A1AA]/50"
                  placeholder="Your name"
                  value = {form.name}
                  name='name'
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#A1A1AA]">Email</label>
                <input
                  onChange={handleChange}
                  type="email"
                  className="border border-[#27272A] rounded-none bg-[#0A0A0B] text-[#FAFAFA] text-sm px-4 py-3 outline-none focus:border-[#3B82F6] transition-colors duration-200 placeholder-[#A1A1AA]/50"
                  placeholder="you@example.com"
                  value = {form.email}
                  name='email'
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#A1A1AA]">Message</label>
                <textarea
                  onChange={handleChange}
                  rows="5"
                  className="border border-[#27272A] rounded-none bg-[#0A0A0B] text-[#FAFAFA] text-sm px-4 py-3 outline-none resize-none focus:border-[#3B82F6] transition-colors duration-200 placeholder-[#A1A1AA]/50"
                  placeholder="Write something..."
                value = {form.message}
                  name= 'message'
                ></textarea>
              </div>
              <button
                onClick={handleSubmit}
                type="button"
                className="bg-[#3B82F6] text-white rounded-none px-6 py-3 text-sm font-medium cursor-pointer self-start hover:bg-[#60A5FA] transition-colors duration-200"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default App;