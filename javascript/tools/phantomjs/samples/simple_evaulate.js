var page = require('webpage').create(),
    url = 'http://www.google.com';


page.open(url, function(status) {
  var title = page.evaluate(function() {
    return document.title;
  });
  console.log(title);
  phantom.exit();
});