"use server";

import { createClient } from "@/lib/supabase/server";

export async function trackPageView(input: {
  path: string;
  projectId?: string;
  propertyId?: string;
}) {
  const supabase = await createClient();
  await supabase.from("page_views").insert({
    path: input.path,
    project_id: input.projectId ?? null,
    property_id: input.propertyId ?? null,
  });
}
