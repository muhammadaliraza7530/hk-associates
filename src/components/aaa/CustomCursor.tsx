import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { damping: 30, stiffness: 400, mass: 0.4 });
  const sy = useSpring(y, { damping: 30, stiffness: 400, mass: 0.4 });
  const [variant, setVariant] = useState<"default" | "view">("default");
  const [enabled, setEnabled] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!canHover) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-none-desktop");

    const onMove = (e: MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => { x.set(e.clientX); y.set(e.clientY); });
      const t = e.target as HTMLElement | null;
      if (!t) return;
      if (t.closest("[data-cursor='view']")) setVariant("view");
      else setVariant("default");
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.classList.remove("cursor-none-desktop");
    };
  }, [x, y]);

  if (!enabled) return null;
  const size = variant === "default" ? 14 : 88;
  const label = variant === "view" ? "View" : "";

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed z-[100] rounded-full mix-blend-difference"
        style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%", backgroundColor: "oklch(0.9 0.08 175)" }}
        animate={{ width: size, height: size }}
        transition={{ type: "spring", damping: 22, stiffness: 260 }}
      >
        {label && (
          <span className="flex h-full w-full items-center justify-center font-display text-xs uppercase tracking-widest text-[oklch(0.14_0.02_190)]">
            {label}
          </span>
        )}
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed z-[99] h-1.5 w-1.5 rounded-full bg-[oklch(0.82_0.09_175)]"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
    </>
  );
}