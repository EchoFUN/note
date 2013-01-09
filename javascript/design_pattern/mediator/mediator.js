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


// Better Implementations

(function (root) {

  var uid = 0;

  function guidGenerator() {
    return uid++;
  }

  // 订阅者构造函数
  function Subscriber(fn, options, context) {
    if (!(this instanceof Subscriber)) {
      return new Subscriber(fn, context, options);
    }
    else {
      // guidGeneraator() 是一个生成GUID的发那个发。
      // guid可以让订阅者轻易地通过这个id来找到订阅
      // 者。
      this.id = guidGenerator();
      this.fn = fn;
      this.options = options;
      this.context = context;
      this.topic = null;
    }
  }

  // 一个topic只有一个namespace，但是可以有很多个子 topic
  function Topic(namespace) {
    if (!(this instanceof Topic)) {
      return new Topic(namespace);
    }
    else {
      this.namespace = namespace || "";
      this._callbacks = [];
      this._topics = [];
      this.stopped = false;
    }
  }

  Topic.prototype = {

    // 给当前主题添加一个 subscriber
    AddSubscriber: function(fn , options, context) {
      var callback = new Subscriber(fn,  options, context);
      this._callbacks.push(callback);
      callback.topic = this;

      return callback;
    },

    StopPropagation: function() {
      this.stopped = true;
    },

    // 这里的  identifier 可以是一个函数也可以是一个id
    GetSubscriber: function(identifier) {
      for (var x = 0, y = this._callbacks.length; x < y; x++) {
        if (this._callbacks[x].id == identifier || this._callbacks[x].fn == identifier) {
          return this._callbacks[x];
        }
      }

      for (var z in this._topics) {
        if (this._topics.hasOwnProperty(z)) {
          var sub = this._topics[z].GetSubscriber(identifier);
          if (sub !== undefined) {
            return sub;
          }
        }
      }
    },

    // 增加一个主题，或者子主题
    AddTopic: function(topic) {
      this._topics[topic] = new Topic(this.namespace ? this.namespace + ":" : "") + topic);
    },

    // 是否拥有某主题
    HasTopic: function(topic) {
      return this._topics.hasOwnProperty(topic);
    },

    // 获得某主题
    ReturnTopic: function(topic) {
      return this._topics[topic];
    },

    // 通过回调或者id删除订阅者，如果没有提供参数就全部都删掉
    RemoveSubscriber: function(identifier) {
      if (!identifier) {
        this._callbacks = [];

        for (var z in this._topics) {
          if (this._topics.hasOwnProperty(z)) {
            this._topics[z].RemoveSubscriber(identifier);
          }
        }
      }

      for (var y = 0, x = this._callbacks.length; y < x; y++) {
        if (this._callbacks[y].fn == identifier || this._callbacks[y].id == identifier) {
          this._callbacks[y].topic = null;
          this._callbacks.splice(y, 1);
          x--;
          y--;
        }
      }
    },

    // 发布数据, data作为发布的参数传入
    Publish: function(data) {
      for (var y = 0, x = this._callbacks.length; y < x; y++) {
        var callback = this._callbacks[y], l;
        callback.fn.apply(callback.context, data);

        l = this._callbacks.length;
        if (l < x) {
          y --;
          x = l;
        }
      }

      for (var x in this._topics) {
        if (!this.stopped) {
          if (this._topics.hasOwnProperty(x)) {
            this._topics[x].Publish(data);
          }
        }
      }

      this.stopped = false;
    }

  };


  function Mediator() {
    if (!(this instanceof Mediator)) {
      return new Mediator();
    }
    else {
      this._topics = new Topic("");
    }
  }

  Mediator.prototype = {
    GetTopic: function(namespace) {
      var topic = this._topics,
          namespaceHierarchy = namespace.split(":");

      if (namespace === "") {
        return topic;
      }

      if (namespaceHierarchy.length > 0) {
        for (var i = 0, j = namespaceHierarchy.length; i < j; i++) {
          if (!topic.HasTopic(namespaceHierarchy[i])) {
            topic.AddTopic(namespaceHierarchy[i]);
          }

          topic = topic.ReturnTopic(namespaceHierarchy[i]);
        }
      }
      return topic;
    },

    Subscribe: function(topicName, fn, options, context) {
      var options = options || {},
          context = context || {},
          topic = this.GetTopic(topicName),
          sub = topic.AddSubscriber(fn, options, context);

      return sub;
    },

    GetSubscriber: function(identifier, topic) {
      return this.GetTopic(topic || "").GetSubscriber(identifier);
    },

    Remove: function(topicName, identifier) {
      this.GetTopic(topicName).RemoveSubscriber(identifier);
    },

    Publish: function(topicName) {
      var args = Array.prototype.slice.call(arguments, 1),
          topic = this.GetTopic(topicName);

      args.push(topic);
      this.GetTopic(topicName).Publish(args);
    }
  }

  root.Mediator = Mediator;
  Mediator.Topic = Topic;
  Mediator.Subscriber = Subscriber;
})(window);
















