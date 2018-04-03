This directory is used to store postgres database dumps and restores.  This can
be used to: dump the existing database; restore a newly created volumne for a
docker constellation; and dump/restore incremental (non-catalog/page) data.

There is a `../Makefile` that shows the steps for dump and restore.
