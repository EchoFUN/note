title: 使用Jasmine测试异步代码
desc: 使用了不长时间的 Jasmine，记录一下在 Jasmine 中如何测试异步代码。
tags: JavaScript, Jasmine, 单元测试, BDD
categories: JavaScript, Jasmine

+++++++++++++++++++++++++++++++++++++++++++

一般情况下单元测试框架都会有异步代码测试模块，Jasmine中的异步代码测试主要使用了两个方法。

1. runs(fn)
2. waitsFor(fn, 'time out desc', timout)

这两个方法传入的都是回调方法，当然在 Jasmine 中测试异步代码总少不了一个 flag， 也就是一个标记变量，这个标记变量表示该测试是否已经完成，waitsFor 的第一个回调函数返回的是一个 boolean，当然也可以是其他 condition == true 的值了。当 waitsFor 的返回值变成 true 的时候，就会进入下一个 runs 方法，那样就可以在下一个runs方法中加入需要的断言了。

```js
describe('Ajax Test Suite', function() {

  it ('should have give param a expect val after ajax request', function() {
    var flag = false
        , param = null
        , expectVal = 'val'

    runs(function() {
      $
        .ajax('some url', {
          //... some options
        })
        .done(fn)
        .failed(fn)
        .finally(function() {
           param = expectVal
           flag = true           // 这里对 flag 进行了标记
         })
    })

    // 其实是不断得在监听第一个回调方法的返回值，以确定是否能走下一步
    // 如果在限定时间内异步方法没哟改变 flag 的值，那么这个断言失败
    // 那么将会显示第二个参数的错误信息
    waitsFor(function() {
      return flag
    }, '这个请求应该在 2 秒以内完成', 2000)

    runs(function() {
      expect(param).toBe(expectVal)
    })
    
  })
})
```

所以在使用 Jasmine 来测试异步代码的时候，最重要的是 waitFor 中第一个回调函数的返回值。这个返回值一般来说是你异步代码的运行结束标记。



