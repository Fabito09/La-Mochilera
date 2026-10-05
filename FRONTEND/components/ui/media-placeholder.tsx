import { cn } from "@/lib/utils";

interface MediaPlaceholderProps {
  /** Qué material de marca falta, p. ej. "Video del hero". */
  label: string;
  className?: string;
}

/**
 * Hueco rotulado para foto o video de marca que todavía no llegó.
 * Nunca se reemplaza por material de stock.
 */
export function MediaPlaceholder({ label, className }: MediaPlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={`Pendiente: ${label}`}
      className={cn(
        "flex items-center justify-center border border-dashed border-muted-foreground/40 bg-muted p-4 text-center text-xs font-medium uppercase tracking-widest text-muted-foreground",
        className,
      )}
    >
      [{label} — pendiente de material de marca]
    </div>
  );
}
