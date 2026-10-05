import type { ProductBadge } from "@/lib/catalog";
import { cn } from "@/lib/utils";

interface ProductBadgesProps {
  badges: ProductBadge[];
  className?: string;
}

export function ProductBadges({ badges, className }: ProductBadgesProps) {
  if (badges.length === 0) return null;

  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)}>
      {badges.map((badge) => (
        <li
          key={badge}
          className="rounded-sm border border-border bg-background/90 px-2 py-1 text-xs font-medium uppercase tracking-wider text-foreground"
        >
          {badge}
        </li>
      ))}
    </ul>
  );
}
