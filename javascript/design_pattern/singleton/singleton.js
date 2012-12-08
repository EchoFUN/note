var Singleton = (function() {

  // 用来存放单例的对象
  var instance;

  // 对象的构造方法
  function init() {

    // 单例方法，返回一个对象
    function privateMethod() {
      console.log("I'm private");
    }

    var privateVariable = "I'm alse private";

    return {
      publicMethod: function() {
        return 'Singleton Ninjia!'
      },

      publicProperty: "Singleton Property Ninjia!"
    };
  }

  return {
    getInstance: function() {

      if ( !instance ) {
        instance = init();
      }

      return instance;
    }

  };
})();

var SingletonTester = (function() {
  var _instance,
      _static;

  function Singleton(options) {
    this.positionX = options.positionX || 0,
    this.positionY = options.positionY || 0;
  }

  _static = {

    getInstance: function(options) {
      if ( !_instance ) {
        _instance = new Singleton(options);
      }
      return _instance;
    }
  };

  return _static;
})();





