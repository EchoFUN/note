HTTP
==========

通过 require('http') 使用这个模块。

在Node中，大部分传统上比较难使用的HTTP接口都被实现了。尤其是，大的编码过的数据。这些接口不需要你直接处理整个请求 - 用户可以轻松地把data stream化。

HTTP 信息头将会和下面的对象类似：

```js
{
  'content-length': '123',
  'content-type': 'text/plain',
  'connection': 'keep-alive',
  'accept': '*/*'
}
```

所有的key都是小写的，值也是没有改动的。

为了尽可能地支持HTTP软件的所有功能，Node的HTTP API设计得非常底层。它只负责处理stream和把message转化为对象而已。它把一个message转化为头部（header）和请求体（body），但是它并没有真正地处理头部和请求体。

### http.STATUS_CODES  ###

* Object

一个标准HTTP状态码的集合，包括简短的描述。例如：

```js
http.STATUS_CODES[404] === 'Not Found'
```

### http.createServer([requestListener]) ###

返回一个新的 web server 对象。

requestListener 是一个函数，这个函数会自动加到 'request' 事件里。

### http.createClient([port], [host])  ###

这个方法已经木有用了，请用 http.request() 代替。创建一个HTTP客户端请求，port和host是指定的连接服务器。

### Class:http.Server ###

这个类继承了 EventEmitter， 然后它有下面这些事件：

#### Event: 'request' ####

function (request, response) { }

当有一个请求进入时都会触发这个事件。要注意的是可能一个连接里面有多个请求（防止 keep-alive connections）。request是 http.ServerRequest类型的对象， response是serverResponse类型的对象。

#### Event: 'connection' ####

function (socket) { }

当有一个TCP 流进行传输的时候就会触发。socket是net.Socket类型的对象。通常用户不需要（也不会想）处理这个事件。这个socket对象也会传到 request.connection 中。

#### Event: 'close' ####

function() { }

当服务器关闭的时候就会触发该事件。

#### Event: 'checkContinue' ####

function (request, response) { }

当HTTP请求继续的时候（100-continue， 抓包可以看到），将会触发该事件。如果这个事件没有绑定任何监听者，那么服务器就会立即响应这个 100 Continue请求。

如果为这个事件写监听方法的时候， 调用 response.writeContinue 方法可以继续把数据传给客户端，或者如果你认为你的客户端不应该接收到后续的数据你可以生成一个错误码例如(404 Bad Request)。

要注意的是，如果处理了这个事件，request 事件将不会被触发。

#### Event: 'upgrade' ####

function (request, socket, head) { }

在每次收到客户端请求一个 http upgrade 时触发。如果没有给这个事件绑定任何监听者的话，那么客户端请求的upgrade将会被关掉。

* request  ---------   和request事件里的request对象是一样的
* socket   ---------   就是客户端和服务器之间的socket连接
* head     ---------   是一个Buffer类型的对象，第一个upgrade流，有可能为空

这个事件被触发以后，request 的 socket 将不会有任何 data 事件监听者，这代表你需要按顺序绑定事件，为了能正确处理data。

#### Event: 'clientError' ####

function (exception) { }

如果connection触发了 'error' 事件，那么它会经过这一步。

#### server.listen(port, [hostname], [backlog], [callback]) ####

开始接收某个 hostname 的某个端口的连接。如果hostname参数被忽略了，那么server将会接收所有的ipv4(INADDR_ANY)连接。

为了监听 unix socket，用文件名代替 port 和 hostname。

Backlog表示最长的等待连接的队列长度。实际的长度将会取决于不同的操作系统（在linux下sysctl设置例如tcp_max_syn_backlog和somaxconn）。这个的默认值是511而非512。

这个方法是异步的。最后一个callback参数将会作为'listing'事件的listener。参考 net.Server.listen(port)。

#### server.listen(path, [callback]) ####

启动一个UNIX socket 服务器来监听给定的 path。

这个方法是异步的。最后一个callback参数将会作为'listing'事件的listener。参考 net.Server.listen(port)

#### server.listen(handle, [callback]) ####

* handle Object
* callback Function

handle对象可以传入 server 或者 socket（所有包含 _handle 成员的对象），或者一个 {fd: <n>} 对象。

这样做将会导致server会把接收到的连接交给对应的handle来处理，这意味着文件描述符或者handle已经被绑定在固定的端口或者  domain socket。

Windows不支持监听文件描述符。

这个方法是异步的。最后一个callback参数将会作为'listing'事件的listener。参考 net.Server.listen(port)。

#### server.close([callback]) ####

让一个server停止接收新的连接。参考 net.Server.close([callback])， 

#### server.maxHeadersCount ####

限制接收的headers的最大值，默认值是1000，如果设置为0，那么将不做限制。

### Class: http.ServerRequest  ###

这个对象由 HTTP server创建 -- 非用户创建 -- 然后这个对象作为第一个参数传入request listener中

request实现了 ReadStream 接口。并且它继承了EventEmitter，所以它有下面这些事件：

#### Event: 'data' ####

functon (chunk) { }

当服务器接受到messsage的一小部分时候。如果给request设置了编码，那么chunk就会成为字符串，否则它就是一个Buffer。

要注意的是如果没有任何监听者监听 data 事件，那么这些数据将会丢失。

#### Event: 'end' ####

function() { }

每次请求只会触发一次，触发完以后再也不会触发 'data' 事件。

#### Event: 'close' ####

function() { }

在调用 response.end（）之前被触发。

和 'end' 事件一样，每次请求只会触发一次，触发完以后再也不会触发 'data' 事件。

'close' 事件可以在 'end' 事件之后被触发。

#### request.method ####

request就是一个只读字符串，表示http动词例如：'GET', 'POST', 'DELETE'。

#### request.url  ####

字符串表示的 URL。它只包含HTTP请求中的URL。如果请求如下：

  GET /status?name=ryan HTTP/1.1\r\n
  Accept: text/plain\r\n
  \r\n

那么 request.url 将会是下面这样的

```js
'/status?name=ryan'
```

如果你想把url给分解成各个组成部分，你可以使用 require('url').parse(request.url)来解决：

```js
node> require('url').parse('/status?name=ryan')
{ href: '/status?name=ryan',
  search: '?name=ryan',
  query: 'name=ryan',
  pathname: '/status' }
```

如果你想把queryString转化为参数对象，你可以使用 require('querystring').parse函数，或者给 require('url').parse 的第二个参数传入 true 即可，例如：

```js
node> require('url').parse('/status?name=ryan', true)
{ href: '/status?name=ryan',
  search: '?name=ryan',
  query: { name: 'ryan' },
  pathname: '/status' }
```

#### request.headers ####

一个只读的对象，里面放了请求头对应的key/value。请求头的参数名都是小写的。例如：

```js
// Prints something like:
//
// { 'user-agent': 'curl/7.22.0',
//   host: '127.0.0.1:8000',
//   accept: '*/*' }
console.log(request.headers);
```

#### request.trailers ####

只读对象；HTTP尾部（如果有）。只会在end事件触发以后才会存在。

#### request.httpVersion ####

用字符串表示的HTTP协议版本。只读属性。例如：'1.1'，'1.0'。或者可以使用request.httpVersionMajor表示小数点前的那个数，request.httpVersionMinor表示小数点后面那个数，都是整型的数字。

#### request.setEncoding([encoding]) ####

设置请求体的编码。详情请查看 stream.setEncoding()。

#### request.pause() ####

从指定事件中终止事件。用于阻止上传很有用

#### request.resume()  ####

重新打开一个被中断的请求

#### request.connection ####

表示一个与当前连接对应的net.Socket对象。

为了支持HTTPS，可以使用 request.connection.verifyPeer() 和 request.connection.getPeerCertification() 来获取客户端的认证详情。

### Class: http.ServerResponse ###

这是一个又HTTP server创建的一个对象 -- 非用户创建 。它作为 request 事件的第二个参数传入。

response实现了 WritableStream 接口。并且它继承于EventEmitter 并且包含下面这些事件：

#### Event: 'close' ####

function() { }

在调用 response.end（）之前被触发。

#### response.writeContinue() ####

给客户端发送 HTTP/1.1 100 消息，表示还有body要进行传送。详情查看 Server 的 'checkContinue' 事件。

#### response.writeHead(statusCode, [reasonPhrase], [headers]) ####

给请求客户端发送 response header。 statusCode是一个三位数的数字，例如 404。最后一个参数，headers，就是一组响应头。第二个可选参数提供了一个人类可读的方式来写请求头部。

例如：

```js
var body = 'hello world';
response.writeHead(200, {
  'Content-Length': body.length,
  'Content-Type': 'text/plain'
})
```
这个方法只能被调用一次，并且必须在 response.end() 被调用之前调用。

如果你在调用这个方法之前调用了 response.write() 或者 response.end()，那么就会自动调用这个方法并且生成一个可变的请求头传给客户端。

记住：Content-Length表示的是byte的长度而非字符串长度。之所以上面的的例子能正常工作是因为字符串'hello world'里面只包含的字符都是一个byte长度字符。如果使用中文或者其他字符应该使用Buffer.byteLength()来获取长度，当然也要考虑不同的字符编码集。Node不会去检查已经发送出去的body的Content-Length。

#### response.statusCode  ####

如果使用的是一个非固定的headers（没有调用 response.writeHead()），这个属性可以控制请求头的状态码并且进行客户端刷新。

例如：
```js
response.statusCode = 404;
```

当客户端收到请求头以后，这个属性表示的状态码将会被发送粗去。

#### response.setHeader(name, value) ####

以key/value的方式设置请求头信息，已经存在的信息将被覆盖：

```js
response.setHeader('Content-Type', 'text/html')
```

或者：

```js
response.setHeader('Set-Cookie', ['type=ninja', 'language=javascript'])
```

#### response.sendDate ####

自动生成的相应日期，默认值为true。

#### response.getHeader(name) ####

获取headers中对应name的值

#### response.removeHeader(name) ####

删除header中的对应key/value

#### response.write(chunk, [encoding]) ####











