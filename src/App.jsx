import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProjectCard from './components/ProjectCard'
import { useState } from 'react'


const projects = [
  {
    name: 'devboard',
    description: 'A real-time developer dashboard that aggregates GitHub activity, CI/CD pipeline status, and server health metrics into a single terminal-style interface.',
    tech: 'React, Node.js, WebSocket, Redis',
  },
  {
    name: 'pktsniff',
    description: 'Lightweight network packet analyzer with filtering, protocol detection, and exportable capture logs. Built for quick local debugging sessions.',
    tech: 'Python, Scapy, Docker, SQLite',
  },
  {
    name: 'deployd',
    description: 'Zero-config deployment daemon that watches a Git repo, builds containers, and rolls out updates with health checks and automatic rollback.',
    tech: 'Go, Docker, Nginx, Bash',
  },
]

const skills = ['React', 'Node.js', 'Express', 'MongoDB', 'Docker', 'Linux', 'Git', 'Python', 'PostgreSQL', 'Redis']

const App = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setForm(prev => ({...prev , [name] : value}));
  };

  const handleSubmit = async () => {
    await fetch('http://localhost:3000/api/contact' , {
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
  return (
    <div className="min-h-screen bg-[#121212] text-[#EDE8D0]">
      <Navbar />
      {/* ── Hero ── */}
      <section className="pt-20 px-20">
        <div className="max-w-6xl mx-auto border border-[#3A3A3A] flex">
          {/* Left — taglines + buttons */}
          <div className="w-1/2 border-r border-[#3A3A3A] p-10 flex flex-col justify-center gap-6">
            <h1 className="text-4xl font-bold leading-tight text-[#EDE8D0]">
              99% uptime,<br />100% curiosity.
            </h1>
            <p className="text-xl text-[#A8A296]">My code has fewer bugs than my Arch install.</p>
            <p className="text-lg text-[#A8A296]">Segfaults taught me more than tutorials did.</p>
            <div className="flex gap-4 pt-4">
              <button className="border border-[#3A3A3A] rounded-none px-6 py-3 text-sm text-[#EDE8D0] bg-transparent cursor-pointer">View Resume</button>
              <button className="border border-[#3A3A3A] rounded-none px-6 py-3 text-sm text-[#EDE8D0] bg-transparent cursor-pointer">Contact Me</button>
            </div>
          </div>

          {/* Right — terminal boot log */}
          <div className="w-1/2 p-10 flex justify-center items-center">
            <div className="border border-[#3A3A3A] bg-[#1A1A1A] rounded-none w-full p-6 flex flex-col gap-2 text-sm text-[#A8A296]">
              <span className="text-[#EDE8D0] text-xs mb-2">── boot.log ──</span>
              <span>[ OK ] Started Network Manager</span>
              <span>[ OK ] Mounted /home/nullptr</span>
              <span>[ OK ] Reached target Graphical Interface</span>
              <span>[ OK ] Loading kernel modules...</span>
              <span>[ OK ] Backend service initialized on :5000</span>
              <span>[ OK ] MongoDB connection established</span>
              <span className="text-[#EDE8D0] pt-2">system ready. _</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section id="projects" className="px-20 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-sm text-[#A8A296] mb-6">projects</h2>
          <div className="grid grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project.name}
                name={project.name}
                description={project.description}
                tech={project.tech}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section id="skills" className="px-20 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-sm text-[#A8A296] mb-6">skills</h2>
          <div className="border border-[#3A3A3A] bg-[#1A1A1A] rounded-none p-6">
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="border border-[#3A3A3A] rounded-none px-4 py-2 text-sm text-[#EDE8D0]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="px-20 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-sm text-[#A8A296] mb-6">about</h2>
          <div className="border border-[#3A3A3A] bg-[#1A1A1A] rounded-none p-8">
            <p className="text-sm text-[#A8A296] leading-relaxed mb-4">
              I'm a full-stack developer who treats every project like a system to be debugged. I started with bare-metal Linux installs, broke enough things to learn how they work, and turned that stubbornness into a career building reliable web services.
            </p>
            <p className="text-sm text-[#A8A296] leading-relaxed mb-4">
              Most of my work lives at the intersection of backend APIs, container orchestration, and whatever the frontend needs to not look terrible. I prefer tools that get out of the way — plain configs, composable scripts, no magic.
            </p>
            <p className="text-sm text-[#A8A296] leading-relaxed">
              When I'm not writing code, I'm probably reading man pages, ricing my window manager, or arguing about init systems.
            </p>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="px-20 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-sm text-[#A8A296] mb-6">contact</h2>
          <div className="border border-[#3A3A3A] bg-[#1A1A1A] rounded-none p-8">
            <form className="flex flex-col gap-4 max-w-lg">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-[#A8A296]">name</label>
                <input
                  onChange = {handleChange}
                  type="text"
                  className="border border-[#3A3A3A] rounded-none bg-[#121212] text-[#EDE8D0] text-sm px-4 py-3 outline-none"
                  placeholder="your name"
                  value = {form.name}
                  name='name'
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-[#A8A296]">email</label>
                <input
                  onChange={handleChange}
                  type="email"
                  className="border border-[#3A3A3A] rounded-none bg-[#121212] text-[#EDE8D0] text-sm px-4 py-3 outline-none"
                  placeholder="you@example.com"
                  value = {form.email}
                  name='email'
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-[#A8A296]">message</label>
                <textarea
                  onChange={handleChange}
                  rows="5"
                  className="border border-[#3A3A3A] rounded-none bg-[#121212] text-[#EDE8D0] text-sm px-4 py-3 outline-none resize-none"
                  placeholder="write something..."
                value = {form.message}
                  name= 'message'
                ></textarea>
              </div>
              <button
                onClick={handleSubmit}
                type="button"
                className="border border-[#3A3A3A] rounded-none px-6 py-3 text-sm text-[#EDE8D0] bg-transparent cursor-pointer self-start"
              >
                send
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