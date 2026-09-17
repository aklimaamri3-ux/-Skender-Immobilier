"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function updateInquiryStatus(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id")?.toString();
  const status = formData.get("status")?.toString();
  if (!id || !status) return;
  await supabase.from("inquiries").update({ status }).eq("id", id);
  revalidatePath("/admin/inquiries");
}

export async function deleteInquiry(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id")?.toString();
  if (!id) return;
  await supabase.from("inquiries").delete().eq("id", id);
  revalidatePath("/admin/inquiries");
}

export async function createAppointmentFromInquiry(formData: FormData) {
  const supabase = await createClient();
  const inquiryId = formData.get("inquiryId")?.toString();
  const scheduledAt = formData.get("scheduledAt")?.toString();
  if (!inquiryId) return;

  await supabase.from("appointments").insert({
    inquiry_id: inquiryId,
    scheduled_at: scheduledAt || null,
  });
  await supabase
    .from("inquiries")
    .update({ status: "rdv_programme" })
    .eq("id", inquiryId);

  revalidatePath("/admin/inquiries");
  revalidatePath("/admin/appointments");
}
