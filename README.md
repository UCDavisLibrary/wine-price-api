# Wine Price API

This project is the server API for delivering wine price data. It will also be
used as the source for creating provenance for these price data.  This server is
based on a fork of the [NODAL](http://github.com/qjhart/nodal) platform.

Currently, the testing server is available at (http://labelthis.qjhart.org),
with a corresponding [Example Dataset](http://labelthis.qjhart.org/wine_prices)

## The API

The server API is documented, along with a number of example queries, as
a [Postman Collection](postman/api_collection.json).  Additionally, a
development and testing environment have been included.  You will see the
development version includes some precooked users and access_tokens that can be
used directly.

## Running


The two modes for running this server are in development and testing mode.
Typically, we develop on a machine that is running postgresql and node natively.
For the testing and production environments, we use docker, and run these as a
set of containers.

When the server starts up, it looks for the environment variable ```NODE_ENV```
as the environment to use.  This affects the database that is read among other
things.  If ```NODE_ENV``` is not set, the development version is run.

### Development

For the development version, you can start the server up with ```npm run
start```.  In this mode, changes to the code are hot fixed into to server as
it's running.  You can also start the server up in a debugging mode with ```npm run
debug```.  Running in this mode, you will be given a URL you can use to debug
the server with your browser.

Either way, the app should be running on [localhost:3000](http://localhost:3000/).

### Testing / Docker

You can start the dockerified version of server with ```docker-compose up
	web```.  This will start the web server and the postgres container as well.
	Again, however, the host is started on port 3000.  Users will want to either
	modify this location, or add a proxy server to connect to that port.

## Database

This server uses a modified version of Nodal, that allows for different
postgresql templates to be specified.  These are specified in the config/db.json file.
Currently, the template is simply used to specify some enumerations that are
used in the system.  The standard nodal db:bootstrap command is used to
initialize the database.  In the future, however, we may save more complete
templates, with the model tables, indices and startup data as well.  How to keep
that organized with the db:bootstrap command is not clear, however.

Also, in docker land, we can do a similar thing simply by replicating the
initial postgresql database volume container.

### Creating the postgres template

Right now, this is a manual step

```{bash}
createdb wine_price_template
psql -d wine_price_template -f db/template.sql
```

For the docker version, the method is the same, however, you need to run that in
the postgres container.  There is a special container that exposes the required
file to the container so it can be created.

``` bash
docker-compose up db-ext
docker-compose exec db-ext bash
# Then in the container
su - postgres
createdb wine_price_template
psql -d wine_price_template -f /app/db/template.sql
```
