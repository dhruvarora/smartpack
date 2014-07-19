var tessel = require('tessel');
var rfidlib = require('rfid-pn532');
var rfid = rfidlib.use(tessel.port['A']);

var IDList = {};

var rfidRead = function() {
  rfid.on('ready', function (version) {
    console.log('Ready to read RFID card');

    rfid.on('data', function(card) {
      var cardIDString = card.uid.toString('hex');
      console.log('UID:', cardIDString);
      IDList.push(card.uid.cardIDString);
    });
  });

  rfid.on('error', function (err) {
    console.error(err);
  });
};

process.on('message', function(IDList) {
  console.log('Message Received');
  rfidRead();
  process.send(IDList);
});

process.ref();

