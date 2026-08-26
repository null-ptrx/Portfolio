import React from 'react'

const Footer = () => {
  return (
    <footer className="border-t border-[#27272A] py-12 px-4 md:px-20">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-sm text-[#A1A1AA]">
          <a href="https://github.com/null-ptrx" className="no-underline text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors duration-200">GitHub</a>
          <span className="text-[#27272A]">·</span>
          <a href="https://www.linkedin.com/in/dharmveer-singh-34212732a/" className="no-underline text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors duration-200">LinkedIn</a>
          <span className="text-[#27272A]">·</span>
          <a href="ds331048@gmail.com" className="no-underline text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors duration-200">Email</a>
        </div>
        <p className="text-xs text-[#A1A1AA]">© 2026 Null Ptr. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
