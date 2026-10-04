import type { Payload } from "payload";
import { AdminTopNavLinks, type AdminNavLink } from "@/cms/components/admin-top-nav-links";

interface AdminTopNavProps {
  payload: Payload;
  /** Secciones que el dueño con sesión iniciada puede ver (las da Payload). */
  visibleEntities?: { collections: string[] };
}

function pluralLabel(labels: unknown, fallback: string): string {
  return typeof labels === "string" ? labels : fallback;
}

/**
 * Barra superior del panel: reemplaza al menú lateral desplegable de Payload.
 * Las secciones salen de las colecciones, así que una nueva aparece sola.
 */
export function AdminTopNav({ payload, visibleEntities }: AdminTopNavProps) {
  const adminRoute = payload.config.routes.admin;
  const links: AdminNavLink[] = payload.config.collections
    .filter((collection) => visibleEntities?.collections.includes(collection.slug))
    .map((collection) => ({
      href: `${adminRoute}/collections/${collection.slug}`,
      label: pluralLabel(collection.labels?.plural, collection.slug),
    }));

  return <AdminTopNavLinks homeHref={adminRoute} links={links} logoutHref={`${adminRoute}/logout`} />;
}

/** Ocupa el lugar del menú lateral de Payload para que no se muestre. */
export function HiddenSideNav() {
  return null;
}
