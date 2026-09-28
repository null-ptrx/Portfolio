import React from 'react';

/* ── SVG icons — pentest tool logos (single-color, 48px) ── */
const toolIcons = {
  metasploit: (
    <svg viewBox="0 0 64 64" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="32" cy="18" r="8" />
      <line x1="32" y1="26" x2="32" y2="48" />
      <line x1="32" y1="32" x2="20" y2="42" />
      <line x1="32" y1="32" x2="44" y2="42" />
      <line x1="32" y1="48" x2="22" y2="58" />
      <line x1="32" y1="48" x2="42" y2="58" />
    </svg>
  ),
  nmap: (
    <svg viewBox="0 0 64 64" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="32" cy="32" r="20" strokeDasharray="4 3" />
      <circle cx="32" cy="32" r="10" />
      <circle cx="32" cy="32" r="3" fill="currentColor" />
      <line x1="32" y1="2" x2="32" y2="8" />
      <line x1="32" y1="56" x2="32" y2="62" />
      <line x1="2" y1="32" x2="8" y2="32" />
      <line x1="56" y1="32" x2="62" y2="32" />
    </svg>
  ),
  burpsuite: (
    <svg viewBox="0 0 64 64" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="12" y="8" width="40" height="48" rx="4" />
      <line x1="12" y1="20" x2="52" y2="20" />
      <circle cx="20" cy="14" r="2" fill="currentColor" />
      <circle cx="28" cy="14" r="2" fill="currentColor" />
      <line x1="20" y1="28" x2="44" y2="28" strokeOpacity="0.5" />
      <line x1="20" y1="34" x2="38" y2="34" strokeOpacity="0.5" />
      <line x1="20" y1="40" x2="42" y2="40" strokeOpacity="0.5" />
      <line x1="20" y1="46" x2="32" y2="46" strokeOpacity="0.5" />
    </svg>
  ),
  hydra: (
    <svg viewBox="0 0 64 64" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M32 8 C20 20 16 32 20 44 C22 50 28 56 32 56 C36 56 42 50 44 44 C48 32 44 20 32 8Z" />
      <path d="M24 28 C20 24 14 26 12 32" />
      <path d="M40 28 C44 24 50 26 52 32" />
      <path d="M28 36 C24 38 22 44 24 48" />
      <path d="M36 36 C40 38 42 44 40 48" />
      <circle cx="28" cy="26" r="2" fill="currentColor" />
      <circle cx="36" cy="26" r="2" fill="currentColor" />
    </svg>
  ),
  wireshark: (
    <svg viewBox="0 0 64 64" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="32" cy="32" r="24" />
      <path d="M32 8 Q24 20 32 32 Q40 44 32 56" />
      <line x1="8" y1="32" x2="56" y2="32" strokeOpacity="0.4" />
      <circle cx="32" cy="32" r="6" strokeDasharray="2 2" />
    </svg>
  ),
  kali: (
    <svg viewBox="0 0 64 64" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M10 52 C10 52 18 20 32 12 C46 20 54 52 54 52" />
      <path d="M18 46 C18 46 24 28 32 22 C40 28 46 46 46 46" />
      <path d="M26 40 C26 40 28 32 32 28 C36 32 38 40 38 40" />
      <line x1="32" y1="12" x2="32" y2="8" />
      <circle cx="32" cy="6" r="2" fill="currentColor" />
    </svg>
  ),
  aircrackng: (
    <svg viewBox="0 0 64 64" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M32 14 L32 50" />
      <path d="M32 14 L20 30" />
      <path d="M32 14 L44 30" />
      <path d="M24 22 C16 22 10 28 10 36" strokeDasharray="3 3" />
      <path d="M40 22 C48 22 54 28 54 36" strokeDasharray="3 3" />
      <path d="M18 30 C12 32 8 38 10 44" strokeDasharray="3 3" />
      <path d="M46 30 C52 32 56 38 54 44" strokeDasharray="3 3" />
      <circle cx="32" cy="14" r="3" fill="currentColor" />
    </svg>
  ),
  johntheripper: (
    <svg viewBox="0 0 64 64" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="22" y="8" width="20" height="32" rx="2" />
      <rect x="26" y="14" width="12" height="6" rx="1" strokeOpacity="0.5" />
      <circle cx="32" cy="28" r="4" />
      <circle cx="32" cy="28" r="1.5" fill="currentColor" />
      <line x1="32" y1="40" x2="32" y2="56" />
      <line x1="26" y1="56" x2="38" y2="56" />
    </svg>
  ),
  sqlmap: (
    <svg viewBox="0 0 64 64" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2">
      <ellipse cx="32" cy="16" rx="20" ry="8" />
      <path d="M12 16 L12 48 C12 52.4 20.9 56 32 56 C43.1 56 52 52.4 52 48 L52 16" />
      <ellipse cx="32" cy="32" rx="20" ry="8" strokeOpacity="0.3" />
      <ellipse cx="32" cy="48" rx="20" ry="8" strokeOpacity="0.3" />
    </svg>
  ),
  netcat: (
    <svg viewBox="0 0 64 64" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8 32 L20 32" />
      <path d="M44 32 L56 32" />
      <rect x="20" y="20" width="24" height="24" rx="3" />
      <path d="M28 28 L28 36 L36 32 Z" fill="currentColor" stroke="none" />
      <circle cx="8" cy="32" r="3" />
      <circle cx="56" cy="32" r="3" />
    </svg>
  ),
  nikto: (
    <svg viewBox="0 0 64 64" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="32" cy="28" r="18" />
      <line x1="32" y1="10" x2="32" y2="28" />
      <line x1="32" y1="28" x2="44" y2="22" />
      <circle cx="32" cy="28" r="3" fill="currentColor" />
      <path d="M22 50 L32 46 L42 50" />
      <line x1="32" y1="46" x2="32" y2="56" />
      <circle cx="22" cy="50" r="2" fill="currentColor" />
      <circle cx="42" cy="50" r="2" fill="currentColor" />
    </svg>
  ),
  gobuster: (
    <svg viewBox="0 0 64 64" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="8" y="12" width="48" height="40" rx="3" />
      <line x1="8" y1="22" x2="56" y2="22" />
      <line x1="14" y1="30" x2="36" y2="30" strokeOpacity="0.6" />
      <line x1="14" y1="36" x2="42" y2="36" strokeOpacity="0.6" />
      <line x1="14" y1="42" x2="30" y2="42" strokeOpacity="0.6" />
      <circle cx="46" cy="42" r="6" />
      <line x1="50" y1="46" x2="54" y2="50" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),
};

const SkillCard = ({ skill, index, isVisible }) => {
  return (
    <div
      className={`skill-card-wrapper ${isVisible ? 'skill-card-visible' : ''}`}
      style={{ transitionDelay: isVisible ? `${index * 80}ms` : '0ms' }}
    >
      <div className="skill-card">
        <div className="skill-card-icon">
          {toolIcons[skill.icon]}
        </div>
        <span className="skill-card-name">{skill.name}</span>
      </div>
    </div>
  );
};

export default SkillCard;
