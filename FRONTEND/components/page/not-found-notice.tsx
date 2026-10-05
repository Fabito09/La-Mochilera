import { NoticePage } from "@/components/page/notice-page";
import { shopLink } from "@/content/navegacion";
import { notFoundPage } from "@/content/paginas/utilitarias";

export function NotFoundNotice() {
  return (
    <NoticePage
      eyebrow={notFoundPage.eyebrow}
      title={notFoundPage.title}
      intro={notFoundPage.intro}
      primaryAction={{ label: "Volver al inicio", href: "/" }}
      secondaryAction={{ label: "Ver la colección", href: shopLink.href }}
    />
  );
}
