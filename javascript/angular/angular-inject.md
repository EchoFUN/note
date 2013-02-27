title: Angular Code Review --- inject/injector
tags: JavaScript, Angular
categories: JavaScript, Angular

++++++++++++++++++++++++++++++++++++++++++++++++++

今天开始分析 ***angular#injector***，***angular#injector***是有关依赖注入的的一个工具，在 ***angularjs*** 中， ***injector*** 无处不在。有了injector以后，就可以很方便地测试***angular#module***中的各种 ***service*** 和 ***filter*** 以及其他 ***provider*** 中的代码了。

### What is Injector ###

首先看看 ***injector*** 是如何进行使用的，根据注释文档。injector有下面这些作用。

> `$injector` is used to retrieve object instances as defined by
> {@link AUTO.$provide provider}, instantiate types, invoke methods,
> and load modules.

我翻译过来是这个意思：

> `$injector` 是用来取回一些由 `provider` 定义的一些对象实例(instance)，然后实例化并且调用之。
> 还有一个功能就是加载模块（也就是 angular.Module 所定义的一些模块）

`injector` 其本身也是一个 `provider` 所以下面这些断言(Jasmine)都是永远正确的：

```javascript
var $injector = angular.injector();   expect($injector.get('$injector')).toBe($injector);
expect($injector.invoke(function($injector){
	return $injector;
}).toBe($injector);
```

ps：源代码文件目录 src/auto/injector.js


### Annotation(注解) ###

如果你写过 Java，你多多少少会接触到一些注解，例如 jUnit 每个单元测试上的 @test 注解一样。主要还是为了能够更灵活地完成一些任务。有关于 Java 怎么去自定义一个注解以及注解有什么用在这篇文章中有详细的说明，由于反感 Java，所以烂得看了 --- [点击直达](http://www.infoq.com/cn/articles/cf-java-annotation)

由于JavaScript本身没有注解，而 Angularjs 又想把 injector 做得很魔法，类似下面的写法的结果都是一样的：

```javascript
var $injector = angular.injector();
$injector.invoke(function($compile, $rootScope) {
	console.log($compile);
	console.log($rootScope)
})
```

上面这个方法取回了一个 $compile 和一个 $rootScope，这两个对象都是 provider。但是，这种写法相当于是一种 Magic 的写法。其实最安全的写法是下面这两种，写完以后会说明为什么下面这种写法要更加的安全可靠:

安全写法 1

```js
var $injector = angular.injector();
$injetor.invoke(['$compile', '$rootScope', function($compile, $rootScope) {
  console.log($compile);
  console.log($rootScope)
}]);
```

安全写法 2

```js
var $injector = angular.injector();
function testFunc($compile, $rootScope) {
	console.log($compile);
	console.log($rootScope);
}
testFunc.$inject = ['$compile', '$rootScope'];
$injector.invoke(testFunc)
```

上面两种都属于安全写法，为什么？因为这个依赖注入是和参数名无关的了，虽然说非安全写法可以让人看起来更加神奇动态。但是 $compile，和 $rootScope 是什么，他们从哪里来，这会让人非常不解。在非安全写法中，甚至可以随意调换参数的位置但是可以达到同样的效果:

```javascript
var $injector = angular.injector();
$injector.invoke(function($rootScope, $compile) {
	console.log($compile);
	console.log($rootScope)
})
```

到这里为止，我们先要看看 angular 中 annotate 的实现, annoate方法的传入参数只有一个 ***Function*** 对象，而返回值就是一个字符串数组，这个字符串数组中的每一项都是fn所需要依赖的对象：

```js
// 注解
var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;      // 获取参数的 argumrnts 名
var FN_ARG_SPLIT = /,/;                                  // 参数分隔符号
var FN_ARG = /^\s*(_?)(\S+?)\1\s*$/;
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg; // 无视注释

function annotate(fn) {
  var $inject,
      fnText,
      argDecl,
      last;
  if (typeof fn == 'function') {
    if (!($inject = fn.$inject)) {
      $inject = [];
      fnText = fn.toString().replace(STRIP_COMMENTS, '');
      argDecl = fnText.match(FN_ARGS);                        
      forEach(argDecl[1].split(FN_ARG_SPLIT), function(arg){
        arg.replace(FN_ARG, function(all, underscore, name){
          $inject.push(name);
        });
      });
      fn.$inject = $inject;
    }
  } else if (isArray(fn)) {
    last = fn.length - 1;
    assertArgFn(fn[last], 'fn')
    $inject = fn.slice(0, last);
  } else {
    assertArgFn(fn, 'fn', true);
  }
  return $inject;
}
```

在这个方法中，如果传入的参数是一个函数对象并且这个函数对象没有 $inject 属性的话，annoate就会通过 toString() 方法获得函数代码，然后再从代码中把参数名给提取出来。假设我这样调用 annoate：

```js
console.log(annoate(function(a, b) {}));
```

其输出结果将会是 ['a', 'b']。这个方法其实也算是有违职责不单一，一个方法完成许多事的问题。这个函数在返回一个数组的同时给传入的函数增加了一个 $inject 属性。那么假设我们传入的函数不是匿名的，将会是下面这样的结果：

```js
function add(a, b) { return a + b }
annoate(add);
console.log(add.$inject) // ==> ['a', 'b']
```

所以，从这里可以看出，在invoke不声明依赖直接把函数的参数明作为依赖注入的名称是不安全的。因为在上线部署之前js代码必然会先被压缩一遍，压缩完以后才能上线，在压缩的过程中，不能保证 $compile 会被改名成 A/b 之类的各种奇葩的名字, 所以，提前声明好依赖注入要安全很多。而且声明依赖注入有大家习惯的使用类似 ***requirejs*** 的依赖声明的体验， 也有直接给方法写入 $inject 属性的这种直接而又暴利并且很有快感的体验。

### Angular#Injector ###

当调用 ***Angularjs*** 的 ***angular.injector()*** 时，实际上调用的是 ***createInjector()*** 方法，接下来会根据 ***createInjector*** 来看看到底是怎么生成这个 Injector 以及这个 Injector 里面都有些什么东西。

```js
// #1
function createInjector(modulesToLoad) {
  var INSTANTIATING = {},                     // #2
      providerSuffix = 'Provider',            
      path = [],
      loadedModules = new HashMap(),          // #3
      providerCache = {						   // #4
        $provide: {
            provider: supportObject(provider),
            factory: supportObject(factory),
            service: supportObject(service),
            value: supportObject(value),
            constant: supportObject(constant),
            decorator: decorator
          }
      },
      // #5 
      providerInjector = (providerCache.$injector =
          createInternalInjector(providerCache, function() {
            throw Error("Unknown provider: " + path.join(' <- '));
          })),
      instanceCache = {},
      // #6
      instanceInjector = (instanceCache.$injector =
          createInternalInjector(instanceCache, function(servicename) {
            var provider = providerInjector.get(servicename + providerSuffix);
            return instanceInjector.invoke(provider.$get, provider);
          }));

  // #7
  forEach(loadModules(modulesToLoad), function(fn) { instanceInjector.invoke(fn || noop); });
  // #8
  return instanceInjector;
  
  // #9 ... other codes
}
```

首先关注点就只在眼前这个方法中，不需要关心 ***supportObject*** 和 ***createInternalInjector*** 是什么。

1. 传入的参数是一个数组，类似 ['ng', 'myApp'] 这样的数组
2. 这个对象是一个判断某个 module 或者 provider 正在被实例化
3. 一个 HashMap 对象，其内部其实就是用一个普通对象来模拟的
4. 一些默认的 provider
5. injector 内部的 providerInjector
6. 实际的 injector 初始化方法
7. 加载所有传入的参数所需要的 modules
8. 返回 injector
9. provider moduleLoader InternalInjector这三种方法的定义


在此，我们会好奇 ***createInternalInjector*** 到底做了什么事情然后返回了一个 injector。接下来继续看看。

### createInternalInjector ###

先看看 createInternalInjector 的返回值。

```js
function createInternalInjector(cache, factory) {
  // codes…
  function invoke(fn, self, locals) {}
  function initantiate(Type, locals) {}
  function getService(serviceName) {}
  
  return {
    invoke: invoke,
    instantiate: instantiate,
    get: getService,
    annotate: annotate
  };
}
```

其实这个方法就是返回了一个接口，而传入了两个参数，再回去看看下面这段代码：

```js
providerInjector = (providerCache.$injector =
  createInternalInjector(providerCache, function() {
    throw Error("Unknown provider: " + path.join(' <- '));
}))
```

那么也就是 ***cahce === providerCache*** ，那个匿名函数抛出异常的那个错误就是 factory。当传入了。在初始化instanceInjector时，factory中就调用了 providerInjector：

```js
instanceInjector = (instanceCache.$injector =
  createInternalInjector(instanceCache, function(servicename) {
    var provider = providerInjector.get(servicename + providerSuffix);
    return instanceInjector.invoke(provider.$get, provider);
}));
```

当然，这些只是初始化了一个一个cache和fatory而已。紧接着，到 #9 开始使用了一个 forEach 来加载模块，每个加载了的模块都会被 ***instanceInject.invoke*** 当做参数给传入。所以继续向里剖析，invoke方法很明显是 ***createInternalInjector*** 返回对象的一个属性，也就是 ***function invoke()***，在invoke之前，还需要看看 ***loadModules*** 做了些什么事情。

```js
////////////////////////////////////
// Module Loading
////////////////////////////////////
function loadModules(modulesToLoad){
  // 定义一个 runBlocks, 应该是用来存放各种方法的
  var runBlocks = [];
  // 对于所有需要加载的模块名逐个进行遍历
  forEach(modulesToLoad, function(module) {
    // 如果模块已经被加载过，直接退出加载
    if (loadedModules.get(module)) return;
    // 设置这个模块已经被加载过，value是true~
    loadedModules.put(module, true);
    // 如果模块是一个字符串的话
    if (isString(module)) {
      // 那么通过 angularModule 方法获得模块的定义
      var moduleFn = angularModule(module);

      // 把这个载入的所有模块的依赖模块和runBlock给添加到当前的runBlock后面
      runBlocks = runBlocks.concat(loadModules(moduleFn.requires)).concat(moduleFn._runBlocks);
      try {
        for(var invokeQueue = moduleFn._invokeQueue, i = 0, ii = invokeQueue.length; i < ii; i++) {
          // invokeArgs = ['provider', 'method', arguments]
          var invokeArgs = invokeQueue[i],
              // 调用 getService 来获取对应的 'provider'
              provider = providerInjector.get(invokeArgs[0]);

          // provider[’method'].apply(provider, arguments)
          provider[invokeArgs[1]].apply(provider, invokeArgs[2]);
        }
      } catch (e) {
        if (e.message) e.message += ' from ' + module;
        throw e;
      }
    } else if (isFunction(module)) {
      try {
        runBlocks.push(providerInjector.invoke(module));
      } catch (e) {
        if (e.message) e.message += ' from ' + module;
        throw e;
      }
    } else if (isArray(module)) {
      try {
        runBlocks.push(providerInjector.invoke(module));
      } catch (e) {
        if (e.message) e.message += ' from ' + String(module[module.length - 1]);
        throw e;
      }
    } else {
      assertArgFn(module, 'module');
    }
  });
  return runBlocks;
}
```

在 [这篇review里](http://www.closure.pro/index.html#/article/51264a37b1f2cd0000000001)，讲了 ***angularModule*** 是做什么的，也讲了 ***invokeQueue*** 的数据结构格式。在这里还调用了 get 方法，也就是 getService。































