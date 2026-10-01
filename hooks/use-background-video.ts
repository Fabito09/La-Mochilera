"use client";

import { useCallback, useRef, useState, useSyncExternalStore } from "react";
import { useReducedMotion } from "framer-motion";

const DESKTOP_MEDIA_QUERY = "(min-width: 768px)";
const SLOW_CONNECTION_TYPES = ["slow-2g", "2g"];

interface NetworkInformationLike {
  saveData?: boolean;
  effectiveType?: string;
}

function isConnectionConstrained(): boolean {
  const { connection } = navigator as Navigator & {
    connection?: NetworkInformationLike;
  };
  if (!connection) return false;
  return (
    Boolean(connection.saveData) ||
    SLOW_CONNECTION_TYPES.includes(connection.effectiveType ?? "")
  );
}

function subscribeToViewport(onChange: () => void) {
  const desktopMedia = window.matchMedia(DESKTOP_MEDIA_QUERY);
  desktopMedia.addEventListener("change", onChange);
  return () => desktopMedia.removeEventListener("change", onChange);
}

function isDeviceSuitableForVideo(): boolean {
  return (
    window.matchMedia(DESKTOP_MEDIA_QUERY).matches && !isConnectionConstrained()
  );
}

// En el servidor nunca se renderiza el video: así el móvil no lo descarga.
function isDeviceSuitableOnServer(): boolean {
  return false;
}

/**
 * Decide si el video de fondo debe mostrarse (pantalla grande, conexión
 * rápida y sin preferencia de movimiento reducido) y expone el control de
 * pausa/reproducción.
 */
export function useBackgroundVideo(hasVideoSource: boolean) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const prefersReducedMotion = useReducedMotion();
  const isDeviceSuitable = useSyncExternalStore(
    subscribeToViewport,
    isDeviceSuitableForVideo,
    isDeviceSuitableOnServer,
  );

  const shouldShowVideo =
    hasVideoSource && isDeviceSuitable && !prefersReducedMotion;

  const togglePlayback = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
    } else {
      video.pause();
    }
  }, []);

  const playbackEvents = {
    onPlay: () => setIsPlaying(true),
    onPause: () => setIsPlaying(false),
  };

  return { videoRef, shouldShowVideo, isPlaying, togglePlayback, playbackEvents };
}
