import React, { useEffect, useRef, useCallback, useState } from "react";

export default function VideoHero() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const manualPauseRef = useRef(false);
  
  // 1. By default sound ON (isMuted = false)
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Read saved preference on mount (if available)
  useEffect(() => {
    try {
      const saved = localStorage.getItem("videoHeroMuted");
      if (saved !== null) {
        setIsMuted(saved === "true");
      }
    } catch (e) {}
  }, []);

  // Sync muted state with video ref & localStorage
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = isMuted;
    try {
      localStorage.setItem("videoHeroMuted", String(isMuted));
    } catch (e) {}
  }, [isMuted]);

  const togglePlayback = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      manualPauseRef.current = false;
    } else {
      v.pause();
      manualPauseRef.current = true;
    }
  }, []);

  const toggleMute = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsMuted((m) => !m);
  }, []);

  // Click anywhere on container to unmute and ensure playback
  const handleContainerClick = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.muted) {
      setIsMuted(false);
    }
    if (v.paused && !manualPauseRef.current) {
      v.play().catch(() => {});
    }
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    const el = containerRef.current;
    if (!v || !el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (!manualPauseRef.current) {
              const p = v.play();
              if (p && typeof p.then === "function") {
                p.catch(() => {
                  // اگر براؤزر Unmuted Autoplay بلاک کرے تو بیک اپ کے طور پر میوٹ کر کے پلے کر دے گا
                  v.muted = true;
                  v.play().catch(() => {});
                });
              }
            }
          } else {
            if (!v.paused) v.pause();
          }
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

return (
  <section
    ref={containerRef}
    onClick={handleContainerClick}
    className="relative w-full overflow-hidden pt-6 sm:pt-8"
  >
    {/* Left & Right space: 60px on desktop */}
    <div className="w-full px-4 sm:px-8 md:px-[60px]">
      {/* 
        Height Updated: 
        h-[85vh] (Screen height coverage increased)
        min-h-[550px] & max-h-[950px] for better view on larger screens
      */}
      <div className="relative w-full rounded-2xl overflow-hidden bg-black h-[95vh] min-h-[950px] max-h-[1950px] flex items-center justify-center shadow-2xl">
        <video
          ref={videoRef}
          src="/video/mainSectionVideo.mp4"
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
        />

        {/* Controls overlay */}
        <div className="absolute inset-0 z-10 flex items-end justify-between p-6 pointer-events-none">
          <div className="pointer-events-auto">
            <button
              onClick={togglePlayback}
              aria-label="Toggle video playback"
              className="rounded-full bg-black/40 border border-white/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md hover:bg-black/60 transition"
            >
              Play / Pause
            </button>
          </div>

          <div className="pointer-events-auto">
            <button
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute video" : "Mute video"}
              className="flex items-center gap-2 rounded-full bg-black/40 border border-white/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md hover:bg-black/60 transition"
            >
              {isMuted ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  <line x1="17" y1="9" x2="23" y2="15" strokeWidth="2" strokeLinecap="round" />
                  <line x1="23" y1="9" x2="17" y2="15" strokeWidth="2" strokeLinecap="round" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5L6 9H2v6h4l5 4V5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.54 8.46a5 5 0 010 7.07" />
                </svg>
              )}
              <span className="hidden sm:inline">{isMuted ? "Unmute" : "Mute"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
);
}