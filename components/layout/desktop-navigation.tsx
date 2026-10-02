"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { MegaMenuPanel } from "@/components/layout/mega-menu-panel";
import {
  featuredProduct,
  homeLink,
  mainLinks,
  shopCategories,
  shopLink,
} from "@/content/navegacion";
import { cn } from "@/lib/utils";

const MEGA_MENU_ID = "mega-menu-tienda";

const navItemClassName =
  "rounded-sm py-2 text-sm font-medium tracking-wide opacity-85 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-4 focus-visible:ring-offset-transparent";

interface DesktopNavigationProps {
  isShopMenuOpen: boolean;
  onShopMenuOpenChange: (isOpen: boolean) => void;
}

export function DesktopNavigation({
  isShopMenuOpen,
  onShopMenuOpenChange,
}: DesktopNavigationProps) {
  const shopTriggerRef = useRef<HTMLButtonElement>(null);
  const closeShopMenu = () => onShopMenuOpenChange(false);

  useEffect(() => {
    if (!isShopMenuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      onShopMenuOpenChange(false);
      shopTriggerRef.current?.focus();
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isShopMenuOpen, onShopMenuOpenChange]);

  const closeWhenFocusLeaves = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) closeShopMenu();
  };

  const pathname = usePathname();
  const currentPageMark = (href: string) => (pathname === href ? "page" : undefined);

  return (
    <nav aria-label="Principal" className="hidden h-full items-center gap-8 lg:flex">
      <Link href={homeLink.href} aria-current={currentPageMark(homeLink.href)} className={navItemClassName}>
        {homeLink.label}
      </Link>

      {/* El contenedor ocupa todo el alto del header para que el cursor
          pueda bajar del botón al panel sin que el menú se cierre. */}
      <div
        className="flex h-full items-center"
        onMouseEnter={() => onShopMenuOpenChange(true)}
        onMouseLeave={closeShopMenu}
        onBlur={closeWhenFocusLeaves}
      >
        <button
          ref={shopTriggerRef}
          type="button"
          aria-expanded={isShopMenuOpen}
          aria-controls={MEGA_MENU_ID}
          onClick={() => onShopMenuOpenChange(!isShopMenuOpen)}
          className={cn(navItemClassName, "inline-flex items-center gap-1")}
        >
          {shopLink.label}
          <ChevronDown
            aria-hidden="true"
            className={cn("h-4 w-4 transition-transform", isShopMenuOpen && "rotate-180")}
          />
        </button>
        {isShopMenuOpen && (
          <MegaMenuPanel
            id={MEGA_MENU_ID}
            shopLink={shopLink}
            categories={shopCategories}
            featuredProduct={featuredProduct}
            onNavigate={closeShopMenu}
          />
        )}
      </div>

      {mainLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          aria-current={currentPageMark(link.href)}
          className={navItemClassName}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
