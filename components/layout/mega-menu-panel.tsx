import Image from "next/image";
import Link from "next/link";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";
import type { FeaturedProduct, NavLink, ShopCategory } from "@/content/navegacion";

interface MegaMenuPanelProps {
  id: string;
  shopLink: NavLink;
  categories: ShopCategory[];
  featuredProduct: FeaturedProduct;
  onNavigate: () => void;
}

export function MegaMenuPanel({
  id,
  shopLink,
  categories,
  featuredProduct,
  onNavigate,
}: MegaMenuPanelProps) {
  return (
    <div
      id={id}
      className="absolute inset-x-0 top-full border-b border-t bg-background text-foreground shadow-lg"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[repeat(4,minmax(0,1fr))_minmax(0,1.4fr)] gap-10 px-12 py-10">
        {categories.map((category) => (
          <div key={category.href}>
            <Link
              href={category.href}
              onClick={onNavigate}
              className="font-display text-2xl hover:underline underline-offset-4"
            >
              {category.label}
            </Link>
            <ul className="mt-4 space-y-2.5">
              {category.subcategories.map((subcategory) => (
                <li key={subcategory.href}>
                  <Link
                    href={subcategory.href}
                    onClick={onNavigate}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {subcategory.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <Link
          href={featuredProduct.href}
          onClick={onNavigate}
          className="group block"
        >
          <div className="relative aspect-4/3 overflow-hidden rounded-sm">
            {featuredProduct.imageUrl ? (
              <Image
                src={featuredProduct.imageUrl}
                alt={featuredProduct.imageAlt}
                fill
                sizes="30vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <MediaPlaceholder
                label="Foto del producto destacado"
                className="h-full w-full"
              />
            )}
          </div>
          <p className="mt-3 text-sm font-medium">{featuredProduct.label}</p>
        </Link>
      </div>
      <div className="border-t py-3 text-center">
        <Link
          href={shopLink.href}
          onClick={onNavigate}
          className="text-sm font-medium underline-offset-4 hover:underline"
        >
          Ver toda la colección
        </Link>
      </div>
    </div>
  );
}
