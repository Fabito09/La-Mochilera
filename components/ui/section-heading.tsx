import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** "dark" cuando la sección va sobre fondo verde bosque. */
  tone?: "light" | "dark";
  className?: string;
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  className,
}: SectionHeadingProps) {
  const isDark = tone === "dark";

  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <p
        className={cn(
          "text-xs font-medium uppercase tracking-[0.3em]",
          isDark ? "text-forest-foreground/75" : "text-secondary",
        )}
      >
        {eyebrow}
      </p>
      <h2
        id={id}
        className="mt-3 text-balance font-display text-4xl leading-tight md:text-5xl"
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-pretty text-base leading-7 md:text-lg",
            isDark ? "text-forest-foreground/85" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
