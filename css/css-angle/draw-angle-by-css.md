title: 使用css画三角形
tags: css, 盒模型
categories: CSS
id:51016546258d179acd000001

+++++++++++++++++++++++++++++++++++++++++++++

之前有人介绍过如何使用CSS来画三角形，一直没有时间看。看了以后对盒模型有更深入的了解了。其实用css实现的三角形是利用border的宽度设置来实现的。盒模型按照我们原来的理解可以再把border拆分成下面这样：

![Alt 盒模型](http://www.freeimagehosting.net/newuploads/3c2fi.jpg)

那么，我们可以根据这个盒模型来做出我们所需要的形状。这时候只需把border的宽度设大，并且把四条边的颜色值设置成不同的颜色就可以看到效果。

```text
<iframe style="width: 100%; height: 300px" src="http://jsfiddle.net/kiddkai/ruutE/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
```

这个时候把div宽高设置为0的时候就可以得到四个三角形。

```text
<iframe style="width: 100%; height: 300px" src="http://jsfiddle.net/kiddkai/9ZK3Y/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
```

所以，我们可以根据这个特性来构造出各种我们想要的三角形组合：

```text
<iframe style="width: 100%; height: 300px" src="http://jsfiddle.net/kiddkai/ZE6k9/2/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
```

如果想要不规则三角形，只需要拼出来即可。