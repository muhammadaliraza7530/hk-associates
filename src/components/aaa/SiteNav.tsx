import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { LogoMark } from "./LogoMark";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className={`mx-auto flex max-w-7xl items-center justify-between px-4 py-3 transition-all sm:px-6 ${
        scrolled ? "backdrop-blur-md bg-background/70 border-b border-white/5" : ""
      }`}>
        <Link to="/" className="flex items-center gap-3">
          <LogoMark size={44} />
          <span className="hidden font-display text-xs font-bold tracking-[0.28em] text-white/90 sm:inline">
            HK ASSOCIATES &amp; DEVELOPERS
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-xs font-semibold uppercase tracking-[0.22em] text-white/75 md:flex">
          {links.map((l) => (
            <Link key={l.to} to={l.to}
              activeOptions={{ exact: true }}
              activeProps={{ className: "text-[oklch(0.78_0.14_255)]" }}
              className="gold-link transition-colors hover:text-[oklch(0.78_0.14_255)]"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link to="/contact" data-cursor="view"
          className="group relative hidden overflow-hidden rounded-full border border-[oklch(0.5_0.18_258)]/60 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[oklch(0.78_0.14_255)] transition-colors hover:text-[oklch(0.14_0.02_255)] md:inline-block"
        >
          <span className="absolute inset-0 -translate-x-full bg-[oklch(0.5_0.18_258)] transition-transform duration-500 group-hover:translate-x-0" />
          <span className="relative">Get a Quote</span>
        </Link>

        <button aria-label="Open menu" onClick={() => setOpen(true)}
          className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white md:hidden"
        >
          <Menu size={18} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[oklch(0.13_0.02_190)]/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 sm:px-6">
              <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-3">
                <LogoMark size={44} />
              </Link>
              <button aria-label="Close menu" onClick={() => setOpen(false)}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white"
              >
                <X size={18} />
              </button>
            </div>
            <nav className="mt-10 flex flex-col items-center gap-8 px-6 text-center">
              {links.map((l, i) => (
                <motion.div key={l.to} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}>
                  <Link to={l.to} onClick={() => setOpen(false)}
                    activeOptions={{ exact: true }} activeProps={{ className: "gold-text" }}
                    className="font-display text-4xl font-black tracking-tight text-white"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <Link to="/contact" onClick={() => setOpen(false)}
                className="mt-6 rounded-full bg-[oklch(0.5_0.18_258)] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.3em] text-[oklch(0.14_0.02_255)]"
              >
                Get a Quote
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}