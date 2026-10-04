import type { Access, CollectionConfig, FieldHook } from "payload";
import { isOwner } from "@/cms/access";
import { revalidateAfterChange, revalidateAfterDelete } from "@/cms/revalidate-site";
import {
  COLOR_FAMILIES,
  PRODUCT_BADGES,
  PRODUCT_CATEGORIES,
  categoryLabels,
  shaftHeightLabels,
} from "@/lib/catalog";

/** El público solo ve los productos marcados como visibles; los dueños, todos. */
const visibleOrOwner: Access = ({ req }) =>
  req.user ? true : { isVisible: { equals: true } };

function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Si la dirección queda vacía, se arma con el nombre y el código: botin-summit-cme01. */
const slugFromNameAndCode: FieldHook = ({ value, data }) =>
  value || (data?.name && data?.code ? slugify(`${data.name} ${data.code}`) : value);

const options = (values: readonly string[]) =>
  values.map((value) => ({ label: value, value }));

export const Products: CollectionConfig = {
  slug: "products",
  labels: { singular: "Producto", plural: "Productos" },
  defaultSort: "bestSellerRank",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "code", "category", "priceInColones", "isVisible"],
    listSearchableFields: ["name", "code", "colorName"],
    // Pestañas Todos / Botas / Accesorios / Gorros sobre la lista.
    components: {
      beforeListTable: ["/cms/components/product-category-tabs#ProductCategoryTabs"],
    },
  },
  access: {
    read: visibleOrOwner,
    create: isOwner,
    update: isOwner,
    delete: isOwner,
  },
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  fields: [
    {
      type: "row",
      fields: [
        { name: "name", label: "Nombre", type: "text", required: true },
        {
          name: "code",
          label: "Código",
          type: "text",
          required: true,
          unique: true,
          admin: { description: "El del catálogo, p. ej. CME01." },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "category",
          label: "Categoría",
          type: "select",
          required: true,
          options: PRODUCT_CATEGORIES.map((value) => ({ label: categoryLabels[value], value })),
        },
        {
          name: "shaftHeight",
          label: "Altura de caña",
          type: "select",
          options: Object.entries(shaftHeightLabels).map(([value, label]) => ({ label, value })),
          admin: { condition: (data) => data?.category === "botas" },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "priceInColones",
          label: "Precio (₡)",
          type: "number",
          min: 0,
          admin: { description: "Vacío = el sitio muestra «Consultar precio»." },
        },
        {
          name: "compareAtPriceInColones",
          label: "Precio anterior (₡)",
          type: "number",
          min: 0,
          admin: { description: "Opcional. Se muestra tachado, para ofertas." },
        },
      ],
    },
    {
      name: "images",
      label: "Fotos",
      type: "upload",
      relationTo: "media",
      hasMany: true,
      required: true,
      admin: { description: "La primera es la foto principal. Se pueden arrastrar para cambiar el orden." },
    },
    {
      name: "sizes",
      label: "Tallas e inventario",
      type: "array",
      labels: { singular: "Talla", plural: "Tallas" },
      admin: {
        description:
          "Una fila por talla (EU). En «Unidades» ponga cuántos pares hay; 0 = agotada. Si no lleva el control, deje «Unidades» vacío. Sin filas = producto sin talla.",
        initCollapsed: true,
      },
      fields: [
        {
          type: "row",
          fields: [
            { name: "size", label: "Talla", type: "number", required: true, min: 1 },
            { name: "stock", label: "Unidades", type: "number", min: 0 },
          ],
        },
      ],
    },
    {
      name: "stock",
      label: "Unidades disponibles",
      type: "number",
      min: 0,
      admin: {
        description: "Para productos sin talla. 0 = agotado; vacío = no se lleva el control.",
        condition: (data) => !data?.sizes?.length,
      },
    },
    {
      type: "collapsible",
      label: "Color y materiales",
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "colorName",
              label: "Color",
              type: "text",
              required: true,
              admin: { description: "Como se le muestra al cliente, p. ej. «Marrón miel»." },
            },
            {
              name: "colorFamilies",
              label: "Grupo de color (para el filtro)",
              type: "select",
              hasMany: true,
              required: true,
              options: options(COLOR_FAMILIES),
            },
          ],
        },
        {
          name: "colorOptions",
          label: "Colores para elegir al comprar",
          type: "text",
          hasMany: true,
          admin: { description: "Solo si el mismo producto viene en varios colores (p. ej. gorros)." },
        },
        { name: "material", label: "Material", type: "text", required: true },
        {
          type: "row",
          fields: [
            { name: "leatherType", label: "Tipo de cuero", type: "text" },
            { name: "closure", label: "Cierre", type: "text" },
          ],
        },
        {
          type: "row",
          fields: [
            { name: "sole", label: "Suela", type: "text" },
            { name: "toe", label: "Punta", type: "text" },
          ],
        },
      ],
    },
    {
      name: "isVisible",
      label: "Mostrar en la tienda",
      type: "checkbox",
      defaultValue: true,
      admin: { position: "sidebar", description: "Desmarque para ocultarlo sin borrarlo." },
    },
    {
      name: "badges",
      label: "Etiquetas",
      type: "select",
      hasMany: true,
      options: options(PRODUCT_BADGES),
      admin: { position: "sidebar" },
    },
    {
      name: "bestSellerRank",
      label: "Orden en «Más vendidos»",
      type: "number",
      required: true,
      defaultValue: 99,
      admin: { position: "sidebar", description: "1 = el más vendido." },
    },
    {
      name: "releasedOn",
      label: "Fecha de lanzamiento",
      type: "date",
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: {
        position: "sidebar",
        description: "Ordena la vista «Novedades».",
        date: { pickerAppearance: "dayOnly", displayFormat: "d/M/yyyy" },
      },
    },
    {
      name: "slug",
      label: "Dirección (URL)",
      type: "text",
      unique: true,
      index: true,
      hooks: { beforeValidate: [slugFromNameAndCode] },
      admin: {
        position: "sidebar",
        description: "Se completa sola con el nombre y el código.",
      },
    },
  ],
};
