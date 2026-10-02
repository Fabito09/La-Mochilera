"use client";

import Image from "next/image";
import { VIDEO_PLAYBACK_RATE, type GalleryMedia } from "@/content/inicio";
import { useBackgroundVideo } from "@/hooks/use-background-video";

interface GalleryMediaTileProps {
  media: GalleryMedia;
  sizes: string;
}

/**
 * Foto o video de la galería, según lo que indique el contenido. El video
 * sigue las mismas reglas que el del hero: se muestra con buena conexión y
 * sin preferencia de movimiento reducido; si no, la foto fija.
 */
export function GalleryMediaTile({ media, sizes }: GalleryMediaTileProps) {
  const isVideo = media.kind === "video";
  const { shouldShowVideo, playbackEvents } = useBackgroundVideo(isVideo, VIDEO_PLAYBACK_RATE);
  const stillImageSrc = isVideo ? media.posterUrl : media.src;

  if (isVideo && shouldShowVideo) {
    return (
      <video
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
        <source src={media.src} type="video/mp4" />
      </video>
    );
  }

  return <Image src={stillImageSrc} alt={media.alt} fill sizes={sizes} className="object-cover" />;
}
