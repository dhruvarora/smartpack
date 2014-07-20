var tessel = require('tessel');
var https = require("https");

var rfidlib = require('rfid-pn532');
var rfid = rfidlib.use(tessel.port['A']);

var masterpackDBString = '';
var masterpackDB;

var req = https.get('https://smartpack.firebaseio.com/masterpack.json', function(res) {
  console.log("Status Code:", res.statusCode);
  res.on('data', function(d) {
    masterpackDBString += d;
  });
  res.on('end', function() {
    console.log('Finished Reading Firebase');
    rfidRead();
  });
});

req.on('error', function(e) {
  console.error(e);
});

var rfidRead = function() {
  rfid.on('ready', function (version) {
    console.log('Ready to read RFID card');

    rfid.on('data', function(card) {
      var cardIDString = card.uid.toString('hex');
      console.log(cardIDString);
      // console.log("DB STRING:", masterpackDBString);
      if (masterpackDBString) {
        masterpackDB = JSON.parse(masterpackDBString);
        console.log(masterpackDB[cardIDString[1]]);
        if (masterpackDB[cardIDString][1]) {
          console.log('You added your ' + masterpackDB[cardIDString][0]);
        } else {
          console.log('You removed your ' + masterpackDB[cardIDString][0]);
        }
      } else {
        console.log('MasterpackDBString came back empty!');
      }
    });
  });

  rfid.on('error', function (err) {
    console.error(err);
  });
};