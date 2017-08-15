#! /usr/bin/make

dc:=docker-compose
db:=postgres
pg:=${dc} exec --user postgres postgres
date:=$(shell date --iso)
dump-catalogs.Fc:=/app/Fc/catalogs_${date}.Fc
dump-marks.Fc:=/app/Fc/marks_${date}.Fc
exclude:=bottle_info

ex:=$(patsubst %,--exclude-table=%,${exclude})


dump-catalogs:
	${pg} pg_dump -Fc --file=${dump-catalogs.Fc} -a \
  --table=catalogs.catalogs --table=catalogs.pages --table=catalogs.media ${db}

dump-marks:
	${pg} pg_dump -Fc --file=${dump-marks.Fc} -a  --table=catalogs.marks ${db}

restore-catalogs:
	${pg} pg_restore --dbname=${db} ${dump-catalogs.Fc}

restore-marks:
	${pg} pg_restore --dbname=${db} ${dump-marks.Fc}
