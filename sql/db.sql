CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;
COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';
CREATE EXTENSION IF NOT EXISTS pgjwt WITH SCHEMA public;
COMMENT ON EXTENSION pgjwt IS 'JSON Web Token API for Postgresql';
CREATE EXTENSION IF NOT EXISTS pgtap WITH SCHEMA public;
COMMENT ON EXTENSION pgtap IS 'Unit testing for PostgreSQL';

DROP SCHEMA catalogs cascade;
CREATE SCHEMA catalogs;
SET search_path = catalogs,public,pg_catalog;
\i types.sql
\i catalogs.sql


-- Finally add roles
\i roles.sql
