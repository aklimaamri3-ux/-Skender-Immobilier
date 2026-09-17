"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function updateAppointment(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id")?.toString();
  const status = formData.get("status")?.toString();
  const note = formData.get("note")?.toString() || null;
  const scheduledAt = formData.get("scheduledAt")?.toString() || null;
  if (!id) return;

  await supabase
    .from("appointments")
    .update({ status, note, scheduled_at: scheduledAt })
    .eq("id", id);

  revalidatePath("/admin/appointments");
}
