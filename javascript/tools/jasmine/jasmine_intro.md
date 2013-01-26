title: Jasmine单元测试框架
tags: JavaScript, unit, BDD
categories: JavaScript, Jasmine
id:50feab402008dd8d57000001
desc: 由于github page被墙，所以官方文档看不到了，把自己之前看的笔记发上来备份一份来反复阅读。这个单元测试框架和qunit相比多了更多的断言。而且这些断言更易于人类阅读和理解。另外一个被推荐的BDD单元测试框架是mocha，貌似也不错。不过正在学习Angularjs，所以更多的精力会放在Jasmine上面...

+++++++++++++++++++++++++++++++++++

Jasmine 是一款 behavior-driven development（BDD）单元测试工具。它不依赖任何的JavaScript类库。关于BDD的资料有很多，具体可以查看这个 [Behavior driven development](http://en.wikipedia.org/wiki/Behavior-driven_development)。

### 开始 ###

所有的测试都是通过 Jasmine 提供的一个全局方法 ***describe*** 开始的。调用这个方法有两个参数，第一个参数是一个字符串，它代表某个测试的标题（对应者某一组行为），第二个参数是一个回调函数，这个回调函数实现了这一组测试行为。

每一个行为都是用Jasmine提供的 ***it*** 方法来表示。it方法的第一个参数表示每一个特定的行为然后在回调函数里面包含了一个或者多个断言。


### 关于预期(Expect) ###

预期其实就是一个断言，预期在Jasmine中就是一个全局 ***expect*** 方法。这个 ***expect*** 方法的第一个参数是一个期望值，在调用了这个方法后会返回一个对象，这个对象包含多个断言。要是这断言通过，那么这个测试通过，否则结果相反。

下面是常规写法:

```js
describe('A suite', function() {
  it('should be true equals true', function() {
    expect(true).toBe(true);
  });

  it('should be true not equals to false', function() {
    expect(ture).not.toBe(false);
  });
});
```

### Machers ###

就是一些预期值和实际值进行真值判断的表达式，有正向测试和反向测试。当Macher获得的结果没有达到预期的时候该测试就会失败。反之成功。一般的Machers有这些：

```js
describe("Included matchers:", function() {

  it("The 'toBe' matcher compares with ===", function() {
    var a = 12;
    var b = a;

    expect(a).toBe(b);
    expect(a).not.toBe(null);
  });

  describe("The 'toEqual' matcher", function() {

    it("works for simple literals and variables", function() {
      var a = 12;
      expect(a).toEqual(12);
    });

    it("should work for objects", function() {
      var foo = {
        a: 12,
        b: 34
      };
      var bar = {
        a: 12,
        b: 34
      };
      expect(foo).toEqual(bar);
    });
  });

  it("The 'toMatch' matcher is for regular expressions", function() {
    var message = 'foo bar baz';

    expect(message).toMatch(/bar/);
    expect(message).toMatch('bar');
    expect(message).not.toMatch(/quux/);
  });

  it("The 'toBeDefined' matcher compares against `undefined`", function() {
    var a = {
      foo: 'foo'
    };

    expect(a.foo).toBeDefined();
    expect(a.bar).not.toBeDefined();
  });

  it("The `toBeUndefined` matcher compares against `undefined`", function() {
    var a = {
      foo: 'foo'
    };

    expect(a.foo).not.toBeUndefined();
    expect(a.bar).toBeUndefined();
  });

  it("The 'toBeNull' matcher compares against null", function() {
    var a = null;
    var foo = 'foo';

    expect(null).toBeNull();
    expect(a).toBeNull();
    expect(foo).not.toBeNull();
  });

  it("The 'toBeTruthy' matcher is for boolean casting testing", function() {
    var a, foo = 'foo';

    expect(foo).toBeTruthy();
    expect(a).not.toBeTruthy();
  });

  it("The 'toBeFalsy' matcher is for boolean casting testing", function() {
    var a, foo = 'foo';

    expect(a).toBeFalsy();
    expect(foo).not.toBeFalsy();
  });

  it("The 'toContain' matcher is for finding an item in an Array", function() {
    var a = ['foo', 'bar', 'baz'];

    expect(a).toContain('bar');
    expect(a).not.toContain('quux');
  });

  it("The 'toBeLessThan' matcher is for mathematical comparisons", function() {
    var pi = 3.1415926, e = 2.78;

    expect(e).toBeLessThan(pi);
    expect(pi).not.toBeLessThan(e);
  });

  it("The 'toBeGreaterThan' is for mathematical comparisons", function() {
    var pi = 3.1415926, e = 2.78;

    expect(pi).toBeGreaterThan(e);
    expect(e).not.toBeGreaterThan(pi);
  });

  it("The 'toBeCloseTo' matcher is for precision math comparison", function() {
    var pi = 3.1415926, e = 2.78;

    expect(pi).not.toBeCloseTo(e, 2);
    expect(pi).toBeCloseTo(e, 0);
  });

  it("The 'toThrow' matcher is for testing if a function throws an exception", function() {
    var foo = function() {
      return 1 + 2;
    };
    var bar = function() {
      return a + 1;
    };

    expect(foo).not.toThrow();
    expect(bar).toThrow();
  });
});
```


















