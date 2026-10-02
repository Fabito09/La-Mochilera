"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Ruler, X } from "lucide-react";
import { SizeGuideContent } from "@/components/product/size-guide-content";
import { sizeGuideNotice } from "@/content/tallas";

export function SizeGuideDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="inline-flex items-center gap-1.5 py-1 text-sm underline underline-offset-4 hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <Ruler className="h-4 w-4" aria-hidden="true" />
        Guía de tallas
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-overlay/60" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[90svh] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-sm bg-background p-6 text-foreground shadow-xl md:p-8">
          <div className="flex items-start justify-between gap-4">
            <Dialog.Title className="font-display text-3xl">Guía de tallas</Dialog.Title>
            <Dialog.Close
              aria-label="Cerrar guía de tallas"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </Dialog.Close>
          </div>
          <Dialog.Description className="mt-3 text-sm leading-6 text-muted-foreground">
            {sizeGuideNotice}
          </Dialog.Description>

          <div className="mt-6">
            <SizeGuideContent />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
