const pg = require('pg');

var config = {
  user: 'postgres', //env var: PGUSER
  database: 'postgres', //env var: PGDATABASE
  host: 'postgres',
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

const pool = new pg.Pool(config);
pool.on('error', function (err, client) {
  console.error('PG: idle client error', err.message, err.stack)
});

module.exports = function exec(query, params, callback) {

  pool.connect(function(err, client, done) {
    if( err ) return callback(err);

    client.query(query, params, function(err, result) {

      //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
      done(err);
      callback(err, result);
    });
  });
}
