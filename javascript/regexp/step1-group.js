/**
 * 正则表达式学习测试
 * 字符组 []  ----- 只要字符租中有一个字符匹配则全匹配
 */

describe('数字组测试', function() {

  
  it('包含数字的字符串就可以匹配', function() {
    var NUMBER_REGEXP = /[0123456789]/
      , i;
    for (i = 0; i < 11; i++) {
      expect(i+"").toMatch(NUMBER_REGEXP);  
    }

    for (i = 0; i < 11; i++) {
      expect(i + 'a').toMatch(NUMBER_REGEXP);
    }
    
    expect('a').not.toMatch(NUMBER_REGEXP);
  });

  /**
   *  ^   --------   代表字符串开始
   *  $   --------   代表字符串结束
   */
  it('整个字符串是一个数字才能匹配', function() {
    var SINGLE_NUMBER_REGEXP = /^[0123456789]$/,
        i;

    for (i = 0; i < 10; i++) {
      expect(i+"").toMatch(SINGLE_NUMBER_REGEXP);  
    }

    for (i = 10; i <= 100; i++) {
      expect(i + '').not.toMatch(SINGLE_NUMBER_REGEXP);
    }

    for (i = 0; i < 11; i++) {
      expect(i + 'a').not.toMatch(SINGLE_NUMBER_REGEXP);
    }

  });

  /**
   * [0-9] 等价于 [0123456789]
   */
  it('范围表示法,包含数字的字符串才能匹配', function() {
    var NUMBER_REGEXP = /[0-9]/
      , i;

    for (i = 0; i < 11; i++) {
      expect(i+"").toMatch(NUMBER_REGEXP);  
    }

    for (i = 0; i < 11; i++) {
      expect(i + 'a').toMatch(NUMBER_REGEXP);
    }
    
    expect('a').not.toMatch(NUMBER_REGEXP);
  });


  it("范围表示法,整个字符串是一个数字才能匹配", function() {
    var SINGLE_NUMBER_REGEXP = /^[0-9]$/,
        i;

    for (i = 0; i < 10; i++) {
      expect(i+"").toMatch(SINGLE_NUMBER_REGEXP);  
    }

    for (i = 10; i <= 100; i++) {
      expect(i + '').not.toMatch(SINGLE_NUMBER_REGEXP);
    }

    for (i = 0; i < 11; i++) {
      expect(i + 'a').not.toMatch(SINGLE_NUMBER_REGEXP);
    }
  });


  it("应该匹配包含数字或者大小写字符的字符串", function() {
    var WORD_REGEXP = /[0-9A-Za-z]/;
    expect('a').toMatch(WORD_REGEXP);
    expect('A').toMatch(WORD_REGEXP);
    expect('1').toMatch(WORD_REGEXP);
    expect('1a').toMatch(WORD_REGEXP);
    expect('~').not.toMatch(WORD_REGEXP);
    expect('~a').toMatch(WORD_REGEXP);
    expect('~!@').not.toMatch(WORD_REGEXP);
    expect(' ').not.toMatch(WORD_REGEXP);
  });

  /**
   * 匹配所有ASCII码字符
   * \x 固定前缀 表示转义序列
   * \xnum num表示序列的码值
   * 00(16) === 0(10)
   * 7f(16) === 127(10)
   * js: parseInt('7f', 16)
   */
  it("应该匹配包含ASCII字符的字符串", function() {
    var ASCII_REGEXP = /[\x00-\x7f]/;
    expect('.').toMatch(ASCII_REGEXP);
    expect('/').toMatch(ASCII_REGEXP);
    expect('1').toMatch(ASCII_REGEXP);
    expect('()').toMatch(ASCII_REGEXP);
    expect('哈').not.toMatch(ASCII_REGEXP);
    expect('哈a').toMatch(ASCII_REGEXP);
  });

  /**
   * 元字符 [] 中的 - 不能匹配 ”-“ 字符，所以它是一个元字符
   *       但是如果 "-" 紧跟着 "[" 那么这个时候它就不是元字符
   *       所以 "[" 和 "]" 也是元字符
   */
  it('应该当"[-"这种情况的时候”-“不是元字符', function() {
    var NUMBER_REGEXP = /[-09]/;
    expect('-').toMatch(NUMBER_REGEXP);
    expect('0').toMatch(NUMBER_REGEXP);
    expect('9').toMatch(NUMBER_REGEXP);
    expect('6').not.toMatch(NUMBER_REGEXP);
  });
  
  it('应该当使用转义字符"\"的时候元字符"-"成为普通字符', function() {
    var NUMBER_REGEXP = /[0\-9]/;
    expect('-').toMatch(NUMBER_REGEXP);
    expect('0').toMatch(NUMBER_REGEXP);
    expect('9').toMatch(NUMBER_REGEXP);
    expect('6').not.toMatch(NUMBER_REGEXP);
  });

  it('应该当使用转义字符"\"的时候普通字符"-"依然为普通字符', function() {
    var NUMBER_REGEXP = /[\-09]/;
    expect('-').toMatch(NUMBER_REGEXP);
    expect('0').toMatch(NUMBER_REGEXP);
    expect('9').toMatch(NUMBER_REGEXP);
    expect('6').not.toMatch(NUMBER_REGEXP);
  });

  /**
   * 闭括号 []]的情况
   * 优先闭合成为分组，后面出现的闭括号成为字符
   */
  it('当出现闭括号时优先与第一个进行结合', function() {
    var NUMBER_REGEXP = /^[01234]56789]$/;
    expect('0').not.toMatch(NUMBER_REGEXP);
    expect('0123456789').not.toMatch(NUMBER_REGEXP);
    expect('056789]').toMatch(NUMBER_REGEXP);
    expect('0156789]').not.toMatch(NUMBER_REGEXP);
    expect('56789]').not.toMatch(NUMBER_REGEXP);
  });

  /**
   * 排除型字符租
   * [^]  排除型字符租里面的所有字符都会被匹配
   */
  it('应该第一个字符为非数字，第二个字符为数字的时候才会被匹配', function() {
    var FIRST_NOT_NUM = /^[^0-9][0-9]$/;
    expect(' 1').toMatch(FIRST_NOT_NUM);
    expect('a1').toMatch(FIRST_NOT_NUM);
    expect('11').not.toMatch(FIRST_NOT_NUM);
    expect('a11').not.toMatch(FIRST_NOT_NUM);
    expect('A1').toMatch(FIRST_NOT_NUM);
  });

  /**
   * 排除型字符租
   * [^-]  这里的 - 不是元字符
   */
  it('应该在[^-]时 - 不成为元字符', function() {
    var NOT_ATOM_REGEXP = /^[^-09]$/;
    expect('-').not.toMatch(NOT_ATOM_REGEXP);
    expect('9').not.toMatch(NOT_ATOM_REGEXP);
    expect('8').toMatch(NOT_ATOM_REGEXP);
    expect('88').not.toMatch(NOT_ATOM_REGEXP);
  });

  /**
   * 数字简记 \d
   */
  it("简记表示法,整个字符串是一个数字才能匹配", function() {
    var SINGLE_NUMBER_REGEXP = /^\d$/,
        i;

    for (i = 0; i < 10; i++) {
      expect(i+"").toMatch(SINGLE_NUMBER_REGEXP);  
    }

    for (i = 10; i <= 100; i++) {
      expect(i + '').not.toMatch(SINGLE_NUMBER_REGEXP);
    }

    for (i = 0; i < 11; i++) {
      expect(i + 'a').not.toMatch(SINGLE_NUMBER_REGEXP);
    }
  });


  /**
   * 单词字符 word 简记 \w
   * 包括了 0-9 a-z A-Z _
   */
  it("简记表示法，匹配所有单词字符包括下划线", function() {
    var WORD_REGEXP = /^\w$/;
    expect('_').toMatch(WORD_REGEXP);
    expect('a').toMatch(WORD_REGEXP);
    expect('A').toMatch(WORD_REGEXP);
    expect('1').toMatch(WORD_REGEXP);
    expect(':').not.toMatch(WORD_REGEXP);
    expect('(').not.toMatch(WORD_REGEXP);
  });
  

  /**
   * 空白字符 space 简记 \s
   * 包括了 \t \r \n \v \f 
   */
  it('应该仅匹配空白字符', function() {
    var SPACE_REGEXP = /^\s$/;
    expect(' ').toMatch(SPACE_REGEXP);
    expect('\t').toMatch(SPACE_REGEXP);
    expect('\n').toMatch(SPACE_REGEXP);
    expect('\v').toMatch(SPACE_REGEXP);
    expect('\f').toMatch(SPACE_REGEXP);
    expect('1').not.toMatch(SPACE_REGEXP);
    expect('a').not.toMatch(SPACE_REGEXP);
    expect('A').not.toMatch(SPACE_REGEXP);
    expect('@').not.toMatch(SPACE_REGEXP);
  });

  /**
   * /S 与 /s 互补
   * /W 与 /w 互补
   * /D 与 /d 互补
   */
  it('两个互补组合的字符组可以匹配任意字符，比"."(不匹配换行符号)强大', function() {
    var DOT_REGEXP = /^.$/;
    expect('\n').not.toMatch(DOT_REGEXP);
    expect('\r').not.toMatch(DOT_REGEXP);
    expect(' ').toMatch(DOT_REGEXP);
    expect('\t').toMatch(DOT_REGEXP);
    expect('1').toMatch(DOT_REGEXP);
    expect('a').toMatch(DOT_REGEXP);

    var ALL_REGEXP = /^[\S\s]$/;
    expect('\n').toMatch(ALL_REGEXP);
    expect('\r').toMatch(ALL_REGEXP);
    expect(' ').toMatch(ALL_REGEXP);
    expect('\t').toMatch(ALL_REGEXP);
    expect('1').toMatch(ALL_REGEXP);
    expect('a').toMatch(ALL_REGEXP);
  });
});




















