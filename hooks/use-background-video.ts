"use client";

import { useSyncExternalStore } from "react";
import { useReducedMotion } from "framer-motion";

const SLOW_CONNECTION_TYPES = ["slow-2g", "2g"];

interface NetworkInformationLike extends EventTarget {
  saveData?: boolean;
  effectiveType?: string;
}

function getConnection(): NetworkInformationLike | undefined {
  return (navigator as Navigator & { connection?: NetworkInformationLike }).connection;
}

function isConnectionConstrained(): boolean {
  const connection = getConnection();
  if (!connection) return false;
  return (
    Boolean(connection.saveData) ||
    SLOW_CONNECTION_TYPES.includes(connection.effectiveType ?? "")
  );
}

function subscribeToConnection(onChange: () => void) {
  const connection = getConnection();
  connection?.addEventListener("change", onChange);
  return () => connection?.removeEventListener("change", onChange);
}

function isConnectionSuitableForVideo(): boolean {
  return !isConnectionConstrained();
}

// En el servidor nunca se renderiza el video: se decide ya en el navegador.
function isConnectionSuitableOnServer(): boolean {
  return false;
}

export interface VideoPlaybackEvents {
  onLoadedMetadata: (event: React.SyntheticEvent<HTMLVideoElement>) => void;
}

/**
 * Decide si el video de fondo debe mostrarse (en cualquier pantalla, salvo con
 * ahorro de datos, conexión lenta o preferencia de movimiento reducido) y
 * aplica la velocidad de reproducción. No hay botón de pausa, a pedido del
 * cliente: con "reducir movimiento" activado se muestra la foto fija.
 *
 * @param playbackRate Velocidad de reproducción: 1 = normal, 0.8 = 20 % más lento.
 */
export function useBackgroundVideo(hasVideoSource: boolean, playbackRate = 1) {
  const prefersReducedMotion = useReducedMotion();
  const isConnectionSuitable = useSyncExternalStore(
    subscribeToConnection,
    isConnectionSuitableForVideo,
    isConnectionSuitableOnServer,
  );

  const shouldShowVideo =
    hasVideoSource && isConnectionSuitable && !prefersReducedMotion;

  const playbackEvents: VideoPlaybackEvents = {
    // defaultPlaybackRate mantiene la velocidad al repetir el bucle.
    onLoadedMetadata: (event) => {
      event.currentTarget.defaultPlaybackRate = playbackRate;
      event.currentTarget.playbackRate = playbackRate;
    },
  };

  return { shouldShowVideo, playbackEvents };
}
