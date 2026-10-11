export const projects = [
  {
    name: "CodeRoom",
    description: "Real-time classroom platform where students join rooms via invite links to chat, share code windows, and debug together. A permission system (view / edit / collaborate) is enforced server-side.",
    tech: "React, TypeScript, Node.js, Socket.IO, MongoDB",
    github: "https://github.com/null-ptrx/Null-Room",
    live: "https://null-room.vercel.app/",
    active: true,
    roadmap: [
      "Voice and video calls in rooms",
      "Browser-based online IDE with code execution",
      "Live Share-style collaborative project mode",
      "Per-student code windows viewable by others (live)",
      "Room creation and invite management dashboard"
    ]
  },
  {
    name: "Developer Portfolio",
    description: "Frontend-only portfolio with a Japanese night theme. Projects are static data and the contact form sends straight to my email via Web3Forms, with no backend or database.",
    tech: "Vite, React, Tailwind CSS",
    github: "https://github.com/null-ptrx/Portfolio",
    live: "https://portfolio-ochre-tau-83l9otq44u.vercel.app/",
    active: false,
    roadmap: []
  },
  {
    name: "Personal Password Manager",
    description: "Full-stack password manager with full CRUD through a REST API. Optimistic UI updates re-sync with the backend to keep client and database state consistent.",
    tech: "React 19, Express.js 5, MongoDB, Vite",
    github: "https://github.com/null-ptrx/PersonalPasswordManager-MongoDB",
    live: "https://personal-password-manager-mongo-db.vercel.app/",
    active: false,
    roadmap: []
  },
  {
    name: "Linux Hub",
    description: "A centralized hub to manage Linux system configurations.",
    tech: "Linux, Bash, Node.js",
    github: "",
    live: "",
    active: false,
    roadmap: []
  }
];
