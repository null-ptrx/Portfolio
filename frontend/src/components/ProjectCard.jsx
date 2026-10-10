import React from 'react'

const ProjectCard = ({ name, discreption, tech, github, live, docker }) => {
  return (
    <div className="term-card p-6 flex flex-col gap-4" style={{ minHeight: '220px' }}>
      {/* Project name with prompt prefix */}
      <div className="flex items-baseline gap-2">
        <span style={{ color: '#7aa2f7', fontSize: '0.75rem' }}>&#62;</span>
        <h3 className="text-sm font-bold" style={{ color: '#f5f0e8' }}>{name}</h3>
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed" style={{ color: '#a8a090' }}>{discreption}</p>

      {/* Tech stack */}
      <div className="text-xs" style={{ color: '#5a5248', letterSpacing: '0.02em' }}>{tech}</div>

      {/* Links */}
      <div className="flex flex-wrap gap-2 mt-auto pt-4" style={{ borderTop: '1px solid #242424' }}>
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="term-btn-outline no-underline px-3 py-1.5 text-xs"
          >
            &#123; github &#125;
          </a>
        )}
        {live && (
          <a
            href={live}
            target="_blank"
            rel="noopener noreferrer"
            className="term-btn-outline no-underline px-3 py-1.5 text-xs"
          >
            &#123; live &#125;
          </a>
        )}
        {docker && (
          <a
            href={docker}
            target="_blank"
            rel="noopener noreferrer"
            className="term-btn-outline no-underline px-3 py-1.5 text-xs"
          >
            &#123; docker &#125;
          </a>
        )}
      </div>
    </div>
  )
}

export default ProjectCard
