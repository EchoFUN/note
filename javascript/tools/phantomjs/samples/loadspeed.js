var page = require('webpage').create(),
    system = require('system'),
    t, address;

if (system.args.length == 1) {
  console.log('使用 phantom loadspeed.js <URL>，来启动脚本');
  phantom.exit();
}

t = Date.now();
address = system.args[1];

page.open(address, function(status) {
  if (status != 'success') {
    console.log('FAILED TO LOAD THE ADDRESS:', address);
  }
  else {
    t = Date.now() - t;
    console.log('载入网页使用了:' + t + 'ms');
  }

  phantom.exit();
});



