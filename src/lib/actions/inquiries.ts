"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const inquirySchema = z.object({
  firstName: z.string().min(1, "Le prénom est requis"),
  lastName: z.string().min(1, "Le nom est requis"),
  phone: z.string().min(8, "Numéro de téléphone invalide"),
  email: z.string().email("Email invalide").optional().or(z.literal("")),
  projectId: z.string().uuid().optional().or(z.literal("")),
  propertyId: z.string().uuid().optional().or(z.literal("")),
  desiredDate: z.string().optional().or(z.literal("")),
  message: z.string().optional().or(z.literal("")),
  type: z.enum(["visite", "contact", "info"]).default("visite"),
});

export type InquiryFormState = {
  success: boolean;
  error?: string;
};

export async function submitInquiry(
  _prev: InquiryFormState,
  formData: FormData
): Promise<InquiryFormState> {
  const raw = {
    firstName: formData.get("firstName")?.toString() ?? "",
    lastName: formData.get("lastName")?.toString() ?? "",
    phone: formData.get("phone")?.toString() ?? "",
    email: formData.get("email")?.toString() ?? "",
    projectId: formData.get("projectId")?.toString() ?? "",
    propertyId: formData.get("propertyId")?.toString() ?? "",
    desiredDate: formData.get("desiredDate")?.toString() ?? "",
    message: formData.get("message")?.toString() ?? "",
    type: (formData.get("type")?.toString() as "visite" | "contact" | "info") ?? "visite",
  };

  const parsed = inquirySchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Formulaire invalide" };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("inquiries").insert({
    first_name: parsed.data.firstName,
    last_name: parsed.data.lastName,
    phone: parsed.data.phone,
    email: parsed.data.email || null,
    project_id: parsed.data.projectId || null,
    property_id: parsed.data.propertyId || null,
    desired_date: parsed.data.desiredDate || null,
    message: parsed.data.message || null,
    type: parsed.data.type,
  });

  if (error) {
    return { success: false, error: "Une erreur est survenue, veuillez réessayer." };
  }

  return { success: true };
}
