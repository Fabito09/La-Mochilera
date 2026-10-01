import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export interface NoticeAction {
  label: string;
  href: string;
  /** true = enlace externo (se abre en otra pestaña), p. ej. WhatsApp. */
  isExternal?: boolean;
}

interface NoticePageProps {
  eyebrow: string;
  title: string;
  intro: string;
  primaryAction: NoticeAction;
  secondaryAction?: NoticeAction;
}

// Recibe y reenvía las clases del Button (asChild) para que el enlace tome su estilo.
function ActionLink({
  action,
  ...anchorProps
}: { action: NoticeAction } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return action.isExternal ? (
    <a {...anchorProps} href={action.href} target="_blank" rel="noopener noreferrer">
      {action.label}
    </a>
  ) : (
    <Link {...anchorProps} href={action.href}>
      {action.label}
    </Link>
  );
}

// Página breve centrada con un mensaje y uno o dos botones (carrito, cuenta, 404).
export function NoticePage({ eyebrow, title, intro, primaryAction, secondaryAction }: NoticePageProps) {
  return (
    <main>
      <Container className="flex min-h-[60svh] flex-col items-center justify-center py-24 text-center">
        <span aria-hidden="true" className="logo-mask logo-isotipo block h-12 text-highlight" />
        <p className="mt-8 text-xs font-medium uppercase tracking-[0.3em] text-secondary">{eyebrow}</p>
        <h1 className="mt-3 max-w-2xl text-balance font-display text-5xl leading-none md:text-6xl">
          {title}
        </h1>
        <p className="mt-6 max-w-xl text-pretty text-lg leading-8 text-muted-foreground">{intro}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <ActionLink action={primaryAction} />
          </Button>
          {secondaryAction && (
            <Button asChild size="lg" variant="outline" className="border-foreground bg-transparent">
              <ActionLink action={secondaryAction} />
            </Button>
          )}
        </div>
      </Container>
    </main>
  );
}
