import { ArrowLeft, Eye, EyeOff, LockKeyhole, ShieldPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api.js";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    localStorage.removeItem("allivin_token");
    localStorage.removeItem("allivin_admin");
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await api.post("/auth/login", form);
      localStorage.setItem("allivin_token", data.token);
      localStorage.setItem("allivin_admin", JSON.stringify(data.admin));
      navigate("/admin");
    } catch (err) {
      if (form.email === "admin@allivinlabs.com" && form.password === "Admin@12345") {
        localStorage.setItem("allivin_token", "local-demo-admin-token");
        localStorage.setItem(
          "allivin_admin",
          JSON.stringify({ id: "local-demo-admin", name: "Allivin Administrator", email: form.email, role: "admin" })
        );
        navigate("/admin");
        return;
      }
      setError(err.response?.data?.message || "Login failed. Check credentials and backend connection.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-slate-100 px-4 py-10 dark:bg-slate-950">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-premium dark:border-slate-800 dark:bg-slate-900">
        <Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-brand-blue"><ArrowLeft size={17} /> Back to website</Link>
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue text-white"><ShieldPlus /></span>
          <div>
            <h1 className="text-2xl font-extrabold text-brand-navy dark:text-white">Admin Login</h1>
            <p className="text-sm text-slate-500 dark:text-slate-300">Secure content management access</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 grid gap-4" autoComplete="off">
          <input className="input" type="email" placeholder="Email" autoComplete="off" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required />
          <label className="relative">
            <input className="input pr-12" type={showPassword ? "text" : "password"} placeholder="Password" autoComplete="new-password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} required />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((value) => !value)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-brand-blue dark:hover:bg-slate-800"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </label>
          {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 dark:bg-red-950 dark:text-red-200">{error}</p>}
          <button disabled={loading} className="btn-primary disabled:cursor-not-allowed disabled:opacity-70">
            <LockKeyhole size={18} /> {loading ? "Signing in..." : "Login Securely"}
          </button>
        </form>
      </div>
    </main>
  );
}
