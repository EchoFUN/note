
// 文件拷贝
// =======
// pipe好牛逼，而且又快又方便
// pipe速度一流，比直接on('data',[callback])要方便而且速度优化到最大
 

// init require
var fs = require('fs'),
	readline = require('readline');

!function() {
	if (process.argv.length < 3) return;

	// 输出流选项
	var wopt = {
		flags: 'w',
		encoding: 'null',
		mode: 0666
	};
	// 输入流选项
	var ropt = {
		flags: 'r',
		fd: null,
		encoding: null,
		bufferSize: 256 * 1024
	};

	// 创建输入流，输出流
	var readStream  = fs.createReadStream(process.argv[2], ropt);
	var writeStream = fs.createWriteStream(process.argv[3], wopt);
	// 初始化时间
	var start = new Date();

	// 以管道的方式把输入流和输出流连接起来
	readStream.pipe(writeStream);

	// 当管道传输结束的时候计算出时间
	writeStream.on('close', function() {
		console.log('use: ', new Date() - start, 'ms');
	});
}();