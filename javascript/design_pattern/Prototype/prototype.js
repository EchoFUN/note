// 原型模式
// ==========
// 类似mixin，就是从一个原型对象创建出一个新的原型对象。
// 一般使用 Object.create 来实现，但是某些浏览器不支持
// es5，所以需要判断一下兼容性

(function(root) {

  function objectCreate(o) {
    if (Object.create) {
      return Object.create(o);
    }

    if (arguments.length > 1) {
      throw new Error('Object.create implementation only accepts the first parameter.');
    }

    function F() {}
    F.prototype = o;
    return new F();
  }

  root.objectCreate = objectCreate;

})(window);