#! /usr/bin/make

dc:=docker-compose
db:=wine_price_dev
pg:=${dc} exec --user postgres postgres
date:=$(shell date --iso)
dump.Fc:=/app/Fc/sherry_lehmann_catalogs_${date}.Fc
exclude:=bottle_info

ex:=$(patsubst %,--exclude-table=%,${exclude})

dump:
	${pg} -Fc --file=${dump.Fc} -a --schema=catalogs ${ex} ${db}

dump-marks:
	${pg} -Fc --file=${dump.Fc} -a --table=catalogs.marks ${db}
