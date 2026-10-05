"use client";

import { domAnimation, LazyMotion, MotionConfig } from "framer-motion";

// LazyMotion carga solo las funciones de animación que usa el sitio (menos
// JavaScript que la librería completa). `strict` avisa si algún componente usa
// `motion.` en vez de `m.`.
// MotionConfig respeta prefers-reduced-motion: con la preferencia activa se
// eliminan los desplazamientos y quedan solo fundidos.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
