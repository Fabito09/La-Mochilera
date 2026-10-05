// Llave del enlace secreto del panel. Sin ella, el panel y los datos de los
// dueños responden "página no encontrada": para el público no existen.
//
// La llave se deriva de PAYLOAD_SECRET (no hay que configurar nada más) y es
// de un solo sentido: conocer la llave no revela la clave del panel. Si se
// cambia PAYLOAD_SECRET, cambia la llave y hay que mandar el enlace de nuevo.

/**
 * Dirección del panel. Si se cambia, renombrar también la carpeta
 * app/(payload)/gestion-mochilera y las rutas del matcher en proxy.ts.
 */
export const ADMIN_ROUTE = "/gestion-mochilera";

/** Parámetro del enlace: /gestion-mochilera?llave=… */
export const PANEL_KEY_PARAM = "llave";

/** Cookie que recuerda el navegador de un dueño que ya usó el enlace. */
export const PANEL_KEY_COOKIE = "panel-llave";

export const PANEL_KEY_MAX_AGE_SECONDS = 365 * 24 * 60 * 60;

/** null si falta PAYLOAD_SECRET: en ese caso el panel queda cerrado para todos. */
export async function panelKey(secret = process.env.PAYLOAD_SECRET): Promise<string | null> {
  if (!secret) return null;
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`${secret}:enlace-del-panel`));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, 32);
}
