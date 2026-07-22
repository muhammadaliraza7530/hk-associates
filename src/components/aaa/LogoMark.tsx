const logo = { url: "/hk-logo.png" };

export function LogoMark({
  className = "",
  size = 44,
  rounded = "rounded-xl",
}: {
  className?: string;
  size?: number;
  rounded?: string;
}) {
  return (
    <span
      className={`inline-flex items-center justify-center bg-white shadow-[0_2px_10px_-2px_rgba(0,0,0,0.35)] ring-1 ring-black/5 ${rounded} ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src={logo.url}
        alt="HK Associates and Developers"
        className="h-[82%] w-[82%] object-contain"
        draggable={false}
      />
    </span>
  );
}

export function LogoWatermark({
  className = "",
  size = 44,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <div
      className={`pointer-events-none absolute left-3 top-3 z-20 rounded-lg bg-white/95 p-1.5 shadow-[0_4px_18px_-4px_rgba(0,0,0,0.5)] ring-1 ring-black/5 backdrop-blur-sm sm:left-4 sm:top-4 ${className}`}
    >
      <img
        src={logo.url}
        alt="HK Associates and Developers"
        className="block object-contain"
        style={{ width: size, height: size }}
        draggable={false}
      />
    </div>
  );
}