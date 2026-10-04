import type { CollectionConfig } from "payload";
import { isOwner } from "@/cms/access";

const MINUTE_IN_MS = 60 * 1000;
const HOUR_IN_SECONDS = 60 * 60;

// Dueños del negocio: son los únicos que entran al panel. No hay registro
// público; el primer dueño se crea al abrir el panel por primera vez y los
// demás los agrega un dueño desde el panel.
export const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: "Dueño", plural: "Dueños" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email"],
  },
  auth: {
    // Tras 5 contraseñas equivocadas seguidas, la cuenta se bloquea 15 minutos:
    // frena a quien intente adivinar la contraseña.
    maxLoginAttempts: 5,
    lockTime: 15 * MINUTE_IN_MS,
    // La sesión se cierra sola tras 8 horas.
    tokenExpiration: 8 * HOUR_IN_SECONDS,
    cookies: {
      // En el sitio publicado la sesión solo viaja por HTTPS.
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    },
  },
  access: {
    read: isOwner,
    create: isOwner,
    update: isOwner,
    delete: isOwner,
  },
  fields: [
    {
      name: "name",
      label: "Nombre",
      type: "text",
      required: true,
    },
  ],
};
