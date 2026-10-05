import { FileClock } from "lucide-react";

// Aviso visible en políticas y textos legales que el cliente aún no confirmó.
// Se apaga con `isDraft: false` en el archivo de contenido de la página.
export function DraftNotice() {
  return (
    <p
      role="note"
      className="mb-12 flex max-w-3xl items-start gap-3 rounded-sm border border-dashed border-highlight bg-muted p-4 text-sm leading-6 text-muted-foreground"
    >
      <FileClock aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
      Borrador: este contenido está pendiente de confirmación por La Mochilera y puede
      cambiar. Ante cualquier duda, escríbanos por WhatsApp.
    </p>
  );
}
