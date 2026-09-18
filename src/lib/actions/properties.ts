"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function saveProperty(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id")?.toString();

  const payload = {
    project_id: formData.get("project_id")?.toString() ?? "",
    reference: formData.get("reference")?.toString() ?? "",
    type: formData.get("type")?.toString() ?? "appartement",
    surface: Number(formData.get("surface") ?? 0),
    bedrooms: Number(formData.get("bedrooms") ?? 0),
    bathrooms: Number(formData.get("bathrooms") ?? 0),
    floor: formData.get("floor")?.toString() || null,
    orientation: formData.get("orientation")?.toString() || null,
    price: Number(formData.get("price") ?? 0),
    has_parking: formData.get("has_parking") === "on",
    description: formData.get("description")?.toString() || null,
    plan_3d_url: formData.get("plan_3d_url")?.toString() || null,
    status: formData.get("status")?.toString() ?? "disponible",
    is_published: formData.get("is_published") === "on",
  };

  let propertyId = id;

  if (id) {
    const { error } = await supabase.from("properties").update(payload).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { data, error } = await supabase
      .from("properties")
      .insert(payload)
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    propertyId = data.id;
  }

  const planFile = formData.get("plan") as File | null;
  if (planFile && planFile.size > 0) {
    const path = `plans/${propertyId}/${Date.now()}-${planFile.name}`;
    const { error: uploadError } = await supabase.storage
      .from("property-media")
      .upload(path, planFile, { upsert: true });
    if (!uploadError) {
      const { data } = supabase.storage.from("property-media").getPublicUrl(path);
      await supabase.from("properties").update({ plan_url: data.publicUrl }).eq("id", propertyId);
    }
  }

  const photoFiles = formData.getAll("photos") as File[];
  for (const file of photoFiles) {
    if (!file || file.size === 0) continue;
    const path = `photos/${propertyId}/${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("property-media")
      .upload(path, file);
    if (!uploadError) {
      const { data } = supabase.storage.from("property-media").getPublicUrl(path);
      await supabase.from("property_images").insert({
        property_id: propertyId,
        url: data.publicUrl,
      });
    }
  }

  revalidatePath("/admin/properties");
  revalidatePath("/projets");
  redirect("/admin/properties");
}

export async function deleteProperty(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id")?.toString();
  if (!id) return;
  await supabase.from("properties").delete().eq("id", id);
  revalidatePath("/admin/properties");
  revalidatePath("/projets");
}

export async function updatePropertyStatus(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id")?.toString();
  const status = formData.get("status")?.toString();
  if (!id || !status) return;
  await supabase.from("properties").update({ status }).eq("id", id);
  revalidatePath("/admin/properties");
  revalidatePath("/projets");
}

export async function deletePropertyImage(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id")?.toString();
  const propertyId = formData.get("propertyId")?.toString();
  if (!id) return;
  await supabase.from("property_images").delete().eq("id", id);
  if (propertyId) revalidatePath(`/admin/properties/${propertyId}/edit`);
}
