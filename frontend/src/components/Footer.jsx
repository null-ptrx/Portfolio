import React from 'react'

const Footer = () => {
  return (
    <footer style={{ borderTop: '1px solid #2e2e2e' }} className="py-14 px-4 md:px-20">
      <div className="max-w-7xl mx-auto">
        {/* 2-col grid: brand left, links right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 mb-10">
          {/* Brand + bio */}
          <div className="flex flex-col gap-3">
            <div className="text-base font-bold">
              <span style={{ color: '#f5f0e8' }}>Null</span>
              <span style={{ color: '#7aa2f7' }}>Ptr</span>
              <span className="terminal-cursor" style={{ color: '#7aa2f7', marginLeft: '2px' }}>_</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#5a5248', lineHeight: 1.7, maxWidth: '32ch' }}>
              Backend developer. Node.js, Docker, Linux. Building reliable systems one segfault at a time.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3">
            <p style={{ fontSize: '0.7rem', color: '#5a5248', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '4px' }}>
              // links
            </p>
            <a href="https://github.com/null-ptrx" target="_blank" rel="noopener noreferrer" className="term-footer-link">[ github ]</a>
            <a href="https://www.linkedin.com/in/dharmveer-singh-34212732a/" target="_blank" rel="noopener noreferrer" className="term-footer-link">[ linkedin ]</a>
            <a href="mailto:ds331048@gmail.com" className="term-footer-link">[ email ]</a>
          </div>
        </div>

        {/* Copyright */}
        <div style={{ borderTop: '1px solid #222222', paddingTop: '20px' }}>
          <p style={{ fontSize: '0.72rem', color: '#3a3530', margin: 0 }}>
            <span style={{ color: '#2e2e2e' }}>//</span>{' '}
            &copy; 2026 Null Ptr. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
