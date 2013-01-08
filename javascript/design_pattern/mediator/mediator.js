// Mediator Pattern
// ================================================
// 
// Mediator 暴露出几个接口让系统中不同的部分可以相互交流
// 
// ### 应用场景 ###
// 
// 如果两个组件之间有特别多的直接联系的时候，也许就是时候使用 Mediator 来作为两个组件的中转点来替代他们俩的直接交流。
// 这样可以明确地把两个组建解耦。而且分工明确。他们通过 Mediator 进行相互进行操作。这可以提高每个组建的重用性。
// 
// 真实世界里的 Mediator 的例子就是机场控制中心。每一个控制塔处理多辆飞机的降落着陆因为所有的交流都是通过控制塔来完成
// 而非飞机和飞机之间的直接交流。这就是这套中央控制系统的成功秘诀，而这个成功秘诀就用在程序设计中。
// 
// ### 实现原理 ###
// 
// 基本都是通过共享一个主题（subject）来通知监听者的。也就可以假设两个组建之间都是对方的订阅者同时也是对方的发布者。这个
// 没有什么固定的关系，反正subject上可以注册多个监听的component来监听感兴趣的消息。

// Basic Implementation

var mediator = (function () {

  // 存放主题和数组的对象
  var topics = {};

  // 订阅一个主题，提供一个回调函数以保证在主题广播的时候调用 
  var subscribe = function(topic, fn) {

    if (!topics[topic]) {
      topics[topic] = [];
    }

    topics[topic].push({context: this, callback: fn});
    return this;
  };

  var publish = function(topic) {
    var args;

    if (!topics[topic]) {
      return false;
    }

    args = Array.prototype.slice.call(arguments, 1);
    for (var i = 0, l = topics[topic].length; i < l, i++) {
      var subscription = topics[topic][i];
      subscription.callback.apply(subscription.context, args);
    }

    return this;
  }

  return {
    publish: publish,
    subscribe: subscribe,
    installTo: function(obj) {
      obj.subscribe = subscribe;
      obj.publish = publish;
    }
  }

})();


