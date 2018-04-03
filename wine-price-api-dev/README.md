# Development

This directory can be used to setup a development version of the wine-price-api.

## Firebase sync

I'm not sure how the firebase stuff should be added in for this build

## Initializing / Restoring data

There is a Makefile in the previous directory that can be used to both dump and
restore a catalog and set of marks.  The docker-compose file here includes links
to ../Fc, so you would restore from here like:

``` bash
make -f ../Makefile date=2018-03-29 restore-catalogs restore-marks
```
