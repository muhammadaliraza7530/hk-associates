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
        {/* Added [transform:translateZ(0)] and [isolation:isolate] to force layer clipping */}
        <div className="relative w-full h-[65vh] min-h-[500px] sm:h-auto sm:aspect-video sm:min-h-0 flex items-center justify-center rounded-2xl overflow-hidden [transform:translateZ(0)] [isolation:isolate] shadow-2xl">
          <video
            ref={videoRef}
            src="/video/mainSectionVideo.mp4"
            playsInline
            muted
            preload="auto"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
}
