import type { CollectionConfig } from "payload";
import { isOwner } from "@/cms/access";

// Dueños del negocio: son los únicos que entran al panel. No hay registro
// público; el primer dueño se crea al abrir /admin por primera vez y los
// demás los agrega un dueño desde el panel.
export const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: "Dueño", plural: "Dueños" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email"],
  },
  auth: true,
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
