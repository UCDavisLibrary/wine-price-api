# Postgres dump files

This directory is used to store postgres database dumps and restores.  This can
be used to: dump the existing database; restore a newly created volumne for a
docker constellation; and dump/restore incremental (non-catalog/page) data.

## Dump/Restore  the complete database


``` bash
alias dc=docker-compose
d=`date --iso`;
# Dump database. Only data, only catalog schema
dc exec --user postgres postgres pg_dump -Fc \
--file=/app/Fc/sherry_lehmann_catalogs_${d}.Fc -a --schema=catalogs
# Restore db.  Can be used to start a new docker volumne.
dc exec --user postgres postgres pg_dump -Fc \
 --file=/app/Fc/sherry_lehmann_catalogs_2017-03-30.Fc -a --schema=catalogs

```
