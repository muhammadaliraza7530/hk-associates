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
    <section ref={containerRef} className="relative overflow-hidden pt-6 sm:pt-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative w-full h-[65vh] min-h-[500px] sm:h-auto sm:aspect-video sm:min-h-0 flex items-center justify-center">
          <div className="absolute inset-0 rounded-[2rem] border border-[oklch(0.78_0.14_255)]/20 bg-[rgba(16,16,18,0.45)] shadow-[0_28px_120px_rgba(0,0,0,0.45)]" />
          <div className="relative w-full h-full overflow-hidden rounded-[2rem] border border-white/10 bg-black/[0.35] shadow-[0_22px_80px_rgba(0,0,0,0.35)]">
            <video
              ref={videoRef}
              src="/video/mainSectionVideo.mp4"
              playsInline
              muted
              preload="auto"
              className="w-full h-full object-cover rounded-[2rem]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
