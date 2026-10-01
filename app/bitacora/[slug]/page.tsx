import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/page/article-card";
import { ContentSections } from "@/components/page/content-sections";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/ui/json-ld";
import { SectionHeading } from "@/components/ui/section-heading";
import { articleHref, findArticleBySlug, journalArticles, journalPage } from "@/content/bitacora";
import { absoluteUrl, brandInfo } from "@/content/marca";
import { formatLongDate } from "@/lib/format-date";

export const dynamicParams = false;

export function generateStaticParams() {
  return journalArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps<"/bitacora/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = findArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: { type: "article", images: [{ url: article.image.src, alt: article.image.alt }] },
  };
}

export default async function ArticlePage({ params }: PageProps<"/bitacora/[slug]">) {
  const { slug } = await params;
  const article = findArticleBySlug(slug);
  if (!article) notFound();

  const otherArticles = journalArticles.filter((candidate) => candidate.slug !== article.slug);

  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedOn,
    image: absoluteUrl(article.image.src),
    url: absoluteUrl(articleHref(article)),
    author: { "@type": "Organization", name: brandInfo.name },
    publisher: { "@type": "Organization", name: brandInfo.name, logo: absoluteUrl("/icon.png") },
  };

  return (
    <main className="pt-10">
      <JsonLd data={articleStructuredData} />
      <article>
        <Container>
          <Breadcrumbs
            items={[
              { label: journalPage.eyebrow, href: "/bitacora" },
              { label: article.title, href: articleHref(article) },
            ]}
          />
          <header className="mx-auto mt-12 max-w-3xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-secondary">
              {article.category} ·{" "}
              <time dateTime={article.publishedOn}>{formatLongDate(article.publishedOn)}</time>
            </p>
            <h1 className="mt-4 text-balance font-display text-5xl leading-none md:text-7xl">
              {article.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">{article.excerpt}</p>
          </header>
          <div className="relative mx-auto mt-12 aspect-video max-w-5xl overflow-hidden rounded-sm bg-muted">
            <Image
              src={article.image.src}
              alt={article.image.alt}
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1024px) 64rem, 100vw"
              className="object-cover"
            />
          </div>
          <div className="mx-auto max-w-3xl py-16 md:py-24">
            <ContentSections sections={article.sections} />
          </div>
        </Container>
      </article>

      {otherArticles.length > 0 && (
        <section aria-labelledby="mas-articulos-titulo" className="bg-muted py-20">
          <Container>
            <SectionHeading id="mas-articulos-titulo" eyebrow={journalPage.eyebrow} title="Siga leyendo" />
            <ul className="mt-10 grid gap-10 md:grid-cols-3 md:gap-6">
              {otherArticles.map((other) => (
                <li key={other.slug}>
                  <ArticleCard article={other} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
    </main>
  );
}
