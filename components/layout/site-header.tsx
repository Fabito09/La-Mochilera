"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { m } from "framer-motion";
import { BrandLogo } from "@/components/layout/brand-logo";
import { DesktopNavigation } from "@/components/layout/desktop-navigation";
import { HeaderActions } from "@/components/layout/header-actions";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { Button } from "@/components/ui/button";
import { useHasScrolled } from "@/hooks/use-has-scrolled";
import { headerCallToAction } from "@/content/navegacion";
import { cn } from "@/lib/utils";

// Páginas que empiezan con un hero de foto o video: ahí el header arranca
// transparente sobre la imagen y se vuelve sólido al hacer scroll.
const ROUTES_WITH_MEDIA_HERO = ["/"];

interface SiteHeaderProps {
  cartItemCount?: number;
}

export function SiteHeader({ cartItemCount = 0 }: SiteHeaderProps) {
  const pathname = usePathname();
  const overlaysMedia = ROUTES_WITH_MEDIA_HERO.includes(pathname);
  const hasScrolled = useHasScrolled();
  const [isShopMenuOpen, setIsShopMenuOpen] = useState(false);
  const isSolid = !overlaysMedia || hasScrolled || isShopMenuOpen;

  return (
    <m.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        "sticky top-0 z-40 h-(--header-height) w-full transition-colors duration-300",
        overlaysMedia && "-mb-(--header-height)",
        isSolid
          ? "border-b bg-background text-foreground"
          : "border-b border-transparent bg-transparent text-on-media",
      )}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-6 px-6 md:px-12">
        <div className="flex items-center gap-2">
          <MobileMenu />
          <BrandLogo />
        </div>

        <DesktopNavigation
          isShopMenuOpen={isShopMenuOpen}
          onShopMenuOpenChange={setIsShopMenuOpen}
        />

        <div className="flex items-center gap-3">
          <HeaderActions cartItemCount={cartItemCount} />
          <Button
            asChild
            variant={isSolid ? "default" : "glass"}
            className="hidden xl:inline-flex"
          >
            <Link href={headerCallToAction.href}>{headerCallToAction.label}</Link>
          </Button>
        </div>
      </div>
    </m.header>
  );
}
