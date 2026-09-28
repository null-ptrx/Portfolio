import React, { useState } from 'react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="tn-navbar fixed top-0 left-0 w-full z-50 flex justify-between items-center py-4 px-4 md:px-20">
      <div className="text-xl md:text-2xl font-bold tracking-tighter">
        <span className="text-[#c0caf5]">Null</span>
        <span className="text-[#7aa2f7]"> Ptr</span>
      </div>
      {/* Mobile Menu Button */}
      <button 
        className="md:hidden tn-btn-outline rounded-none px-3 py-1.5 text-sm cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-mono text-xs">{isOpen ? '✕ close' : '☰ menu'}</span>
      </button>

      {/* Nav Links */}
      <ul className={`${isOpen ? 'flex absolute top-full left-0 w-full flex-col bg-[#16161e]/95 backdrop-blur-xl border-b border-[#414868]/50 p-6 gap-5 tn-mobile-menu' : 'hidden'} md:flex md:static md:flex-row md:border-none md:p-0 md:w-auto md:bg-transparent gap-8 text-sm`}>
        <li><a href="#projects" className="tn-nav-link" onClick={() => setIsOpen(false)}>Projects</a></li>
        <li><a href="#skills" className="tn-nav-link" onClick={() => setIsOpen(false)}>Skills</a></li>
        <li><a href="#about" className="tn-nav-link" onClick={() => setIsOpen(false)}>About</a></li>
        <li><a href="#contact" className="tn-nav-link" onClick={() => setIsOpen(false)}>Contact</a></li>
      </ul>
    </nav>
  )
}

export default Navbar