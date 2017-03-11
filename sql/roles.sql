-- the names "anon" and "authenticator" are configurable and not
-- sacred, we simply choose them for clarity
create role anon;
create role authenticator noinherit;
grant anon to authenticator;

grant usage on schema catalogs to anon;

-- This needs to be rerun if you add tables
GRANT SELECT ON ALL TABLES IN SCHEMA catalogs TO anon;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA catalogs TO anon;
