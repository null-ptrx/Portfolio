import React from 'react'

const ProjectCard = ({ name, discreption, tech, github, live, docker }) => {
  return (
    <div className="tn-card rounded-none p-6 flex flex-col gap-4">
      {/* Project Name with accent dot */}
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#7aa2f7]"></span>
        <h3 className="text-lg font-semibold text-[#c0caf5] tracking-tight">{name}</h3>
      </div>

      <p className="text-sm text-[#a9b1d6] leading-relaxed">{discreption}</p>

      {/* Tech stack styled as inline code */}
      <div className="text-xs text-[#9aa5ce] font-mono tracking-wide">{tech}</div>

      {/* Links */}
      <div className="flex flex-wrap gap-3 mt-auto pt-4 border-t border-[#414868]/40">
        <a href={github} target="_blank" rel="noopener noreferrer" className="tn-btn-outline no-underline rounded-none px-4 py-2 text-xs font-mono cursor-pointer">
          &#123; github &#125;
        </a>
        <a href={live} target="_blank" rel="noopener noreferrer" className="tn-btn-outline no-underline rounded-none px-4 py-2 text-xs font-mono cursor-pointer">
          &#123; live &#125;
        </a>
        <a href={docker} target="_blank" rel="noopener noreferrer" className="tn-btn-outline no-underline rounded-none px-4 py-2 text-xs font-mono cursor-pointer">
          &#123; docker &#125;
        </a>
      </div>
    </div>
  )
}

export default ProjectCard
