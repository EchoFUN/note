title: 用node.js做简易的爬虫(In Action)
categories: node.js
tags: Nodejs, Crawer
+++++++++++++++++++++++++++++

### 困难 ###

由于毕业设计需要，要在某个网站上抓取一些数据放到我的自己的数据库里。有两种完成这件事的方法，话说题目叫做 In Action 好无耻的样子：

1. 手动复制粘贴数据，造数据成我需要的格式再上传
2. 手写一个简单的爬虫把我需要的数据给抓下来

### 爬虫步骤 ###

作为一个有节操的程序员，果断选择了第二条路。在工具的选择上也果断选择了 node.js。这个爬虫原理很简单，步骤如下：

1. 向对方页面发送 HTTP 请求
2. 获取到页面响应数据（字符串HTML）
3. 由于获取到的数据的编码是 GB2312 的，所以把数据格式改回 UTF-8
4. 获取HTML内部的数据
5. 把数据存成文件或者直接导入数据库中

### 请求 ###

发送请求用的是 [request](https://npmjs.org/package/request)，request用起来很方便很有jq的感觉，所以在这里直接用它。一般这种抓爬数据的直接发的是 GET 请求，所以并不需要考虑太多的东西：

```js
request({
  url: 'http://some/url',
  encoding: null
}, function(err, res, body) {
  // parse the body
});
```

### 从gb2312到utf-8 ###

第一次从页面上抓取数据下来的时候有一个问题，所有的中文字符都是 <?>，这是个很严重的问题。在网页编码上面大大地写着 chrset=gb2312。但是我需要的是utf-8编码的结果，我尝试使用 node.js 内置的 StringDecoder，无果。那个玩意只支持 utf-8 有木有！！！！所以经过了一番寻觅我找到了我的大 Iconv，转化我需要的编码 T T。Iconv用法也很简单有木有:

```js
Iconv   = require('iconv').Iconv;
function parseBodyToUTF8(body) {
  var iconv = new Iconv('gb2312', 'utf-8');
  var html = iconv.convert(body).toString();
  return html;
}
```

### 抓取HTML中的数据 ###

提取数据通常使用正则来完成。但是我们是在用JavaScript诶，而且我们得到的完整数据是HTML。所以扔掉正则，用吾大 jsdom 来完成我需要的工作吧。jsdom是什么，直接看看[官网介绍](https://github.com/tmpvar/jsdom)。现在我可以使用jsdom以前端的方式去解析获得到的html数据了:

```js
function getDataIWantFromHtml(html) {
  jsdom.env(html, ['http://path/to/jquery.min.js'], function(err, window) {
    var $ = window.$;
    // do what ever I want
  });
}
```

### 取到数据以后干嘛 ###

这个就是你个人喜好了，其实用 node.js 做一个网页爬虫还是比较简单的。上面三个工具就可以完全满足你的抓爬需求。当然nodejs还有很多很好玩的package。例如 html-to-json 之类的啦，那些就不在本文涉及范围内了。可以确定的是，用 node 来抓取数据的速度是相当可观的。





