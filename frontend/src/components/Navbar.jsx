import React, { useState } from 'react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center py-4 px-4 md:px-20 border-b border-[#27272A] bg-[#0A0A0B]/95 backdrop-blur-sm">
      <div className="text-xl md:text-2xl font-bold text-[#FAFAFA]">Null Ptr</div>
      
      {/* Mobile Menu Button */}
      <button 
        className="md:hidden border border-[#27272A] rounded-none px-3 py-1.5 text-sm text-[#FAFAFA] bg-transparent cursor-pointer hover:border-[#3F3F46] hover:bg-[#1F1F23] transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? 'Close' : 'Menu'}
      </button>

      {/* Nav Links */}
      <ul className={`${isOpen ? 'flex absolute top-full left-0 w-full flex-col bg-[#0A0A0B] border-b border-[#27272A] p-4 gap-4' : 'hidden'} md:flex md:static md:flex-row md:border-none md:p-0 md:w-auto gap-8 text-sm text-[#A1A1AA]`}>
        <li><a href="#projects" className="no-underline text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors duration-200" onClick={() => setIsOpen(false)}>Projects</a></li>
        <li><a href="#skills" className="no-underline text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors duration-200" onClick={() => setIsOpen(false)}>Skills</a></li>
        <li><a href="#about" className="no-underline text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors duration-200" onClick={() => setIsOpen(false)}>About</a></li>
        <li><a href="#contact" className="no-underline text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors duration-200" onClick={() => setIsOpen(false)}>Contact</a></li>
      </ul>
    </nav>
  )
}

export default Navbar