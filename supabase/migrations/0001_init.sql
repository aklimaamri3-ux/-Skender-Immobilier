-- ============================================================
-- SKENDER IMMOBILIER — Initial schema
-- ============================================================
create extension if not exists "pgcrypto";

-- ------------------------------------------------------------
-- ADMINS (linked to auth.users; only admins can manage data)
-- ------------------------------------------------------------
create table if not exists public.admins (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null,
  email text not null,
  role text not null default 'admin' check (role in ('admin', 'super_admin')),
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- PROJECTS
-- ------------------------------------------------------------
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  location text not null,
  city text,
  description text,
  short_description text,
  status text not null default 'en_cours' check (status in ('en_cours', 'livre', 'a_venir', 'archive')),
  is_published boolean not null default true,
  is_featured boolean not null default false,
  price_from numeric,
  delivery_date date,
  apartments_count integer default 0,
  villas_count integer default 0,
  cover_image_url text,
  latitude double precision,
  longitude double precision,
  video_url text,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists projects_status_idx on public.projects (status);
create index if not exists projects_published_idx on public.projects (is_published);

-- ------------------------------------------------------------
-- PROJECT IMAGES / PLANS / VIDEOS
-- ------------------------------------------------------------
create table if not exists public.project_images (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  url text not null,
  kind text not null default 'photo' check (kind in ('photo', 'plan', 'interior', 'exterior')),
  position integer not null default 0,
  created_at timestamptz not null default now()
);
create index if not exists project_images_project_idx on public.project_images (project_id);

-- ------------------------------------------------------------
-- PROPERTIES (biens: appartements, villas, ...)
-- ------------------------------------------------------------
create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  reference text not null,
  type text not null check (type in ('appartement', 'villa', 'duplex', 'studio', 'local_commercial', 'terrain')),
  surface numeric not null,
  bedrooms integer default 0,
  bathrooms integer default 0,
  floor text,
  orientation text,
  price numeric not null,
  has_parking boolean default false,
  description text,
  plan_url text,
  status text not null default 'disponible' check (status in ('disponible', 'reserve', 'vendu')),
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (project_id, reference)
);
create index if not exists properties_project_idx on public.properties (project_id);
create index if not exists properties_status_idx on public.properties (status);

-- ------------------------------------------------------------
-- PROPERTY IMAGES
-- ------------------------------------------------------------
create table if not exists public.property_images (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties (id) on delete cascade,
  url text not null,
  position integer not null default 0,
  created_at timestamptz not null default now()
);
create index if not exists property_images_property_idx on public.property_images (property_id);

-- ------------------------------------------------------------
-- INQUIRIES (demandes de visite / contact)
-- ------------------------------------------------------------
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  phone text not null,
  email text,
  project_id uuid references public.projects (id) on delete set null,
  property_id uuid references public.properties (id) on delete set null,
  desired_date date,
  message text,
  type text not null default 'visite' check (type in ('visite', 'contact', 'info')),
  status text not null default 'nouvelle' check (status in ('nouvelle', 'contacte', 'rdv_programme', 'termine', 'annule')),
  created_at timestamptz not null default now()
);
create index if not exists inquiries_status_idx on public.inquiries (status);

-- ------------------------------------------------------------
-- APPOINTMENTS (rendez-vous)
-- ------------------------------------------------------------
create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  inquiry_id uuid references public.inquiries (id) on delete cascade,
  scheduled_at timestamptz,
  note text,
  status text not null default 'nouvelle' check (status in ('nouvelle', 'confirme', 'termine', 'annule')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- REVIEWS (avis clients)
-- ------------------------------------------------------------
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  author_name text not null,
  rating integer not null check (rating between 1 and 5),
  content text not null,
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- SETTINGS (contenu global du site — clé/valeur JSON)
-- ------------------------------------------------------------
create table if not exists public.settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

insert into public.settings (key, value) values
  ('agency', jsonb_build_object(
    'name', 'SKENDER IMMOBILIER',
    'slogan', 'VOTRE PROJET, NOTRE ENGAGEMENT',
    'phone', '+213 000 00 00 00',
    'whatsapp', '213000000000',
    'email', 'contact@skender-immobilier.dz',
    'address', 'Bousmail, Tipaza, Algérie',
    'facebook', '',
    'instagram', '',
    'about', 'SKENDER IMMOBILIER accompagne ses clients dans la réalisation de leurs projets immobiliers avec exigence, transparence et professionnalisme.'
  ))
on conflict (key) do nothing;

-- ------------------------------------------------------------
-- updated_at triggers
-- ------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_projects_updated_at on public.projects;
create trigger trg_projects_updated_at before update on public.projects
  for each row execute function public.set_updated_at();

drop trigger if exists trg_properties_updated_at on public.properties;
create trigger trg_properties_updated_at before update on public.properties
  for each row execute function public.set_updated_at();

drop trigger if exists trg_appointments_updated_at on public.appointments;
create trigger trg_appointments_updated_at before update on public.appointments
  for each row execute function public.set_updated_at();

-- ------------------------------------------------------------
-- ROW LEVEL SECURITY
-- ------------------------------------------------------------
alter table public.admins enable row level security;
alter table public.projects enable row level security;
alter table public.project_images enable row level security;
alter table public.properties enable row level security;
alter table public.property_images enable row level security;
alter table public.inquiries enable row level security;
alter table public.appointments enable row level security;
alter table public.reviews enable row level security;
alter table public.settings enable row level security;

create or replace function public.is_admin()
returns boolean as $$
  select exists (select 1 from public.admins a where a.id = auth.uid());
$$ language sql stable security definer set search_path = public;

-- admins: only readable/writable by admins themselves
create policy admins_select on public.admins for select using (public.is_admin());
create policy admins_all on public.admins for all using (public.is_admin()) with check (public.is_admin());

-- projects: public can read published, admin can do everything
create policy projects_public_select on public.projects for select
  using (is_published = true or public.is_admin());
create policy projects_admin_write on public.projects for insert with check (public.is_admin());
create policy projects_admin_update on public.projects for update using (public.is_admin()) with check (public.is_admin());
create policy projects_admin_delete on public.projects for delete using (public.is_admin());

-- project_images
create policy project_images_public_select on public.project_images for select using (true);
create policy project_images_admin_write on public.project_images for insert with check (public.is_admin());
create policy project_images_admin_update on public.project_images for update using (public.is_admin()) with check (public.is_admin());
create policy project_images_admin_delete on public.project_images for delete using (public.is_admin());

-- properties
create policy properties_public_select on public.properties for select
  using (is_published = true or public.is_admin());
create policy properties_admin_write on public.properties for insert with check (public.is_admin());
create policy properties_admin_update on public.properties for update using (public.is_admin()) with check (public.is_admin());
create policy properties_admin_delete on public.properties for delete using (public.is_admin());

-- property_images
create policy property_images_public_select on public.property_images for select using (true);
create policy property_images_admin_write on public.property_images for insert with check (public.is_admin());
create policy property_images_admin_update on public.property_images for update using (public.is_admin()) with check (public.is_admin());
create policy property_images_admin_delete on public.property_images for delete using (public.is_admin());

-- inquiries: anyone can insert (public form), only admin can read/update/delete
create policy inquiries_public_insert on public.inquiries for insert with check (true);
create policy inquiries_admin_select on public.inquiries for select using (public.is_admin());
create policy inquiries_admin_update on public.inquiries for update using (public.is_admin()) with check (public.is_admin());
create policy inquiries_admin_delete on public.inquiries for delete using (public.is_admin());

-- appointments: admin only
create policy appointments_admin_all on public.appointments for all using (public.is_admin()) with check (public.is_admin());

-- reviews: public can read published, admin manages all
create policy reviews_public_select on public.reviews for select using (is_published = true or public.is_admin());
create policy reviews_admin_write on public.reviews for insert with check (public.is_admin());
create policy reviews_admin_update on public.reviews for update using (public.is_admin()) with check (public.is_admin());
create policy reviews_admin_delete on public.reviews for delete using (public.is_admin());

-- settings: public can read, admin can write
create policy settings_public_select on public.settings for select using (true);
create policy settings_admin_write on public.settings for insert with check (public.is_admin());
create policy settings_admin_update on public.settings for update using (public.is_admin()) with check (public.is_admin());
create policy settings_admin_delete on public.settings for delete using (public.is_admin());

-- ------------------------------------------------------------
-- STORAGE BUCKETS
-- ------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('project-media', 'project-media', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('property-media', 'property-media', true)
on conflict (id) do nothing;

create policy "project-media public read" on storage.objects for select
  using (bucket_id = 'project-media');
create policy "project-media admin write" on storage.objects for insert
  with check (bucket_id = 'project-media' and public.is_admin());
create policy "project-media admin update" on storage.objects for update
  using (bucket_id = 'project-media' and public.is_admin());
create policy "project-media admin delete" on storage.objects for delete
  using (bucket_id = 'project-media' and public.is_admin());

create policy "property-media public read" on storage.objects for select
  using (bucket_id = 'property-media');
create policy "property-media admin write" on storage.objects for insert
  with check (bucket_id = 'property-media' and public.is_admin());
create policy "property-media admin update" on storage.objects for update
  using (bucket_id = 'property-media' and public.is_admin());
create policy "property-media admin delete" on storage.objects for delete
  using (bucket_id = 'property-media' and public.is_admin());
