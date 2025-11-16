-- 1. Enable vector
create extension if not exists vector;

-- 2. Create table
drop table if exists public.constraint_templates cascade;
create table public.constraint_templates (
  id int primary key,
  name text,
  template text,
  examples text[],
  embedding vector(3072)
);

-- 3. Create function
drop function if exists public.match_templates(vector(3072), float, int) cascade;
create or replace function public.match_templates(
  query_embedding vector(3072),
  match_threshold float,
  match_count int
)
returns table(
  id int,
  name text,
  template text,
  examples text[],
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    t.id,
    t.name,
    t.template,
    t.examples,
    1 - (t.embedding <=> query_embedding) as similarity
  from public.constraint_templates t
  where 1 - (t.embedding <=> query_embedding) > match_threshold
  order by t.embedding <=> query_embedding
  limit match_count;
end;
$$;