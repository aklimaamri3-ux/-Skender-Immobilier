import { createClient } from "@/lib/supabase/server";
import type {
  AgencySettings,
  ProjectWithRelations,
  PropertyWithRelations,
  Review,
} from "@/types/database";

export async function getSettings(): Promise<AgencySettings> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("settings")
    .select("value")
    .eq("key", "agency")
    .maybeSingle();

  const fallback: AgencySettings = {
    name: "SKENDER IMMOBILIER",
    slogan: "VOTRE PROJET, NOTRE ENGAGEMENT",
    phone: "+213 000 00 00 00",
    whatsapp: "213000000000",
    email: "contact@skender-immobilier.dz",
    address: "Bousmail, Tipaza, Algérie",
    facebook: "",
    instagram: "",
    about: "",
    rental_count: 12,
  };

  return { ...fallback, ...(data?.value as Partial<AgencySettings> | undefined) };
}

export interface ProjectFilters {
  location?: string;
  type?: string;
  status?: string;
  minPrice?: number;
  maxPrice?: number;
  minSurface?: number;
}

export async function getPublishedProjects(filters: ProjectFilters = {}) {
  const supabase = await createClient();
  let query = supabase
    .from("projects")
    .select("*, properties(id, type, price, surface, status)")
    .eq("is_published", true)
    .order("is_featured", { ascending: false })
    .order("created_at", { ascending: false });

  if (filters.location) {
    query = query.ilike("location", `%${filters.location}%`);
  }
  if (filters.status) {
    query = query.eq("status", filters.status);
  }
  if (filters.minPrice) {
    query = query.gte("price_from", filters.minPrice);
  }
  if (filters.maxPrice) {
    query = query.lte("price_from", filters.maxPrice);
  }

  const { data, error } = await query;
  if (error) throw error;

  let projects = (data ?? []) as ProjectWithRelations[];

  if (filters.type) {
    projects = projects.filter((p) =>
      p.properties?.some((prop) => prop.type === filters.type)
    );
  }

  if (filters.minSurface) {
    projects = projects.filter((p) =>
      p.properties?.some((prop) => (prop.surface ?? 0) >= filters.minSurface!)
    );
  }

  return projects;
}

export async function getFeaturedProject() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("*, project_images(*), properties(id, status)")
    .eq("is_published", true)
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (data) return data as ProjectWithRelations;

  const { data: fallback } = await supabase
    .from("projects")
    .select("*, project_images(*), properties(id, status)")
    .eq("is_published", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  return fallback as ProjectWithRelations | null;
}

export async function getProjectBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select(
      "*, project_images(*), properties(*, property_images(*))"
    )
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (error) throw error;
  return data as ProjectWithRelations | null;
}

export async function getAvailableProperties() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("properties")
    .select("*, property_images(*), projects!inner(slug, name, location, is_published)")
    .eq("status", "disponible")
    .eq("projects.is_published", true)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as PropertyWithRelations[];
}

export async function getPropertyById(projectSlug: string, propertyId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("properties")
    .select("*, property_images(*), projects!inner(*)")
    .eq("id", propertyId)
    .eq("projects.slug", projectSlug)
    .maybeSingle();

  if (error) throw error;
  return data as PropertyWithRelations | null;
}

export async function getPublishedReviews(): Promise<Review[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("reviews")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false })
    .limit(12);

  return (data ?? []) as Review[];
}

export async function getGalleryImages() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("project_images")
    .select("*, projects!inner(name, slug, is_published)")
    .eq("projects.is_published", true)
    .order("created_at", { ascending: false })
    .limit(60);

  return data ?? [];
}
