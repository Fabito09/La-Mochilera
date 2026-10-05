import type { Access, PayloadRequest } from "payload";

// Hay dos tipos de sesión: los dueños (colección "users", entran al panel) y
// los clientes (colección "customers", solo su cuenta en el sitio). Cada
// permiso pregunta de qué colección es la sesión, nunca solo si hay una.

export const OWNERS_SLUG = "users";
export const CUSTOMERS_SLUG = "customers";

export function isOwnerRequest(req: PayloadRequest): boolean {
  return req.user?.collection === OWNERS_SLUG;
}

/** Solo los dueños. */
export const isOwner: Access = ({ req }) => isOwnerRequest(req);

/** Cualquiera puede leer (fotos y productos que se muestran en el sitio). */
export const isPublic: Access = () => true;

/** Los dueños ven todo; un cliente, solo su propia cuenta. */
export const isOwnerOrSelf: Access = ({ req }) => {
  if (isOwnerRequest(req)) return true;
  if (req.user?.collection === CUSTOMERS_SLUG) return { id: { equals: req.user.id } };
  return false;
};

/** Los dueños ven todos los pedidos; un cliente, solo los suyos. */
export const isOwnerOrOrderCustomer: Access = ({ req }) => {
  if (isOwnerRequest(req)) return true;
  if (req.user?.collection === CUSTOMERS_SLUG) return { customer: { equals: req.user.id } };
  return false;
};
