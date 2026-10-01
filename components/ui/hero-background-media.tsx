import Image from "next/image";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";

export interface HeroVideoSources {
  mp4?: string;
  webm?: string;
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
 * Capa de fondo del hero: video en escritorio, imagen fija (póster) en móvil,
 * conexiones lentas o movimiento reducido, y un placeholder rotulado si
 * todavía no hay material. Incluye el degradado que asegura la legibilidad.
 */
export function HeroBackgroundMedia({
  videoSources,
  stillImageUrl,
  shouldShowVideo,
  videoRef,
  playbackEvents,
}: HeroBackgroundMediaProps) {
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
          {videoSources?.webm && <source src={videoSources.webm} type="video/webm" />}
          {videoSources?.mp4 && <source src={videoSources.mp4} type="video/mp4" />}
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

      {/* Valores de opacidad provisionales: se ajustan con el material real
          y se verifica el contraste del texto (WCAG AA). */}
      <div className="absolute inset-0 bg-linear-to-tr from-overlay/85 via-overlay/45 to-overlay/10" />
      <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-overlay/50 to-transparent" />
    </div>
  );
}
