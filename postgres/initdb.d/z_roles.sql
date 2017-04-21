-- the names "anon" and "authenticator" are configurable and not
-- sacred, we simply choose them for clarity
create role anon;
create role markup;
create role admin;

create role authenticator noinherit;
grant anon to authenticator;
grant markup to authenticator;
grant admin to authenticator;

grant anon to admin;
grant markup to admin;

grant usage on schema catalogs to anon;

-- This needs to be rerun if you add tables
GRANT SELECT ON ALL TABLES IN SCHEMA catalogs TO anon;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA catalogs TO anon;

-- Admin can't delete pages, etc.
GRANT INSERT on catalogs.marks to markup;
GRANT UPDATE on catalogs.marks to markup;
GRANT DELETE on catalogs.marks to markup;

GRANT INSERT on catalogs.pending_mark_index to markup;
GRANT UPDATE on catalogs.pending_mark_index to markup;
GRANT DELETE on catalogs.pending_mark_index to markup;

GRANT UPDATE (editable,completed) on catalogs.pages to markup;
GRANT UPDATE (editable,completed) on catalogs.catalogs to markup;
