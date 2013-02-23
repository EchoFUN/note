title: Angular Code Review --- uid
tags: Angularjs, JavaScript
categories: Angularjs, JavaScript

++++++++++++++++++++++++++++++++++++++++

一般生成 uid 的思路有几种。基本都是离不开简单的计数器。计数器生成uid，在每次需要 uid 的时候给 uid += 1 就可以了，大概的实现代码如下所示。

### Simple Way ###

```js
var uid = 0;

function nextUid() {
  return uid++;
}
```

### setTimeout Way ###

当然还有人说过用 setTimeout 来生成 uid，当然这也保证了 uid 的唯一性。

```js
function nextUid() {
  return setTimeout();
}
```

根据 js 的实现， setTimeout 每次都会返回一个整数，这个整数是唯一的，用来 clearTimeout 用的。所以这也是一种生成 uid 的方式。

### Angular Way ###

其实 Angular 的 uid 的实现方式是使用 alpha number 来实现的，也就是包含了 0-1 a-z A-Z 这三种字符集合来当uid。

它有一段注释是这样写到的

    /**
     * A consistent way of creating unique IDs in angular. The ID is a sequence of alpha numeric
     * characters such as '012ABC'. The reason why we are not using simply a number counter is that
     * the number string gets longer over time, and it can also overflow, where as the nextId
     * will grow much slower, it is a string, and it will never overflow.
     *
     * @returns an unique alpha-numeric string
     */
    
也就是说用简单的计数器 id 有可能会造成溢出，但是到底是什么样的实现需要用到那么多的 uid 呢？

根据 EcmaScript 5 中的描述：

    The Number type has exactly 18437736874454810627 values, representing the double- precision 64-bit format IEEE 754 values as specified in the IEEE Standard for Binary Floating-Point Arithmetic, except that the 9007199254740990  distinct ―Not-a-Number‖ values of the IEEE Standard are represented in ECMAScript as a single special NaN value. 

那样的话就可以生成 18437736874454810627 个 uid。那样的话一般来说用简单的 counter 就可以满足实际的需求了吧。说归说，还是看看它是怎么实现的。

```js
function nextUid() {
  var index = uid.length;
  var digit;

  while(index) {
    index--;
    digit = uid[index].charCodeAt(0);
    if (digit == 57 /*'9'*/) {
      uid[index] = 'A';
      return uid.join('');
    }
    if (digit == 90  /*'Z'*/) {
      uid[index] = '0';
    } else {
      uid[index] = String.fromCharCode(digit + 1);
      return uid.join('');
    }
  }
  uid.unshift('0');
  return uid.join('');
}
```

从实现上来说，也就是从 0-9 到 A-Z 都是 uid 中合法的字符。这样的话用纯字符串在保证唯一性之余还不会溢出。具体Angula的作者为什么会认为一般的 numeric 会溢出的情况有人知道可以跟我讲解一下的亲，求解。






















