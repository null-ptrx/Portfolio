import React from 'react'
import { useEffect, useState } from 'react'
import LoginForm from '../components/LoginForm';
const AdminPage = () => {
  const [contactMess, setContactMess] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bootLines, setBootLines] = useState(0);

  const fetchContact = async () =>{
    setLoading(true);
    setBootLines(0);
    try {
      let res = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`)
      let data = await res.json();
      setContactMess(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    fetchContact();
  }, []);

  useEffect(() => {
    let interval;
    if (loading && bootLines < 4) {
      interval = setInterval(() => {
        setBootLines(prev => prev + 1);
      }, 600);
    }
    return () => clearInterval(interval);
  }, [loading, bootLines]);

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

  const [projects, setprojects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [projectForm, setprojectForm] = useState({
    name : '',
    discreption : '',
    tech : '',
    github : '',
    docker : '',
    live : ''
  });

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setprojectForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (projectForm._id) {
      await fetch(`${import.meta.env.VITE_API_URL}/api/project/${projectForm._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectForm),
      });
    } else {
    await fetch(`${import.meta.env.VITE_API_URL}/api/project`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectForm),
    }); 
  }
    setprojectForm({
      name: '',
      discreption: '',
      tech : '',
      github: '',
      docker: '',
      live: ''
    });
    fetchProjects();
  };
  const fetchProjects = async () => {
    setLoadingProjects(true);
    let res = await fetch(`${import.meta.env.VITE_API_URL}/api/project`)
    let data = await res.json();
    setprojects(data);
    setLoadingProjects(false);
  }
  useEffect(() => {
    fetchProjects();
  }, [])
  
  const handleEdit = async (_id) => {
    let res = await fetch(`${import.meta.env.VITE_API_URL}/api/editProject/${_id}`);
    let data = await res.json();
    setprojectForm(data);
  }
  const handleDelete = async (_id) => {
    await fetch(`${import.meta.env.VITE_API_URL}/api/project/${_id}`, {
      method : 'delete'
    });
    if (projectForm._id === _id) {
      setprojectForm({
        name: '',
        discreption: '',
        tech: '',
        github: '',
        docker: '',
        live: ''
      });
    }
    fetchProjects();
  }
    // if (login) {
    //   return <LoginForm/>; 
    // }
    return ( 
    <div className="min-h-screen bg-[#0A0A0B] text-[#FAFAFA]">

      {/* ── Header / Topbar ── */}
      <header className="px-4 md:px-20 pt-10 pb-8">
        <div className="max-w-7xl mx-auto border border-[#27272A] bg-[#141416] rounded-none shadow-[0_0_20px_rgba(59,130,246,0.15)] flex items-center justify-between px-6 py-4">
          <span className="text-lg font-semibold text-[#FAFAFA]">Admin Panel</span>
          <button className="border border-[#27272A] rounded-none px-4 py-2 text-sm font-medium text-[#FAFAFA] bg-transparent cursor-pointer hover:border-[#3F3F46] hover:bg-[#1F1F23] transition-colors duration-200">
            Logout
          </button>
        </div>
      </header>

      {/* ── Two-Column: Add Project + Contact Messages ── */}
      <section className="px-4 md:px-20 pb-12 md:pb-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">

          {/* Left Column — Add Project Form */}
          <div className="w-full md:w-1/2 border border-[#27272A] bg-[#141416] rounded-none shadow-[0_0_20px_rgba(59,130,246,0.15)] p-6 md:p-8">
            <h2 className="text-xl font-semibold text-[#FAFAFA] mb-6">Add Project</h2>
            <form className="flex flex-col gap-4">
              <input
                type="text"
                className="border border-[#27272A] rounded-none bg-[#0A0A0B] text-[#FAFAFA] text-sm px-4 py-3 outline-none focus:border-[#3B82F6] transition-colors duration-200 placeholder-[#A1A1AA]/50"
                placeholder="Project name"
                name = 'name' value = {projectForm.name}
                onChange = {handleChange}
              />
              <textarea
                rows="4"
                className="border border-[#27272A] rounded-none bg-[#0A0A0B] text-[#FAFAFA] text-sm px-4 py-3 outline-none resize-none focus:border-[#3B82F6] transition-colors duration-200 placeholder-[#A1A1AA]/50"
                placeholder="Description"
                name = 'discreption' value={projectForm.discreption}
                onChange={handleChange}
              ></textarea>
              <textarea
                rows="4"
                className="border border-[#27272A] rounded-none bg-[#0A0A0B] text-[#FAFAFA] text-sm px-4 py-3 outline-none resize-none focus:border-[#3B82F6] transition-colors duration-200 placeholder-[#A1A1AA]/50"
                placeholder="Tech stack"
                name='tech' value={projectForm.tech}
                onChange={handleChange}
              ></textarea>
              <input
                type="text"
                className="border border-[#27272A] rounded-none bg-[#0A0A0B] text-[#FAFAFA] text-sm px-4 py-3 outline-none focus:border-[#3B82F6] transition-colors duration-200 placeholder-[#A1A1AA]/50"
                placeholder="GitHub link"
                onChange={handleChange}
                name='github' value={projectForm.github}
              />
              <input
                type="text"
                className="border border-[#27272A] rounded-none bg-[#0A0A0B] text-[#FAFAFA] text-sm px-4 py-3 outline-none focus:border-[#3B82F6] transition-colors duration-200 placeholder-[#A1A1AA]/50"
                placeholder="Docker link"
                onChange={handleChange}
                name='docker' value={projectForm.docker}
              />
              <input
                type="text"
                className="border border-[#27272A] rounded-none bg-[#0A0A0B] text-[#FAFAFA] text-sm px-4 py-3 outline-none focus:border-[#3B82F6] transition-colors duration-200 placeholder-[#A1A1AA]/50"
                placeholder="Live link"
                onChange={handleChange}
                name='live' value={projectForm.live}
              />
              <button
                type="button"
                className="bg-[#3B82F6] text-white rounded-none px-6 py-3 text-sm font-medium cursor-pointer self-start mt-2 hover:bg-[#60A5FA] transition-colors duration-200"
                onClick={handleSubmit}
              >
                Add Project
              </button>
            </form>
          </div>

          {/* Right Column — Contact Messages */}
          <div className="w-full md:w-1/2 border border-[#27272A] bg-[#141416] rounded-none shadow-[0_0_20px_rgba(59,130,246,0.15)] p-6 md:p-8">
            <h2 className="text-xl font-semibold text-[#FAFAFA] mb-6">Contact Messages</h2>
            <div className="flex flex-col gap-4">
              {loading ? (
                <div className="border border-[#3A3A3A] bg-[#1A1A1A] rounded-none p-4 flex flex-col gap-2 text-xs md:text-sm font-mono text-[#A8A296] transition-opacity duration-300">
                  {bootLines >= 1 && <div><span className="text-[#22C55E]">[ OK ]</span> Initializing connection...</div>}
                  {bootLines >= 2 && <div><span className="text-[#22C55E]">[ OK ]</span> Waking up backend service...</div>}
                  {bootLines >= 3 && <div><span className="text-[#22C55E]">[ OK ]</span> Connecting to database...</div>}
                  {bootLines >= 4 && <div><span className="text-[#22C55E]">[ OK ]</span> Fetching messages...</div>}
                  <div><span className="animate-pulse">▊</span></div>
                </div>
              ) : contactMess.length === 0 ? (
                <p className="text-sm text-[#A1A1AA] font-mono">// no messages yet</p>
              ) : (
                contactMess.map((msg, i) => (
                  <div key={i} className="border border-[#27272A] rounded-none bg-[#0A0A0B] p-4 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-[#FAFAFA]">{msg.name}</span>
                      <span className="text-xs text-[#A1A1AA]">{timeAgo(msg.createdAt)}</span>
                    </div>
                    <span className="text-xs text-[#3B82F6]">{msg.email}</span>
                    <p className="text-sm text-[#A1A1AA] leading-relaxed">{msg.message}</p>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </section>

      {/* ── Manage Projects (full-width) ── */}
      <section className="px-4 md:px-20 pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl font-semibold text-[#FAFAFA] mb-8">Manage Projects</h2>
          {loadingProjects ? (
            <p className="text-sm text-[#A1A1AA]">Loading projects...</p>
          ) : projects.length === 0 ? (
            <p className="text-sm text-[#A1A1AA]">No projects yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projects.map((project, i) => (
                <div key={i} className="border border-[#27272A] bg-[#141416] rounded-none shadow-[0_0_20px_rgba(59,130,246,0.15)] p-6 flex flex-col gap-4 hover:border-[#3F3F46] hover:bg-[#1F1F23] transition-colors duration-200">
                  <h3 className="text-lg font-semibold text-[#FAFAFA]">{project.name}</h3>
                  <p className="text-sm text-[#A1A1AA] leading-relaxed">{project.discreption}</p>
                  <div className="text-xs text-[#A1A1AA]">{project.tech}</div>
                  <div className="flex flex-wrap gap-3 mt-auto pt-4">
                    <button className="border border-[#27272A] rounded-none px-4 py-2 text-sm font-medium text-[#FAFAFA] bg-transparent cursor-pointer hover:border-[#3F3F46] hover:bg-[#1F1F23] transition-colors duration-200" onClick = {()=> handleEdit(project._id)}>
                      Edit
                    </button>
                    <button className="border border-[#EF4444]/30 rounded-none px-4 py-2 text-sm font-medium text-[#EF4444] bg-transparent cursor-pointer hover:bg-[#EF4444]/10 hover:border-[#EF4444]/50 transition-colors duration-200" onClick = {() => handleDelete(project._id)} >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

    </div>);

}

export default AdminPage
