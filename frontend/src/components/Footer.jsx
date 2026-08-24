import React from 'react'

const Footer = () => {
  return (
    <footer className="border-t border-[#3A3A3A] py-8 px-4 md:px-20">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-4">
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm text-[#A8A296]">
          <a href="https://github.com/null-ptrx" className="no-underline text-[#A8A296]">GitHub</a>
          <span className="text-[#3A3A3A]">|</span>
          <a href="https://www.linkedin.com/in/dharmveer-singh-34212732a/" className="no-underline text-[#A8A296]">LinkedIn</a>
          <span className="text-[#3A3A3A]">|</span>
          <a href="ds331048@gmail.com" className="no-underline text-[#A8A296]">Email</a>
        </div>
        <p className="text-xs text-[#A8A296]">© 2026 Null Ptr. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
