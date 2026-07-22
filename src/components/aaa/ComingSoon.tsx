import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import { SiteShell, WHATSAPP_HREF } from "@/components/aaa/SiteShell";
import { LogoMark } from "@/components/aaa/LogoMark";

export function ComingSoon({ title }: { title: string }) {
  return (
    <SiteShell>
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-4 py-24">
        <div className="pointer-events-none absolute inset-0 opacity-70"
          style={{ background: "radial-gradient(60% 55% at 50% 40%, oklch(0.5 0.18 258 / 0.35), transparent 70%)" }} />
        <div className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(40% 40% at 80% 80%, oklch(0.7 0.14 175 / 0.25), transparent 70%)" }} />

        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="mx-auto flex justify-center">
            <LogoMark />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-[oklch(0.6_0.2_258)]/40 bg-[oklch(0.5_0.18_258)]/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-[oklch(0.82_0.12_255)]">
            <Sparkles className="h-3 w-3" /> Coming Soon
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 font-display font-black leading-[0.95] tracking-tight text-white"
            style={{ fontSize: "clamp(2.4rem, 8vw, 5rem)" }}>
            {title}
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}
            className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-white/70 md:text-lg">
            Our team is working on it — we're crafting something special for you.
            This page will be live very soon.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link to="/" className="group inline-flex items-center gap-2 rounded-full bg-[oklch(0.5_0.18_258)] px-6 py-3 text-sm font-bold text-white shadow-[0_10px_30px_-8px_oklch(0.5_0.18_258/0.7)] transition hover:scale-[1.03]">
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Link>
            <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-white/90 transition hover:bg-white/5">
              Chat on WhatsApp
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-14 text-[10px] uppercase tracking-[0.4em] text-white/40">
            HK Associates and Developers
          </motion.div>
        </div>
      </section>
    </SiteShell>
  );
}