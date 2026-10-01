import { ContentSections } from "@/components/page/content-sections";
import { DraftNotice } from "@/components/page/draft-notice";
import { PageHeader } from "@/components/page/page-header";
import { WhatsAppCta } from "@/components/page/whatsapp-cta";
import { Container } from "@/components/ui/container";
import type { NavLink } from "@/content/navegacion";
import type { InfoPageContent } from "@/lib/page-content";

interface InfoPageProps {
  content: InfoPageContent;
  breadcrumbs: NavLink[];
  /** Mensaje ya escrito en el botón de WhatsApp del final. */
  whatsappMessage?: string;
  /** Contenido extra entre el texto y el cierre (tablas, formularios…). */
  children?: React.ReactNode;
}

// Plantilla de las páginas de texto: encabezado, secciones y cierre.
export function InfoPage({ content, breadcrumbs, whatsappMessage, children }: InfoPageProps) {
  return (
    <main>
      <PageHeader
        breadcrumbs={breadcrumbs}
        eyebrow={content.eyebrow}
        title={content.title}
        intro={content.intro}
        image={content.image}
      />
      <Container className="pb-24">
        {content.isDraft && <DraftNotice />}
        {children}
        <ContentSections sections={content.sections} />
      </Container>
      <WhatsAppCta message={whatsappMessage} />
    </main>
  );
}
