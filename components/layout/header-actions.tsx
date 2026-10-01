import Link from "next/link";
import { Search, ShoppingBag, User } from "lucide-react";
import { accountLinks } from "@/content/navegacion";
import { cn } from "@/lib/utils";

interface HeaderActionsProps {
  cartItemCount: number;
  className?: string;
}

const iconLinkClassName =
  "relative inline-flex h-10 w-10 items-center justify-center rounded-md transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current";

export function HeaderActions({ cartItemCount, className }: HeaderActionsProps) {
  const cartLabel =
    cartItemCount > 0
      ? `${accountLinks.cart.label} (${cartItemCount} artículos)`
      : accountLinks.cart.label;

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <Link
        href={accountLinks.search.href}
        aria-label={accountLinks.search.label}
        className={iconLinkClassName}
      >
        <Search className="h-5 w-5" aria-hidden="true" />
      </Link>
      <Link
        href={accountLinks.account.href}
        aria-label={accountLinks.account.label}
        className={cn(iconLinkClassName, "hidden lg:inline-flex")}
      >
        <User className="h-5 w-5" aria-hidden="true" />
      </Link>
      <Link
        href={accountLinks.cart.href}
        aria-label={cartLabel}
        className={iconLinkClassName}
      >
        <ShoppingBag className="h-5 w-5" aria-hidden="true" />
        {cartItemCount > 0 && (
          <span
            aria-hidden="true"
            className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[0.625rem] font-semibold text-primary-foreground"
          >
            {cartItemCount}
          </span>
        )}
      </Link>
    </div>
  );
}
