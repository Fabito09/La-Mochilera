"use client";

import { useState } from "react";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { BrandLogo } from "@/components/layout/brand-logo";
import {
  accountLinks,
  homeLink,
  mainLinks,
  shopCategories,
  shopLink,
} from "@/content/navegacion";

const menuLinkClassName =
  "block py-2 font-display text-3xl focus-visible:outline-none focus-visible:underline";

/**
 * Menú a pantalla completa para móvil y tablet. Radix Dialog aporta el
 * encierro del foco, el cierre con Escape y el bloqueo del scroll de fondo.
 */
export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger
        aria-label="Abrir menú"
        className="inline-flex h-10 w-10 items-center justify-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current lg:hidden"
      >
        <Menu className="h-6 w-6" aria-hidden="true" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Content className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-background text-foreground">
          <div className="flex h-(--header-height) shrink-0 items-center justify-between border-b px-6">
            <BrandLogo />
            <Dialog.Close
              aria-label="Cerrar menú"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </Dialog.Close>
          </div>
          <Dialog.Title className="sr-only">Menú principal</Dialog.Title>
          <Dialog.Description className="sr-only">
            Categorías de la tienda y secciones del sitio
          </Dialog.Description>

          <nav aria-label="Menú móvil" className="flex-1 px-6 py-8">
            <Link href={homeLink.href} onClick={closeMenu} className={menuLinkClassName}>
              {homeLink.label}
            </Link>
            <Link href={shopLink.href} onClick={closeMenu} className={menuLinkClassName}>
              {shopLink.label}
            </Link>
            <ul className="mb-6 mt-1 space-y-1 border-l pl-4">
              {shopCategories.map((category) => (
                <li key={category.href}>
                  <Link
                    href={category.href}
                    onClick={closeMenu}
                    className="block py-1.5 text-base text-muted-foreground hover:text-foreground"
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="space-y-1">
              {mainLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} onClick={closeMenu} className={menuLinkClassName}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="border-t px-6 py-6 text-sm font-medium">
            <Link
              href={accountLinks.cart.href}
              onClick={closeMenu}
              className="block rounded-md bg-primary py-3 text-center text-primary-foreground"
            >
              {accountLinks.cart.label}
            </Link>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
