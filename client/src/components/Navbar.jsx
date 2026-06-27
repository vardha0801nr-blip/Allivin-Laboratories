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

  function openSection(hash) {
    setOpen(false);
    if (window.location.pathname !== "/") {
      window.location.href = `/${hash}`;
      return;
    }
    if (window.location.hash === hash) {
      window.dispatchEvent(new Event("hashchange"));
      return;
    }
    window.location.hash = hash;
  }

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
              <button key={label} type="button" onClick={() => openSection(href)} className="rounded-xl px-4 py-3 text-left text-sm font-bold text-slate-700 transition hover:bg-white hover:text-brand-blue hover:shadow-sm dark:text-slate-200 dark:hover:bg-slate-800 xl:text-blue-50 xl:hover:bg-white/12 xl:hover:text-white xl:hover:shadow-none">
                {label}
              </button>
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
          <div className="relative h-full w-full overflow-y-auto bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.28),_transparent_34%),linear-gradient(160deg,#020617_0%,#08213a_52%,#020617_100%)] p-5 text-white shadow-premium" onClick={(event) => event.stopPropagation()}>
            <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-brand-blue/10 blur-3xl" />
            <div className="relative mb-6 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.06] p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue text-white shadow-lg shadow-blue-950/30">
                  <ShieldPlus size={24} />
                </span>
                <div>
                  <span className="block text-xl font-extrabold text-white">Allivin Labs</span>
                  <span className="block text-xs font-extrabold uppercase tracking-[0.25em] text-brand-teal">Menu</span>
                </div>
              </div>
              <button aria-label="Close menu" onClick={() => setOpen(false)} className="rounded-xl border border-white/15 bg-white/5 p-3 text-white transition hover:bg-white/10">
                <X size={20} />
              </button>
            </div>
            <div className="relative grid gap-3">
              {links.map(([label, href]) => (
                <button key={label} type="button" onClick={() => openSection(href)} className="rounded-2xl border border-white/10 bg-white/[0.07] px-5 py-4 text-left text-base font-extrabold text-slate-50 shadow-lg shadow-slate-950/15 transition hover:border-brand-teal/50 hover:bg-brand-blue hover:text-white">
                  {label}
                </button>
              ))}
              <Link to="/admin-login" onClick={() => setOpen(false)} className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-blue px-5 py-4 font-extrabold text-white shadow-lg shadow-blue-950/30 transition hover:bg-brand-navy">
                <LogIn size={18} /> Admin Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
