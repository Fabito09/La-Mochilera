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
      {/* Las columnas se reparten solas según cuántas categorías haya. */}
      <div className="mx-auto flex max-w-7xl gap-10 px-12 py-10">
        {categories.map((category) => (
          <div key={category.href} className="min-w-0 flex-1">
            <Link
              href={category.href}
              onClick={onNavigate}
              className="font-display text-2xl hover:underline underline-offset-4"
            >
              {category.label}
            </Link>
            {category.subcategories.length > 0 && (
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
            )}
          </div>
        ))}

        <Link
          href={featuredProduct.href}
          onClick={onNavigate}
          className="group block w-[30%] shrink-0"
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
