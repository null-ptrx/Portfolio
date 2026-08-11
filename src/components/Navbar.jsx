import React from 'react'

const Navbar = () => {
  return (
      <nav className="fixed top-0 w-full flex items-center justify-between bg-transparent h-[6vh] border px-10 text-white">
          <ul className="flex items-center gap-5">
            <li>Projects</li>
            <li>Skills</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
          <span className='text-3xl font-bold text-blue-600'>Null Ptr</span>
    </nav>
  )
}

export default Navbar