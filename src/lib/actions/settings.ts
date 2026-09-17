"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { AgencySettings } from "@/types/database";

export async function saveSettings(formData: FormData) {
  const supabase = await createClient();

  const value: AgencySettings = {
    name: formData.get("name")?.toString() ?? "",
    slogan: formData.get("slogan")?.toString() ?? "",
    phone: formData.get("phone")?.toString() ?? "",
    whatsapp: formData.get("whatsapp")?.toString() ?? "",
    email: formData.get("email")?.toString() ?? "",
    address: formData.get("address")?.toString() ?? "",
    facebook: formData.get("facebook")?.toString() ?? "",
    instagram: formData.get("instagram")?.toString() ?? "",
    about: formData.get("about")?.toString() ?? "",
  };

  await supabase
    .from("settings")
    .upsert({ key: "agency", value, updated_at: new Date().toISOString() });

  revalidatePath("/admin/settings");
  revalidatePath("/");
  revalidatePath("/contact");
  revalidatePath("/a-propos");
}
