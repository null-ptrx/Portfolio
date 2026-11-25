import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AdminPage = () => {
  const [contactMess, setContactMess] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchContact = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`);
      const data = await res.json();
      setContactMess(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setContactMess([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContact();
  }, []);

  const timeAgo = (createdAt) => {
    const now = new Date();
    const past = new Date(createdAt);
    const ago = Math.floor((now - past) / 1000);
    if (ago < 60) return `${ago}s ago`;
    const min = Math.floor(ago / 60);
    if (min < 60) return `${min}m ago`;
    const hours = Math.floor(min / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days <= 30) return `${days}d ago`;
    return 'old';
  };

  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [projectForm, setProjectForm] = useState({
    name: '',
    discreption: '',
    tech: '',
    github: '',
    docker: '',
    live: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    setProjectForm({
      name: '',
      discreption: '',
      tech: '',
      github: '',
      docker: '',
      live: '',
    });
    fetchProjects();
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

  const handleEdit = async (_id) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/editProject/${_id}`);
    const data = await res.json();
    setProjectForm(data);
  };

  const handleDelete = async (_id) => {
    await fetch(`${import.meta.env.VITE_API_URL}/api/project/${_id}`, {
      method: 'DELETE',
    });
    if (projectForm._id === _id) {
      setProjectForm({
        name: '',
        discreption: '',
        tech: '',
        github: '',
        docker: '',
        live: '',
      });
    }
    fetchProjects();
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-background">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="font-display text-lg font-bold tracking-tight text-foreground no-underline">
              Null <span className="text-muted-foreground font-normal">Ptr</span>
            </Link>
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
              Admin
            </span>
          </div>
          <button type="button" className="mono-btn-outline px-4 py-1.5 text-xs font-mono cursor-pointer">
            Logout
          </button>
        </div>
      </header>

      {/* Two-Column: Add Project + Contact Messages */}
      <section className="border-b border-border">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column — Add / Edit Project */}
          <div className="lg:col-span-6 border border-border bg-card p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
              <h2 className="font-display text-xl font-bold tracking-tight">
                {projectForm._id ? 'Edit Project' : 'Add Project'}
              </h2>
              {projectForm._id && (
                <button
                  type="button"
                  onClick={() =>
                    setProjectForm({
                      name: '',
                      discreption: '',
                      tech: '',
                      github: '',
                      docker: '',
                      live: '',
                    })
                  }
                  className="mono-link text-xs font-mono cursor-pointer"
                >
                  Cancel edit
                </button>
              )}
            </div>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                type="text"
                className="mono-input text-sm px-4 py-3"
                placeholder="Project name"
                name="name"
                value={projectForm.name}
                onChange={handleChange}
                required
              />
              <textarea
                rows="3"
                className="mono-input text-sm px-4 py-3 resize-none"
                placeholder="Description"
                name="discreption"
                value={projectForm.discreption}
                onChange={handleChange}
                required
              ></textarea>
              <textarea
                rows="2"
                className="mono-input text-sm px-4 py-3 resize-none font-mono"
                placeholder="Tech stack"
                name="tech"
                value={projectForm.tech}
                onChange={handleChange}
              ></textarea>
              <input
                type="text"
                className="mono-input text-sm px-4 py-3"
                placeholder="GitHub URL"
                onChange={handleChange}
                name="github"
                value={projectForm.github}
              />
              <input
                type="text"
                className="mono-input text-sm px-4 py-3"
                placeholder="Docker URL"
                onChange={handleChange}
                name="docker"
                value={projectForm.docker}
              />
              <input
                type="text"
                className="mono-input text-sm px-4 py-3"
                placeholder="Live URL"
                onChange={handleChange}
                name="live"
                value={projectForm.live}
              />
              <button
                type="submit"
                className="mono-btn-primary px-6 py-3 text-sm cursor-pointer self-start mt-2"
              >
                {projectForm._id ? 'Update Project' : 'Add Project'}
              </button>
            </form>
          </div>

          {/* Right Column — Contact Messages */}
          <div className="lg:col-span-6 border border-border bg-card p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
              <h2 className="font-display text-xl font-bold tracking-tight">
                Contact Messages
              </h2>
              <span className="font-mono text-xs text-muted-foreground">
                {contactMess.length}
              </span>
            </div>

            <div className="flex flex-col divide-y divide-border border border-border">
              {loading ? (
                <div className="p-4 text-xs font-mono text-muted-foreground">
                  Fetching messages...
                </div>
              ) : contactMess.length === 0 ? (
                <div className="p-4 text-xs font-mono text-muted-foreground">
                  No messages yet.
                </div>
              ) : (
                contactMess.map((msg, i) => (
                  <div key={msg._id || i} className="p-4 bg-background flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm font-semibold text-foreground">{msg.name}</span>
                      <span className="text-xs text-muted-foreground font-mono">
                        {timeAgo(msg.createdAt)}
                      </span>
                    </div>
                    <span className="text-xs text-foreground-secondary font-mono">{msg.email}</span>
                    <p className="text-sm text-foreground-secondary leading-relaxed">{msg.message}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Manage Projects */}
      <section>
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="font-display text-2xl font-bold mb-6 tracking-tight">
            Manage Projects
          </h2>

          {loadingProjects ? (
            <div className="border border-border bg-card p-6 text-xs font-mono text-muted-foreground">
              Loading projects...
            </div>
          ) : projects.length === 0 ? (
            <div className="border border-border bg-card p-6 text-xs font-mono text-muted-foreground">
              No projects yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border">
              {projects.map((project, i) => (
                <div key={project._id || i} className="bg-card p-6 flex flex-col justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    <h3 className="font-display text-lg font-bold text-foreground tracking-tight">
                      {project.name}
                    </h3>
                    <p className="text-sm text-foreground-secondary leading-relaxed">
                      {project.discreption}
                    </p>
                    <div className="text-xs text-muted-foreground font-mono pt-1">
                      {project.tech}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
                    <button
                      type="button"
                      className="mono-btn-outline px-4 py-1.5 text-xs font-mono cursor-pointer"
                      onClick={() => handleEdit(project._id)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="mono-btn-destructive px-4 py-1.5 text-xs font-mono cursor-pointer"
                      onClick={() => handleDelete(project._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AdminPage;
