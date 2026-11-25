import React from 'react';

/* ── Monochrome SVG icons (strokeWidth 1.5, square geometry) ── */
const toolIcons = {
  metasploit: (
    <svg viewBox="0 0 64 64" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="24" y="10" width="16" height="16" />
      <line x1="32" y1="26" x2="32" y2="48" />
      <line x1="32" y1="32" x2="20" y2="42" />
      <line x1="32" y1="32" x2="44" y2="42" />
      <line x1="32" y1="48" x2="22" y2="58" />
      <line x1="32" y1="48" x2="42" y2="58" />
    </svg>
  ),
  nmap: (
    <svg viewBox="0 0 64 64" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="12" y="12" width="40" height="40" strokeDasharray="4 3" />
      <rect x="22" y="22" width="20" height="20" />
      <rect x="29" y="29" width="6" height="6" fill="currentColor" />
      <line x1="32" y1="2" x2="32" y2="12" />
      <line x1="32" y1="52" x2="32" y2="62" />
      <line x1="2" y1="32" x2="12" y2="32" />
      <line x1="52" y1="32" x2="62" y2="32" />
    </svg>
  ),
  burpsuite: (
    <svg viewBox="0 0 64 64" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="12" y="8" width="40" height="48" />
      <line x1="12" y1="20" x2="52" y2="20" />
      <rect x="18" y="12" width="4" height="4" fill="currentColor" />
      <rect x="26" y="12" width="4" height="4" fill="currentColor" />
      <line x1="20" y1="28" x2="44" y2="28" strokeOpacity="0.5" />
      <line x1="20" y1="34" x2="38" y2="34" strokeOpacity="0.5" />
      <line x1="20" y1="40" x2="42" y2="40" strokeOpacity="0.5" />
      <line x1="20" y1="46" x2="32" y2="46" strokeOpacity="0.5" />
    </svg>
  ),
  hydra: (
    <svg viewBox="0 0 64 64" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="32,8 48,28 42,56 22,56 16,28" />
      <line x1="16" y1="28" x2="8" y2="24" />
      <line x1="48" y1="28" x2="56" y2="24" />
      <line x1="19" y1="42" x2="10" y2="46" />
      <line x1="45" y1="42" x2="54" y2="46" />
      <rect x="25" y="25" width="4" height="4" fill="currentColor" />
      <rect x="35" y="25" width="4" height="4" fill="currentColor" />
    </svg>
  ),
  wireshark: (
    <svg viewBox="0 0 64 64" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="10" y="10" width="44" height="44" />
      <polyline points="14,36 24,36 30,20 38,44 44,36 50,36" />
      <line x1="10" y1="32" x2="54" y2="32" strokeOpacity="0.3" />
    </svg>
  ),
  kali: (
    <svg viewBox="0 0 64 64" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="10,52 32,12 54,52" />
      <polyline points="18,46 32,22 46,46" />
      <polyline points="26,40 32,30 38,40" />
      <line x1="32" y1="12" x2="32" y2="6" />
    </svg>
  ),
  aircrackng: (
    <svg viewBox="0 0 64 64" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="32" y1="14" x2="32" y2="52" />
      <line x1="32" y1="14" x2="20" y2="32" />
      <line x1="32" y1="14" x2="44" y2="32" />
      <polyline points="20,20 12,28 12,40" strokeDasharray="3 3" />
      <polyline points="44,20 52,28 52,40" strokeDasharray="3 3" />
      <rect x="29" y="11" width="6" height="6" fill="currentColor" />
    </svg>
  ),
  johntheripper: (
    <svg viewBox="0 0 64 64" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="22" y="8" width="20" height="32" />
      <rect x="26" y="14" width="12" height="6" strokeOpacity="0.5" />
      <rect x="28" y="26" width="8" height="8" />
      <line x1="32" y1="40" x2="32" y2="56" />
      <line x1="26" y1="56" x2="38" y2="56" />
    </svg>
  ),
  sqlmap: (
    <svg viewBox="0 0 64 64" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="14" y="10" width="36" height="44" />
      <line x1="14" y1="22" x2="50" y2="22" />
      <line x1="14" y1="34" x2="50" y2="34" strokeOpacity="0.5" />
      <line x1="14" y1="44" x2="50" y2="44" strokeOpacity="0.5" />
    </svg>
  ),
  netcat: (
    <svg viewBox="0 0 64 64" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="8" y1="32" x2="20" y2="32" />
      <line x1="44" y1="32" x2="56" y2="32" />
      <rect x="20" y="20" width="24" height="24" />
      <polygon points="28,27 28,37 37,32" fill="currentColor" stroke="none" />
      <rect x="6" y="29" width="6" height="6" />
      <rect x="52" y="29" width="6" height="6" />
    </svg>
  ),
  nikto: (
    <svg viewBox="0 0 64 64" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="14" y="10" width="36" height="36" />
      <line x1="32" y1="10" x2="32" y2="28" />
      <line x1="32" y1="28" x2="44" y2="22" />
      <rect x="29" y="25" width="6" height="6" fill="currentColor" />
      <polyline points="20,52 32,46 44,52" />
      <line x1="32" y1="46" x2="32" y2="58" />
    </svg>
  ),
  gobuster: (
    <svg viewBox="0 0 64 64" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="8" y="12" width="48" height="40" />
      <line x1="8" y1="22" x2="56" y2="22" />
      <line x1="14" y1="30" x2="36" y2="30" strokeOpacity="0.6" />
      <line x1="14" y1="36" x2="42" y2="36" strokeOpacity="0.6" />
      <line x1="14" y1="42" x2="30" y2="42" strokeOpacity="0.6" />
      <rect x="40" y="36" width="10" height="10" />
      <line x1="50" y1="46" x2="54" y2="50" strokeWidth="2" />
    </svg>
  ),
};

const SkillCard = ({ skill, index, isVisible }) => {
  return (
    <div
      className={`skill-card-wrapper ${isVisible ? 'skill-card-visible' : ''}`}
      style={{ transitionDelay: isVisible ? `${index * 45}ms` : '0ms' }}
    >
      <div className="skill-card">
        <div className="skill-card-icon">{toolIcons[skill.icon]}</div>
        <span className="skill-card-name">{skill.name}</span>
      </div>
    </div>
  );
};

export default SkillCard;
