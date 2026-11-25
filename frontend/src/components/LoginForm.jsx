import React, { useState } from 'react';

const LoginForm = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/adminLogin`);
      const data = await res.json();
      if (!data) setError(true);
    } catch {
      setError(true);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-background px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-card border border-border">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
            Admin authentication
          </span>
          {error && (
            <span className="font-mono text-xs bg-foreground text-background px-2 py-0.5">
              [ERROR]
            </span>
          )}
        </div>

        <div className="p-6 sm:p-8">
          <h1 className="font-display text-2xl font-bold text-foreground mb-2 tracking-tight">
            Sign in
          </h1>
          <p className="text-sm text-foreground-secondary mb-8">
            Authenticate to manage projects and messages.
          </p>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                Email
              </label>
              <input
                onChange={handleChange}
                type="email"
                className="mono-input text-sm px-4 py-3"
                placeholder="admin@example.com"
                value={form.email}
                name="email"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                Password
              </label>
              <input
                onChange={handleChange}
                type="password"
                className="mono-input text-sm px-4 py-3"
                placeholder="••••••••"
                value={form.password}
                name="password"
                required
              />
            </div>

            <button
              type="submit"
              className="mono-btn-primary px-6 py-3 text-sm cursor-pointer w-full mt-2"
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
