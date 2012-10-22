/**
 * 输入 readline
 * 初始化参数
 * 输入流 和 输出流
 * fs.rename();
 * fs.renameSync()
 * nodejs文件操作提供了两种选择，一种是异步的形式，
 * 另外一种是Sync的形式
 * 异步各种回调，但是貌似好点 = =！擦！
 */

var readline = require('readline'),
    fs  = require('fs');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var renameAsync = function() {
  (function(rl) {
    var srcPath;
    var destPath;
    rl.question('Input the src path:', function(answer) {
      srcPath = answer;
      rl.question('Input the dest path', function(answer) {
        destPath = answer;
        fs.rename(srcPath, destPath, function(err) {
          if (err) throw err;
          console.log('rename done');
          rl.close();
          process.exit(0);
        });
      });
    });
  })(rl);
};



var renameSync = function() {
  (function(rl) {
    var srcPath, destPath;
    rl.setPrompt('Input the src path > ');
    rl.prompt();
    rl.on('line', function(line) {
      if (!srcPath) { 
        srcPath = line;
        rl.setPrompt('Input the destPath > ');
        rl.prompt();
        return;
      }
      destPath = line;
      fs.renameSync(srcPath, destPath);
      console.log('rename done');
      rl.close();
    });
  })(rl);
};



renameSync();
