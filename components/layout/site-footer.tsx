import Link from "next/link";
import { BrandLogo } from "@/components/layout/brand-logo";
import { Container } from "@/components/ui/container";
import { helpLinks, legalLinks } from "@/content/navegacion";

const FOOTER_TAGLINE = "Botas de cuero vacuno, diseñadas para los que llevan la montaña en cada paso.";

// Pie mínimo en todas las páginas: logo, frase y una línea discreta con las
// páginas de ayuda y legales (que solo se enlazan desde acá).
const footerLinks = [...helpLinks, ...legalLinks];

export function SiteFooter() {
  return (
    <footer className="border-t border-forest-foreground/15 bg-forest py-16 text-forest-foreground">
      <Container className="flex flex-col items-center text-center">
        <BrandLogo />
        <p className="mt-6 max-w-xs text-sm leading-6 text-forest-foreground/80">
          {FOOTER_TAGLINE}
        </p>
        <nav aria-label="Ayuda y legales" className="mt-10">
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-1">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  // py-1 da un área táctil cómoda aunque el texto sea chico.
                  className="inline-block py-1 text-xs text-forest-foreground/75 transition-colors hover:text-forest-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </footer>
  );
}
