import { LogIn, Menu, Moon, ShieldPlus, Sun, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext.jsx";

const links = [
  ["Home", "#home"],
  ["About Us", "#about"],
  ["Products", "#products"],
  ["Manufacturing Facilities", "#facilities"],
  ["Quality Assurance", "#quality"],
  ["Certifications", "#certifications"],
  ["Gallery", "#gallery"],
  ["Contact Us", "#contact"]
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { dark, toggleTheme } = useTheme();

  return (
    <header className="site-sidebar sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90 xl:fixed xl:inset-y-0 xl:left-0 xl:w-72 xl:border-b-0 xl:border-r xl:bg-brand-navy xl:text-white xl:shadow-none xl:backdrop-blur-none xl:dark:bg-slate-950">
      <nav className="section-shell flex h-[76px] items-center justify-between gap-5 xl:h-full xl:flex-col xl:items-stretch xl:justify-start xl:px-5 xl:py-6">
        <Link to="/" className="group flex min-w-fit items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue to-brand-navy text-white shadow-lg shadow-blue-700/20 transition group-hover:-translate-y-0.5 xl:bg-gradient-to-br xl:from-white/20 xl:to-white/10">
            <ShieldPlus size={26} />
          </span>
          <span>
            <span className="block text-2xl font-extrabold leading-6 tracking-tight text-brand-navy dark:text-white xl:text-white">Allivin</span>
            <span className="block text-xs font-extrabold uppercase tracking-[0.32em] text-brand-teal xl:text-cyan-200">Laboratories</span>
          </span>
        </Link>

        <div className="hidden w-full xl:mt-8 xl:flex">
          <div className="flex w-full flex-col items-stretch justify-start gap-2">
            {links.map(([label, href]) => (
              <a key={label} href={`/${href}`} className="rounded-xl px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-white hover:text-brand-blue hover:shadow-sm dark:text-slate-200 dark:hover:bg-slate-800 xl:text-blue-50 xl:hover:bg-white/12 xl:hover:text-white xl:hover:shadow-none">
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 xl:mt-auto xl:w-full xl:flex-col xl:items-stretch">
          <Link to="/admin-login" className="hidden items-center gap-2 rounded-xl bg-brand-blue px-4 py-2.5 text-sm font-extrabold text-white shadow-lg shadow-blue-700/20 transition hover:-translate-y-0.5 hover:bg-brand-navy lg:inline-flex xl:justify-center xl:bg-white xl:text-brand-navy xl:hover:bg-brand-sky">
            <LogIn size={17} /> Admin
          </Link>
          <button aria-label="Toggle theme" onClick={toggleTheme} className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-700 transition hover:border-brand-blue hover:text-brand-blue dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 xl:w-full xl:border-white/15 xl:bg-white/10 xl:text-white xl:hover:bg-white/15">
            {dark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button aria-label="Open menu" onClick={() => setOpen(true)} className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-700 xl:hidden dark:border-slate-700 dark:bg-slate-900 dark:text-white">
            <Menu size={22} />
          </button>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-[100] bg-slate-950 lg:hidden" onClick={() => setOpen(false)}>
          <div className="h-full w-full overflow-y-auto bg-slate-950 p-6 text-white shadow-premium" onClick={(event) => event.stopPropagation()}>
            <div className="mb-8 flex items-center justify-between">
              <span className="text-lg font-extrabold text-white">Allivin Labs</span>
              <button aria-label="Close menu" onClick={() => setOpen(false)} className="rounded-lg border border-white/15 bg-white/5 p-2 text-white">
                <X size={20} />
              </button>
            </div>
            <div className="grid gap-2">
              {links.map(([label, href]) => (
                <a key={label} href={`/${href}`} onClick={() => setOpen(false)} className="rounded-xl bg-white/[0.06] px-4 py-3 font-semibold text-slate-100 transition hover:bg-brand-blue hover:text-white">
                  {label}
                </a>
              ))}
              <Link to="/admin-login" onClick={() => setOpen(false)} className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-blue px-4 py-3 font-extrabold text-white transition hover:bg-brand-navy">
                <LogIn size={18} /> Admin Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
