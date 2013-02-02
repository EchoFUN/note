Canvas 学习
==============

1. 获得 canvas 2d上下文

```js
var elem = document.getElementById('someID')
   ,  context =  elem.getContext('2d');
```

2. 调用各种 api 开始在 canvas 上下文中进行绘图


### 角度换算成弧度 ###

```js
var degrees = 1;
var radians = degrees * (Math.PI / 180);
```

常用弧度

0度   === 0
90度  === π/2
180度 === π
270度 === 3π/2
360度 === 2π

