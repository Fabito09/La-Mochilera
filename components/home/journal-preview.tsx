import Link from "next/link";
import { ArticleCard } from "@/components/page/article-card";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import { journalArticles, journalPage } from "@/content/bitacora";

const PREVIEW_ARTICLE_COUNT = 3;

export function JournalPreview() {
  const latestArticles = [...journalArticles]
    .sort((a, b) => b.publishedOn.localeCompare(a.publishedOn))
    .slice(0, PREVIEW_ARTICLE_COUNT);

  return (
    <section aria-labelledby="bitacora-titulo" className="py-24 md:py-32">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading id="bitacora-titulo" eyebrow={journalPage.eyebrow} title={journalPage.title} />
          <Link href="/bitacora" className="text-sm font-medium underline underline-offset-4">
            Ver toda la bitácora
          </Link>
        </div>
        <ul className="mt-12 grid gap-10 md:grid-cols-3 md:gap-6">
          {latestArticles.map((article, index) => (
            <li key={article.slug}>
              <FadeIn delay={index * 0.1}>
                <ArticleCard article={article} />
              </FadeIn>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
