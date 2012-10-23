var fs = require('fs'),
	readline = require('readline'),
	rl = readline.createInterface({input: process.stdin, output: process.stdout});

var fileName, fileDes;

rl.question('file name >', function(answer) {
	fileName = answer;
	fs.open(fileName, 'w+', function(err, fd) {
		if (err) throw err;
		fileDes = fd;
		_doWrite.call(this, fd);
	});
});

function _doWrite(fd) {
	_closefd.call(this, fd);
	rl.setPrompt('> ');
	rl.prompt();
	rl.on('line', function(line) {
		switch(line) {
			case 'END':
				rl.close();
				break;
			default:
			fs.appendFile(fileName, line + '\r\n', function(err) {
				if (err) throw err;
				rl.prompt();
			});

		}
	});
}

function _closefd(fd) {
	fs.close(fd, function(err) {
		if (err) throw err;
		console.log('close done');
	})
}