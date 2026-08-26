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
    <div className='flex justify-center items-center h-full w-screen h-screen bg-[#0A0A0B]'>
    <div className="w-[calc(100%-2rem)] md:w-full max-w-md border border-[#27272A] bg-[#141416] rounded-none shadow-[0_0_20px_rgba(59,130,246,0.15)] p-6 md:p-8">
      <h2 className="text-2xl font-semibold text-[#FAFAFA] mb-2">Admin Login</h2>
      <p className="text-sm text-[#A1A1AA] mb-8">Sign in to manage your portfolio</p>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#A1A1AA]">Email</label>
          <input
            onChange={handleChange}
            type="email"
            className="border border-[#27272A] rounded-none bg-[#0A0A0B] text-[#FAFAFA] text-sm px-4 py-3 outline-none focus:border-[#3B82F6] transition-colors duration-200 placeholder-[#A1A1AA]/50"
            placeholder="admin@example.com"
            value={form.email}
            name="email"
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#A1A1AA]">Password</label>
          <input
            onChange={handleChange}
            type="password"
            className="border border-[#27272A] rounded-none bg-[#0A0A0B] text-[#FAFAFA] text-sm px-4 py-3 outline-none focus:border-[#3B82F6] transition-colors duration-200 placeholder-[#A1A1AA]/50"
            placeholder="••••••••"
            value={form.password}
            name="password"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-[#3B82F6] text-white rounded-none px-6 py-3 text-sm font-medium cursor-pointer w-full mt-2 hover:bg-[#60A5FA] transition-colors duration-200"
        >
          Authenticate
        </button>
      </form>
    </div>
    </div>
  );
};

export default LoginForm;
