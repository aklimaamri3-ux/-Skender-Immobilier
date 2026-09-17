-- Add "points of interest nearby" field to projects (écoles, commerces, transport, ...)
alter table public.projects
  add column if not exists nearby_points text;
