import { Star } from "lucide-react";
import type { Review } from "@/types/database";

export function ReviewsSection({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) return null;

  return (
    <section className="py-20">
      <div className="section-container">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-or-clair">
          Avis clients
        </p>
        <h2 className="mb-12 font-display text-3xl font-bold sm:text-4xl">
          Ils nous font confiance
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <div key={review.id} className="card-premium p-6">
              <div className="mb-3 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < review.rating
                        ? "fill-or text-or"
                        : "text-blanc/20"
                    }
                  />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-blanc/75">
                &ldquo;{review.content}&rdquo;
              </p>
              <p className="mt-4 text-sm font-semibold text-or-clair">
                {review.author_name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
