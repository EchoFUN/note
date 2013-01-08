title: w3c之html401笔记(Text)
categories: html401
tags: w3c, 标准, html
id:50e38cdcb4d2ce952a000001

+++++++++++++++++++++++++++++++++

二零一三年一月一日，从今天开始我确定自己往前端方向走不回头了。所以开始了万恶的w3c document的阅读，顺便把阅读笔记记录在博客里面给我这个刚搭起来的博客盖盖楼什么的。前端基础说简单的确难度不大，入门是人大家都会。但是写了那么久的代码我们用的标签都代表什么意思，要怎么真正地实现语义化。我们怎么让我们的html代码在w3c的验证工具上可以有100%的通过率。还有一点很重要的是，既然要作为一名合格的前端工程师，在实现了产品所需求的效果以外我们该如何真正地保证这个网页的可访问性等等...

关于 html4.01 中文本标签的概括都在[这里](http://www.w3.org/TR/html401/struct/text.html)。下面是关于我阅读的一些方法和记录一些以前忽略掉的许多小细节。还有在之前的工作中是怎么不合理地使用html标签的。

### 关于空格空字符（White Space） ###

在html中下面的字符都被定义为空格

+ ASCII space (&#x0020;)
+ ASCII tab (&#x0009;)
+ ASCII form feed (&#x000C;)
+ Zero-width space (&#x200B;)

换行也会被当做空字符。

有且仅有一个标签会把所有的空字符保留，包括换行和多个空格的字符串。这个标签就是*pre*。在普通的标签里，无论你在两个单词之间输入多少个空格，在真正按照标准浏览器所渲染出来的内容只会保留一个空格。

既然说到pre了就先说一下pre。

### pre - preformatted ###

语义：格式化字符串
类型：inline
属性（Attribute）：[coreattr](http://www.w3.org/TR/html401/sgml/dtd.html#coreattrs),[i18n](http://www.w3.org/TR/html401/sgml/dtd.html#i18n),[events](http://www.w3.org/TR/html401/sgml/dtd.html#events)

当一段文本被*pre*所包裹的时候，浏览器将会对文本进行以下处理：

+ 保证空字符完整的保留
+ 使用等宽字体
+ 取消掉自动换行
+ 讲不会做标签内部的去空格处理

关于标签内去除左右两边内部空格。在写html的时候我们需要给两个单词之间加入空格，下面有两种写法:

```html
<p>I am kidd, my blog is <a href="#">heihei</a> is awesome</p>
<p>I am kidd, my blog is<a href="#"> heihei </a>is awesome</p>
```

在上面两种写法中，最后输出格式正确的是上面的那种，因为按照标准。普通标签的左右两个内空格会被自动的删除掉。所以只有把空格写在标签外才真正的有正确的格式输出。


### 短语有关元素 ###

下面这些都是内联（inline）元素：

属性(Attribute)：[coreattr](http://www.w3.org/TR/html401/sgml/dtd.html#coreattrs),[i18n](http://www.w3.org/TR/html401/sgml/dtd.html#i18n),[events](http://www.w3.org/TR/html401/sgml/dtd.html#events)

EM:
表示强调
STRONG:
表示更加强调，所以会变粗
CITE:
表示这个元素内的内容是引文或者是别的地方的引用资源
DFN:
里面的内容是定义的术语（不知道什么时候会用到）。。。
CODE:
代码片段内容
SAMP:
代码片段的输出内容
KBD:
表示文本是由键盘输入的，一般用在一些计算机指导手册里面
VAR:
表示计算机代码或者程序中的一个变量或者实例
ABBR:
表示一个词的缩写，比如etc之类的，最好加上title
ACRONYM:
也表示缩写，但是一般是取多个单词的头字母的那种缩写HTTP之类的

### 引用有关的元素 ###

1. q - quote

引用，不过这个引用是一个内联元素，包含了标准的Attribute。除此之外还多了一个Attribute叫 cite，这个cite的类型是一个uri，表示的是这个quote是引用自哪个链接的。应该是下面这样用：

```html
<p>
  后面是从wikipedia摘录过来的一段话~
  <q cite="http://en.wikipedia.org/wiki/Mark_Zuckerberg#cite_note-11">
    Zuckerberg was born in 1984 in White Plains, New York.[11] He is the son of Karen (née Kempner), a psychiatrist, and Edward Zuckerberg, a dentist.[12] He and his three sisters, Randi, Donna, and Arielle,[2] were brought up in Dobbs Ferry, New York.[2] Zuckerberg was raised Jewish, had his bar mitzvah when he turned thirteen,[13][14] and has since described himself as an atheist.[14][15][16][17]
  </q>
</p>
```
2. blockquote - 块引用

和quote唯一的区别是，它是块元素（block），他也有cite属性，用法和q一样。在标准情况下，blockquote会向右缩进。

### 上标和下标元素 ###

sub & sup

用于一些元素符号或者商标或者表达式使用。比如化学符号中的水：

```html
<p>H<sub>2</sub>O</p>
```

数学符号平方

```html
<p>e=mc<sup>2</sup></p>
```

这两个都是内联元素，而且也是有标准属性(Attribute)。

### 行和段落 ###

最常见的p标签表示一篇文章的一段文字。也就是文章分段的其中一段。p标签中只允许包含inline元素，任何block元素甚至是p自身也不能被包含进来。


br 元素强制换行~












