import type { ReactNode } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { CustomCursor } from "@/components/aaa/CustomCursor";
import { SiteNav } from "@/components/aaa/SiteNav";
import { BrandUpPopup } from "@/components/aaa/BrandUpPopup";
import { LogoMark } from "@/components/aaa/LogoMark";
const brandupLogo = { url: "/brandup-logo.jpg" };

const WA_NUMBER = "923104758923";
const WA_HREF = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi HK Associates, I'd like to know more about your services.")}`;

function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 20 });
  return (
    <motion.div style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-[oklch(0.5_0.18_258)]" />
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-12">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <LogoMark size={52} />
            <div className="font-display text-xl font-black leading-tight">
              HK Associates<br /><span className="text-sm text-white/60">&amp; Developers</span>
            </div>
          </div>
          <p className="mt-4 max-w-sm text-sm text-white/55">
            A national construction company specializing in general contracting,
            construction management, design-build and interior designing across Pakistan.
          </p>
        </div>
        <div className="text-sm">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[oklch(0.78_0.14_255)]">Explore</div>
          <div className="mt-3 flex flex-col gap-1 text-white/60">
            <Link to="/" className="gold-link w-fit">Home</Link>
            <Link to="/about" className="gold-link w-fit">About</Link>
            <Link to="/services" className="gold-link w-fit">Services</Link>
            <Link to="/projects" className="gold-link w-fit">Projects</Link>
            <Link to="/contact" className="gold-link w-fit">Contact</Link>
          </div>
        </div>
        <div className="text-sm">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[oklch(0.78_0.14_255)]">Contact</div>
          <div className="mt-3 space-y-1 text-white/60">
            <a href="tel:+923314031816" className="gold-link block">+92 331 4031816</a>
            <a href={WA_HREF} target="_blank" rel="noopener noreferrer" className="gold-link block">
              +92 310 4758923 (WhatsApp)
            </a>
            <a href="mailto:info@hkassociatesanddevelopers.com" className="gold-link block break-all">
              info@hkassociatesanddevelopers.com
            </a>
            <div className="pt-2">Bahria Town · Lahore · Pakistan</div>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col items-center justify-between gap-3 px-4 text-center text-[10px] font-bold uppercase tracking-[0.22em] text-white/40 sm:flex-row sm:px-6 sm:text-left sm:tracking-[0.3em]">
        <span>© {new Date().getFullYear()} HK Associates and Developers</span>
        <span className="inline-flex items-center gap-2 normal-case tracking-normal">
          <span className="text-white/60">Designed &amp; Developed by</span>
          <span className="inline-flex items-center gap-1.5 font-semibold text-[#ff9a3c]">
            <img src={brandupLogo.url} alt="Brand Up" className="h-4 w-4 rounded-sm bg-white object-contain p-[1px]" loading="lazy" />
            Brand Up
          </span>
        </span>
      </div>
    </footer>
  );
}

function WhatsAppFab() {
  return (
    <a href={WA_HREF} rel="noopener noreferrer" aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-[60] grid h-14 w-14 place-items-center rounded-full bg-[oklch(0.62_0.16_150)] text-[oklch(0.14_0.02_255)] shadow-[0_0_30px_-4px_oklch(0.62_0.16_150/0.7)] transition-transform hover:scale-110 sm:bottom-8 sm:right-8 sm:h-16 sm:w-16"
    >
      <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.04 21.5h-.004a9.87 9.87 0 01-5.03-1.378l-.36-.214-3.744.982 1-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c0-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 016.988 2.897 9.821 9.821 0 012.892 6.994c-.003 5.45-4.437 9.885-9.885 9.885zm8.413-18.297A11.815 11.815 0 0012.04 0C5.463 0 .11 5.35.108 11.926c0 2.096.549 4.14 1.594 5.945L0 24l6.335-1.652a11.876 11.876 0 005.7 1.448h.006c6.582 0 11.935-5.35 11.938-11.925a11.86 11.86 0 00-3.526-8.667z"/>
      </svg>
    </a>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="grain vignette relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <BrandUpPopup />
      <ProgressBar />
      <CustomCursor />
      <SiteNav />
      <main>{children}</main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}

export const WHATSAPP_HREF = WA_HREF;