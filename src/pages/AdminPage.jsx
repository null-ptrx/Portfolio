import React from 'react'
import { useEffect, useState } from 'react'

const dummyMessages = [
  {
    name: 'alice@void',
    email: 'alice@example.com',
    message: 'Hey, loved the portfolio design. What stack did you use for the backend?',
    timestamp: '2026-08-15 14:32',
  },
  {
    name: 'bob_dev',
    email: 'bob@devmail.io',
    message: 'Would you be open to freelance work? I have a project that fits your skill set.',
    timestamp: '2026-08-14 09:17',
  },
  {
    name: 'charlie',
    email: 'charlie@nullmail.net',
    message: 'Your deployd project is exactly what I needed. Any plans to add ARM support?',
    timestamp: '2026-08-13 22:05',
  },
  {
    name: 'delta_sys',
    email: 'delta@sysops.dev',
    message: 'Nice Arch rice. What WM are you running these days?',
    timestamp: '2026-08-12 16:48',
  },
  {
    name: 'eve',
    email: 'eve@proton.me',
    message: 'Stumbled on your GitHub from a Reddit thread. Clean commit history — respect.',
    timestamp: '2026-08-11 11:30',
  },
]

const dummyProjects = [
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

const AdminPage = () => {
  const [contactMess, setContactMess] = useState([]);

  const fetchContact = async () =>{
    let res = await fetch('http://localhost:3000/api/contact')
    let data = await res.json();
    setContactMess(data);
  }
  useEffect(() => {
    fetchContact();
  }, []);

  const timeAgo = (createdAt) => {
    let now = new Date();
    let past = new Date(createdAt);
    let ago = Math.floor((now - past) / 1000);
    if (ago < 60) return `${ago} sec ago`;
    const min = Math.floor(ago / 60);
    if (min < 60) return `${min} min ago`;
    const hours = Math.floor(min / 60);
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    if (days <= 30) return `${days} days ago`;
    if (days > 30) return 'old';
  }
  
  return (
    <div className="min-h-screen bg-[#121212] text-[#EDE8D0]">

      {/* ── Header / Topbar ── */}
      <header className="px-20 pt-10 pb-6">
        <div className="max-w-6xl mx-auto border border-[#3A3A3A] flex items-center justify-between px-6 py-4">
          <span className="text-sm text-[#EDE8D0]">admin panel</span>
          <button className="border border-[#3A3A3A] rounded-none px-4 py-2 text-sm text-[#EDE8D0] bg-transparent cursor-pointer">
            Logout
          </button>
        </div>
      </header>

      {/* ── Two-Column: Add Project + Contact Messages ── */}
      <section className="px-20 pb-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">

          {/* Left Column — Add Project Form */}
          <div className="w-full md:w-1/2 border border-[#3A3A3A] bg-[#1A1A1A] p-8">
            <h2 className="text-sm text-[#A8A296] mb-6">add project</h2>
            <form className="flex flex-col gap-4">
              <input
                type="text"
                className="border border-[#3A3A3A] rounded-none bg-[#121212] text-[#EDE8D0] text-sm px-4 py-3 outline-none"
                placeholder="project name"
                readOnly
              />
              <textarea
                rows="4"
                className="border border-[#3A3A3A] rounded-none bg-[#121212] text-[#EDE8D0] text-sm px-4 py-3 outline-none resize-none"
                placeholder="description"
                readOnly
              ></textarea>
              <input
                type="text"
                className="border border-[#3A3A3A] rounded-none bg-[#121212] text-[#EDE8D0] text-sm px-4 py-3 outline-none"
                placeholder="github link"
                readOnly
              />
              <input
                type="text"
                className="border border-[#3A3A3A] rounded-none bg-[#121212] text-[#EDE8D0] text-sm px-4 py-3 outline-none"
                placeholder="docker link"
                readOnly
              />
              <input
                type="text"
                className="border border-[#3A3A3A] rounded-none bg-[#121212] text-[#EDE8D0] text-sm px-4 py-3 outline-none"
                placeholder="live link"
                readOnly
              />
              <button
                type="button"
                className="border border-[#3A3A3A] rounded-none px-6 py-3 text-sm text-[#EDE8D0] bg-transparent cursor-pointer self-start mt-2"
              >
                Add Project
              </button>
            </form>
          </div>

          {/* Right Column — Contact Messages */}
          <div className="w-full md:w-1/2 border border-[#3A3A3A] bg-[#1A1A1A] p-8">
            <h2 className="text-sm text-[#A8A296] mb-6">contact messages</h2>
            <div className="flex flex-col gap-4">
              {contactMess.map((msg, i) => (
                <div key={i} className="border border-[#3A3A3A] p-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#EDE8D0]">{msg.name}</span>
                    <span className="text-xs text-[#A8A296]">{timeAgo(msg.createdAt)}</span>
                  </div>
                  <span className="text-xs text-[#A8A296]">{msg.email}</span>
                  <p className="text-sm text-[#A8A296] leading-relaxed">{msg.message}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── Manage Projects (full-width) ── */}
      <section className="px-20 pb-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-sm text-[#A8A296] mb-6">manage projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dummyProjects.map((project, i) => (
              <div key={i} className="border border-[#3A3A3A] bg-[#1A1A1A] rounded-none p-6 flex flex-col gap-4">
                <h3 className="text-lg font-bold text-[#EDE8D0]">{project.name}</h3>
                <p className="text-sm text-[#A8A296] leading-relaxed">{project.description}</p>
                <div className="text-xs text-[#A8A296]">{project.tech}</div>
                <div className="flex gap-3 mt-auto pt-4">
                  <button className="border border-[#3A3A3A] rounded-none px-4 py-2 text-sm text-[#EDE8D0] bg-transparent cursor-pointer">
                    Edit
                  </button>
                  <button className="border border-[#3A3A3A] rounded-none px-4 py-2 text-sm text-[#EDE8D0] bg-transparent cursor-pointer">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

export default AdminPage
