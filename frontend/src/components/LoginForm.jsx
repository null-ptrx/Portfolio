import React, { useState } from 'react';

const LoginForm = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };
  const [login, setlogin] = useState(true)
  const handleSubmit = async (e) => {
    let res = await fetch(`${import.meta.env.VITE_API_URL}/api/adminLogin`);
    if (res === true) {
      setlogin(true);
    } else {
      setlogin(false);
    }
  };
  
  return (
    <div className='flex justify-center items-center w-screen h-screen bg-[#1a1b26] relative overflow-hidden'>
      {/* Ambient glows */}
      <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-[#7aa2f7]/8 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/3 right-1/3 w-56 h-56 bg-[#bb9af7]/8 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="tn-terminal w-[calc(100%-2rem)] md:w-full max-w-md rounded-none animate-scale-in relative z-10 p-0">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[#414868]/50">
          <div className="w-3 h-3 rounded-full bg-[#f7768e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#e0af68]"></div>
          <div className="w-3 h-3 rounded-full bg-[#9ece6a]"></div>
          <span className="ml-3 text-xs text-[#565f89] font-mono">sudo authenticate</span>
        </div>

        <div className="p-6 md:p-8">
          <h2 className="text-2xl font-bold text-[#c0caf5] mb-2 tracking-tight">Admin Login</h2>
          <p className="text-sm text-[#565f89] font-mono mb-8">
            <span className="text-[#414868]">//</span> sign in to manage your portfolio
          </p>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label className="tn-label">
                <span className="text-[#414868] mr-1">//</span> email
              </label>
              <input
                onChange={handleChange}
                type="email"
                className="tn-input rounded-none text-sm px-4 py-3"
                placeholder="admin@example.com"
                value={form.email}
                name="email"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="tn-label">
                <span className="text-[#414868] mr-1">//</span> password
              </label>
              <input
                onChange={handleChange}
                type="password"
                className="tn-input rounded-none text-sm px-4 py-3"
                placeholder="••••••••"
                value={form.password}
                name="password"
                required
              />
            </div>
            <button
              type="submit"
              className="tn-btn-primary rounded-none px-6 py-3.5 text-sm cursor-pointer w-full mt-2"
            >
              Authenticate
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
