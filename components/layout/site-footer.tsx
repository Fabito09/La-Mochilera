"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/layout/brand-logo";
import { Container } from "@/components/ui/container";
import { InstagramIcon } from "@/components/ui/instagram-icon";
import { brandInfo } from "@/content/marca";
import {
  helpLinks,
  legalLinks,
  mainLinks,
  shopCategories,
  type NavLink,
} from "@/content/navegacion";

const shopFooterLinks: NavLink[] = shopCategories.map(({ label, href }) => ({ label, href }));

const footerLinkGroups = [
  { title: "Tienda", links: shopFooterLinks },
  { title: "Ayuda", links: helpLinks },
  { title: "La Mochilera", links: mainLinks },
];

// En el inicio el pie es mínimo (logo y frase): el bloque "Contáctenos" que
// está justo arriba ya muestra los datos de contacto.
const ROUTES_WITH_COMPACT_FOOTER = ["/"];

const FOOTER_TAGLINE = "Botas de cuero vacuno, diseñadas para los que llevan la montaña en cada paso.";

const footerLinkClassName =
  "text-sm text-forest-foreground/80 transition-colors hover:text-forest-foreground";

export function SiteFooter() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  if (ROUTES_WITH_COMPACT_FOOTER.includes(pathname)) {
    return (
      <footer className="border-t border-forest-foreground/15 bg-forest py-16 text-forest-foreground">
        <Container className="flex flex-col items-center text-center">
          <BrandLogo />
          <p className="mt-6 max-w-xs text-sm leading-6 text-forest-foreground/80">
            {FOOTER_TAGLINE}
          </p>
        </Container>
      </footer>
    );
  }

  return (
    <footer className="border-t border-forest-foreground/15 bg-forest pb-10 pt-20 text-forest-foreground">
      <Container>
        <div className="grid gap-12 border-b border-forest-foreground/15 pb-16 lg:grid-cols-[1.5fr_repeat(4,1fr)]">
          <div>
            <BrandLogo />
            <p className="mt-6 max-w-xs text-sm leading-6 text-forest-foreground/80">
              {FOOTER_TAGLINE}
            </p>
          </div>

          {footerLinkGroups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="font-display text-xl">{group.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={footerLinkClassName}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="font-display text-xl">Contacto</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-forest-foreground/80">
              <li>
                <a
                  href={brandInfo.whatsapp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={footerLinkClassName}
                >
                  WhatsApp {brandInfo.whatsapp.label}
                </a>
              </li>
              <li>{brandInfo.showroom.name}</li>
              <li>{brandInfo.showroom.schedule}</li>
              <li>{brandInfo.shipping}</li>
              <li>
                <a
                  href={brandInfo.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${footerLinkClassName} inline-flex items-center gap-2`}
                >
                  <InstagramIcon className="h-4 w-4" />@{brandInfo.instagram.handle}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-8 text-xs text-forest-foreground/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {currentYear} {brandInfo.name} · {brandInfo.tagline}. Todos los derechos
            reservados.
          </p>
          <ul className="flex gap-6">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-forest-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
