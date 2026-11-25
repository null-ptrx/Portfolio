import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isBlogActive = location.pathname.startsWith('/blog');

  return (
    <header className="sticky top-0 left-0 w-full z-50 bg-background border-b border-border">
      <nav className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        <Link
          to="/"
          className="font-display text-lg sm:text-xl font-bold tracking-tight text-foreground no-underline"
        >
          Null <span className="text-muted-foreground font-normal">Ptr</span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden mono-btn-outline px-3 py-1.5 text-xs font-mono cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? 'Close' : 'Menu'}
        </button>

        {/* Nav Links */}
        <ul
          className={`${
            isOpen
              ? 'flex absolute top-full left-0 w-full flex-col bg-background border-b border-border px-4 sm:px-6 py-5 gap-4'
              : 'hidden'
          } md:flex md:static md:flex-row md:border-none md:p-0 md:w-auto md:bg-transparent gap-7 text-sm items-start md:items-center`}
        >
          <li>
            <a
              href="/#projects"
              className="text-foreground-secondary hover:text-foreground transition-colors no-underline"
              onClick={() => setIsOpen(false)}
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="/#skills"
              className="text-foreground-secondary hover:text-foreground transition-colors no-underline"
              onClick={() => setIsOpen(false)}
            >
              Skills
            </a>
          </li>
          <li>
            <a
              href="/#about"
              className="text-foreground-secondary hover:text-foreground transition-colors no-underline"
              onClick={() => setIsOpen(false)}
            >
              About
            </a>
          </li>
          <li>
            <Link
              to="/blog"
              className={`no-underline transition-colors ${
                isBlogActive
                  ? 'text-foreground underline underline-offset-4 decoration-1'
                  : 'text-foreground-secondary hover:text-foreground'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Blog
            </Link>
          </li>
          <li>
            <a
              href="/#contact"
              className="text-foreground-secondary hover:text-foreground transition-colors no-underline"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
