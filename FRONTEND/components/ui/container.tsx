import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

// Ancho máximo y márgenes laterales comunes a todas las secciones.
export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-6 md:px-12", className)}>
      {children}
    </div>
  );
}
