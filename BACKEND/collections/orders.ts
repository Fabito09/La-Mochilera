import type { CollectionBeforeChangeHook, CollectionConfig } from "payload";
import { isOwner } from "@/backend/access";

const COSTA_RICA_PROVINCES = [
  "San José",
  "Alajuela",
  "Cartago",
  "Heredia",
  "Guanacaste",
  "Puntarenas",
  "Limón",
];

const ORDER_STATUSES = [
  { label: "Pendiente de pago", value: "pendiente" },
  { label: "Pagado", value: "pagado" },
  { label: "Enviado", value: "enviado" },
  { label: "Entregado", value: "entregado" },
  { label: "Cancelado", value: "cancelado" },
];

interface OrderItem {
  quantity?: number | null;
  unitPrice?: number | null;
}

/** El total se calcula solo: productos × cantidad + envío. */
const computeTotal: CollectionBeforeChangeHook = ({ data }) => {
  const items: OrderItem[] = data.items ?? [];
  const itemsTotal = items.reduce(
    (sum, item) => sum + (item.quantity ?? 0) * (item.unitPrice ?? 0),
    0,
  );
  return { ...data, total: itemsTotal + (data.shippingCost ?? 0) };
};

// Pedidos: hoy los anotan los dueños (ventas por WhatsApp o en el showroom).
// Cuando se conecte la pasarela de pago, los pedidos de la web entran solos.
export const Orders: CollectionConfig = {
  slug: "orders",
  labels: { singular: "Pedido", plural: "Pedidos" },
  defaultSort: "-createdAt",
  admin: {
    useAsTitle: "customerName",
    defaultColumns: ["customerName", "status", "total", "province", "createdAt"],
    listSearchableFields: ["customerName", "phone", "email"],
  },
  access: {
    read: isOwner,
    create: isOwner,
    update: isOwner,
    delete: isOwner,
  },
  hooks: {
    beforeChange: [computeTotal],
  },
  fields: [
    {
      name: "status",
      label: "Estado",
      type: "select",
      required: true,
      defaultValue: "pendiente",
      options: ORDER_STATUSES,
      admin: { position: "sidebar" },
    },
    {
      name: "channel",
      label: "Dónde se vendió",
      type: "select",
      required: true,
      defaultValue: "whatsapp",
      options: [
        { label: "WhatsApp", value: "whatsapp" },
        { label: "Showroom", value: "showroom" },
        { label: "Sitio web", value: "web" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "trackingNumber",
      label: "Número de guía del envío",
      type: "text",
      admin: { position: "sidebar" },
    },
    {
      type: "collapsible",
      label: "Cliente",
      fields: [
        { name: "customerName", label: "Nombre completo", type: "text", required: true },
        {
          type: "row",
          fields: [
            { name: "phone", label: "Teléfono", type: "text", required: true },
            { name: "email", label: "Correo", type: "email" },
          ],
        },
      ],
    },
    {
      type: "collapsible",
      label: "Entrega",
      fields: [
        {
          name: "delivery",
          label: "Forma de entrega",
          type: "radio",
          required: true,
          defaultValue: "envio",
          options: [
            { label: "Envío a domicilio", value: "envio" },
            { label: "Retiro en el showroom", value: "retiro" },
          ],
        },
        {
          type: "row",
          admin: { condition: (data) => data?.delivery === "envio" },
          fields: [
            {
              name: "province",
              label: "Provincia",
              type: "select",
              options: COSTA_RICA_PROVINCES.map((value) => ({ label: value, value })),
            },
            { name: "canton", label: "Cantón", type: "text" },
            { name: "district", label: "Distrito", type: "text" },
          ],
        },
        {
          name: "address",
          label: "Dirección exacta (otras señas)",
          type: "textarea",
          admin: { condition: (data) => data?.delivery === "envio" },
        },
      ],
    },
    {
      name: "items",
      label: "Productos",
      type: "array",
      required: true,
      minRows: 1,
      labels: { singular: "Producto", plural: "Productos" },
      fields: [
        {
          name: "product",
          label: "Producto",
          type: "relationship",
          relationTo: "products",
          required: true,
        },
        {
          type: "row",
          fields: [
            { name: "size", label: "Talla", type: "number" },
            { name: "color", label: "Color", type: "text" },
            { name: "quantity", label: "Cantidad", type: "number", required: true, min: 1, defaultValue: 1 },
            { name: "unitPrice", label: "Precio unitario (₡)", type: "number", required: true, min: 0 },
          ],
        },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "shippingCost", label: "Costo de envío (₡)", type: "number", min: 0, defaultValue: 0 },
        {
          name: "total",
          label: "Total (₡)",
          type: "number",
          admin: { readOnly: true, description: "Se calcula solo al guardar." },
        },
      ],
    },
    { name: "notes", label: "Notas", type: "textarea" },
  ],
};
