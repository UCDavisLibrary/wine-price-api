var pgExec = require('./pg');
var firebase = require('firebase-admin');

console.log('Starting Firebase-PG Pending Mark Sync');

/**
 * Connect to firebase
 */

var env = process.env.PRICE_THE_VINTAGE_ENV || 'dev';
var secret, dburl;
if( env.trim().toLowerCase() === 'prod' ) {
  secret = require('./config');
  dburl = 'https://price-the-vintage.firebaseio.com';
} else {
  secret = require('./config-dev');
  dburl = 'https://price-the-vintage-dev.firebaseio.com';
}

var config = {
  databaseURL: dburl,
  credential: firebase.credential.cert(secret)
};
firebase.initializeApp(config);

console.log(`Using PRICE_THE_VINTAGE_ENV: ${env}`);
console.log(`Connecting to: ${dburl}`);

/**
 * Always redo last 5 days of marks on start
 */
var MS_PER_DAY = 86400 * 1000;
var RESTART_BUFFER = 30; // days
var time = Date.now() - (RESTART_BUFFER * MS_PER_DAY);

var ref = firebase
  .database()
  .ref('pending-marks')
  .orderByChild('updated')
  .startAt(time);


ref.on('child_added', (childSnapshot, prevChildKey) => {
  var value = childSnapshot.val();
  var id = childSnapshot.key;
  onUpdate(id, value);
});

ref.on('child_changed', (childSnapshot, prevChildKey) => {
  var value = childSnapshot.val();
  var id = childSnapshot.key;
  onUpdate(id, value);
});

ref.on('child_removed', (oldChildSnapshot) => {
  var id = oldChildSnapshot.key;
  onRemove(id);
});

function onUpdate(id, val) {
  var insert = 'INSERT into pending_mark_index '+
    '( '+
      'mark_id, '    + // 1
      'page_id, '    + // 3
      'score, '      + // 8
      'created, '    + // 16
      'updated '     + // 17
    ') VALUES ( '+
      '$1::uuid, '      + // mark_id
      '$2::uuid, '      + // page_id
      '$3::int, '       + // score
      'to_timestamp($4::double precision), '      + // created
      'to_timestamp($5::double precision) '       + // updated
    ') ON CONFLICT(mark_id) DO UPDATE SET '+
      'page_id=excluded.page_id, '       +
      'score=excluded.score, '           +
      'created=excluded.created, '       + 
      'updated=excluded.updated ';
  

  var params = [
    id,                // mark_id
    val.pageId, // page_id
    val.score || 0,    // score
    val.created / 1000,       // created
    val.updated / 1000        // updated
  ];

  pgExec(insert, params, (err, result) => {
    if( err ) console.error(`Error updating mark: ${id}`);
    else console.log(`Mark added: ${id}`);
  });
}

function onRemove(id) {
  var remove = `DELETE FROM pending_mark_index WHERE mark_id = $1::uuid`;
  pgExec(remove, [id], (err, result) => {
    if( err ) console.error(`Error removing mark ${id}`);
    else console.log(`Mark removed: ${id}`);
  });
}