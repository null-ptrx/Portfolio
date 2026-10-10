import React, { useState } from 'react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="term-navbar fixed top-0 left-0 w-full z-50 flex justify-between items-center py-4 px-4 md:px-20" style={{ height: '60px' }}>
      {/* Brand */}
      <div className="text-base font-bold tracking-tight">
        <span style={{ color: '#f5f0e8' }}>Null</span>
        <span style={{ color: '#7aa2f7' }}>Ptr</span>
        <span className="terminal-cursor" style={{ color: '#7aa2f7', marginLeft: '2px' }}>_</span>
      </div>

      {/* Mobile toggle */}
      <button
        className="md:hidden term-btn-outline px-3 py-1.5 text-xs cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation"
      >
        {isOpen ? '[ close ]' : '[ menu ]'}
      </button>

      {/* Desktop nav */}
      <ul className="hidden md:flex gap-8 text-sm list-none m-0 p-0">
        <li><a href="#projects" className="term-nav-link">projects</a></li>
        <li><a href="#skills" className="term-nav-link">skills</a></li>
        <li><a href="#about" className="term-nav-link">about</a></li>
        <li><a href="#contact" className="term-nav-link">contact</a></li>
      </ul>

      {/* Mobile nav */}
      {isOpen && (
        <ul
          className="term-mobile-menu absolute top-full left-0 w-full flex flex-col gap-5 p-6 list-none m-0"
          style={{ background: '#121212', borderBottom: '1px solid #2e2e2e' }}
        >
          <li><a href="#projects" className="term-nav-link" onClick={() => setIsOpen(false)}>projects</a></li>
          <li><a href="#skills" className="term-nav-link" onClick={() => setIsOpen(false)}>skills</a></li>
          <li><a href="#about" className="term-nav-link" onClick={() => setIsOpen(false)}>about</a></li>
          <li><a href="#contact" className="term-nav-link" onClick={() => setIsOpen(false)}>contact</a></li>
        </ul>
      )}
    </nav>
  )
}

export default Navbar
