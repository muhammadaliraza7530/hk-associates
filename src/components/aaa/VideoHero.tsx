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
      // Remove listener after first interaction
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

    // Intersection Observer to handle scroll-based play/pause with voice
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            // Unmute initially to attempt playing with sound
            v.muted = false;
            const p = v.play();

            if (p && typeof p.then === "function") {
              p.catch(() => {
                // If browser blocks unmuted autoplay, play muted first (fallback)
                v.muted = true;
                v.play().catch(() => {});
              });
            }
          } else {
            // Pause video and mute audio when scrolled out of view
            if (!v.paused) {
              v.pause();
            }
          }
        }
      },
      { threshold: 0.5 } // 50% section view triggers play/pause
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={containerRef} className="relative overflow-hidden pt-6 sm:pt-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative rounded-3xl overflow-hidden w-full h-[65vh] min-h-[500px] sm:h-auto sm:aspect-video sm:min-h-0 flex items-center justify-center bg-black border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
          <video
            ref={videoRef}
            src="/video/mainSectionVideo.mp4"
            playsInline
            preload="auto"
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>
      </div>
    </section>
  );
}
