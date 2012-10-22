var fs = require('fs');

var counter = 0;
fs.watchFile('./echo.js', function(prev, current) {
  counter += 1;
  console.log('prev mtime:', prev.mtime);
  console.log('current mtime:', current.mtime);
  if (counter == 20) 
    fs.unwatchFile('./echo.js');
});