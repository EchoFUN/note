title: Angular Code Review --- bind
tags: JavaScript, Angularjs, Functional
categories: JavaScript, Angularjs
id:51175d96880f6a8b47000002

+++++++++++++++++++++++++++++++++++++++++++++++++++

关于bind，ECMAScript 5 中给 bind 提供了原生支持。bind的作用就是通过一个函数创建一个新函数，这个函数的执行作用域作为bind的第一个参数传入，后续传入的参数按顺序作为默认参数传入方法，具体写法是这样的：

```js
function func() {}
func.bind(thisArg[, arg1, arg2...])
```

除了 thisArg 传入了一个限定的作用域以外，别的参数就是提供 currying 支持的。就是前面这些参数作为函数的前几个参数传入。例如:

```js
function add(a, b) { return a + b }
var addTwo = function() {
  var firstParam = 2;
  return function(b) {
    add(firstParam, b)
  }  
}
```

再进一步抽象，那样就可以生成更多的变化：

```js
function addN(n) {
  return function(b) {
    add(n, b);
  }
}

addOne = addN(1);
console.log(addOne(2));   // output ---> 3

addTwo = add(2);
console.log(addTwo(2));   // output ---> 4
```

curring无处不在，包括了 underscore 的 template，template传入一个字符串参数。然后返回一个函数，当这个函数传入一个对象的时候再把它解析成一个字符串。这样的重用度非常高。

```js
var compiled = _.template("hello: <%= name %>");
compiled({name : 'moe'});
// => "hello: moe"
```

它的实现就是 curring 的使用。回到bind方法，由于bind方法是 ECMAScript 中才提供的新特性，所以并不是所有的现代浏览器都支持这个方法。在MDN的实现中，它先判断Function.prototype.bind方法是否存在，如果不存在就是用 apply 来模拟 bind 方法然后给 Function.prototype 加上一个 bind 方法。

```js
if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
    if (typeof this !== "function") {
      // closest thing possible to the ECMAScript 5 internal IsCallable function
      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }
 
    var aArgs = Array.prototype.slice.call(arguments, 1), 
        fToBind = this, 
        fNOP = function () {},
        fBound = function () {
          return fToBind.apply(this instanceof fNOP && oThis
                                 ? this
                                 : oThis,
                               aArgs.concat(Array.prototype.slice.call(arguments)));
        };
 
    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
 
    return fBound;
  };
}
```

### Angular Way ###

*** Angular.bind *** 的写法并没有侵入性，它没有去修改 Function 的原型。所以它使用的是直接把 Function 对象作为参数来传入。

```js
/**
 * @ngdoc function
 * @name angular.bind
 * @function
 *
 * @description
 * Returns a function which calls function `fn` bound to `self` (`self` becomes the `this` for
 * `fn`). You can supply optional `args` that are are prebound to the function. This feature is also
 * known as [function currying](http://en.wikipedia.org/wiki/Currying).
 *
 * @param {Object} self Context which `fn` should be evaluated in.
 * @param {function()} fn Function to be bound.
 * @param {...*} args Optional arguments to be prebound to the `fn` function call.
 * @returns {function()} Function that wraps the `fn` with all the specified bindings.
 */
function bind(self, fn) {
  // curry化参数
  var curryArgs = arguments.length > 2 ? sliceArgs(arguments, 2) : [];
  if (isFunction(fn) && !(fn instanceof RegExp)) {
    // 三目运算，如果有curry化参数
    return curryArgs.length
      ? function() {
          return arguments.length
            ? fn.apply(self, curryArgs.concat(slice.call(arguments, 0)))
            : fn.apply(self, curryArgs);
        }
      : function() {
          return arguments.length
            ? fn.apply(self, arguments)
            : fn.call(self);
        };
  } else {
    // in IE, native methods are not functions so they cannot be bound (note: they don't need to be)
    return fn;
  }
}
```

