import Image from "next/image";
import Link from "next/link";
import { articleHref, type JournalArticle } from "@/content/bitacora";

interface ArticleCardProps {
  article: JournalArticle;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link href={articleHref(article)} className="group block focus-visible:outline-none">
      <div className="relative aspect-4/3 overflow-hidden rounded-sm bg-muted ring-offset-4 ring-offset-background group-focus-visible:ring-2 group-focus-visible:ring-ring">
        <Image
          src={article.image.src}
          alt={article.image.alt}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <p className="mt-5 text-xs font-medium uppercase tracking-[0.3em] text-secondary">
        {article.category}
      </p>
      <h3 className="mt-2 font-display text-2xl leading-tight group-hover:underline group-hover:underline-offset-4">
        {article.title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{article.excerpt}</p>
    </Link>
  );
}
