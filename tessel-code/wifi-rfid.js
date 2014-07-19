var tessel = require('tessel');
var https = require("https");

var rfidlib = require('rfid-pn532');
var rfid = rfidlib.use(tessel.port['A']);

var dataTable = '';

var masterpack = https.get('https://smartpack.firebaseio.com/masterpack.json', function(res) {
  console.log("Status Code:", res.statusCode);
  res.on('data', function(d) {
    dataTable += d;
  });
  res.on('end', function() {
    console.log('Finished Reading Firebase');
  });

}).on('error', function(e) {
  console.error(e);
});

var rfidRead = function() {
  rfid.on('ready', function (version) {
    console.log('Ready to read RFID card');

    rfid.on('data', function(card) {
      var cardIDString = card.uid.toString('hex');
      console.log(cardIDString);
      console.log(masterpack);
      console.log('You added a ' + masterpack[cardIDString]);
    });
  });

  rfid.on('error', function (err) {
    console.error(err);
  });
}();

var createObjectFirebase = function(cardIDString) {
  var smartpackObjectDB = new Firebase('https://smartpack.firebaseio.com/masterpack/' + cardIDString);
  dataRef.on('value', function(snapshot) {
    console.log('You added your ' + snapshot.val());
  });
};