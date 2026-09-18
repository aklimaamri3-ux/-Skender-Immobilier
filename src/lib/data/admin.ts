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

export async function getNewInquiriesCount() {
  const supabase = await createClient();
  const { count } = await supabase
    .from("inquiries")
    .select("*", { count: "exact", head: true })
    .eq("status", "nouvelle");
  return count ?? 0;
}

function last30DaysBuckets() {
  const days: string[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }
  return days;
}

function bucketByDay(rows: { created_at: string }[]) {
  const days = last30DaysBuckets();
  const counts = new Map(days.map((d) => [d, 0]));
  for (const row of rows) {
    const day = row.created_at.slice(0, 10);
    if (counts.has(day)) counts.set(day, (counts.get(day) ?? 0) + 1);
  }
  return days.map((day) => ({
    day: day.slice(5), // MM-DD
    total: counts.get(day) ?? 0,
  }));
}

export async function getVisitsTrend() {
  const supabase = await createClient();
  const since = new Date();
  since.setDate(since.getDate() - 29);
  const { data } = await supabase
    .from("page_views")
    .select("created_at")
    .gte("created_at", since.toISOString());
  return bucketByDay(data ?? []);
}

export async function getInquiriesTrend() {
  const supabase = await createClient();
  const since = new Date();
  since.setDate(since.getDate() - 29);
  const { data } = await supabase
    .from("inquiries")
    .select("created_at")
    .gte("created_at", since.toISOString());
  return bucketByDay(data ?? []);
}

export async function getInquiriesByProject() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("inquiries")
    .select("project_id, projects(name)");

  const counts = new Map<string, number>();
  for (const row of data ?? []) {
    const name =
      (row as { projects?: { name?: string } | { name?: string }[] }).projects;
    const projectName = Array.isArray(name) ? name[0]?.name : name?.name;
    const key = projectName ?? "Sans projet";
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return Array.from(counts.entries()).map(([name, total]) => ({ name, total }));
}

export async function getMostViewedProperties(limit = 5) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("page_views")
    .select("property_id, properties(reference)")
    .not("property_id", "is", null);

  const counts = new Map<string, { reference: string; total: number }>();
  for (const row of data ?? []) {
    const propId = (row as { property_id: string | null }).property_id;
    if (!propId) continue;
    const propRel = (
      row as { properties?: { reference?: string } | { reference?: string }[] }
    ).properties;
    const reference =
      (Array.isArray(propRel) ? propRel[0]?.reference : propRel?.reference) ??
      "—";
    const existing = counts.get(propId);
    counts.set(propId, { reference, total: (existing?.total ?? 0) + 1 });
  }

  return Array.from(counts.values())
    .sort((a, b) => b.total - a.total)
    .slice(0, limit);
}

export async function getTotalVisits() {
  const supabase = await createClient();
  const { count } = await supabase
    .from("page_views")
    .select("*", { count: "exact", head: true });
  return count ?? 0;
}
