-- Drop old function
drop function if exists public.match_templates(vector(3072), float, int);

-- Recreate with explicit table reference
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
    t.id,  -- ← EXPLICIT: t = table
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