import React from 'react'

const Footer = () => {
  return (
    <footer className="border-t border-[#3A3A3A] py-8 px-20">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-4">
        <div className="flex gap-6 text-sm text-[#A8A296]">
          <a href="https://github.com" className="no-underline text-[#A8A296]">GitHub</a>
          <span className="text-[#3A3A3A]">|</span>
          <a href="https://linkedin.com" className="no-underline text-[#A8A296]">LinkedIn</a>
          <span className="text-[#3A3A3A]">|</span>
          <a href="mailto:null@ptr.dev" className="no-underline text-[#A8A296]">Email</a>
        </div>
        <p className="text-xs text-[#A8A296]">© 2026 Null Ptr. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
