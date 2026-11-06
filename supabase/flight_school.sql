-- Flight School: who finished. Deliberately holds no answers or scores.
-- Answers stay on the person's device and in their private results link.
-- Nothing here is readable directly: RLS is on with no policies, and the only
-- way in is the two functions below.

create table public.flight_school_finishes (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 120),
  helpers text not null default '' check (char_length(helpers) <= 200),
  finished_at timestamptz not null default now(),
  -- Only for limiting repeat emails. Cleared after a day.
  email_hash text
);
create index flight_school_finishes_recent on public.flight_school_finishes (finished_at desc);
alter table public.flight_school_finishes enable row level security;

-- Stores only a hash of the pastor link's secret key.
create table public.flight_school_pastor_keys (
  key_hash text primary key,
  created_at timestamptz not null default now()
);
alter table public.flight_school_pastor_keys enable row level security;

revoke all on public.flight_school_finishes, public.flight_school_pastor_keys from anon, authenticated;

create function public.flight_school_record_finish(p_name text, p_helpers text, p_email text)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_hash text;
  v_may_email boolean := false;
begin
  -- A cap on total writes, so a bot can't flood the list.
  if (select count(*) from public.flight_school_finishes
      where finished_at > now() - interval '1 hour') >= 200 then
    return jsonb_build_object('saved', false, 'mayEmail', false);
  end if;

  update public.flight_school_finishes set email_hash = null
    where email_hash is not null and finished_at < now() - interval '1 day';

  if coalesce(p_email, '') <> '' then
    v_hash := encode(sha256(convert_to(lower(trim(p_email)), 'UTF8')), 'hex');
    v_may_email := (select count(*) from public.flight_school_finishes
      where email_hash = v_hash and finished_at > now() - interval '1 hour') < 3;
  end if;

  insert into public.flight_school_finishes (name, helpers, email_hash)
  values (left(trim(p_name), 120), left(trim(coalesce(p_helpers, '')), 200), v_hash);

  return jsonb_build_object('saved', true, 'mayEmail', v_may_email);
end;
$$;

create function public.flight_school_pastor_list(p_key text)
returns table (name text, helpers text, finished_at timestamptz)
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not exists (
    select 1 from public.flight_school_pastor_keys
    where key_hash = encode(sha256(convert_to(coalesce(p_key, ''), 'UTF8')), 'hex')
  ) then
    raise exception 'not allowed' using errcode = '28000';
  end if;
  return query
    select f.name, f.helpers, f.finished_at
    from public.flight_school_finishes f
    order by f.finished_at desc
    limit 1000;
end;
$$;

revoke all on function public.flight_school_record_finish(text, text, text) from public, authenticated;
revoke all on function public.flight_school_pastor_list(text) from public, authenticated;
grant execute on function public.flight_school_record_finish(text, text, text) to anon;
grant execute on function public.flight_school_pastor_list(text) to anon;
