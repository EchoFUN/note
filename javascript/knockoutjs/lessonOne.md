MVVM - 初识Knockout
----------------------


把传统的MVC照搬到前端来的有个很好的例子就是 Backbonejs，通过 Backbonejs 我们可以用一个约定好的写法来完成一个标准的MVC APP，但是在看到 Knockout 以后我发现我直接被它的这种 MVVM 模式所吸引。毕竟人还是有一点喜新厌旧的心理嘛，看到Angularjs感觉和 Knockout 的模式有些类似，但是学习成本貌似有点高所以还是暂时先转战 Knockout，Knockoutjs 有完善的文档和源代码，而且非常轻量级。更重要的是，它支持万恶的IE6。它的官网说明和例子教程都有，主要是写在[这里](http://learn.knockoutjs.com/#/?tutorial=intro)。

### 简单的数据双向绑定 ###

现在来开始看看最简单的把数据绑定到某个元素文本节点中，在Knockout中，所有的数据绑定的声明都写在元素的 data-bind 属性中。以下面一个最简单的例子开始：

```html
<p>First Name: <strong data-bind="text: firstName"></strong></p>
<p>Last Name: <strong data-bind="text: lastName"></strong></p>
```

```js
function AppViewModel() {
    this.firstName = "Bert";
    this.lastName = "Bertington";
}

ko.applyBindings(new AppViewModel());
```

首先在html中声明了两个data-bind，两个data-bind的类型都是 text文本绑定，顾名思义，这个数据绑定就是绑定一个单纯的文本到html节点上，它的运行结果就如下面的fiddle所示，第一个demo一点都不Magic：

```text
<iframe style="width: 100%; height: 300px" src="http://jsfiddle.net/kiddkai/mNwFy/1/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
```

上面的例子可以看到，这个数据绑定是可以把节点的内容填充的，也就是说 Knockoutjs 会自动读取 ModelView 的值然后把它传入到对应的绑定节点中。但是我们需要知道的是，这个绑定实际上是静态的，因为firstName和lastName只是普通的字符串对象。当我们需要这个绑定的值是动态变化的时候，我们需要使用 ko.observable() 方法来使这个值成为动态绑定的一个值，当ViewModel中的Model值发生改变的时候会动态地改变ModelView的值，反过来也是成立的，也就是说这个数据绑定是双向的。所以以下面的input框为例，我们可以看到输出值会跟随输入值在不断地变化。

```html
<p>First Name: <input data-bind="value: firstName" /></p>
<p>Last Name: <input data-bind="value: firstName" /></p>
<p data-bind="text: firstName"></p>
<p data-bind="text: lastName"></p>
```

```js
function AppViewModel() {
  this.firstName = ko.observable('Bert');
  this.lastName = ko.observable('Bertington');
}

ko.applyBindings(new AppViewModel());
```

下面这个demo和Angularjs给的第一个demo很类似的，而且实现起来很简单

```text
<iframe style="width: 100%; height: 300px" src="http://jsfiddle.net/kiddkai/LbDm6/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
```

当数据被 ko.observable 方法包装过以后，经过这个方法包装过的对象只要其View中的值也就是网页中的Model发生改变时，其JavaScript代码绑定View的对应Model(ViewModel)也会随之地改变其Model值，反之亦然，这就是 MVVM 的简单的双向绑定模式。也就是网页上的值和js对象中的值会一直保持同步。



### 计算结果 ###

在上面的例子中，我们使用简单的数据的动态绑定做了个简单的输出。但是如果有进一步的需求，只用一个html元素输出两个值的计算结果应该怎么做呢？这个时候就应该使用 ko.computed 方法来包装一个函数。首先来看看ko.computed方法的传入参数说明：

```js
// fn {Function} 用于处理并且返回数据的方法
// context {Object} 方法中this参数的上下文
ko.computed(fn, context)
```

举一个简单的例子，将ViewModel中的数据进行相加得到新的结果并且输出到UI上。我们需要这么做。

```js
function AddAppViewModel() {
  this.firstNum = ko.observable('1');
  this.secondNum = ko.observable('2');

  this.addSumNum = ko.computed(function() {
    return parseFloat(this.firstNum()) + parseFloat(this.secondNum());
  }, this);
}

ko.applyBindings(new AddAppViewModel);
```

下面是 html

```html
<p>First Name: <input data-bind="value: firstNum" /></p>
<p>Last Name: <input data-bind="value: secondNum" /></p>
<p data-bind="text: addSumNum"></p>
```

结果如下所示，但是这个计算结果是个只读值，这样写简化了许多的dom操作，Knockout自动帮你完成数据绑定。

```text
<iframe style="width: 100%; height: 300px" src="http://jsfiddle.net/kiddkai/VXnzL/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
```

### 结束总结 ###

这里只是简单的Knockout的使用方法，涉及了如下几点：

1. [ko.applyBindings](http://knockoutjs.com/documentation/observables.html#activating_knockout)
2. [ko.observable](http://knockoutjs.com/documentation/observables.html)
3. [ko.computed](http://knockoutjs.com/documentation/computedObservables.html)









