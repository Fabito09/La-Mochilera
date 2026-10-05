"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export interface AdminNavLink {
  href: string;
  label: string;
}

interface AdminTopNavLinksProps {
  homeHref: string;
  links: AdminNavLink[];
  logoutHref: string;
}

// Parte interactiva de la barra superior: marca la sección donde se está.
export function AdminTopNavLinks({ homeHref, links, logoutHref }: AdminTopNavLinksProps) {
  const pathname = usePathname();

  return (
    <header className="admin-top-nav">
      <Link href={homeHref} className="admin-top-nav__brand" aria-label="Inicio del panel">
        <span aria-hidden="true" className="admin-icon" />
        <span className="admin-top-nav__title">Panel</span>
      </Link>

      <nav aria-label="Secciones del panel" className="admin-top-nav__links">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            aria-current={pathname.startsWith(link.href) ? "page" : undefined}
            className="admin-top-nav__link"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="admin-top-nav__actions">
        <a href="/" target="_blank" rel="noopener noreferrer" className="admin-top-nav__link">
          Ver tienda ↗
        </a>
        <Link href={logoutHref} className="admin-top-nav__link">
          Cerrar sesión
        </Link>
      </div>
    </header>
  );
}
