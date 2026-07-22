import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef } from "react";

export function ClientsCarousel({ logos }: { logos: string[] }) {
  const gap = 20;
  const cardW = 176; // matches ~w-40/48 avg
  const singleLen = (cardW + gap) * logos.length;
  const x = useMotionValue(0);
  const rafRef = useRef<number | null>(null);
  const draggingRef = useRef(false);
  const lastTsRef = useRef<number | null>(null);
  const speedPxPerSec = 110;

  useEffect(() => {
    const tick = (ts: number) => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;
      if (!draggingRef.current) {
        let v = x.get() - speedPxPerSec * dt;
        if (v <= -singleLen) v += singleLen;
        x.set(v);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); lastTsRef.current = null; };
  }, [x, singleLen]);

  const doubled = [...logos, ...logos];

  return (
    <div className="group relative w-full overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[oklch(0.14_0.02_255)] to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[oklch(0.14_0.02_255)] to-transparent sm:w-24" />
      <motion.div
        className="flex touch-pan-y select-none"
        style={{ x, gap: `${gap}px`, willChange: "transform" }}
        drag="x" dragMomentum={false} dragElastic={0.04}
        onDragStart={() => { draggingRef.current = true; }}
        onDrag={() => {
          let v = x.get();
          if (v <= -singleLen * 1.5) v += singleLen;
          if (v > singleLen * 0.5) v -= singleLen;
          x.set(v);
        }}
        onDragEnd={(_, info) => {
          const vx = info.velocity.x;
          const target = x.get() + vx * 0.25;
          animate(x, target, {
            type: "inertia", velocity: vx, power: 0.3, timeConstant: 300, restDelta: 0.5,
            onComplete: () => { draggingRef.current = false; },
          });
        }}
      >
        {doubled.map((c, i) => (
          <div
            key={i}
            data-cursor="view"
            className="group/logo relative flex h-20 w-40 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/95 p-4 shadow-[0_8px_30px_-10px_oklch(0.5_0.18_258/0.4)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:scale-[1.06] hover:border-[oklch(0.6_0.2_258)]/60 hover:shadow-[0_14px_50px_-8px_oklch(0.7_0.14_180/0.7)] sm:h-24 sm:w-48"
          >
            <img src={`/images/${c}`} alt="Client logo" loading="lazy" decoding="async" draggable={false}
              className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover/logo:scale-110" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}