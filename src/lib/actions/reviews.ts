"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function saveReview(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id")?.toString();

  const payload = {
    author_name: formData.get("author_name")?.toString() ?? "",
    rating: Number(formData.get("rating") ?? 5),
    content: formData.get("content")?.toString() ?? "",
    is_published: formData.get("is_published") === "on",
  };

  if (id) {
    await supabase.from("reviews").update(payload).eq("id", id);
  } else {
    await supabase.from("reviews").insert(payload);
  }

  revalidatePath("/admin/reviews");
  revalidatePath("/");
}

export async function deleteReview(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id")?.toString();
  if (!id) return;
  await supabase.from("reviews").delete().eq("id", id);
  revalidatePath("/admin/reviews");
  revalidatePath("/");
}

export async function toggleReviewPublish(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id")?.toString();
  const current = formData.get("current") === "true";
  if (!id) return;
  await supabase.from("reviews").update({ is_published: !current }).eq("id", id);
  revalidatePath("/admin/reviews");
  revalidatePath("/");
}
