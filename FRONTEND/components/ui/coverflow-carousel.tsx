"use client";

import * as React from "react";
import Image from "next/image";
import { m, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

const useIsoLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

export interface CoverflowSlide {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
  description?: string;
  meta?: { label: string; value: string }[];
}

export interface CoverflowCarouselProps {
  slides: CoverflowSlide[];
  /** Grados que gira la primera tarjeta vecina. */
  rotate?: number;
  /** Cuánto retrocede la primera vecina, como fracción del ancho de tarjeta. */
  depth?: number;
  /** Distancia del observador en anchos de tarjeta: menor = lente más abierta. */
  perspective?: number;
  /** Exponente de la distancia: por debajo de 1 el giro se suaviza hacia afuera. */
  falloff?: number;
  /** Opacidad que se pierde por cada paso desde el centro. */
  fade?: number;
  /** Cualquier medida CSS; todo lo demás se deriva de ella, así escala. */
  cardWidth?: string;
  /** Espacio entre tarjetas, como fracción del ancho de tarjeta. */
  gap?: number;
  loop?: boolean;
  showCaption?: boolean;
  showPagination?: boolean;
  showNavigation?: boolean;
  /** Nombre del carrusel para lectores de pantalla. */
  label?: string;
  /** Nombre de cada elemento en los textos de ayuda, p. ej. "material". */
  itemName?: string;
  className?: string;
  cardClassName?: string;
}

export function CoverflowCarousel({
  slides,
  rotate = 44,
  depth = 0.6,
  perspective = 3,
  falloff = 0.56,
  fade = 0.1,
  cardWidth = "clamp(148px, 22vw, 260px)",
  gap = 0.05,
  loop = true,
  showCaption = false,
  showPagination = false,
  showNavigation = false,
  label = "Carrusel",
  itemName = "elemento",
  className,
  cardClassName,
}: CoverflowCarouselProps) {
  const count = slides.length;
  const prefersReducedMotion = useReducedMotion();

  const frameRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  /** Índice (fraccionario) de la tarjeta en el centro: única fuente de verdad. */
  const posRef = React.useRef(0);
  /** Destino del movimiento en curso; se avanza desde acá para no perder
      teclas pulsadas a mitad de una animación. */
  const targetRef = React.useRef(0);
  const widthRef = React.useRef(0);
  const rafRef = React.useRef<number | null>(null);
  const dragRef = React.useRef<{
    id: number;
    x: number;
    pos: number;
    v: number;
    t: number;
  } | null>(null);

  const [selected, setSelected] = React.useState(0);

  /** Tarjeta entera más cercana, dentro de 0..count-1. */
  const indexAt = React.useCallback(
    (pos: number) => ((Math.round(pos) % count) + count) % count,
    [count],
  );

  // Se pinta directo en el DOM: sesenta actualizaciones de estado por segundo
  // re-renderizarían todas las tarjetas sin necesidad.
  const paint = React.useCallback(() => {
    const width = widthRef.current;
    if (!width) return;
    const pitch = width * (1 + gap);
    const pos = posRef.current;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      // La distancia se pliega por el lado más corto del anillo: así funciona
      // el bucle, sin clonar nodos.
      let offset = index - pos;
      if (loop) {
        offset = ((offset % count) + count) % count;
        if (offset > count / 2) offset -= count;
      }

      const distance = Math.abs(offset);
      // Giro y profundidad se suavizan al alejarse, para que la segunda
      // tarjeta siga siendo legible.
      const ramp = Math.pow(distance, falloff);
      // Tope antes de quedar de canto, para que ninguna tarjeta dé la espalda.
      const tilt = Math.min(rotate * ramp, 82) * Math.sign(offset);

      card.style.transform =
        `translateX(calc(-50% + ${offset * pitch}px)) ` +
        `translateZ(${-depth * width * ramp}px) rotateY(${-tilt}deg)`;

      // Al cruzar media vuelta la tarjeta salta al otro lado: debe estar
      // invisible en ese momento para que no se note.
      const edge = loop ? Math.min(1, Math.max(0, count / 2 - distance)) : 1;
      card.style.opacity = String(Math.max(0, 1 - fade * distance) * edge);
      card.style.zIndex = String(100 - Math.round(distance));
    });
  }, [count, depth, fade, falloff, gap, loop, rotate]);

  const settle = React.useCallback(
    (target: number) => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      targetRef.current = target;
      setSelected(indexAt(target));

      // Con "reducir movimiento" activado, el cambio es inmediato.
      if (prefersReducedMotion) {
        posRef.current = target;
        paint();
        rafRef.current = null;
        return;
      }

      const step = () => {
        const remaining = target - posRef.current;
        if (Math.abs(remaining) < 0.0004) {
          posRef.current = target;
          paint();
          rafRef.current = null;
          return;
        }
        // Frenado exponencial suave (sin rebote).
        posRef.current += remaining * 0.16;
        paint();
        rafRef.current = requestAnimationFrame(step);
      };
      rafRef.current = requestAnimationFrame(step);
    },
    [indexAt, paint, prefersReducedMotion],
  );

  const clamp = React.useCallback(
    (pos: number) => (loop ? pos : Math.max(0, Math.min(count - 1, pos))),
    [count, loop],
  );

  const goTo = React.useCallback(
    (index: number) => {
      // Por el camino más corto, sin dar toda la vuelta.
      const target = loop
        ? index + Math.round((targetRef.current - index) / count) * count
        : index;
      settle(clamp(target));
    },
    [clamp, count, loop, settle],
  );

  const nudge = React.useCallback(
    (by: number) => settle(clamp(Math.round(targetRef.current) + by)),
    [clamp, settle],
  );

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    event.currentTarget.setPointerCapture(event.pointerId);
    targetRef.current = posRef.current;
    dragRef.current = {
      id: event.pointerId,
      x: event.clientX,
      pos: posRef.current,
      v: 0,
      t: performance.now(),
    };
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;

    const pitch = widthRef.current * (1 + gap);
    if (!pitch) return;

    const now = performance.now();
    const previous = posRef.current;
    posRef.current = clamp(drag.pos - (event.clientX - drag.x) / pitch);
    // Tarjetas por segundo, para el impulso al soltar.
    drag.v = ((posRef.current - previous) / Math.max(now - drag.t, 1)) * 1000;
    drag.t = now;

    const index = indexAt(posRef.current);
    if (index !== selected) setSelected(index);
    paint();
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;
    dragRef.current = null;
    // Un deslizamiento rápido avanza, pero nunca más de dos tarjetas.
    const carried = Math.max(-2, Math.min(2, drag.v * 0.18));
    settle(clamp(Math.round(posRef.current + carried)));
  };

  // El ancho de tarjeta define paso, profundidad y perspectiva: es lo único
  // que hay que medir, y solo cuando cambia el tamaño.
  useIsoLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const measure = () => {
      const card = cardRefs.current[0];
      if (!card) return;
      widthRef.current = card.offsetWidth;
      paint();
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    return () => observer.disconnect();
  }, [paint]);

  React.useEffect(
    () => () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    },
    [],
  );

  const active = slides[selected];

  return (
    <div
      className={cn("w-full", className)}
      style={{ ["--cf-card" as string]: cardWidth }}
      role="region"
      aria-roledescription="carrusel"
      aria-label={label}
    >
      <div className="relative">
        <div
          ref={frameRef}
          tabIndex={0}
          aria-label={`${label}: use las flechas izquierda y derecha para cambiar de ${itemName}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              nudge(-1);
            } else if (event.key === "ArrowRight") {
              event.preventDefault();
              nudge(1);
            }
          }}
          // El relleno vertical evita que el recorte corte las sombras.
          className="cursor-grab overflow-hidden py-10 outline-none ring-ring focus-visible:ring-2 active:cursor-grabbing"
          style={{
            perspective: `calc(var(--cf-card) * ${perspective})`,
            // El arrastre horizontal es del carrusel; la página sigue
            // pudiendo desplazarse en vertical.
            touchAction: "pan-y",
          }}
        >
          <div
            className="relative select-none"
            style={{
              height: "var(--cf-card)",
              transformStyle: "preserve-3d",
            }}
          >
            {slides.map((slide, index) => (
              <div
                key={slide.src}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                role="group"
                aria-roledescription="diapositiva"
                aria-label={`${index + 1} de ${count}`}
                className={cn(
                  "absolute left-1/2 top-0 aspect-square overflow-hidden rounded-2xl bg-muted shadow-xl will-change-transform",
                  cardClassName,
                )}
                style={{ width: "var(--cf-card)" }}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  draggable={false}
                  sizes="(min-width: 768px) 340px, 60vw"
                  className="select-none object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {showNavigation && (
          <>
            <button
              type="button"
              aria-label={`${itemName} anterior`}
              onClick={() => nudge(-1)}
              className="absolute left-3 top-1/2 z-200 -translate-y-1/2 rounded-full bg-background/80 p-2 text-foreground backdrop-blur transition hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label={`${itemName} siguiente`}
              onClick={() => nudge(1)}
              className="absolute right-3 top-1/2 z-200 -translate-y-1/2 rounded-full bg-background/80 p-2 text-foreground backdrop-blur transition hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
          </>
        )}
      </div>

      {/* Los colores se heredan de la sección, así funciona sobre fondo claro u oscuro. */}
      {showCaption && active?.title && (
        <m.div
          key={selected}
          aria-live="polite"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mx-auto mt-2 flex max-w-xl flex-col items-center px-6 text-center"
        >
          <p className="text-xs font-medium uppercase tracking-[0.3em] opacity-75">
            {active.title}
          </p>
          {active.subtitle && (
            <p className="mt-2 font-display text-3xl leading-tight md:text-4xl">{active.subtitle}</p>
          )}
          {active.description && (
            <p className="mt-3 leading-7 opacity-85">{active.description}</p>
          )}
          {active.meta && active.meta.length > 0 && (
            <dl className="mt-6 w-full max-w-xs text-sm">
              {active.meta.map((row) => (
                <div key={row.label} className="flex justify-between py-1">
                  <dt className="opacity-70">{row.label}</dt>
                  <dd className="font-medium">{row.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </m.div>
      )}

      {showPagination && (
        <div className="mt-6 flex items-center justify-center gap-1">
          {slides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              aria-label={`Ir a ${itemName} ${index + 1}${slide.title ? `: ${slide.title}` : ""}`}
              aria-current={index === selected}
              onClick={() => goTo(index)}
              // Área táctil de 24 px aunque el punto se vea de 8 px.
              className="flex size-6 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span
                aria-hidden="true"
                className={cn(
                  "size-2 rounded-full bg-current transition-opacity",
                  index === selected ? "opacity-100" : "opacity-30",
                )}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
