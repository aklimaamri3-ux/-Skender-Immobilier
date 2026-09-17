import { createClient } from "@/lib/supabase/server";

export async function getDashboardStats() {
  const supabase = await createClient();

  const [
    { count: projectsCount },
    { count: propertiesCount },
    { count: availableCount },
    { count: reservedCount },
    { count: soldCount },
    { count: inquiriesCount },
    { count: appointmentsCount },
  ] = await Promise.all([
    supabase.from("projects").select("*", { count: "exact", head: true }),
    supabase.from("properties").select("*", { count: "exact", head: true }),
    supabase
      .from("properties")
      .select("*", { count: "exact", head: true })
      .eq("status", "disponible"),
    supabase
      .from("properties")
      .select("*", { count: "exact", head: true })
      .eq("status", "reserve"),
    supabase
      .from("properties")
      .select("*", { count: "exact", head: true })
      .eq("status", "vendu"),
    supabase.from("inquiries").select("*", { count: "exact", head: true }),
    supabase.from("appointments").select("*", { count: "exact", head: true }),
  ]);

  return {
    projects: projectsCount ?? 0,
    properties: propertiesCount ?? 0,
    available: availableCount ?? 0,
    reserved: reservedCount ?? 0,
    sold: soldCount ?? 0,
    inquiries: inquiriesCount ?? 0,
    appointments: appointmentsCount ?? 0,
  };
}

export async function getAllProjectsAdmin() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("*, properties(id)")
    .order("created_at", { ascending: false });
  return data ?? [];
}

export async function getProjectByIdAdmin(id: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("*, project_images(*)")
    .eq("id", id)
    .maybeSingle();
  return data;
}

export async function getAllPropertiesAdmin() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("properties")
    .select("*, projects(name), property_images(*)")
    .order("created_at", { ascending: false });
  return data ?? [];
}

export async function getPropertyByIdAdmin(id: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("properties")
    .select("*, property_images(*)")
    .eq("id", id)
    .maybeSingle();
  return data;
}

export async function getAllProjectsForSelect() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("id, name")
    .order("name");
  return data ?? [];
}

export async function getAllInquiries() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("inquiries")
    .select("*, projects(name), properties(reference)")
    .order("created_at", { ascending: false });
  return data ?? [];
}

export async function getAllAppointments() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("appointments")
    .select("*, inquiries(first_name, last_name, phone, email)")
    .order("created_at", { ascending: false });
  return data ?? [];
}

export async function getAllReviewsAdmin() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false });
  return data ?? [];
}
