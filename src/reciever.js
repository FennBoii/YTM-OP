var osc = require('osc-min'),
	dgram = require('dgram');
var remotes = [];
var FileReader = require('fs');

// listen for OSC messages and print them to the console
var udp = dgram.createSocket('udp4', msg => {
	try {
		var oscmsg = osc.fromBuffer(msg);
		console.log(oscmsg);
		remotes.forEach(remote => {
			udp.send(msg, 0, oscmsg.length, 10000, remote);
			console.log('Sent OSC message to %s:%d', remote, 10000);
		});
	} catch (err) {
		console.log(err);
	}
});

FileReader.readFile('ips.txt', 'utf8', Error, data => {
	// By lines
	var lines = data.split('\n');
	for (var line = 0; line < lines.length; line++) {
		remotes.push(lines[line]);
	}
});

var portSet = 9001;
udp.bind(portSet);
console.log('Listening for OSC messages on port', portSet);
