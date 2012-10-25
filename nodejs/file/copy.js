/*
 * 文件拷贝
 * pipe好牛逼，而且又快又方便
 */

var fs = require('fs'),
	readline = require('readline');

!function() {
	if (process.argv.length < 3) return;

	var wopt = {
		flags: 'w',
		encoding: 'null',
		mode: 0666
	};

	var ropt = {
		flags: 'r',
		fd: null,
		encoding: null,
		bufferSize: 256 * 1024
	};

	var readStream  = fs.createReadStream(process.argv[2], ropt);
	var writeStream = fs.createWriteStream(process.argv[3], wopt);
	var start = new Date();
	readStream.on('data', function(data) {
		writeStream.write(data);
	});

	readStream.on('end', function() {
		writeStream.end();
	});

	writeStream.on('close', function() {
		console.log('use: ', new Date() - start,'ms');
	});

	// readStream.pipe(writeStream);
	// writeStream.on('close', function() {
	// 	console.log('use: ', new Date() - start, 'ms');
	// });
}();