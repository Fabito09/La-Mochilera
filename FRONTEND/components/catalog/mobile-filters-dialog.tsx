"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileFiltersDialogProps {
  activeFilterCount: number;
  resultCount: number;
  children: React.ReactNode;
}

// Panel lateral con los filtros en móvil y tablet.
export function MobileFiltersDialog({
  activeFilterCount,
  resultCount,
  children,
}: MobileFiltersDialogProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="outline" className="border-foreground bg-transparent lg:hidden">
          <SlidersHorizontal className="mr-2 h-4 w-4" aria-hidden="true" />
          Filtros{activeFilterCount > 0 && ` (${activeFilterCount})`}
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-overlay/60" />
        <Dialog.Content className="fixed inset-y-0 left-0 z-50 flex w-full max-w-sm flex-col bg-background text-foreground shadow-xl">
          <div className="flex h-(--header-height) shrink-0 items-center justify-between border-b px-6">
            <Dialog.Title className="font-display text-2xl">Filtros</Dialog.Title>
            <Dialog.Close
              aria-label="Cerrar filtros"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </Dialog.Close>
          </div>
          <Dialog.Description className="sr-only">
            Filtre los productos por altura de caña, cuero, color, talla y precio.
          </Dialog.Description>
          <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>
          <div className="border-t p-6">
            <Dialog.Close asChild>
              <Button size="lg" className="w-full">
                Ver {resultCount} {resultCount === 1 ? "producto" : "productos"}
              </Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
