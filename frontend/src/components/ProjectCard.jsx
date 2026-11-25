import React from 'react';

const ProjectCard = ({ name, discreption, tech, github, live, docker, featured = false }) => {
  return (
    <article
      className={`bg-card hover:bg-secondary transition-colors p-6 sm:p-8 flex flex-col justify-between gap-6 ${
        featured ? 'md:col-span-2' : ''
      }`}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className={`font-display font-bold text-foreground tracking-tight ${featured ? 'text-2xl sm:text-3xl' : 'text-xl'}`}>
            {name}
          </h3>
          {featured && (
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground border border-border px-2 py-0.5 shrink-0">
              Featured
            </span>
          )}
        </div>

        <p className={`text-foreground-secondary leading-relaxed ${featured ? 'text-base max-w-3xl' : 'text-sm'}`}>
          {discreption}
        </p>
      </div>

      <div className="flex flex-col gap-4 pt-4 border-t border-border">
        {tech && (
          <div className="text-xs text-muted-foreground font-mono tracking-wide">
            {tech}
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="mono-btn-outline no-underline px-3.5 py-1.5 text-xs cursor-pointer"
            >
              GitHub
            </a>
          )}
          {live && (
            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              className="mono-btn-outline no-underline px-3.5 py-1.5 text-xs cursor-pointer"
            >
              Live
            </a>
          )}
          {docker && (
            <a
              href={docker}
              target="_blank"
              rel="noopener noreferrer"
              className="mono-btn-outline no-underline px-3.5 py-1.5 text-xs cursor-pointer"
            >
              Docker
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
