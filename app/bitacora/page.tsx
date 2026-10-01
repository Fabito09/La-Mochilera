import type { Metadata } from "next";
import { NewsletterSignup } from "@/components/home/newsletter-signup";
import { ArticleCard } from "@/components/page/article-card";
import { PageHeader } from "@/components/page/page-header";
import { Container } from "@/components/ui/container";
import { journalArticles, journalPage } from "@/content/bitacora";
import { pageMetadata } from "@/lib/page-content";

export const metadata: Metadata = pageMetadata(journalPage);

export default function JournalPage() {
  const articlesNewestFirst = [...journalArticles].sort((a, b) =>
    b.publishedOn.localeCompare(a.publishedOn),
  );

  return (
    <main>
      <PageHeader
        breadcrumbs={[{ label: journalPage.eyebrow, href: "/bitacora" }]}
        eyebrow={journalPage.eyebrow}
        title={journalPage.title}
        intro={journalPage.intro}
      />
      <Container className="pb-24">
        <h2 className="sr-only">Artículos</h2>
        <ul className="grid gap-x-6 gap-y-14 md:grid-cols-3">
          {articlesNewestFirst.map((article) => (
            <li key={article.slug}>
              <ArticleCard article={article} />
            </li>
          ))}
        </ul>
      </Container>
      <NewsletterSignup />
    </main>
  );
}
