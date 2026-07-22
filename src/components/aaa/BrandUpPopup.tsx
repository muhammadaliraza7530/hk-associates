import { useEffect, useState } from "react";
import { X } from "lucide-react";
import confetti from "canvas-confetti";
const BRANDUP_LOGO = "/brandup-logo.jpg";
const STORAGE_KEY = "brandup-credit-popup-seen";

export function BrandUpPopup() {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    setMounted(true);
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => setShow(true)),
    );
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!show) return;
    const colors = ["#ff9a3c", "#ff6a00", "#ffb347", "#ffd28a", "#ffffff"];
    const fire = (x: number) => {
      confetti({
        particleCount: 55,
        spread: 70,
        startVelocity: 55,
        origin: { x, y: 0.35 },
        colors,
        scalar: 1,
        ticks: 220,
        zIndex: 200,
      });
      confetti({
        particleCount: 25,
        spread: 120,
        startVelocity: 30,
        origin: { x, y: 0.4 },
        colors,
        shapes: ["circle"],
        scalar: 0.7,
        ticks: 260,
        zIndex: 200,
      });
    };
    const t1 = window.setTimeout(() => fire(0.2), 150);
    const t2 = window.setTimeout(() => fire(0.8), 300);
    const t3 = window.setTimeout(() => fire(0.5), 500);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [show]);

  const close = () => {
    setShow(false);
    sessionStorage.setItem(STORAGE_KEY, "1");
    window.setTimeout(() => setMounted(false), 300);
  };

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[110] flex items-center justify-center px-4 bg-black/85 backdrop-blur-md transition-opacity duration-300 ease-out ${
        show ? "opacity-100" : "opacity-0"
      }`}
      onClick={close}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-[min(360px,100%)] overflow-hidden rounded-2xl p-[2px] shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          show ? "translate-y-0 scale-100 opacity-100" : "translate-y-6 scale-90 opacity-0"
        }`}
        style={{
          background: "linear-gradient(135deg, #ff9a3c 0%, #ff6a00 45%, #ffb347 75%, #ff8c1a 100%)",
          boxShadow: "0 25px 60px -15px rgba(255,106,0,0.6), 0 0 0 1px rgba(255,180,90,0.35)",
        }}
      >
        <div
          className="pointer-events-none absolute -inset-4 rounded-[1.5rem] opacity-60 blur-2xl"
          style={{
            background: "conic-gradient(from 0deg, #ff6a00, #ffb347, #ff8c1a, #ffd28a, #ff6a00)",
            animation: "spin 8s linear infinite",
          }}
        />

        <div className="relative rounded-[calc(1rem-2px)] bg-[#0d0704] p-5 text-center sm:p-6">
          <button
            onClick={close}
            aria-label="Close"
            className="absolute right-2.5 top-2.5 z-10 rounded-full border border-orange-400/40 bg-black/50 p-1 text-orange-200 transition hover:scale-110 hover:text-orange-100"
          >
            <X className="h-3.5 w-3.5" />
          </button>

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-white p-1.5 shadow-lg ring-2 ring-orange-400/60">
            <img src={BRANDUP_LOGO} alt="Brand Up" className="h-full w-full object-contain" />
          </div>

          <h2 className="mt-3 text-lg font-bold leading-tight text-white not-italic">
            Designed &amp; Developed by
          </h2>
          <div
            className="mt-0.5 text-3xl font-black leading-none not-italic tracking-tight"
            style={{
              background: "linear-gradient(135deg, #ffd28a 0%, #ff9a3c 45%, #ff6a00 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 4px 18px rgba(255,140,26,0.55))",
            }}
          >
            Brand Up
          </div>

          <div
            className="mx-auto mt-3 h-px w-16"
            style={{ background: "linear-gradient(90deg, transparent, #ff9a3c, transparent)" }}
          />

          <p className="mt-3 text-xs leading-relaxed text-orange-100/85">
            This is a{" "}
            <span className="font-semibold text-orange-300">complimentary quick-view</span>{" "}
            of your website. Any extra features, custom pages or advanced functionality can be added on request.
          </p>

          <div className="mt-4 flex flex-col gap-2">
            <div
              className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[11px] font-bold uppercase tracking-wide text-white shadow-lg"
              style={{
                background: "linear-gradient(135deg, #ff9a3c 0%, #ff6a00 100%)",
                boxShadow: "0 8px 20px -5px rgba(255,106,0,0.6)",
              }}
            >
              Upgrade With Brand Up
            </div>
            <button
              onClick={close}
              className="inline-flex items-center justify-center rounded-full border border-orange-400/40 px-5 py-2 text-[11px] font-bold uppercase tracking-wide text-orange-200 transition hover:bg-orange-500/10"
            >
              Explore Preview
            </button>
          </div>

          <p className="mt-3 text-[9px] uppercase tracking-widest text-orange-300/70">
            © Brand Up
          </p>
        </div>
      </div>
    </div>
  );
}