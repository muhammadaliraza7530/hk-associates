import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { DraftingCompass, Sofa, Trees, Hammer, HardHat, Wrench } from "lucide-react";
import { HeroCarousel } from "@/components/aaa/HeroCarousel";
import { Reveal } from "@/components/aaa/Reveal";
import { SiteShell, WHATSAPP_HREF } from "@/components/aaa/SiteShell";
import { SectionGlow } from "@/components/aaa/SectionGlow";
import { AnimatedCounter } from "@/components/aaa/AnimatedCounter";
import { celebrate } from "@/components/aaa/confetti";
import { ProjectsCarousel } from "@/components/aaa/ProjectsCarousel";
import { ClientsCarousel } from "@/components/aaa/ClientsCarousel";
import VideoHero from "@/components/aaa/VideoHero";
import { SERVICES } from "@/data/services";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "HK Associates and Developers — Construction, Design & Interior Contractors in Pakistan" },
      { name: "description", content: "National construction company for general contracting, construction management, design-build and interior designing — commercial, residential, industrial and iconic projects across Pakistan." },
      { property: "og:title", content: "HK Associates and Developers — Construction & Design Contractors" },
      { property: "og:description", content: "General contracting, construction management, design-build & interior designing across Pakistan." },
    ],
    links: [
      { rel: "preload", as: "image", href: "/images/hero-excavator.jpg", fetchpriority: "high" },
    ],
  }),
});

const projects = [
  { img: "/images/svc-construction.jpg", title: "Commercial Construction", tag: "Contracting · Pakistan" },
  { img: "/images/svc-designing.jpg", title: "Design-Build Projects", tag: "Architecture · Planning" },
  { img: "/images/svc-interior.jpg", title: "Interior Fit-outs", tag: "Interior · Residential" },
  { img: "/images/hero-excavator.jpg", title: "Site Works & Excavation", tag: "General Contracting" },
  { img: "/images/about-1.jpg", title: "Institutional Structures", tag: "Multi-purpose · Public" },
  { img: "/images/about-2.jpg", title: "Residential Developments", tag: "Housing · Pakistan" },
  { img: "/images/about-3.jpg", title: "Iconic Structures", tag: "Landmark · Steel" },
];

const clients = ["client-1.png", "client-2.png", "client-3.png", "client-4.png", "client-5.png"];

function Hero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const rect = wrapRef.current?.getBoundingClientRect();
      if (!rect) return;
      setMouse({
        x: (e.clientX - rect.left - rect.width / 2) / rect.width,
        y: (e.clientY - rect.top - rect.height / 2) / rect.height,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section id="top" ref={wrapRef} className="relative overflow-hidden pt-24 sm:pt-28 md:pt-32">
      <motion.div aria-hidden
        className="pointer-events-none absolute -left-24 bottom-10 h-56 w-56 rounded-full bg-[oklch(0.5_0.18_258)]/10 blur-3xl"
        animate={{ x: mouse.x * 20, y: mouse.y * 20 }} transition={{ type: "spring", damping: 20 }} />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, letterSpacing: "0.5em" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-5 text-center text-[10px] font-bold uppercase text-[oklch(0.78_0.14_255)]/90 sm:mb-6 sm:text-xs"
        >
          — Introduction —
        </motion.p>

        <div className="relative overflow-hidden py-1">
          <motion.h1
            initial={{ opacity: 0, x: -120, filter: "blur(14px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="text-center font-display font-black leading-[0.95] tracking-tight text-[clamp(2.4rem,11vw,9rem)]"
          >
            <span className="hk-title-shimmer">HK Associates</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, x: 120, filter: "blur(14px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
            className="mt-2 text-center font-display font-semibold leading-[0.95] tracking-[0.22em] text-white/85 text-[clamp(0.85rem,3.6vw,2.4rem)]"
          >
            <span className="mr-2 text-[oklch(0.78_0.14_255)]">&amp;</span>Developers
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.9, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-6 h-px w-24 origin-center bg-gradient-to-r from-transparent via-[oklch(0.78_0.14_255)] to-transparent"
        />

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.9 }}
          className="mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed text-white/70 sm:text-base md:text-lg"
        >
          A national construction company specializing in general contracting,
          construction management, design-build and interior designing —
          <br className="hidden sm:block" />
          delivering quality across Pakistan.
        </motion.p>
        <div className="mt-8 sm:mt-10 md:mt-14">
          <HeroCarousel />
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const line = ["Contracting", "Design-Build", "Interior Designing", "Renovation", "Landscaping", "Maintenance", "Turn-Key"];
  const doubled = [...line, ...line, ...line];
  return (
    <div className="relative overflow-hidden border-y border-white/5 py-4 sm:py-6">
      <div className="marquee flex gap-8 whitespace-nowrap sm:gap-12">
        {doubled.map((t, i) => (
          <span key={i} className="flex items-center gap-8 font-display text-xl font-black text-white/40 sm:gap-12 sm:text-3xl md:text-5xl">
            {t}
            <span className="text-[oklch(0.5_0.18_258)]">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const stats = [
    { n: 10, suffix: "+", l: "Years of Practice" },
    { n: 150, suffix: "+", l: "Projects Delivered" },
    { n: 20, suffix: "+", l: "Cities Served" },
    { n: 25, suffix: "+", l: "Trusted Clients" },
  ];
  return (
    <SectionGlow id="story" className="overflow-hidden py-20 md:py-40">
      <div ref={ref}>
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 md:grid-cols-2 md:gap-20">
          <Reveal>
            <div className="text-[10px] uppercase tracking-[0.5em] text-[oklch(0.78_0.14_255)]">— Introduction</div>
            <h2 className="mt-6 font-display text-[clamp(1.6rem,7vw,3.75rem)] leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
              A national
              <br />
              <span className="gold-text font-black">construction company</span>
              <br />
              you can trust.
            </h2>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-white/60 sm:mt-8 sm:text-base">
              HK Associates specializes in general contracting, construction
              management, design-build and interior designing. Throughout our
              history we've succeeded by providing a wide range of construction
              solutions to our clients and delivering quality work — from
              commercial and residential to industrial, medical, institutional
              and iconic steel-fabricated structures.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-6">
              {stats.map((s, i) => (
                <motion.div key={s.l}
                  initial={{ boxShadow: "0 0 0 0 rgba(0,0,0,0)" }}
                  whileInView={{ boxShadow: "0 0 32px -6px oklch(0.7 0.14 180 / 0.55), inset 0 0 24px -10px oklch(0.75 0.14 180 / 0.4)" }}
                  viewport={{ once: false, amount: 0.4 }}
                  transition={{ duration: 0.9, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-xl border border-[oklch(0.6_0.2_258)]/30 bg-white/[0.02] p-4">
                  <div className="font-display text-4xl gold-text">
                    <AnimatedCounter value={s.n} suffix={s.suffix} />
                  </div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-white/50">{s.l}</div>
                </motion.div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15} className="relative">
            <motion.div style={{ y }}
              initial={{ boxShadow: "0 0 0 0 rgba(0,0,0,0)" }}
              whileInView={{ boxShadow: "0 0 60px -8px oklch(0.7 0.14 180 / 0.6), 0 0 120px -30px oklch(0.7 0.14 180 / 0.4)" }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-3xl border border-[oklch(0.6_0.2_258)]/40">
              <img loading="lazy" decoding="async" src="/images/svc-side.jpg"
                alt="HK Associates construction site" className="h-[420px] w-full object-cover sm:h-[520px] md:h-[640px]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="text-[10px] uppercase tracking-[0.35em] text-[oklch(0.78_0.14_255)]">Head Office</div>
                <div className="mt-2 font-display text-2xl text-white">Bahria Town, Lahore</div>
              </div>
            </motion.div>
            <div className="float-y absolute -bottom-6 -left-6 hidden rounded-2xl border border-white/10 bg-[oklch(0.19_0.03_255)] p-4 md:block">
              <div className="text-[10px] uppercase tracking-[0.35em] text-white/50">Welcome to</div>
              <div className="mt-1 font-display text-xl text-white">HK Associates</div>
            </div>
          </Reveal>
        </div>
      </div>
    </SectionGlow>
  );
}

function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const firedRef = useRef(false);
  const cardsRef = useRef<Array<HTMLDivElement | null>>([]);
  const [litIndex, setLitIndex] = useState<number | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting && !firedRef.current) {
          firedRef.current = true;
          const r = el.getBoundingClientRect();
          celebrate(r.left + r.width / 2, r.top + r.height / 3);
        }
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Sequentially light up each card as the user scrolls through the section
  useEffect(() => {
    const onScroll = () => {
      const vh = window.innerHeight;
      const focus = vh * 0.55;
      let best = -1;
      let bestDist = Infinity;
      cardsRef.current.forEach((c, i) => {
        if (!c) return;
        const r = c.getBoundingClientRect();
        const center = r.top + r.height / 2;
        const dist = Math.abs(center - focus);
        if (dist < bestDist && r.top < vh && r.bottom > 0) {
          bestDist = dist;
          best = i;
        }
      });
      setLitIndex(best === -1 ? null : best);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const iconMap: Record<string, { Icon: typeof DraftingCompass; from: string; to: string; ring: string }> = {
    "designing":         { Icon: DraftingCompass, from: "#60a5fa", to: "#a78bfa", ring: "#60a5fa" },
    "interior-designing":{ Icon: Sofa,            from: "#f472b6", to: "#fb7185", ring: "#f472b6" },
    "landscaping":       { Icon: Trees,           from: "#34d399", to: "#22d3ee", ring: "#34d399" },
    "renovation":        { Icon: Hammer,          from: "#fbbf24", to: "#fb923c", ring: "#fbbf24" },
    "construction":      { Icon: HardHat,         from: "#f97316", to: "#ef4444", ring: "#f97316" },
    "maintenance":       { Icon: Wrench,          from: "#22d3ee", to: "#3b82f6", ring: "#22d3ee" },
  };

  return (
    <SectionGlow id="services" className="py-24 md:py-32">
      <div ref={sectionRef} className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="text-[10px] uppercase tracking-[0.5em] text-[oklch(0.78_0.14_255)]">— What We Offer</div>
          <h2 className="mt-4 font-display text-[clamp(1.9rem,7.5vw,3.75rem)] leading-[1.05] tracking-normal sm:text-5xl md:text-6xl">
            Complete construction services,
            <br />
            <span className="gold-text font-black">under one roof.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {SERVICES.map((s, i) => {
            const cfg = iconMap[s.slug] ?? iconMap["designing"];
            const { Icon } = cfg;
            return (
            <Reveal key={s.slug} delay={i * 0.08}>
              <div
                ref={(el) => { cardsRef.current[i] = el; }}
                className={`svc-card group h-full rounded-2xl border border-white/10 bg-[oklch(0.19_0.03_255)] p-8 transition-all duration-500 hover:-translate-y-1 hover:border-[oklch(0.6_0.2_258)]/60 ${litIndex === i ? "svc-lit border-[oklch(0.6_0.2_258)]/70 -translate-y-1" : ""}`}
              >
                <div
                  className="grid h-16 w-16 place-items-center rounded-2xl shadow-[0_10px_30px_-8px_rgba(0,0,0,0.6)] ring-1 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-4deg]"
                  style={{
                    background: `linear-gradient(135deg, ${cfg.from}, ${cfg.to})`,
                    boxShadow: `0 12px 40px -10px ${cfg.ring}80, inset 0 1px 0 rgba(255,255,255,0.25)`,
                    ['--tw-ring-color' as never]: `${cfg.ring}66`,
                  }}
                >
                  <Icon className="h-8 w-8 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]" strokeWidth={2.2} />
                </div>
                <h3 className="mt-6 font-display text-xl font-black sm:text-2xl">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{s.intro}</p>
                <Link to="/services" className="mt-6 inline-block gold-link text-[11px] font-bold uppercase tracking-[0.28em] text-[oklch(0.78_0.14_255)]">
                  Learn More →
                </Link>
              </div>
            </Reveal>
            );
          })}
        </div>
      </div>
    </SectionGlow>
  );
}

function Work() {
  return (
    <SectionGlow id="work" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10 grid gap-6 sm:mb-14 md:flex md:items-end md:justify-between">
          <Reveal>
            <div className="text-[10px] uppercase tracking-[0.5em] text-[oklch(0.78_0.14_255)]">— Featured Projects</div>
            <h2 className="mt-4 font-display text-[clamp(1.9rem,7.5vw,3.75rem)] leading-[1.05] tracking-normal sm:text-5xl md:text-6xl">
              Structures that <span className="gold-text font-black">endure.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="hidden text-xs uppercase tracking-[0.3em] text-white/40 md:inline">
              Drag · Swipe · Tap
            </span>
          </Reveal>
        </div>
      </div>
      <div className="mx-auto max-w-[100vw] px-2 sm:px-4">
        <ProjectsCarousel projects={projects} />
      </div>
    </SectionGlow>
  );
}

function Welcome() {
  return (
    <SectionGlow className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
        <Reveal>
          <div className="text-[10px] uppercase tracking-[0.5em] text-[oklch(0.78_0.14_255)]">— Welcome to HK Associates</div>
          <p className="mt-6 font-display text-2xl italic text-white/80 sm:text-3xl md:text-4xl">
            "We shape our buildings; thereafter, they shape us."
          </p>
          <h3 className="mt-8 font-display text-[clamp(1.8rem,6vw,3.25rem)] font-black leading-tight">
            <span className="gold-text">From idea, plan</span> to final solution.
          </h3>
          <Link to="/contact" data-cursor="view"
            className="mt-10 inline-block rounded-full bg-[oklch(0.5_0.18_258)] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.3em] text-[oklch(0.14_0.02_255)] transition-transform hover:scale-[1.03]">
            Contact Us
          </Link>
        </Reveal>
      </div>
    </SectionGlow>
  );
}

function Clients() {
  return (
    <SectionGlow className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="text-center text-[10px] uppercase tracking-[0.5em] text-[oklch(0.78_0.14_255)]">— Clients That Trust Us</div>
          <h3 className="mt-4 text-center font-display text-xl font-black text-white sm:text-3xl">
            Some of our clients that <span className="gold-text">trust us</span>
          </h3>
          <p className="mt-3 text-center text-sm text-white/50">Be sure to be one of them.</p>
        </Reveal>
      </div>
      <div className="mt-10">
        <ClientsCarousel logos={clients} />
      </div>
    </SectionGlow>
  );
}

function CTA() {
  return (
    <SectionGlow id="contact" className="overflow-hidden py-20 md:py-40">
      <div className="spotlight pointer-events-none absolute inset-0 opacity-70" />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <Reveal>
          <div className="text-[10px] uppercase tracking-[0.5em] text-[oklch(0.78_0.14_255)]">— Let's Build</div>
          <h2 className="mt-4 font-display text-[clamp(1.9rem,8.5vw,5.5rem)] leading-[0.95] tracking-normal sm:text-6xl md:text-8xl">
            Have a site,
            <br />
            <span className="gold-text font-black">a plan, a vision?</span>
          </h2>
          <p className="mx-auto mt-8 max-w-lg text-white/60">
            Feel free to talk to our representative any time. Use our contact form
            or one of our contact numbers — let us build your future together.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a data-cursor="view" href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer"
              onClick={(e) => celebrate(e.clientX, e.clientY)}
              className="group relative overflow-hidden rounded-full bg-[oklch(0.5_0.18_258)] px-7 py-4 text-center text-[10px] font-bold uppercase tracking-[0.22em] text-[oklch(0.14_0.02_255)] transition-transform hover:scale-[1.03] sm:px-8 sm:text-[11px] sm:tracking-[0.3em]">
              <span className="relative z-10">WhatsApp Us</span>
              <span className="shimmer absolute inset-0 opacity-40" />
            </a>
            <Link to="/contact" data-cursor="view"
              className="rounded-full border border-white/20 px-7 py-4 text-center text-[10px] font-bold uppercase tracking-[0.22em] text-white/80 transition-colors hover:border-[oklch(0.5_0.18_258)] hover:text-[oklch(0.78_0.14_255)] sm:px-8 sm:text-[11px] sm:tracking-[0.3em]">
              Get a Quote
            </Link>
          </div>
        </Reveal>
      </div>
    </SectionGlow>
  );
}

function Index() {
  return (
    <SiteShell>
      <Hero />
      <VideoHero />
      <Marquee />
      <Story />
      <Services />
      <Work />
      <Welcome />
      <Clients />
      <CTA />
    </SiteShell>
  );
}
