title: Phantomjs快速入门
desc: Phantomjs 是一款强大的服务器端浏览器，可以用于各种自动化场合，常用于自动化单元测试和网页性能自动化分析等。现在有许多基于Phantomjs的自动化脚本可供使用。为了不落后，赶紧学学...
tags: Phantomjs, 自动化
categories: Phantomjs
id:50f601478580098b3c000001

++++++++++++++++++++++++++++++++++++

### Hello World ###

第一个官方示例

```js
console.log('hello world');
phantom.exit();             // 不加上这句不会退出程序
```

保存为 hello_world.js 然后运行

```shell
phantomjs hello_world.js
```

运行它，在shell中输出结果：

```shell
hello world
```

然后退出。调用 phantom.exit() 非常重要，不调用它就不退出 phantomjs 进程。

### 加载网页 ###

可以通过创建一个 ***page*** 对象来进行网页加载，下面这段程序加载了google主页并把它截图为 ***google.png*** 。

```js
// commonjs 规范 require
var page = require('webpage').create();

// 用 open 方法打开 google
page.open('http://google.com', function() {

  // render 方法截图然后退出，截图完成后保存在当前目录下
  page.render('google.png');
  phantom.exit();
});
```

由于有这个渲染功能，所以 phantomjs 可以用于网页抓取网页。下面这段脚本用于获取特定 url 的网页加载速度。

```js
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
```

执行命令

```shell
phantomjs loadspeed http://baidu.com
```

输出：

```shell
载入网页使用了:24ms
```

### 执行页面代码(Code Evaluation) ###

可以在页面中运行 JavaScript 代码，并且执行代码的上下文是在整个网页对象中。整个实行代码的过程都是在 ’sandbox‘中进行，所以执行的页面代码不能访问闭包以外的变量。要使用这个功能就要调用 ***evaluate()*** 方法。对象可以通过这个方法的返回值返回出来。

下面是获取网页标题的例子：

```js
var page = require('webpage').create(),
    url = 'http://www.google.com';


page.open(url, function(status) {
  var title = page.evaluate(function() {
    return document.title;
  });
  console.log(title);
  phantom.exit();
});
```
由于脚本是在一个浏览器里面跑的，所以HTML和CSS都可以正常运行，这让 Phantonjs 很适合去做一些页面自动化...

### 网页请求和网页响应 ###

当网页从远程服务器进行加载时，请求和响应可以通过 ***onResourceRequested*** 和 ***onResourceReceived*** 回调来抓取。

```js
var page = require('webpage').create();
page.onResourceRequested = function (request) {
    console.log('Request ' + JSON.stringify(request, undefined, 4));
};
page.onResourceReceived = function (response) {
    console.log('Receive ' + JSON.stringify(response, undefined, 4));
};
page.open(url);
```

输出格式是HAR格式，可以通过  HAR Viewer 来查看














