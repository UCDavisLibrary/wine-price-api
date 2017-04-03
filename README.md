# Wine Price API

This project is the server API for delivering wine price data. It will also be
used as the source for creating provenance for these price data.  This server
uses the postgrest project to provide the API.

## The API

The server API is documented, along with a number of example queries, as
a [Postman Collection](postman/api_collection.json).  Additionally, a
development and testing environment have been included.  You will see the
development version includes some precooked users and access_tokens that can be
used directly, without explicitly creating them.

# docker-compose

This application is comprised of a docker-compose file with 3 containers and one
volume.  Running the command `docker-compose up -d` will build the containers
and deploy the system.  You have a running API at that point.

## Dump / Restore

It often makes sense to initialize a new volume with existing data. There are
instructions in the (./Fc) directory that explain dumping and restoring data
using postgres commands on the running container.

## Sherry Lehmann Catalogs.

In the end, we should have a mechanism where when catalogs are loaded, they will
automatically be paginated with proper thumbnails. Currently we are doing that
seperately, and uploading these data by themselves. In some ways that is better
in the sense that for docker installations, we do not need to have special image
modification software. Additonally, the administration step could be done via a
browser, using this same type of setup. For example, we've verified that you can
use pdf.js to build the individual page images from the pdf files. We've also
verified that this *almost* works in nodejs using pdf.js. The problem being that
an event is needed to know when the composition of the image is complete.

#### Creating the catalog data.

We do not use the high resolution images for our tool. Instead, we build these
from our PDF. The idea here that that is more general of a solution. There is a
Makefile in the example directory that shows the creation of a set of images and
thumbnails from a single catalog.
