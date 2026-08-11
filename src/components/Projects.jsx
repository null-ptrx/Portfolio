import React from 'react'

const projects = [
  {
    name: 'Zensho',
    desc: 'Full-stack notes and user management app built step by step with React, Express, and MongoDB.',
    tags: ['React', 'Express', 'MongoDB'],
  },
  {
    name: 'PassOP',
    desc: 'MERN password manager with secure CRUD operations and a clean UI.',
    tags: ['MongoDB', 'Express', 'React', 'Node'],
  },
  {
    name: 'get_me_a_chai',
    desc: 'Next.js app with NextAuth authentication and Razorpay payment integration.',
    tags: ['Next.js', 'NextAuth', 'Razorpay'],
  },
]

const Projects = () => {
  return (
    <section id="projects" className="max-w-6xl mx-auto px-6 py-20">
      <div className="mb-8">
        <span className="font-mono text-sm text-[#3B82F6]">$ ls projects</span>
        <h2 className="font-mono text-3xl text-[#E6EDF3] mt-2">Projects</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {projects.map((p) => (
          <div
            key={p.name}
            className="border border-[#3B82F6] rounded-none bg-[#0F1419] p-5 flex flex-col justify-between"
          >
            <div>
              <h3 className="font-mono text-lg text-[#E6EDF3]">{p.name}</h3>
              <p className="text-[#8B98A5] text-sm mt-2">{p.desc}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-[#1E3A5F] rounded-none px-2 py-1 text-xs font-mono text-[#60A5FA]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <a href="#" className="font-mono text-sm text-[#3B82F6] mt-5 inline-block">
              view code -&gt;
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Projects
