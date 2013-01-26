/**
 * 正则表达式 量词
 * {n,m}
 * *
 * +
 * ?
 */
describe('量词测试组', function() {

  /**
   * {n} 匹配长度为n的字符组
   */
  it('应该匹配规定长度的字符组', function() {
    var SIX_LEN_NUM_REGEXP = /^\d{6}$/;
    expect('123456').toMatch(SIX_LEN_NUM_REGEXP);
    expect('012345').toMatch(SIX_LEN_NUM_REGEXP);
    expect('0123456').not.toMatch(SIX_LEN_NUM_REGEXP);

    SIX_LEN_NUM_REGEXP = /^[0-9]{6}$/;
    expect('123456').toMatch(SIX_LEN_NUM_REGEXP);
    expect('012345').toMatch(SIX_LEN_NUM_REGEXP);
    expect('0123456').not.toMatch(SIX_LEN_NUM_REGEXP);
  });

  /**
   * {n,m} 匹配长度范围为 n~m 的字符组
   */
  it('应该匹配规定范围内长度的字符组', function() {
    var RANGE_LEN_REGEXP = /^\d{2,6}$/;
    expect('').not.toMatch(RANGE_LEN_REGEXP);
    expect('2').not.toMatch(RANGE_LEN_REGEXP);
    expect('22').toMatch(RANGE_LEN_REGEXP);
    expect('222').toMatch(RANGE_LEN_REGEXP);
    expect('2222').toMatch(RANGE_LEN_REGEXP);
    expect('22222').toMatch(RANGE_LEN_REGEXP);
    expect('222222').toMatch(RANGE_LEN_REGEXP);
    expect('2222222').not.toMatch(RANGE_LEN_REGEXP);
  });

  /**
   * {n,} 匹配长度范围为 n~无穷大的字符组
   */
  it('应该匹配规定长度以上的字符组', function() {
    var RANGE_LEN_REGEXP = /^\d{2,}/;
    expect('').not.toMatch(RANGE_LEN_REGEXP);
    expect('2').not.toMatch(RANGE_LEN_REGEXP);
    expect('22').toMatch(RANGE_LEN_REGEXP);
    expect('222').toMatch(RANGE_LEN_REGEXP);
    expect('2222').toMatch(RANGE_LEN_REGEXP);
    expect('22222').toMatch(RANGE_LEN_REGEXP);
    expect('222222').toMatch(RANGE_LEN_REGEXP);
    expect('2222222').toMatch(RANGE_LEN_REGEXP);
    expect('22222222222222').toMatch(RANGE_LEN_REGEXP);
  });

  /**
   * {,m} 匹配长度为 0~m 的字符组 
   * note: JavaScript 不支持这种写法
   * 只能使用 {0,m}
   */
  it('应该匹配规定长度以内的字符组', function() {
    var RANGE_LEN_REGEXP = /^\d{0,6}$/;
    expect('').toMatch(RANGE_LEN_REGEXP);
    expect('2').toMatch(RANGE_LEN_REGEXP);
    expect('22').toMatch(RANGE_LEN_REGEXP);
    expect('222').toMatch(RANGE_LEN_REGEXP);
    expect('2222').toMatch(RANGE_LEN_REGEXP);
    expect('22222').toMatch(RANGE_LEN_REGEXP);
    expect('222222').toMatch(RANGE_LEN_REGEXP);
    expect('2222222').not.toMatch(RANGE_LEN_REGEXP);
  });


  /**
   * 常用量词 +
   * 表示重复 1 ~ n 次
   * 等同于 {1,}
   */
  it('应该匹配一次到多次的字符组', function() {
    var RANGE_LEN_REGEXP = /^\d+$/;
    expect('').not.toMatch(RANGE_LEN_REGEXP);
    expect('1').toMatch(RANGE_LEN_REGEXP);
    expect('11').toMatch(RANGE_LEN_REGEXP);
    expect('111').toMatch(RANGE_LEN_REGEXP);
    expect('1111').toMatch(RANGE_LEN_REGEXP);
    expect('111111111111').toMatch(RANGE_LEN_REGEXP);
  });

  /**
   * 常用两次 * 匹配 0~n 次
   * 等同于 {0,}
   */
  it('应该匹配0次到多次的字符组', function() {
    var RANGE_LEN_REGEXP = /^\d*$/;
    expect('').toMatch(RANGE_LEN_REGEXP);
    expect('1').toMatch(RANGE_LEN_REGEXP);
    expect('11').toMatch(RANGE_LEN_REGEXP);
    expect('111').toMatch(RANGE_LEN_REGEXP);
    expect('1111').toMatch(RANGE_LEN_REGEXP);
    expect('111111111111').toMatch(RANGE_LEN_REGEXP);
  });

  /**
   * 常用量词 ？ 匹配 0~1次
   * 等同于 {0,1}
   */
  it('应该匹配0~1次的字符组', function() {
    var RANGE_LEN_REGEXP = /^\d?$/;
    expect('').toMatch(RANGE_LEN_REGEXP);
    expect('1').toMatch(RANGE_LEN_REGEXP);
    expect('11').not.toMatch(RANGE_LEN_REGEXP);

    RANGE_LEN_REGEXP = /^sp?lice$/;
    expect('splice').toMatch(RANGE_LEN_REGEXP);
    expect('slice').toMatch(RANGE_LEN_REGEXP);
  });


  /**
   * 匹配 tag 简单版
   */
  it('应该匹配 <> 里包含一个或多个非 >字符', function() {
    var TAG_REGEXP = /^<[^>]+>$/;
    expect('<>').not.toMatch(TAG_REGEXP);
    expect('<bold>').toMatch(TAG_REGEXP);
    expect('<p>').toMatch(TAG_REGEXP);
    expect('</p>').toMatch(TAG_REGEXP);
    expect('<a href="http://github.com">').toMatch(TAG_REGEXP);
    expect('<a data-src=">">').not.toMatch(TAG_REGEXP);
  });

  /**
   * 匹配双引号里面的字符串
   */
  it('应该匹配双引号里面的字符串', function() {
    var QUOTE_REGEXP = /"[^"]+"/;
    expect('I said: "this is content"'.match(QUOTE_REGEXP)[0]).toBe('"this is content"');
    expect('I said: "this is "content"'.match(QUOTE_REGEXP)[0]).toBe('"this is "');
  });
});



















