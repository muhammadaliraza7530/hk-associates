import React, { useEffect, useRef } from "react";

export default function VideoHero() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Unmute audio automatically on user's first click anywhere on the page
  useEffect(() => {
    const handleFirstUserInteraction = () => {
      const v = videoRef.current;
      if (v) {
        v.muted = false;
        v.play().catch(() => {});
      }
      window.removeEventListener("click", handleFirstUserInteraction);
      window.removeEventListener("touchstart", handleFirstUserInteraction);
    };

    window.addEventListener("click", handleFirstUserInteraction);
    window.addEventListener("touchstart", handleFirstUserInteraction);

    return () => {
      window.removeEventListener("click", handleFirstUserInteraction);
      window.removeEventListener("touchstart", handleFirstUserInteraction);
    };
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    const el = containerRef.current;
    if (!v || !el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            v.muted = false;
            const p = v.play();

            if (p && typeof p.then === "function") {
              p.catch(() => {
                v.muted = true;
                v.play().catch(() => {});
              });
            }
          } else {
            if (!v.paused) {
              v.pause();
            }
          }
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={containerRef} className="relative overflow-hidden pt-6 sm:pt-8 pb-5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 flex justify-center">
        {/* Wrapper with theme-matched ambient shadow and double glowing border */}
        <div className="group relative max-h-[75vh] max-w-full rounded-[2.5rem] p-[2px] bg-gradient-to-b from-sky-400/40 via-blue-600/20 to-sky-500/10 shadow-[0_20px_70px_rgba(14,165,233,0.25)] transition-all duration-500 hover:shadow-[0_25px_90px_rgba(14,165,233,0.4)]">
          
          {/* Inner Video Container */}
          <div className="relative w-full h-full overflow-hidden rounded-[2.4rem] bg-slate-950 [isolation:isolate] [transform:translateZ(0)]">
            <video
              ref={videoRef}
              src="/video/mainSectionVideo.mp4"
              playsInline
              muted
              preload="auto"
              className="h-[75vh] w-auto max-w-full object-contain rounded-[2.4rem] block"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
