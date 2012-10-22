var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.setPrompt('echo > ');
rl.prompt();

rl.on('line', function(line) {
  switch(line.trim()) {
    case 'kidd':
      console.log('hello handsome kidd');
      rl.close();
      break;
    default:
      console.log('you must say kidd');
      break;
  }
  rl.prompt();
});

/**
 *  当用户结束输入的时候触发
 */
rl.on('pause', function() {
  console.log('input is on pause');
});

/**
 * readline关闭的时候触发
 */
rl.on('close', function() {
  console.log('input is on close!');
  process.exit(0);
});

/**
 *
 */
rl.on('resume', function() {
  console.log('input is on resume');
});

/**
 * 当用户按下 ^C 时触发该事件 
 */
rl.on('SIGINT', function() {
  rl.question('Are you sure you want to exit?', function(answer) {
    if (answer.match(/^y(es)?$/i)) rl.pause();
  });
});

/**
 * 当监听SIGTSTP时，会覆盖掉原来的后台运行的行为
 */
rl.on('SIGTSTP', function() {
  // This will override SIGTSTP and prevent the program from going to the
  // background.
  console.log('Caught SIGTSTP.');
});