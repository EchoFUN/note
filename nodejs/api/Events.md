nodejs 中的 Events
===========================

Events
-----------

Nodejs中许多的对象都会触发事件：一个 net.Server 每接收一个连接都会触发事件，一个 fs.readStream 在一个文件打开的时候会触发事件。所有能触发事件的对象都是一个 Events.EventEmitter 的实例。你可以通过调用 require('events') 来获得这个模块。

尽管没有什么严格的限定，事件名可以使用任何字符串来表示。但是在通常情况下，事件名都是遵循驼峰命名法的字符串。

函数可以绑定到对象上，在某个事件被触发的时候被调用。这些函数都叫做监听者。

Class:events.EventEmitter
---------------------------

通过 require('events').EventEmitter 来获取 EventEmitter 类。

当一个 EventEmitter 实例出现一个错误的时候，标准的行为是触发一个 error 事件。错误事件将会被 nodejs 作特殊处理。如果没有给错误绑定任何监听者进去，那么node将会在控制台上输出错误栈并且退出程序。

所有的 EventEmitters 当添加一个事件监听者的时候都会触发 'newListener' 事件。

### emitter.addListener(event, listener) ###
### emitter.on(event, listener) ###
把一个listener添加到对应event的数组末尾中
```js
server.on('connection', function(stream) {
  console.log('someone connected!');
});
```

### emitter.once(event, listener) ###
添加一个一次性监听者给event中。这个监听者只会被调用一次，并且被调用以后这个事件将会被删除掉。

```js
server.once('connection', function(stream) {
  console.log('Ah, we have our first user!');
});
```

### emitter.removeListener(event, listener) ###
删除对应事件中的某个监听器。注意：这个方法将会改变其他监听者在监听数组中的下标(index)。

```js
var callback = function(stream) {
  console.log('someone connected!');
};

server.on('connection', callback);
server.removeListener('connection', callback);
```

### emitter.removeAllListeners([event]) ###
删除所有监听者，或者对应事件的监听者。

记住这个操作会使所有的由 emitter.listeners(event) 返回的事件数组失效。

### emitter.setMaxListeners(n) ###
在默认情况下，给某个事件绑定超过10个方法的时候会产生一个警告。这是一个很好的默认值来帮助可以找到内存泄露。明显的并不是所有的 Emitter 对象都要限定为10。这个方法允许设置上限数，当设置为0的时候就是没有限制了。

### emitter.listeners(event) ###
返回对应事件的监听者数组

```js
server.on('connection', function(stream) {
  console.log('someone connected!');
});
console.log(util.inspect(server.listeners('connection'))); // [[Function]]
```

这个返回的数组的引用是和对应事件的监听者数组是同一个对象。所以 removeAllListeners 将会把这个引用给无效化。

如果你有特殊的需求需要拷贝一份监听者数组，你可以这样做 emitter.listeners(event).slice(0)。

在未来版本的Nodejs中，为了前后一致，这个方法可能会每次都返回一份拷贝而不是引用。在你的程序中，请不要使用数组方法来改变某个事件的监听者数组。请用on来添加新的监听者。

### emitter.emit(event, [arg1], [arg2], [...]) ###
触发某个事件，并且按顺序传入参数列表。

Event:'newListener'
-------------------------------
* event String 事件名
* listener Function 对应事件的函数对象

这个事件在每次添加监听者的时候都会被调用。




