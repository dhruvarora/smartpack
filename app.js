var Firebase = require('firebase');
var tessel = require('tessel');
var script =  '/tessel-code/rfid.js';

var smartpackDB = new Firebase('https://smartpack.firebaseio.com/masterpack');
smartpackDB.on('value', function(snapshot) {
  console.log("Reading Database");
});

tessel.findTessel(null, true, function(err, client) {
  if (err) throw err;
  client.run(__dirname + script, ['tessel', script], {
      single: false,
    }, function () {
      client.stdout.resume();
      client.stdout.pipe(process.stdout);
      client.stderr.resume();
      client.stderr.pipe(process.stderr);
      console.info('Running script...');

      var count = 0;

      setInterval(function(){
        console.log('ping');
        client.interface.writeProcessMessage({count:count++, data: {foo: 'bar'}});
        client.once('message', function (m) {
          console.log('pong', m.count);
        });
      }, 1000);

      // Stop on Ctrl+C.
      process.on('SIGINT', function() {
        setTimeout(function () {
          logs.info('Script aborted');
          process.exit(131);
        }, 200);
        client.stop();
      });

      client.once('script-stop', function (code) {
        client.close(function () {
          process.exit(code);
        });
      });
  });
});