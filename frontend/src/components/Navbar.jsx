import React, { useState } from 'react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center py-4 px-4 md:px-20 border-b border-[#3A3A3A] bg-[#121212]">
      <div className="text-xl md:text-2xl font-bold text-[#EDE8D0]">Null Ptr</div>
      
      {/* Mobile Menu Button */}
      <button 
        className="md:hidden border border-[#3A3A3A] px-3 py-1 text-sm text-[#EDE8D0] bg-transparent cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? 'Close' : 'Menu'}
      </button>

      {/* Nav Links */}
      <ul className={`${isOpen ? 'flex absolute top-full left-0 w-full flex-col bg-[#121212] border-b border-[#3A3A3A] p-4 gap-4' : 'hidden'} md:flex md:static md:flex-row md:border-none md:p-0 md:w-auto gap-8 text-sm text-[#A8A296]`}>
        <li><a href="#projects" className="no-underline text-[#A8A296]" onClick={() => setIsOpen(false)}>projects</a></li>
        <li><a href="#skills" className="no-underline text-[#A8A296]" onClick={() => setIsOpen(false)}>skills</a></li>
        <li><a href="#about" className="no-underline text-[#A8A296]" onClick={() => setIsOpen(false)}>about</a></li>
        <li><a href="#contact" className="no-underline text-[#A8A296]" onClick={() => setIsOpen(false)}>contact</a></li>
      </ul>
    </nav>
  )
}

export default Navbar