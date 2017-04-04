// var pg = require('pg');
var firebase = require('firebase-admin');

/**
 * Connect to firebase
 */
var config = {
  databaseURL: 'https://ucd-library-apps.firebaseio.com',
  credential: firebase.credential.cert(require('./config'))
};
firebase.initializeApp(config);

/**
 * Always redo last 5 days of marks on start
 */
var MS_PER_DAY = 86400 * 1000;
var RESTART_BUFFER = 5; // days
var time = Date.now() - (RESTART_BUFFER * MS_PER_DAY);


var ref = firebase
  .database()
  .ref('price-the-vintage/pending-marks')
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

function onUpdate(id, value) {
  console.log(id, value);
  // Add to PG
}

function onRemove(id) {
  console.log(id);
  // Remove from PG
}