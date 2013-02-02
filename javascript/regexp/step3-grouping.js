/**
 * 分组
 * ()
 */
describe('分组测试', function() {

  it('should match the ab repeat', function() {
    var REPEAT_GROUP_REGEXP = /^(ab)+$/
    expect('ababababab').toMatch(REPEAT_GROUP_REGEXP)
    expect('aba').not.toMatch(REPEAT_GROUP_REGEXP)
    expect('ab').toMatch(REPEAT_GROUP_REGEXP)
  })

  it('should match bar.js & bar', function() {
    var JS_FILE_REGEXP = /[a-z]+\.js/;
    expect('bar.js').toMatch(JS_FILE_REGEXP);
    expect('.js').not.toMatch(JS_FILE_REGEXP);
    expect('foo.php').not.toMatch(JS_FILE_REGEXP);
  });

  it('should match bar_qux.js', function() {
    var JS_FILE_REGEXP = /[a-z]+_[a-z]+\.js/;
    expect('foo_bar.js').toMatch(JS_FILE_REGEXP);
    expect('foo.js').not.toMatch(JS_FILE_REGEXP);
    expect('.js').not.toMatch(JS_FILE_REGEXP);
    expect('js').not.toMatch(JS_FILE_REGEXP);
  });

  it('should match bar_qux.js & bar.js', function() {
    var JS_FILE_REGEXP = /[a-z]+(_[a-z]+)?\.js/;
    expect('foo_bar.js').toMatch(JS_FILE_REGEXP);
    expect('bar.js').toMatch(JS_FILE_REGEXP);
    expect('bar').not.toMatch(JS_FILE_REGEXP);
    expect('.js').not.toMatch(JS_FILE_REGEXP);
  });

  it('should match /aaa/bbb/', function() {
    var JS_FILE_REGEXP = /^\/([a-z]+)?([a-z]+\/)*?$/;
    expect('/').toMatch(JS_FILE_REGEXP);
    expect('/aaa/').toMatch(JS_FILE_REGEXP);
    expect('/aaa/bbb/').toMatch(JS_FILE_REGEXP);
    expect('/aaa/bbb/ccc/').toMatch(JS_FILE_REGEXP);
    expect('/aaa/bbb/ccc/ddd').not.toMatch(JS_FILE_REGEXP);
    expect('//').not.toMatch(JS_FILE_REGEXP);
  });

  it('should match /aaa/bbb/ccc.js', function() {
    var JS_FILE_REGEXP = /^\/([a-z]+)?([a-z]+\/)*?[a-z]+(_[a-z]+)?\.js$/;
    expect('/aaa.js').toMatch(JS_FILE_REGEXP);
    expect('/aaa/bbb.js').toMatch(JS_FILE_REGEXP);
    expect('/aaa/bbb/ccc.js').toMatch(JS_FILE_REGEXP);
    expect('/aaa/bbb/foo_bar.js').toMatch(JS_FILE_REGEXP);
    expect('//a/b/c.js').not.toMatch(JS_FILE_REGEXP);
    expect('/a.js/').not.toMatch(JS_FILE_REGEXP);
  });

  it('should match /aaa.js & /aaa_bb.js & /foo_bar_haha.js', function() {
    var JS_FILE_REGEXP = /\/[a-z]+(_[a-z]+)*?\.js/;
    expect('/aaa.js').toMatch(JS_FILE_REGEXP);
    expect('/aaa_bb.js').toMatch(JS_FILE_REGEXP);
    expect('/foo_bar_haha.js').toMatch(JS_FILE_REGEXP);
    expect('/foo_bar_haha_yeah.js').toMatch(JS_FILE_REGEXP);
  });

  it('should match / & /aa & /aa/bb & /aa/bb/cc', function() {
    var JS_FILE_REGEXP = /^\/([a-z]\w+)?(\/[a-z]\w+)*?$/;
    expect('/').toMatch(JS_FILE_REGEXP);
    expect('//').not.toMatch(JS_FILE_REGEXP);
    expect('/aaa').toMatch(JS_FILE_REGEXP);
    expect('/aaa/aaa').toMatch(JS_FILE_REGEXP);
    expect('/aaa_aaa').toMatch(JS_FILE_REGEXP);
    expect('/aaa/bbb/ccc/ddd').toMatch(JS_FILE_REGEXP);
    expect('/aaa/bbb/ccc/ddd//').not.toMatch(JS_FILE_REGEXP);
  });

  it('should match / & /aa & /aa/aa & /aa/aa.js ....', function() {
    var JS_FILE_REGEXP = /^\/([a-z]\w+)?(\/[a-z]\w+)*?(\/[a-z]+(_[a-z]+)*?\.js)?$/;
    expect('/').toMatch(JS_FILE_REGEXP);
    expect('/aaa').toMatch(JS_FILE_REGEXP);
    expect('/aaa/aaa').toMatch(JS_FILE_REGEXP);
    expect('/aaa/aaa/aaa.js').toMatch(JS_FILE_REGEXP);
    expect('/aaa/aaa/aaa_aaa.js').toMatch(JS_FILE_REGEXP);
    expect('/aaa/bbb/ccc/ddd/').not.toMatch(JS_FILE_REGEXP);
    expect('/aaa/bbb/ccc/ddd//').not.toMatch(JS_FILE_REGEXP);
    expect('aaa').not.toMatch(JS_FILE_REGEXP);
    expect('//').not.toMatch(JS_FILE_REGEXP);
    expect('/aaa_aaa').toMatch(JS_FILE_REGEXP);
  });


})