// import React, { useState } from 'react';

// const LoginForm = () => {
//   const [form, setForm] = useState({
//     email: '',
//     password: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm(prev => ({ ...prev, [name]: value }));
//   };
//   const [login, setlogin] = useState(true)
//   const handleSubmit = async (e) => {
//     let res = await fetch(`${import.meta.env.VITE_API_URL}/api/adminLogin`);
//     if (res === true) {
//       setlogin(true);
//     } else {
//       setlogin(false);
//     }
//   };
  
//   return (
//     <div className='flex justify-center items-center h-full w-screen h-screen bg-[#1A1A1A]'>
//     <div className="w-[calc(100%-2rem)] md:w-full max-w-md border border-[#3A3A3A] bg-[#1A1A1A] p-6 md:p-8">
//       <h2 className="text-sm text-[#A8A296] mb-6">admin login</h2>
//       <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
//         <div className="flex flex-col gap-1">
//           <label className="text-xs text-[#A8A296]">email</label>
//           <input
//             onChange={handleChange}
//             type="email"
//             className="border border-[#3A3A3A] rounded-none bg-[#121212] text-[#EDE8D0] text-sm px-4 py-3 outline-none"
//             placeholder="admin@example.com"
//             value={form.email}
//             name="email"
//             required
//           />
//         </div>
//         <div className="flex flex-col gap-1">
//           <label className="text-xs text-[#A8A296]">password</label>
//           <input
//             onChange={handleChange}
//             type="password"
//             className="border border-[#3A3A3A] rounded-none bg-[#121212] text-[#EDE8D0] text-sm px-4 py-3 outline-none"
//             placeholder="••••••••"
//             value={form.password}
//             name="password"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="border border-[#3A3A3A] rounded-none px-6 py-3 text-sm text-[#EDE8D0] bg-transparent cursor-pointer w-full mt-4 hover:bg-[#2A2A2A] transition-colors"
//         >
//           authenticate
//         </button>
//       </form>
//     </div>
//     </div>
//   );
// };

// export default LoginForm;
