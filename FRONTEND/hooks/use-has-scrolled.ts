"use client";

import { useSyncExternalStore } from "react";

const SCROLL_THRESHOLD_PX = 8;

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

function hasScrolledPastThreshold(): boolean {
  return window.scrollY > SCROLL_THRESHOLD_PX;
}

function hasScrolledOnServer(): boolean {
  return false;
}

/** true en cuanto la página se desplazó unos píxeles hacia abajo. */
export function useHasScrolled(): boolean {
  return useSyncExternalStore(
    subscribeToScroll,
    hasScrolledPastThreshold,
    hasScrolledOnServer,
  );
}
