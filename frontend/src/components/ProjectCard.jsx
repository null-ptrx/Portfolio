import React from 'react'

const ProjectCard = ({ name, description, tech, github, live, docker }) => {
  return (
    <div className="border border-[#3A3A3A] bg-[#1A1A1A] rounded-none p-6 flex flex-col gap-4">
      <h3 className="text-lg font-bold text-[#EDE8D0]">{name}</h3>
      <p className="text-sm text-[#A8A296] leading-relaxed">{description}</p>
      <div className="text-xs text-[#A8A296]">{tech}</div>
      <div className="flex flex-wrap gap-2 md:gap-3 mt-auto pt-4">
        <button className="border border-[#3A3A3A] rounded-none px-4 py-2 text-sm text-[#EDE8D0] bg-transparent cursor-pointer"><a href={github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a></button>
        <button className="border border-[#3A3A3A] rounded-none px-4 py-2 text-sm text-[#EDE8D0] bg-transparent cursor-pointer"><a href={live} target="_blank" rel="noopener noreferrer">
          live
        </a></button>
        <button className="border border-[#3A3A3A] rounded-none px-4 py-2 text-sm text-[#EDE8D0] bg-transparent cursor-pointer"><a href={docker} target="_blank" rel="noopener noreferrer">
          docker
        </a></button>
      </div>
    </div>
  )
}

export default ProjectCard
