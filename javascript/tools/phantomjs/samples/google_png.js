var page = require('webpage').create();

page.open('http://www.baidu.com', function(status) {
  page.render('renren.png');
  phantom.exit();
});