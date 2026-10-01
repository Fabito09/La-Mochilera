import { Star } from "lucide-react";
import { Container } from "@/components/ui/container";
import { productReviews, type Review } from "@/content/ficha-producto";
import type { Product } from "@/lib/catalog";

interface ProductReviewsProps {
  product: Product;
}

const MAX_RATING = 5;

function StarRating({ rating }: { rating: Review["rating"] }) {
  return (
    <p className="flex gap-0.5" aria-label={`${rating} de ${MAX_RATING} estrellas`}>
      {Array.from({ length: MAX_RATING }, (_, index) => (
        <Star
          key={index}
          aria-hidden="true"
          className={index < rating ? "h-4 w-4 fill-highlight text-highlight" : "h-4 w-4 text-border"}
        />
      ))}
    </p>
  );
}

export function ProductReviews({ product }: ProductReviewsProps) {
  const reviews = productReviews[product.code] ?? [];

  return (
    <section aria-labelledby="resenas-titulo" className="border-t py-20">
      <Container>
        <h2 id="resenas-titulo" className="font-display text-4xl">
          Reseñas
        </h2>
        {reviews.length === 0 ? (
          <p className="mt-4 text-muted-foreground">
            Todavía no hay reseñas de este modelo. Si ya tiene el suyo, cuéntenos cómo le va.
          </p>
        ) : (
          <ul className="mt-8 grid gap-8 md:grid-cols-2">
            {reviews.map((review) => (
              <li key={`${review.author}-${review.date}`} className="rounded-sm bg-muted p-6">
                <StarRating rating={review.rating} />
                <p className="mt-3 leading-7">{review.text}</p>
                <p className="mt-3 text-sm text-muted-foreground">
                  {review.author} · <time dateTime={review.date}>{review.date}</time>
                </p>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}
