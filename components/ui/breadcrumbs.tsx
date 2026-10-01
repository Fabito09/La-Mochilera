import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/ui/json-ld";
import { absoluteUrl } from "@/content/marca";
import type { NavLink } from "@/content/navegacion";

interface BreadcrumbsProps {
  /** El último elemento es la página actual. */
  items: NavLink[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const trail = [{ label: "Inicio", href: "/" }, ...items];

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.href),
    })),
  };

  return (
    <nav aria-label="Ruta de navegación">
      <JsonLd data={breadcrumbStructuredData} />
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        {trail.map((item, index) => {
          const isCurrentPage = index === trail.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1.5">
              {isCurrentPage ? (
                <span aria-current="page" className="text-foreground">
                  {item.label}
                </span>
              ) : (
                <>
                  <Link href={item.href} className="hover:text-foreground hover:underline">
                    {item.label}
                  </Link>
                  <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
