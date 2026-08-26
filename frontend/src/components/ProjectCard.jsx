import React from 'react'

const ProjectCard = ({ name, discreption, tech, github, live, docker }) => {
  return (
    <div className="border border-[#27272A] bg-[#141416] rounded-none p-6 flex flex-col gap-4 shadow-[0_0_20px_rgba(59,130,246,0.15)] hover:border-[#3F3F46] hover:bg-[#1F1F23] transition-colors duration-200">
      <h3 className="text-lg font-semibold text-[#FAFAFA]">{name}</h3>
      <p className="text-sm text-[#A1A1AA] leading-relaxed">{discreption}</p>
      <div className="text-xs text-[#A1A1AA]">{tech}</div>
      <div className="flex flex-wrap gap-3 mt-auto pt-4">
        <a href={github} target="_blank" rel="noopener noreferrer" className="no-underline border border-[#27272A] rounded-none px-4 py-2 text-sm text-[#FAFAFA] bg-transparent cursor-pointer hover:border-[#3F3F46] hover:bg-[#1F1F23] transition-colors duration-200">
          GitHub
        </a>
        <a href={live} target="_blank" rel="noopener noreferrer" className="no-underline border border-[#27272A] rounded-none px-4 py-2 text-sm text-[#FAFAFA] bg-transparent cursor-pointer hover:border-[#3F3F46] hover:bg-[#1F1F23] transition-colors duration-200">
          Live
        </a>
        <a href={docker} target="_blank" rel="noopener noreferrer" className="no-underline border border-[#27272A] rounded-none px-4 py-2 text-sm text-[#FAFAFA] bg-transparent cursor-pointer hover:border-[#3F3F46] hover:bg-[#1F1F23] transition-colors duration-200">
          Docker
        </a>
      </div>
    </div>
  )
}

export default ProjectCard
