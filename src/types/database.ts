export type ProjectStatus = "en_cours" | "livre" | "a_venir" | "archive";
export type PropertyStatus = "disponible" | "reserve" | "vendu";
export type PropertyType =
  | "appartement"
  | "villa"
  | "duplex"
  | "studio"
  | "local_commercial"
  | "terrain";
export type InquiryType = "visite" | "contact" | "info";
export type InquiryStatus =
  | "nouvelle"
  | "contacte"
  | "rdv_programme"
  | "termine"
  | "annule";
export type AppointmentStatus = "nouvelle" | "confirme" | "termine" | "annule";
export type ImageKind = "photo" | "plan" | "interior" | "exterior";

export interface Admin {
  id: string;
  full_name: string;
  email: string;
  role: "admin" | "super_admin";
  created_at: string;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  location: string;
  city: string | null;
  description: string | null;
  short_description: string | null;
  status: ProjectStatus;
  is_published: boolean;
  is_featured: boolean;
  price_from: number | null;
  delivery_date: string | null;
  apartments_count: number;
  villas_count: number;
  cover_image_url: string | null;
  latitude: number | null;
  longitude: number | null;
  video_url: string | null;
  nearby_points: string | null;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProjectImage {
  id: string;
  project_id: string;
  url: string;
  kind: ImageKind;
  position: number;
  created_at: string;
}

export interface Property {
  id: string;
  project_id: string;
  reference: string;
  type: PropertyType;
  surface: number;
  bedrooms: number;
  bathrooms: number;
  floor: string | null;
  orientation: string | null;
  price: number;
  has_parking: boolean;
  description: string | null;
  plan_url: string | null;
  plan_3d_url: string | null;
  status: PropertyStatus;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface PropertyImage {
  id: string;
  property_id: string;
  url: string;
  position: number;
  created_at: string;
}

export interface Inquiry {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string | null;
  project_id: string | null;
  property_id: string | null;
  desired_date: string | null;
  message: string | null;
  type: InquiryType;
  status: InquiryStatus;
  created_at: string;
}

export interface Appointment {
  id: string;
  inquiry_id: string | null;
  scheduled_at: string | null;
  note: string | null;
  status: AppointmentStatus;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  author_name: string;
  rating: number;
  content: string;
  is_published: boolean;
  created_at: string;
}

export interface AgencySettings {
  name: string;
  slogan: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  facebook: string;
  instagram: string;
  about: string;
  rental_count: number;
}

export interface ProjectWithRelations extends Project {
  project_images?: ProjectImage[];
  properties?: Property[];
}

export interface PropertyWithRelations extends Property {
  property_images?: PropertyImage[];
  projects?: Project;
}
