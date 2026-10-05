"use client";

import { m } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScrollDownIndicatorProps {
  targetId: string;
  className?: string;
}

export function ScrollDownIndicator({ targetId, className }: ScrollDownIndicatorProps) {
  return (
    <a
      href={`#${targetId}`}
      aria-label="Desplazarse al contenido"
      className={cn(
        "flex flex-col items-center gap-1 rounded-sm text-xs font-medium uppercase tracking-[0.3em] text-on-media/80 transition-colors hover:text-on-media focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-media",
        className,
      )}
    >
      <span aria-hidden="true">Descubrir</span>
      <m.span
        aria-hidden="true"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="h-5 w-5" />
      </m.span>
    </a>
  );
}
