import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
  title: string;
  isOpenByDefault?: boolean;
  /** Tamaño del título: "lg" en fichas, "md" en listas largas como las FAQ. */
  titleSize?: "md" | "lg";
  children: React.ReactNode;
}

// <details> nativo: accesible con teclado y lector de pantalla sin JavaScript.
export function AccordionItem({
  title,
  isOpenByDefault = false,
  titleSize = "lg",
  children,
}: AccordionItemProps) {
  return (
    <details open={isOpenByDefault} className="group border-b">
      <summary
        className={cn(
          "flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-display focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden",
          titleSize === "lg" ? "text-2xl" : "text-xl md:text-2xl",
        )}
      >
        {title}
        <ChevronDown
          aria-hidden="true"
          className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180"
        />
      </summary>
      <div className="pb-6">{children}</div>
    </details>
  );
}
