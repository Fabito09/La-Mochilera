"use client";

import { m, type Variants } from "framer-motion";

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

interface FadeInProps {
  children: React.ReactNode;
  /** Retraso en segundos, para escalonar elementos hermanos. */
  delay?: number;
  className?: string;
}

// Aparición suave al entrar en pantalla (una sola vez). Con movimiento
// reducido, MotionProvider elimina el desplazamiento y deja solo el fundido.
export function FadeIn({ children, delay = 0, className }: FadeInProps) {
  return (
    <m.div
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </m.div>
  );
}
