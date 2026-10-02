"use client";

import Link from "next/link";
import { m, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  HeroBackgroundMedia,
  type HeroVideoSources,
} from "@/components/ui/hero-background-media";
import { ScrollDownIndicator } from "@/components/ui/scroll-down-indicator";
import { VideoPlaybackToggle } from "@/components/ui/video-playback-toggle";
import { useBackgroundVideo } from "@/hooks/use-background-video";
import { cn } from "@/lib/utils";

interface HeroCallToAction {
  text: string;
  href: string;
}

export interface AnimatedHeroProps {
  /** Video propio de la marca, en MP4 y/o WebM. */
  backgroundVideoSrc?: HeroVideoSources;
  /** Fotograma del video: se ve mientras carga y en móvil/movimiento reducido. */
  posterImageUrl?: string;
  /** Imagen de respaldo si no hay póster. */
  backgroundImageUrl?: string;
  title: string;
  description: string;
  ctaButton: HeroCallToAction;
  secondaryCta?: HeroCallToAction;
  /** id de la sección siguiente, destino del indicador de scroll. */
  scrollTargetId?: string;
  className?: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.4,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export function AnimatedHero({
  backgroundVideoSrc,
  posterImageUrl,
  backgroundImageUrl,
  title,
  description,
  ctaButton,
  secondaryCta,
  scrollTargetId,
  className,
}: AnimatedHeroProps) {
  const hasVideoSource = Boolean(backgroundVideoSrc?.landscape || backgroundVideoSrc?.portrait);
  const { videoRef, shouldShowVideo, isPlaying, togglePlayback, playbackEvents } =
    useBackgroundVideo(hasVideoSource);

  return (
    <section
      aria-labelledby="hero-title"
      className={cn(
        "relative flex min-h-[calc(100svh-var(--announcement-height))] w-full flex-col justify-center overflow-hidden bg-overlay pt-(--header-height)",
        className,
      )}
    >
      <HeroBackgroundMedia
        videoSources={backgroundVideoSrc}
        stillImageUrl={posterImageUrl ?? backgroundImageUrl}
        shouldShowVideo={shouldShowVideo}
        videoRef={videoRef}
        playbackEvents={playbackEvents}
      />

      <m.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 text-left md:px-12"
      >
        <div className="max-w-3xl">
          <m.h1
            id="hero-title"
            variants={itemVariants}
            className="text-balance font-display text-6xl leading-[0.95] text-on-media sm:text-7xl lg:text-8xl"
          >
            {title}
          </m.h1>
          <m.p
            variants={itemVariants}
            className="mt-6 max-w-xl text-pretty text-lg leading-8 text-on-media/85"
          >
            {description}
          </m.p>
          <m.div
            variants={itemVariants}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Button asChild variant="glass" size="lg">
              <Link href={ctaButton.href}>{ctaButton.text}</Link>
            </Button>
            {secondaryCta && (
              <Button asChild variant="glass" size="lg">
                <Link href={secondaryCta.href}>{secondaryCta.text}</Link>
              </Button>
            )}
          </m.div>
        </div>
      </m.div>

      {scrollTargetId && (
        <ScrollDownIndicator
          targetId={scrollTargetId}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        />
      )}

      {shouldShowVideo && (
        <VideoPlaybackToggle
          isPlaying={isPlaying}
          onToggle={togglePlayback}
          className="absolute bottom-8 left-6 z-10 md:left-12"
        />
      )}
    </section>
  );
}
