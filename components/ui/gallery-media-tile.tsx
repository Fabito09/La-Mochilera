"use client";

import Image from "next/image";
import { VideoPlaybackToggle } from "@/components/ui/video-playback-toggle";
import type { GalleryMedia } from "@/content/inicio";
import { useBackgroundVideo } from "@/hooks/use-background-video";

interface GalleryMediaTileProps {
  media: GalleryMedia;
  sizes: string;
}

/**
 * Foto o video de la galería, según lo que indique el contenido. El video
 * sigue las mismas reglas que el del hero: solo en pantallas grandes, con
 * buena conexión, sin movimiento reducido y con botón de pausa.
 */
export function GalleryMediaTile({ media, sizes }: GalleryMediaTileProps) {
  const isVideo = media.kind === "video";
  const { videoRef, shouldShowVideo, isPlaying, togglePlayback, playbackEvents } =
    useBackgroundVideo(isVideo);
  const stillImageSrc = isVideo ? media.posterUrl : media.src;

  if (isVideo && shouldShowVideo) {
    return (
      <>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={media.posterUrl}
          aria-label={media.alt}
          className="h-full w-full object-cover"
          {...playbackEvents}
        >
          <source src={media.src} />
        </video>
        <VideoPlaybackToggle
          isPlaying={isPlaying}
          onToggle={togglePlayback}
          className="absolute bottom-4 left-4"
        />
      </>
    );
  }

  return <Image src={stillImageSrc} alt={media.alt} fill sizes={sizes} className="object-cover" />;
}
