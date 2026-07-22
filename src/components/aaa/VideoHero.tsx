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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 flex justify-center">
        {/*
          Changes made:
          1. Outer container is borderless with no rounded shape (just standard background).
          2. Video wrapper uses `inline-block` / `max-h-[75vh]` so it snaps tightly to the video frame.
          3. Rounded corners & borders are directly on the video container so the video itself is rounded.
        */}
        <div className="relative max-h-[75vh] max-w-full rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_22px_80px_rgba(0,0,0,0.45)] [isolation:isolate] [transform:translateZ(0)]">
          <video
            ref={videoRef}
            src="/video/mainSectionVideo.mp4"
            playsInline
            muted
            preload="auto"
            className="h-[75vh] w-auto max-w-full object-contain rounded-[2.5rem] block"
          />
        </div>
      </div>
    </section>
  );
}
