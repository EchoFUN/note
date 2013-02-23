Metor 0.5.4
==========================================

***Metor 是一个搭建线代网站极度简单的环境。使用Meteor来开发，开发周期可以缩减至一周，如果包括了一些很牛逼的工具，甚至花几小时就可以足够。***

web从70年代开始就以相同的方式进行运作直到现在。网络服务器把所有内容渲染然后把渲染好的数据直接传给客户端（浏览器）。无论用户执行什么操作，服务器永远都给客户端渲染一个全新的页面。这种传统网络应用模型持续了很多年直到LAMP, Rails, Django, PHP的发展。

但是现代的最佳实践是这样的，在有大预算和很长的开发周期下，线代的web app应该是由JavaScript来实现并且把客户端应用给跑起来。这些应用有着各种神奇的用户界面。它们不刷新页面。它们反应迅速：客户端的变化能够立即在用户面前显示出来。

但是要实现这样的应用程序开发难度很大。Meteor最大地简化了这种应用程序的开发,而且开发这种app会变得很有趣。它快到你可以在一个周末就完成一个完成的应用程序，或者在hackton中先拔头筹(blablabla)，你不再需要管理服务器的资源或者关心如何部署云端的api接口，或者操作数据库，甚至是争论使用什么ORM来操作数据库，或者在Ruby和JavaScript之间不断地来回切换，或者给客户端发送没用的数据。

> Meteor is a work in progress, but we hope it shows the direction of our thinking. We'd love to hear your feedback.

> — Geoff, Nick, Matt, David, Avital, and David

快速开始
-----------------------------------------

支持的(运行平台如连接所示)[https://github.com/meteor/meteor/wiki/Supported-Platforms]

安装 Meteor

```bash
$ curl https://install.meteor.com | /bin/sh
```

创建一个新工程:

```bash
$ meteor create myapp
```

在本地运行

```bash
$ cd myapp
$ meteor
Running on: http://localhost:3000/
```

在现实中部署（貌似是他们提供的服务器）

```bash
$ meteor deploy myapp.meteor.com
```

七个Meteor中的原则
-------------------------------------

* Data on the wire。在网络中不传输HTML。把数据发送到客户端上让客户端自己对数据进行渲染。
* One Language。无论在客户端和服务端写的都是JavaScript。
* Latency Compensation。在客户端中，使用预取回(prefetching)然后模拟model让你看起来对数据库链接一点依赖都没有。
* Full Stack Reactivity。默认实时运作，所有的层，从数据库到模板，应该都有提供事件接口。
* Embrace the Ecosystem。Meteor是开源并且灵活的，并不替换当前已经存在的开源工具和类库。
* Simplicity Equals Productivity。最好的让某些东西变得简单的方法是让它找你的很简单。通过干净，经典而且漂亮的APIs来完成。


开发资源
--------------------------------------

如果你抓到 Meteor 中你的兴趣点，我们希望你可以参与到这个项目中。

   Stack Overflow
      最好的问（回答）技术问题的地方。[Stack Overflow](http://stackoverflow.com/questions/tagged/meteor)

   邮件列表
      Meteor有两个主要的邮件组。meteor-talk@googlegroups.com 用于一般的问题，和一个新工程的声明。
      meteor-core@googlegroups.com 是国际讨论组然后提供更新

   IRC
      #meteor在irc.feednode.net。开发者将会尽可能的回答你的问题。
   GITHUB
      代码在GITHUB中托管。最好的发送补丁Path和Pull Request的地方，最好的报告bug和跟踪bug的地方。
      
--------------------------------------------------------------

基本概念
============================================

我们可以自制单页应用并且只用JavaScript一种语言，数据格式也只有JSON一种。Meteor拥有一切你想要的。

### 你的应用程序结构 ###

















