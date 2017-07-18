# Postgres dump files

This directory is used to store postgres database dumps and restores.  This can
be used to: dump the existing database; restore a newly created volumne for a
docker constellation; and dump/restore incremental (non-catalog/page) data.

## Dump/Restore  the complete database


``` bash
alias dc=docker-compose
d=`date --iso`;
alias dcpg='dc exec --user postgres postgres'
# Dump database. Only data, only catalog schema
dcpg pg_dump -Fc --file=/app/Fc/catalogs_${d}.Fc -a --schema=catalogs wine_price
# Restore db.  Can be used to start a new docker volume.
dcpg pg_restore --dbname=wine_price /app/Fc/catalogs_2017-04-20.Fc
```
