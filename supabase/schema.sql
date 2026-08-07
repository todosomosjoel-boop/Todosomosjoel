-- Todos Somos Joel - esquema inicial Supabase
-- Ejecutar en SQL Editor de Supabase.

create extension if not exists "pgcrypto";

create type public.user_role as enum ('coach','student');
create type public.client_status as enum ('active','paused','inactive');
create type public.assignment_status as enum ('pending','completed','skipped');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role public.user_role not null default 'student',
  full_name text not null,
  phone text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);


-- Crea automáticamente el perfil básico al registrarse en Auth.
create or replace function public.handle_new_user()
returns trigger
language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, role, full_name)
  values (new.id, 'student', coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create table public.clients (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid unique references public.profiles(id) on delete set null,
  coach_id uuid not null references public.profiles(id) on delete cascade,
  status public.client_status not null default 'active',
  email text,
  goal text,
  notes text,
  start_date date not null default current_date,
  height_cm numeric(5,2),
  initial_weight_kg numeric(5,2),
  training_level text,
  weekly_availability integer,
  limitations text,
  created_at timestamptz not null default now()
);


create table public.appointments (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  coach_id uuid not null references public.profiles(id) on delete cascade,
  starts_at timestamptz not null,
  duration_minutes integer not null default 30,
  appointment_type text not null default 'check-in',
  location_mode text not null default 'video',
  notes text,
  created_at timestamptz not null default now()
);

create table public.measurements (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  measured_at date not null default current_date,
  weight_kg numeric(5,2),
  waist_cm numeric(5,2),
  hip_cm numeric(5,2),
  thigh_cm numeric(5,2),
  arm_cm numeric(5,2),
  body_fat_pct numeric(5,2),
  notes text,
  created_at timestamptz not null default now()
);

create table public.progress_photos (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  storage_path text not null,
  photo_type text not null check (photo_type in ('front','side','back','other')),
  taken_at date not null default current_date,
  created_at timestamptz not null default now()
);

create table public.videos (
  id uuid primary key default gen_random_uuid(),
  coach_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  description text,
  category text,
  level text,
  equipment text,
  duration_seconds integer,
  storage_path text,
  external_url text,
  thumbnail_url text,
  is_public_library boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.training_plans (
  id uuid primary key default gen_random_uuid(),
  coach_id uuid not null references public.profiles(id) on delete cascade,
  client_id uuid references public.clients(id) on delete cascade,
  name text not null,
  objective text,
  starts_on date,
  ends_on date,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.workouts (
  id uuid primary key default gen_random_uuid(),
  plan_id uuid not null references public.training_plans(id) on delete cascade,
  title text not null,
  weekday smallint check (weekday between 1 and 7),
  sort_order integer not null default 0,
  estimated_minutes integer,
  notes text
);

create table public.exercises (
  id uuid primary key default gen_random_uuid(),
  coach_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  category text,
  default_video_id uuid references public.videos(id) on delete set null,
  instructions text,
  created_at timestamptz not null default now()
);

create table public.workout_exercises (
  id uuid primary key default gen_random_uuid(),
  workout_id uuid not null references public.workouts(id) on delete cascade,
  exercise_id uuid not null references public.exercises(id) on delete restrict,
  video_id uuid references public.videos(id) on delete set null,
  sets integer,
  reps text,
  target_load text,
  rest_seconds integer,
  sort_order integer not null default 0,
  coach_note text
);

create table public.video_assignments (
  id uuid primary key default gen_random_uuid(),
  video_id uuid not null references public.videos(id) on delete cascade,
  client_id uuid not null references public.clients(id) on delete cascade,
  assigned_by uuid not null references public.profiles(id) on delete cascade,
  note text,
  created_at timestamptz not null default now(),
  unique(video_id, client_id)
);

create table public.workout_logs (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  workout_id uuid not null references public.workouts(id) on delete cascade,
  performed_at timestamptz not null default now(),
  status public.assignment_status not null default 'completed',
  duration_minutes integer,
  perceived_effort smallint check (perceived_effort between 1 and 10),
  comment text
);

create table public.exercise_logs (
  id uuid primary key default gen_random_uuid(),
  workout_log_id uuid not null references public.workout_logs(id) on delete cascade,
  workout_exercise_id uuid not null references public.workout_exercises(id) on delete cascade,
  completed boolean not null default true,
  actual_load text,
  actual_reps text,
  comment text
);

create table public.coach_notes (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  coach_id uuid not null references public.profiles(id) on delete cascade,
  body text not null,
  visible_to_student boolean not null default false,
  created_at timestamptz not null default now()
);

-- Storage buckets sugeridos
insert into storage.buckets (id, name, public)
values ('training-videos','training-videos',false), ('progress-photos','progress-photos',false)
on conflict (id) do nothing;

-- RLS
alter table public.profiles enable row level security;
alter table public.clients enable row level security;
alter table public.appointments enable row level security;
alter table public.measurements enable row level security;
alter table public.progress_photos enable row level security;
alter table public.videos enable row level security;
alter table public.training_plans enable row level security;
alter table public.workouts enable row level security;
alter table public.exercises enable row level security;
alter table public.workout_exercises enable row level security;
alter table public.video_assignments enable row level security;
alter table public.workout_logs enable row level security;
alter table public.exercise_logs enable row level security;
alter table public.coach_notes enable row level security;

-- Funciones auxiliares
create or replace function public.current_role()
returns public.user_role
language sql stable security definer set search_path = public
as $$ select role from public.profiles where id = auth.uid() $$;

create or replace function public.is_my_client(target_client uuid)
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from public.clients c
    where c.id = target_client
      and (c.coach_id = auth.uid() or c.profile_id = auth.uid())
  )
$$;

-- Profiles: cada usuario ve su perfil; coach puede ver perfiles de sus alumnos.
create policy "profile own read" on public.profiles for select to authenticated
using (id = auth.uid() or exists(select 1 from public.clients c where c.coach_id=auth.uid() and c.profile_id=profiles.id));
create policy "profile own update" on public.profiles for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

-- Clientes: coach CRUD; alumno solo su ficha.
create policy "clients coach or owner read" on public.clients for select to authenticated
using (coach_id = auth.uid() or profile_id = auth.uid());
create policy "clients coach insert" on public.clients for insert to authenticated with check (coach_id = auth.uid());
create policy "clients coach update" on public.clients for update to authenticated using (coach_id = auth.uid()) with check (coach_id = auth.uid());
create policy "clients coach delete" on public.clients for delete to authenticated using (coach_id = auth.uid());

-- Tablas ligadas a cliente: acceso entrenador responsable o alumno propietario.

create policy "appointments access" on public.appointments for select to authenticated using (public.is_my_client(client_id));
create policy "appointments coach write" on public.appointments for all to authenticated using (coach_id=auth.uid()) with check (coach_id=auth.uid());
create policy "measurements access" on public.measurements for select to authenticated using (public.is_my_client(client_id));
create policy "measurements coach write" on public.measurements for all to authenticated using (exists(select 1 from public.clients c where c.id=client_id and c.coach_id=auth.uid())) with check (exists(select 1 from public.clients c where c.id=client_id and c.coach_id=auth.uid()));
create policy "photos access" on public.progress_photos for select to authenticated using (public.is_my_client(client_id));
create policy "photos owner insert" on public.progress_photos for insert to authenticated with check (public.is_my_client(client_id));
create policy "notes access" on public.coach_notes for select to authenticated using (exists(select 1 from public.clients c where c.id=client_id and (c.coach_id=auth.uid() or (c.profile_id=auth.uid() and visible_to_student))));
create policy "notes coach write" on public.coach_notes for all to authenticated using (coach_id=auth.uid()) with check (coach_id=auth.uid());

-- Videos: coach gestiona su biblioteca; alumnos ven asignados o usados en su plan.
create policy "coach video CRUD" on public.videos for all to authenticated using (coach_id=auth.uid()) with check (coach_id=auth.uid());
create policy "student assigned video read" on public.videos for select to authenticated using (
  exists(select 1 from public.video_assignments va join public.clients c on c.id=va.client_id where va.video_id=videos.id and c.profile_id=auth.uid())
);
create policy "video assignments access" on public.video_assignments for select to authenticated using (public.is_my_client(client_id));
create policy "video assignments coach write" on public.video_assignments for all to authenticated using (assigned_by=auth.uid()) with check (assigned_by=auth.uid());

-- Planes y rutinas
create policy "plans access" on public.training_plans for select to authenticated using (coach_id=auth.uid() or public.is_my_client(client_id));
create policy "plans coach write" on public.training_plans for all to authenticated using (coach_id=auth.uid()) with check (coach_id=auth.uid());
create policy "workouts access" on public.workouts for select to authenticated using (exists(select 1 from public.training_plans p where p.id=plan_id and (p.coach_id=auth.uid() or public.is_my_client(p.client_id))));
create policy "workouts coach write" on public.workouts for all to authenticated using (exists(select 1 from public.training_plans p where p.id=plan_id and p.coach_id=auth.uid())) with check (exists(select 1 from public.training_plans p where p.id=plan_id and p.coach_id=auth.uid()));
create policy "exercises coach read write" on public.exercises for all to authenticated using (coach_id=auth.uid()) with check (coach_id=auth.uid());

create policy "student plan exercise read" on public.exercises for select to authenticated using (
  exists(
    select 1
    from public.workout_exercises we
    join public.workouts w on w.id=we.workout_id
    join public.training_plans p on p.id=w.plan_id
    join public.clients c on c.id=p.client_id
    where we.exercise_id=exercises.id and c.profile_id=auth.uid()
  )
);
create policy "workout exercises access" on public.workout_exercises for select to authenticated using (exists(select 1 from public.workouts w join public.training_plans p on p.id=w.plan_id where w.id=workout_id and (p.coach_id=auth.uid() or public.is_my_client(p.client_id))));
create policy "workout exercises coach write" on public.workout_exercises for all to authenticated using (exists(select 1 from public.workouts w join public.training_plans p on p.id=w.plan_id where w.id=workout_id and p.coach_id=auth.uid())) with check (exists(select 1 from public.workouts w join public.training_plans p on p.id=w.plan_id where w.id=workout_id and p.coach_id=auth.uid()));

-- Registros de entrenamiento: alumno registra lo suyo, coach lo revisa.
create policy "workout logs access" on public.workout_logs for select to authenticated using (public.is_my_client(client_id));
create policy "workout logs student insert" on public.workout_logs for insert to authenticated with check (exists(select 1 from public.clients c where c.id=client_id and c.profile_id=auth.uid()));
create policy "exercise logs access" on public.exercise_logs for select to authenticated using (exists(select 1 from public.workout_logs wl where wl.id=workout_log_id and public.is_my_client(wl.client_id)));
create policy "exercise logs student insert" on public.exercise_logs for insert to authenticated with check (exists(select 1 from public.workout_logs wl join public.clients c on c.id=wl.client_id where wl.id=workout_log_id and c.profile_id=auth.uid()));

-- Storage policies.
-- Videos: ruta <coach_id>/<archivo>. El coach administra sus originales.
-- Para alumnos, la app debe validar video_assignments y generar una URL firmada desde el servidor
-- con Service Role; nunca exponer Service Role en el navegador.
create policy "coach read own training videos" on storage.objects for select to authenticated
using (bucket_id='training-videos' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "coach upload own training videos" on storage.objects for insert to authenticated
with check (bucket_id='training-videos' and public.current_role()='coach' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "coach update own training videos" on storage.objects for update to authenticated
using (bucket_id='training-videos' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "coach delete own training videos" on storage.objects for delete to authenticated
using (bucket_id='training-videos' and (storage.foldername(name))[1] = auth.uid()::text);

-- Fotos: ruta <client_id>/<archivo>. Solo alumno/coach relacionado puede acceder.
create policy "progress photos relation read" on storage.objects for select to authenticated
using (bucket_id='progress-photos' and public.is_my_client(((storage.foldername(name))[1])::uuid));
create policy "progress photos relation upload" on storage.objects for insert to authenticated
with check (bucket_id='progress-photos' and public.is_my_client(((storage.foldername(name))[1])::uuid));
