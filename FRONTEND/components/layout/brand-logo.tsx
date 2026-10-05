import Link from "next/link";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
}

// Logo horizontal oficial (isotipo + "La Mochilera · Casa de Cuero").
// Toma el color del texto que lo rodea (ver .logo-mask en globals.css).
export function BrandLogo({ className }: BrandLogoProps) {
  return (
    <Link
      href="/"
      aria-label="La Mochilera, Casa de Cuero — inicio"
      className={cn(
        "block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-4 focus-visible:ring-offset-transparent",
        className,
      )}
    >
      <span aria-hidden="true" className="logo-mask logo-horizontal block h-7 min-[360px]:h-8 sm:h-9" />
    </Link>
  );
}
