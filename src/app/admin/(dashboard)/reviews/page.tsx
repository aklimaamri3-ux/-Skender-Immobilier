import { getAllReviewsAdmin } from "@/lib/data/admin";
import { saveReview, deleteReview, toggleReviewPublish } from "@/lib/actions/reviews";

export default async function AdminReviewsPage() {
  const reviews = await getAllReviewsAdmin();

  return (
    <div>
      <h1 className="mb-8 font-display text-3xl font-bold">Avis clients</h1>

      <div className="mb-10 card-premium p-6">
        <h2 className="mb-4 font-display text-lg font-semibold">Ajouter un avis</h2>
        <form action={saveReview} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="text-sm">
            <span className="mb-1 block text-blanc/70">Nom du client *</span>
            <input required name="author_name" className="input" />
          </label>
          <label className="text-sm">
            <span className="mb-1 block text-blanc/70">Note (1 à 5) *</span>
            <input required type="number" min={1} max={5} name="rating" defaultValue={5} className="input" />
          </label>
          <label className="text-sm sm:col-span-2">
            <span className="mb-1 block text-blanc/70">Avis *</span>
            <textarea required name="content" rows={3} className="input" />
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="is_published" defaultChecked />
            Publier immédiatement
          </label>
          <div className="sm:col-span-2">
            <button type="submit" className="btn-gold">
              Ajouter l&apos;avis
            </button>
          </div>
        </form>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="card-premium flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold text-blanc">
                {review.author_name} — {review.rating}/5
              </p>
              <p className="mt-1 max-w-xl text-sm text-blanc/65">{review.content}</p>
            </div>
            <div className="flex shrink-0 gap-3">
              <form action={toggleReviewPublish}>
                <input type="hidden" name="id" value={review.id} />
                <input type="hidden" name="current" value={String(review.is_published)} />
                <button
                  type="submit"
                  className={`rounded-full px-3 py-1 text-xs ${
                    review.is_published
                      ? "bg-emerald-500/15 text-emerald-400"
                      : "bg-blanc/10 text-blanc/50"
                  }`}
                >
                  {review.is_published ? "Publié" : "Masqué"}
                </button>
              </form>
              <form action={deleteReview}>
                <input type="hidden" name="id" value={review.id} />
                <button type="submit" className="text-sm text-red-400 hover:underline">
                  Supprimer
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
