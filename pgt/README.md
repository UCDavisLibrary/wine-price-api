# PGT

The _PGT_ Dockerfile is a specialized instance of the
steller [postgrest](https://postgrest.com) client.  The Dockerfile combines
postgrest from a nginx base in order to add the proper Header tags to some media
files for the wine-price-api database.  Onl

## TODO

- I currently build postgrest outside the Dockerfile, which is stupid.

- Need to prepare this a bit better for docker secrets

- This runs on a machine that proxies requests to this image.  Because of that
  we don't include SSL in the nginx configuration which limits it's
  functionality in a standalone setup.
