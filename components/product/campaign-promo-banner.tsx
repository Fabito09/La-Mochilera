import Link from "next/link";
import { Button } from "@/components/ui/button";
import { campaignPromoBanner } from "@/content/tienda";

// Banner que se intercala en las grillas de productos (inspiración Red Wing).
export function CampaignPromoBanner() {
  return (
    <div className="flex h-full min-h-72 flex-col justify-between rounded-sm bg-forest p-8 text-forest-foreground">
      <span aria-hidden="true" className="logo-mask logo-isotipo block h-10 text-highlight" />
      <div>
        <p className="font-display text-4xl leading-tight">{campaignPromoBanner.title}</p>
        <p className="mt-3 text-sm leading-6 text-forest-foreground/85">
          {campaignPromoBanner.description}
        </p>
        <Button asChild variant="secondary" className="mt-6">
          <Link href={campaignPromoBanner.ctaHref}>{campaignPromoBanner.ctaLabel}</Link>
        </Button>
      </div>
    </div>
  );
}
