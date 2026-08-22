import React from 'react'

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center py-4 px-20 border-b border-[#3A3A3A] bg-[#121212]">
      <div className="text-2xl font-bold text-[#EDE8D0]">Null Ptr</div>
      <ul className="flex gap-8 text-sm text-[#A8A296]">
        <li><a href="#projects" className="no-underline text-[#A8A296]">projects</a></li>
        <li><a href="#skills" className="no-underline text-[#A8A296]">skills</a></li>
        <li><a href="#about" className="no-underline text-[#A8A296]">about</a></li>
        <li><a href="#contact" className="no-underline text-[#A8A296]">contact</a></li>
      </ul>
    </nav>
  )
}

export default Navbar