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

var http = require('http');

var statusCode = 200;
var count = 1;

setImmediate(function start () {
  console.log('http request #' + (count++))
  http.get("http://httpstat.us/" + statusCode, function (res) {
    console.log('# statusCode', res.statusCode)

    var bufs = [];
    res.on('data', function (data) {
      bufs.push(new Buffer(data));
      console.log('# received', new Buffer(data).toString());
    })
    res.on('end', function () {
      console.log('done.');
      setImmediate(start);
    })
  }).on('error', function (e) {
    console.log('not ok -', e.message, 'error event')
    setImmediate(start);
  });
});