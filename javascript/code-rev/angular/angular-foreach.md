title: Angular Code Review --- forEach
tags: JavaScript, Angularjs
categories: Angularjs, JavaScript
id:511600cd52693ec83d000001
+++++++++++++++++++++++++++++++++++++++++++++++++

在 es5 中，开始为数组添加了一个方法 forEach。为了这个方法能兼容各种非现代浏览器。不同的类库或者框架的forEach在实现方式上也根据需要写了自己库中的 forEach。

首先我们需要抽象出这个 forEach，forEach 有两个参数，第一个参数是需要进行迭代的对象，第二个参数是 iterator，这个iterator其实就是对每个元素所进行的一系列操作。

```js
function forEach(obj, iterator, context) {
}
```

假设需要进行 forEach 的对象中只有数组

```js
function forEach(obj, iterator, context) {
  if (obj.forEach) {
    obj.forEach(iterator, context)
  }
  else {
    for (var i = 0, len = obj.length; i < len; i++) {
      iterator.call(context, obj[i], i)
    }
  }
}
```

其实就只是简单地判断一下是否支持原生的 forEach 方法，如果不支持那么就是用一般的 for 循环来实现这个迭代。

Angularjs 中的 forEach 做得十分极致，几乎一切的对象都是可迭代的，它传入的对象可以是数组，也可以是一般的对象，同时也可以是一个函数对象。下面把 Angularjs 的 forEach 给拆分出来。

### 函数对象 forEach ###

函数对象有几个属性是不应该被迭代的：

1. name      ------------   这是一个非标准属性，代表函数名
2. length    ------------   函数的 length 代表在函数被声明的时候形参的个数
3. prototype ------------   函数的原型

所以，根据上面三点，函数的迭代过程应该是下面这样

```js
function forEach(func, iterator, context) {
  for (var key in func) {
    if (key != 'name' && key != 'length' && key != 'prototype' && func.hasOwnProperty(key)) {
      iterator.call(context, func[key], key)
    }
  }
}
```

### 伪数组对象 forEach ###

伪装数组对象有它的 length，能通过下标访问到对象，例如每个函数中的 arguments 引用。所以在处理这类对象的时候可以使用两种方法。

1. Angularjs 中的实现

```js
function forEach(obj, iterator, context) {
  if (isObject(obj) && isNumber(obj.length)) {
    for (var i = 0; i < obj.length; i++) {
      iterator.call(context, obj[i], i);
    }
  }
}
```

2. 我突发奇想的实现, 在性能上相对会低点

```js
var toArray = [].slice();

function forEach(obj, iterator, context) {
  if (isObject(obj) && isNumber(obj.length)) {
    forEach(toArray.call(obj, 0), iterator, context)
  }  
  // 原生 forEach
  // ...
}
```

这种实现原理就是使用数组的 slice 方法来创建一个新的数组对象并将这个数组对象放回 forEach 中迭代。

### 普通的 Object forEach ###

普通的对象 forEach 相对简单很多：

```js
function forEach(obj, iterator, context) {
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      iterator.call(context, obj[key], key);
    }
  }
}
```

综合上面的各种情况，得出来 Angular.forEach

### Angular forEach ###

```js
function forEach(obj, iterator, context) {
  var key;
  if (obj) {
    if (isFunction(obj)){
      for (key in obj) {
        if (key != 'prototype' && key != 'length' && key != 'name' && obj.hasOwnProperty(key)) {
          iterator.call(context, obj[key], key);
        }
      }
    } else if (obj.forEach && obj.forEach !== forEach) {
      obj.forEach(iterator, context);
    } else if (isObject(obj) && isNumber(obj.length)) {
      for (key = 0; key < obj.length; key++)
        iterator.call(context, obj[key], key);
    } else {
      for (key in obj) {
        if (obj.hasOwnProperty(key)) {
          iterator.call(context, obj[key], key);
        }
      }
    }
  }
  return obj;
}
```









