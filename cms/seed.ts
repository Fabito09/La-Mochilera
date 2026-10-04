// Carga inicial: pasa los productos de content/productos.ts (el catálogo de la
// Campaña 1) a la base de datos, con sus fotos. Se corre una sola vez:
//
//   npx payload run cms/seed.ts
//
// Si un producto ya existe (mismo código) lo salta, así que repetirlo no duplica.

import path from "node:path";
import config from "@payload-config";
import { getPayload } from "payload";
import { products } from "@/content/productos";

if (!process.env.BLOB_READ_WRITE_TOKEN) {
  throw new Error(
    "Falta BLOB_READ_WRITE_TOKEN en .env.local: sin él las fotos quedarían guardadas en esta compu y no en Vercel Blob.",
  );
}

const payload = await getPayload({ config });
// Fuera del sitio no hay páginas que actualizar (ver cms/revalidate-site.ts).
const context = { skipRevalidation: true };

// Varias botas comparten fotos de detalle: cada archivo se sube una sola vez.
const uploadedMediaIds = new Map<string, number>();

async function uploadImage(src: string, alt: string): Promise<number> {
  const existingId = uploadedMediaIds.get(src);
  if (existingId) return existingId;

  const media = await payload.create({
    collection: "media",
    data: { alt },
    filePath: path.resolve("public", `.${src}`),
    context,
  });
  uploadedMediaIds.set(src, media.id);
  return media.id;
}

for (const product of products) {
  const { totalDocs } = await payload.count({
    collection: "products",
    where: { code: { equals: product.code } },
  });
  if (totalDocs > 0) {
    payload.logger.info(`${product.code} ya existe, se salta.`);
    continue;
  }

  const imageIds: number[] = [];
  for (const image of product.images) imageIds.push(await uploadImage(image.src, image.alt));

  await payload.create({
    collection: "products",
    data: {
      name: product.name,
      code: product.code,
      slug: product.slug,
      category: product.category,
      shaftHeight: product.shaftHeight,
      leatherType: product.leatherType,
      colorName: product.colorName,
      colorFamilies: product.colorFamilies,
      colorOptions: product.colorOptions,
      material: product.material,
      closure: product.closure,
      sole: product.sole,
      toe: product.toe,
      priceInColones: product.priceInColones,
      compareAtPriceInColones: product.compareAtPriceInColones,
      badges: product.badges,
      images: imageIds,
      // Sin unidades cargadas: el inventario lo completan los dueños en el panel.
      sizes: product.sizes.map((size) => ({ size })),
      bestSellerRank: product.bestSellerRank,
      releasedOn: product.releasedOn,
      isVisible: product.isAvailable,
    },
    context,
  });
  payload.logger.info(`${product.code} ${product.name}: listo (${imageIds.length} fotos).`);
}

payload.logger.info(`Carga terminada. Fotos subidas: ${uploadedMediaIds.size}.`);
process.exit(0);
