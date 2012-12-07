Utilities(实用工具)
==============================

### util ###
这个方法在 util 模块中。使用 require('util') 来获取它。

### util.format(format, [...]) ###
返回一个格式化字符串，和printf类似

第一个参数是一个字符串，这个字符串包含零个或多个占位符。每一个占位符都会按顺序地被后面对应的参数替换掉。下面是支持的占位符：

* %s - String
* %d - Number (整形和浮点型)
* %j - JSON
* %  - 单个百分号将不会产生任何替换

如果占位符没有对应的参数来替换，那么这个占位符将不会被转义：

```js
util.format('%s:%s', 'foo');   // 'foo:%s'
```

如果后面给出的参数多过占位符，那么这些参数将会被 util.inspect() 转换并且前面添加一个空格跟到结果字符串中。

```js
util.format('%s:%s', 'foo', 'bar', 'baz');   //'foo:bar baz'
```

当第一个参数不是格式化字符串的时候，这个方法将会用空格分隔每个参数，并且这些参数都由util.inspect() 来转化成字符串。

```js
util.format(1,2,3); //'1 2 3'
```

### util.debug(string) ###
一个同步的输出函数。这个函数将会阻塞进程然后立即讲字符串传到 stderr 中。

```js
require('util').debug('message on stderr');
```

### util.error([...]) ###
和 util.debug() 一样，但是它是吧所有的参数立即传给 stderr

### util.puts([...]) ###
一个同步的输出方法，将会阻塞进程，并把所有的参数转成字符串传给 stdout，每一个参数占一行。

### util.print([...]) ###
一个同步的输出方法，将会阻塞进程，并把所有的参数转成字符串传给 stdout，输出这些参数不换行。

### util.log(string) ###
输出带有时间戳的字符串

```js
reuqire('util').log('Timestamped message');
```

### util.inspect(object, [showHidden], [depth], [colors]) ###
返回参数 object 的字符串表达形式，在调试的时候非常有用。

如果参数 showHidden 的值是 true， 那么对象里面的一些不可迭代的熟悉也会被输出出来(eg:Function)。默认值是false。

如果提供了 depth 参数，那么这会告诉inspect方法递归某个对象的深度，这对输出结构复杂而又庞大的对象非常有用。

如果保持默认，那么改方法只会递归两次。如果需要进行无限深度的递归，那么这个depth参数传入null即可。

如果 colors 参数设置为 true， 那么输出将会带有 ANSI 颜色高亮，默认值是false。

下面是获得 util 对象的所有属性的例子：

```js
var util = require('util');

console.log(util.inspect(util, true, null));
```

可以给对象定义一个自己的inspect(depth)，那么util.inspect()将会调用这个方法的结果作为返回结果：

```js
var util = require('util');

var obj = {name: 'nate'};
obj.inspect = function(depth) {
  return '{' + this.name + '}';
};

util.inspect(obj);
    // "{nate}"
```

### util.isArray(object) ###
如果 object 是一个数组对象的话那么返回true，否则false

```js
var util = require('util');

util.isArray([])
  // true
util.isArray(new Array)
  // true
util.isArray({})
  // false
```

### util.isRegExp(object) ###
如果 object 是一个正则表达式对象的话返回true， 否则false

```js
var util = require('util');

util.isRegExp(/some regexp/)
  // true
util.isRegExp(new RegExp('another regexp'))
  // true
util.isRegExp({})
  // false
```

### util.isDate(object) ###
如果 object 是一个 Date 对象的话返回true，否则false

```js
var util = require('util');

util.isDate(new Date())
  // true
util.isDate(Date())
  // false (without 'new' returns a String)
util.isDate({})
  // false
```

### util.isError(object) ###
如果 object 是一个 Error 对象的话返回 true， 否则false

```js
var util = require('util');

util.isError(new Error())
  // true
util.isError(new TypeError())
  // true
util.isError({ name: 'Error', message: 'an error occurred' })
  // false
```

### util.pump(readableStream, writableStream, [callback]) ###
从 readableStream 中读取数据并把这些数据穿送给 writableStream。当writableStream.write(data)返回false的时候，readableStream将会暂停直到writableStream的drain事件触发。callback 只会传入一个错误参数，并且这个callback将会在 writableStream 关闭或者发生错误时被调用。


### util.inherits(constructor, superConstructor) ###
从一个构造器把原型方法继承到另外一个构造器中。constructor的原型将会被设置为一个由superConstructor所创建的新对象。

为了方便，superContructor将可以通过 constructor.super_ 属性获得。

```js
var util = require('util')
  , events = require('events');

function MyStream() {
  events.EventEmitter.call(this);
}

util.inherits(MyStream, events.EventEmitter);

MyStream.prototype.write = function(data) {
  this.emit('data', data);
}

var stream = new MyStream();

console.log(stream instanceof events.EventEmitter);   // true
console.log(MyStream.super_ === events.EventEmitter); // true

stream.on('data', function(data) {
  console.log('Received data:"' + data + '"');
});

stream.write('It works!');
```
