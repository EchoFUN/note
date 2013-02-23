title: Angular Code Review --- angular.Module
tags: Angularjs, JavaScript
categories: Angularjs, JavaScript
id:51264a37b1f2cd0000000001
++++++++++++++++++++++++++++++++++++++++++++

angular.Module 方法在 angular 中属于注册模块的方法，所有的原生模块和自定义模块都是使用这个方法来把定义的模块注册到angular上。在 angular 初始化时，会调用 ```angularModules = setupModuleLoader(window)``` ，本文主要看看在执行这个过程中 angular 的初始化到底做了些什么事情。

### ensure ###

首先会在 ***setupModuleLoader*** 里的上部看到一个方法， ***ensure***，也就是确保的意思，在这里，绝世确保某个属性在某个对象会被注册上去：

```js
function ensure(obj, name, factory) {
  return obj[name] || (obj[name] = factory());
}
```

接着， 可以看出，这个对象返回了 obj[name] ，也就是在下面的调用过程中，整个函数返回的是 angular['module']:

```js
function setupModuleLoader(window) {

  function ensure(obj, name, factory) {
    return obj[name] || (obj[name] = factory());
  }
  // #1
  return ensure(ensure(window, 'angular', Object), 'module', function() {
    // module 定义...
  });
}
```

上面的代码首先调用 ```ensure(window, 'angular', Object)``` 以确保在 window 上注册的 angular 对象存在。所以 #1 代码可以看成:

```js
return ensure(angular, 'module', function() {
  // def...
})
```

那么，这次返回的就是 angular.module 了。嗯，值得借鉴的写法 ^ ^。顺便说一下，factory相当于构造类的工厂，它是无参的，因为即使传入有参数的方法它也是无效的。

注释中写到：

> A module is a collocation of services, directives, filters, and configuration information. 

也就是

> 一个模块包含了多个 services, directives, filters 和 configuration 信息。

### Module Definition ###

所有modules都存放在一个普通的 Object 对象中，也就是``` var modules = {}; ```。所以说它可以是获取模块和设置模块的来源。所以 definition 的代码可以看成下面这样。

```js
function definition() {
  var modules = {}

  return function module(name, requires, configFn) {
    // 如果有写第二个参数，那么就是有依赖的模块
    // 如果有依赖的模块那么就是重新定义一个模块
    if (requires && modules.hasOwnProperty(name)) {
      modules[name] = null;
    }

    // return modules['name']
    return ensure(modules, name, function() {
      // another definition
    })
  }
}
```

在这里，function module 返回的是一个模块，也就是 modules['name']，这个模块可以是已经定义过或者如果传入 requires 的话就是新定义的一个模块。接着，angular继续使用 ensure 来生成对应的 modules['name']。

### Generate A Module ###

由于生成一个module的代码也是被包含在一个回调函数中的，所以假设这个函数名为 genModule：

```js
// pre defined
// var modules, requires, configFn
function genModule() {
  if (!requires) {
    throw Error('No Module: ' + name);
  }

  var invokeQueue = [];
  var runBlocks = [];
  // TODO: find out what is invokeLater
  var config = invokeLater('$injector', 'invoke');

  var moduleInstance = {
    // private state
    _invokeQueue: invokeQueue,
    _runBlocks: runBlocks,
    requires: requires,
    name: name,
    provider: invokeLater('$provide', 'provider'),
    factory: invokeLater('$provide', 'factory'),
    service: invokeLater('$provide', 'service'),
    value: invokeLater('$provide', 'value'),
    constant: invokeLater('$provide', 'constant', 'unshif'),
    filter: invokeLater('$filterProvider', 'register'),
    controller: invokeLater('$controllerProvider', 'register'),
    directive: invokeLater('$compileProvider', 'directive'),
    config: config,
    run: function(block) {
      runBlocks.push(block);
      return this;
    }
  };

  if (configFn) {
    config(configFn);
  }

  return moduleInstance;

  // invokeLater !
  function invokeLater(provider, method, insertMethod) {
    return function() {
      invokeQueue[insertMethod || 'push']([provider, method, arguments]);
      // 支持链式调用
      return moduleInstance;
    }
  }
}
```

要读懂上面的代码，先要看懂 invokeLater 是做什么的，从上面的 invokeLater 可以看到，invokeLater调用过后其实就是返回一个 function，接着把之前定好的参数在闭包中当做默认值被传入新的函数实例中，所以这是一个currying的过程。具体什么是 currying ，可以查看[这个连接](http://zh.wikipedia.org/wiki/%E6%9F%AF%E9%87%8C%E5%8C%96)。从这段代码可以看出来，当调用了```angular.module('myModule', []).controller([function() {}])```这样的代码的时候，我们在controller方法中实际上传入的就是 ```invokeQueue[insertMethod || 'push']([provider, method, arguments])``` 这段代码的arguments。也就是说，我们自定义了一个 controller 以后，我们在controller定义时传入的参数会被结构化成：

```js
['$controllerProvider', 'register', ['$xxx',function() {$xxx}]]
```

紧接着这个数组会被 push 入每个 module 的 invokeQueue 中，这个 invokeQueue 里面有些什么内容可以从每个module的返回值中的 _invokeQueue 来查看到，不过不建议手动去修改里面的东西。

### provide 分类 ###

从先前的代码， 每个module的方法都是由 invokeLater 所创建出来的一个currying方法。但是在初始化这些方法时有一些相似之处。很多的初始化方法传入了 '$provide' 作为第一个参数。所以根据这些provide归类一下：

1.  $provide
    1. provider
    2. factory
    3. service
    4. value
    5. constant
2.  $filterProvider
    1. filter
3.  $controllerProvider
    1. controller
4.  $compileProvider
    1. directive
5.  $injector
    1. config

可以看到，在angular中并没有什么 module 类什么的，就是一个纯粹的 {} 对象而已。它通过闭包中的变量来维持一些私有变量来达到一些方法或者私有属性的调用。关于 provider 的分类和说明下篇继续。















