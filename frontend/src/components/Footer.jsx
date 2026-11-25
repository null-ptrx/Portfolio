import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="flex flex-col gap-1">
          <Link to="/" className="font-display text-base font-bold tracking-tight text-foreground no-underline">
            Null <span className="text-muted-foreground font-normal">Ptr</span>
          </Link>
          <p className="text-xs text-muted-foreground font-mono">
            © 2026 Dharmveer Singh
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-sm">
          <Link to="/blog" className="mono-link">
            Blog
          </Link>
          <a
            href="https://github.com/null-ptrx"
            target="_blank"
            rel="noopener noreferrer"
            className="mono-link"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/dharmveer-singh-34212732a/"
            target="_blank"
            rel="noopener noreferrer"
            className="mono-link"
          >
            LinkedIn
          </a>
          <a href="mailto:ds331048@gmail.com" className="mono-link">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
