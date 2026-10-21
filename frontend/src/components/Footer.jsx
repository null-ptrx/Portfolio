import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="border-t border-[#414868]/50 py-14 px-4 md:px-20">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
        {/* Brand */}
        <Link to="/" className="text-lg font-bold tracking-tighter no-underline">
          <span className="text-[#c0caf5]">Null</span>
          <span className="text-[#7aa2f7]"> Ptr</span>
        </Link>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-sm">
          <Link to="/blog" className="tn-footer-link">Blog</Link>
          <span className="text-[#414868]">·</span>
          <a href="https://github.com/null-ptrx" className="tn-footer-link">GitHub</a>
          <span className="text-[#414868]">·</span>
          <a href="https://www.linkedin.com/in/dharmveer-singh-34212732a/" className="tn-footer-link">LinkedIn</a>
          <span className="text-[#414868]">·</span>
          <a href="mailto:ds331048@gmail.com" className="tn-footer-link">Email</a>
        </div>

        {/* Copyright */}
        <div className="flex items-center gap-2 text-xs text-[#565f89] font-mono">
          <span className="text-[#414868]">//</span>
          <span>© 2026 Null Ptr. All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
