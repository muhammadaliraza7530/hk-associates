import type { ReactNode } from "react";

export function SectionGlow({
  children,
  id,
  className = "",
}: {
  children: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <section id={id} className={`relative ${className}`}>
      {children}
    </section>
  );
}