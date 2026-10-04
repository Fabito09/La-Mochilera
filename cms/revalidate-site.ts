import { revalidatePath } from "next/cache";
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";

/**
 * Cuando los dueños guardan un cambio en el panel, el sitio vuelve a generar
 * sus páginas para mostrarlo. El sitio es chico: se actualiza completo.
 *
 * Los scripts que corren fuera del sitio (p. ej. la carga inicial de
 * productos) pasan `context.skipRevalidation` porque ahí no hay páginas que
 * actualizar.
 */
function revalidateWholeSite(context: Record<string, unknown>) {
  if (context.skipRevalidation) return;
  revalidatePath("/", "layout");
}

export const revalidateAfterChange: CollectionAfterChangeHook = ({ doc, req }) => {
  revalidateWholeSite(req.context);
  return doc;
};

export const revalidateAfterDelete: CollectionAfterDeleteHook = ({ doc, req }) => {
  revalidateWholeSite(req.context);
  return doc;
};
