-- Lightweight page-view tracking for admin statistics
create table if not exists public.page_views (
  id uuid primary key default gen_random_uuid(),
  path text not null,
  project_id uuid references public.projects (id) on delete set null,
  property_id uuid references public.properties (id) on delete set null,
  created_at timestamptz not null default now()
);
create index if not exists page_views_created_idx on public.page_views (created_at);
create index if not exists page_views_project_idx on public.page_views (project_id);
create index if not exists page_views_property_idx on public.page_views (property_id);

alter table public.page_views enable row level security;

-- anyone (including anonymous visitors) can log a page view
create policy page_views_public_insert on public.page_views for insert with check (true);
-- only admins can read the stats
create policy page_views_admin_select on public.page_views for select using (public.is_admin());
