// Muestra el enlace secreto del panel para mandárselo a un dueño por aparte:
//
//   npm run enlace-panel
//
// Usa PAYLOAD_SECRET de .env.local, que debe ser la misma clave que está en Vercel.

import { ADMIN_ROUTE, PANEL_KEY_PARAM, panelKey } from "@/backend/panel-access";

const key = await panelKey();
if (!key) throw new Error("Falta PAYLOAD_SECRET en .env.local.");

const path = `${ADMIN_ROUTE}?${PANEL_KEY_PARAM}=${key}`;
const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://la-mochilera.vercel.app";
console.log(`\nEnlace del panel (no lo publique, mándelo solo a los dueños):\n\n  ${site}${path}\n`);
console.log(`Con otro dominio, agregue al final de la dirección: ${path}\n`);
process.exit(0);
