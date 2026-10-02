import Image from "next/image";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";

/** Videos MP4 del hero, uno por orientación de pantalla. */
export interface HeroVideoSources {
  /** Para pantallas horizontales (computadora, tablet acostada). */
  landscape?: string;
  /** Para pantallas verticales (celular). */
  portrait?: string;
}

interface HeroBackgroundMediaProps {
  videoSources?: HeroVideoSources;
  stillImageUrl?: string;
  shouldShowVideo: boolean;
  videoRef: React.Ref<HTMLVideoElement>;
  playbackEvents: {
    onPlay: () => void;
    onPause: () => void;
  };
}

/**
 * Capa de fondo del hero: video si la conexión lo permite y no se pidió
 * reducir el movimiento; si no, la imagen fija (póster). Cada pantalla recibe
 * el video de su orientación y `object-cover` lo ajusta a cualquier tamaño sin
 * deformarlo. Incluye el degradado que asegura la legibilidad del texto.
 */
export function HeroBackgroundMedia({
  videoSources,
  stillImageUrl,
  shouldShowVideo,
  videoRef,
  playbackEvents,
}: HeroBackgroundMediaProps) {
  const landscapeSrc = videoSources?.landscape ?? videoSources?.portrait;
  const hasBothOrientations = Boolean(videoSources?.landscape && videoSources?.portrait);

  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      {shouldShowVideo ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={stillImageUrl}
          className="h-full w-full object-cover"
          {...playbackEvents}
        >
          {/* El navegador usa la primera fuente cuyo `media` coincide. */}
          {hasBothOrientations && (
            <source src={videoSources?.portrait} type="video/mp4" media="(orientation: portrait)" />
          )}
          {landscapeSrc && <source src={landscapeSrc} type="video/mp4" />}
        </video>
      ) : stillImageUrl ? (
        <Image
          src={stillImageUrl}
          alt=""
          fill
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          className="object-cover"
        />
      ) : (
        <MediaPlaceholder
          label="Video y póster del hero"
          className="h-full w-full items-start justify-end px-6 pt-[calc(var(--header-height)+1.5rem)] text-right md:px-12"
        />
      )}

      <div className="absolute inset-0 bg-linear-to-tr from-overlay/85 via-overlay/45 to-overlay/10" />
      <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-overlay/50 to-transparent" />
    </div>
  );
}
