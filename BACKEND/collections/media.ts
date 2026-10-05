import type { CollectionConfig } from "payload";
import { isOwner, isPublic } from "@/backend/access";
import { revalidateAfterChange, revalidateAfterDelete } from "@/backend/revalidate-site";

// Fotos que se suben desde el panel. El sitio las optimiza al mostrarlas
// (next/image), así que aquí se guarda solo el original.
export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Foto", plural: "Fotos" },
  admin: {
    useAsTitle: "alt",
  },
  access: {
    read: isPublic,
    create: isOwner,
    update: isOwner,
    delete: isOwner,
  },
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  upload: {
    mimeTypes: ["image/*"],
  },
  fields: [
    {
      name: "alt",
      label: "Descripción de la foto",
      type: "text",
      required: true,
      admin: {
        description:
          "Qué se ve en la foto, p. ej. «Bota de nubuck marrón vista de lado». La leen los buscadores y las personas con lector de pantalla.",
      },
    },
  ],
};
