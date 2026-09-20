"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { prepareImage } from "@/lib/image";

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function saveProject(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id")?.toString();
  const name = formData.get("name")?.toString() ?? "";
  const slugInput = formData.get("slug")?.toString();

  const payload = {
    name,
    slug: slugInput ? slugify(slugInput) : slugify(name),
    location: formData.get("location")?.toString() ?? "",
    city: formData.get("city")?.toString() || null,
    description: formData.get("description")?.toString() || null,
    short_description: formData.get("short_description")?.toString() || null,
    status: (formData.get("status")?.toString() as string) || "en_cours",
    is_published: formData.get("is_published") === "on",
    is_featured: formData.get("is_featured") === "on",
    price_from: formData.get("price_from")
      ? Number(formData.get("price_from"))
      : null,
    delivery_date: formData.get("delivery_date")?.toString() || null,
    apartments_count: Number(formData.get("apartments_count") ?? 0),
    villas_count: Number(formData.get("villas_count") ?? 0),
    latitude: formData.get("latitude")
      ? Number(formData.get("latitude"))
      : null,
    longitude: formData.get("longitude")
      ? Number(formData.get("longitude"))
      : null,
    video_url: formData.get("video_url")?.toString() || null,
    nearby_points: formData.get("nearby_points")?.toString() || null,
    seo_title: formData.get("seo_title")?.toString() || null,
    seo_description: formData.get("seo_description")?.toString() || null,
  };

  const coverFile = formData.get("cover_image") as File | null;
  let coverUrl: string | undefined;
  if (coverFile && coverFile.size > 0) {
    const img = await prepareImage(coverFile);
    const path = `covers/${img.fileName}`;
    const { error: uploadError } = await supabase.storage
      .from("project-media")
      .upload(path, img.body, { contentType: img.contentType, upsert: true });
    if (!uploadError) {
      const { data } = supabase.storage.from("project-media").getPublicUrl(path);
      coverUrl = data.publicUrl;
    }
  }

  let projectId = id;

  if (id) {
    const { error } = await supabase
      .from("projects")
      .update({ ...payload, ...(coverUrl ? { cover_image_url: coverUrl } : {}) })
      .eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { data, error } = await supabase
      .from("projects")
      .insert({ ...payload, cover_image_url: coverUrl ?? null })
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    projectId = data.id;
  }

  const galleryFiles = formData.getAll("gallery_images") as File[];
  for (const file of galleryFiles) {
    if (!file || file.size === 0) continue;
    const img = await prepareImage(file);
    const path = `gallery/${projectId}/${img.fileName}`;
    const { error: uploadError } = await supabase.storage
      .from("project-media")
      .upload(path, img.body, { contentType: img.contentType });
    if (!uploadError) {
      const { data } = supabase.storage.from("project-media").getPublicUrl(path);
      await supabase.from("project_images").insert({
        project_id: projectId,
        url: data.publicUrl,
        kind: "photo",
      });
    }
  }

  revalidatePath("/admin/projects");
  revalidatePath("/projets");
  redirect("/admin/projects");
}

export async function deleteProject(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id")?.toString();
  if (!id) return;
  await supabase.from("projects").delete().eq("id", id);
  revalidatePath("/admin/projects");
  revalidatePath("/projets");
}

export async function togglePublishProject(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id")?.toString();
  const current = formData.get("current") === "true";
  if (!id) return;
  await supabase.from("projects").update({ is_published: !current }).eq("id", id);
  revalidatePath("/admin/projects");
  revalidatePath("/projets");
}

export async function deleteProjectImage(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id")?.toString();
  const projectId = formData.get("projectId")?.toString();
  if (!id) return;
  await supabase.from("project_images").delete().eq("id", id);
  if (projectId) revalidatePath(`/admin/projects/${projectId}/edit`);
}
