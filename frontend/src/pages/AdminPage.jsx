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
    <div className="min-h-screen bg-[#1a1b26] text-[#c0caf5]">

      {/* ── Header / Topbar ── */}
      <header className="px-4 md:px-20 pt-10 pb-8 animate-fade-in-up">
        <div className="max-w-7xl mx-auto tn-terminal rounded-none p-0">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[#414868]/50">
            <div className="w-3 h-3 rounded-full bg-[#f7768e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#e0af68]"></div>
            <div className="w-3 h-3 rounded-full bg-[#9ece6a]"></div>
            <span className="ml-3 text-xs text-[#565f89] font-mono">admin-panel</span>
          </div>
          <div className="flex items-center justify-between px-6 py-4">
            <span className="text-lg font-bold text-[#c0caf5] tracking-tight">Admin Panel</span>
            <button className="tn-btn-outline rounded-none px-4 py-2 text-sm font-mono cursor-pointer">
              logout
            </button>
          </div>
        </div>
      </header>

      {/* ── Two-Column: Add Project + Contact Messages ── */}
      <section className="px-4 md:px-20 pb-12 md:pb-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">

          {/* Left Column — Add Project Form */}
          <div className="w-full md:w-1/2 tn-terminal rounded-none p-0 animate-fade-in-left">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#414868]/50">
              <div className="w-3 h-3 rounded-full bg-[#f7768e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#e0af68]"></div>
              <div className="w-3 h-3 rounded-full bg-[#9ece6a]"></div>
              <span className="ml-3 text-xs text-[#565f89] font-mono">new-project.sh</span>
            </div>
            <div className="p-6 md:p-8">
              <h2 className="text-xl font-bold text-[#c0caf5] mb-6 tracking-tight">Add Project</h2>
              <form className="flex flex-col gap-4">
                <input
                  type="text"
                  className="tn-input rounded-none text-sm px-4 py-3"
                  placeholder="Project name"
                  name = 'name' value = {projectForm.name}
                  onChange = {handleChange}
                />
                <textarea
                  rows="4"
                  className="tn-input rounded-none text-sm px-4 py-3 resize-none"
                  placeholder="Description"
                  name = 'discreption' value={projectForm.discreption}
                  onChange={handleChange}
                ></textarea>
                <textarea
                  rows="4"
                  className="tn-input rounded-none text-sm px-4 py-3 resize-none"
                  placeholder="Tech stack"
                  name='tech' value={projectForm.tech}
                  onChange={handleChange}
                ></textarea>
                <input
                  type="text"
                  className="tn-input rounded-none text-sm px-4 py-3"
                  placeholder="GitHub link"
                  onChange={handleChange}
                  name='github' value={projectForm.github}
                />
                <input
                  type="text"
                  className="tn-input rounded-none text-sm px-4 py-3"
                  placeholder="Docker link"
                  onChange={handleChange}
                  name='docker' value={projectForm.docker}
                />
                <input
                  type="text"
                  className="tn-input rounded-none text-sm px-4 py-3"
                  placeholder="Live link"
                  onChange={handleChange}
                  name='live' value={projectForm.live}
                />
                <button
                  type="button"
                  className="tn-btn-primary rounded-none px-6 py-3.5 text-sm cursor-pointer self-start mt-2"
                  onClick={handleSubmit}
                >
                  Add Project
                </button>
              </form>
            </div>
          </div>

          {/* Right Column — Contact Messages */}
          <div className="w-full md:w-1/2 tn-terminal rounded-none p-0 animate-fade-in-right delay-200">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#414868]/50">
              <div className="w-3 h-3 rounded-full bg-[#f7768e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#e0af68]"></div>
              <div className="w-3 h-3 rounded-full bg-[#9ece6a]"></div>
              <span className="ml-3 text-xs text-[#565f89] font-mono">messages.log</span>
            </div>
            <div className="p-6 md:p-8">
              <h2 className="text-xl font-bold text-[#c0caf5] mb-6 tracking-tight">Contact Messages</h2>
              <div className="flex flex-col gap-4">
                {loading ? (
                  <div className="border border-[#414868] bg-[#1a1b26] rounded-none p-4 flex flex-col gap-2 text-xs md:text-sm font-mono text-[#a9b1d6] transition-opacity duration-300">
                    {bootLines >= 1 && <div className="animate-fade-in-up"><span className="text-[#9ece6a]">[ OK ]</span> Initializing connection...</div>}
                    {bootLines >= 2 && <div className="animate-fade-in-up"><span className="text-[#9ece6a]">[ OK ]</span> Waking up backend service...</div>}
                    {bootLines >= 3 && <div className="animate-fade-in-up"><span className="text-[#9ece6a]">[ OK ]</span> Connecting to database...</div>}
                    {bootLines >= 4 && <div className="animate-fade-in-up"><span className="text-[#9ece6a]">[ OK ]</span> Fetching messages...</div>}
                    <div><span className="terminal-cursor text-[#7aa2f7]">▊</span></div>
                  </div>
                ) : contactMess.length === 0 ? (
                  <p className="text-sm text-[#565f89] font-mono">
                    <span className="text-[#414868]">//</span> no messages yet
                  </p>
                ) : (
                  contactMess.map((msg, i) => (
                    <div key={i} className="tn-card rounded-none p-4 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-[#c0caf5]">{msg.name}</span>
                        <span className="text-xs text-[#565f89] font-mono">{timeAgo(msg.createdAt)}</span>
                      </div>
                      <span className="text-xs text-[#7aa2f7] font-mono">{msg.email}</span>
                      <p className="text-sm text-[#a9b1d6] leading-relaxed">{msg.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── Manage Projects (full-width) ── */}
      <section className="px-4 md:px-20 pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl font-bold text-[#c0caf5] mb-8 tracking-tight tn-section-heading">Manage Projects</h2>
          {loadingProjects ? (
            <div className="flex items-center gap-3 text-sm text-[#565f89] font-mono">
              <span className="terminal-cursor text-[#7aa2f7]">▊</span>
              <span>loading projects...</span>
            </div>
          ) : projects.length === 0 ? (
            <p className="text-sm text-[#565f89] font-mono">
              <span className="text-[#414868]">//</span> no projects yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.map((project, i) => (
                <div key={i} className="tn-card rounded-none p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#7aa2f7]"></span>
                    <h3 className="text-lg font-semibold text-[#c0caf5] tracking-tight">{project.name}</h3>
                  </div>
                  <p className="text-sm text-[#a9b1d6] leading-relaxed">{project.discreption}</p>
                  <div className="text-xs text-[#9aa5ce] font-mono">{project.tech}</div>
                  <div className="flex flex-wrap gap-3 mt-auto pt-4 border-t border-[#414868]/40">
                    <button className="tn-btn-outline rounded-none px-4 py-2 text-xs font-mono cursor-pointer" onClick = {()=> handleEdit(project._id)}>
                      edit
                    </button>
                    <button className="tn-btn-danger rounded-none px-4 py-2 text-xs font-mono cursor-pointer" onClick = {() => handleDelete(project._id)} >
                      delete
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
