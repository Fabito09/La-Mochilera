import type { CollectionConfig } from "payload";
import { CUSTOMERS_SLUG, isOwner, isOwnerOrSelf, isPublic } from "@/backend/access";
import { shippingAddressFields } from "@/backend/fields/shipping-address";

const MINUTE_IN_MS = 60 * 1000;
const DAY_IN_SECONDS = 24 * 60 * 60;

// Cuentas de los clientes de la tienda. Se registran solos desde el sitio
// (/cuenta/registro) y solo ven y cambian su propia cuenta; nunca entran al
// panel (ese es solo para la colección "users", los dueños).
export const Customers: CollectionConfig = {
  slug: CUSTOMERS_SLUG,
  labels: { singular: "Cliente", plural: "Clientes" },
  defaultSort: "-createdAt",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email", "phone", "province", "createdAt"],
    listSearchableFields: ["name", "email", "phone"],
  },
  auth: {
    maxLoginAttempts: 5,
    lockTime: 15 * MINUTE_IN_MS,
    // Un cliente no tiene que iniciar sesión cada vez que vuelve.
    tokenExpiration: 30 * DAY_IN_SECONDS,
    cookies: {
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    },
  },
  access: {
    read: isOwnerOrSelf,
    // Cualquiera puede crear su cuenta (registro público).
    create: isPublic,
    update: isOwnerOrSelf,
    delete: isOwner,
  },
  fields: [
    {
      type: "row",
      fields: [
        { name: "name", label: "Nombre completo", type: "text", required: true },
        { name: "phone", label: "Teléfono", type: "text" },
      ],
    },
    ...shippingAddressFields(),
  ],
};
