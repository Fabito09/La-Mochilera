import type { Access } from "payload";

/** Solo quien inició sesión en el panel, es decir, los dueños. */
export const isOwner: Access = ({ req }) => Boolean(req.user);

/** Cualquiera puede leer (fotos y productos que se muestran en el sitio). */
export const isPublic: Access = () => true;
