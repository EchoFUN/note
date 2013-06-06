title: 用Travis给Nodejs+Yeoman项目做持续集成
tags: CI,Nodejs
categories: Nodejs
+++++++++++++++++++++++++++++++++++++++++

在做一个有关Todo app的毕业设计，顺便说一下项目是怎么去做持续集成的。首先是选择Travis CI的原因，由于Travis CI和github是无缝接合的，所以我希望就是在我往github上推送一次代码的时候自动去完成所有的测试工作。所以我可以剩下很多时间去专注于我的测试和开发。至于为什么没有选择Jenkins，原因是自己懒得去配置了。

### Mocha && Travis CI ###

在服务端，我采用了 Expressjs + Socket.io 进行后端的工作，在测试方面我则选择了Mocha作为我的测试框架。原因都懂，Mocha + should 的单元测试写法太过让人着迷了。在travis ci中的 nodejs 的测试是调用 npm test 来跑的，所以在 package.json 中就要写成下面这样:

```js
{
  ...
  "scripts" : {
    "test": "mocha args path/to/your/test"
  }
}
```

那样的话在每次执行集成的时候测试就会自动调用 mocha 作为首选的单元测试框架了。

### Yeoman/Yo && Travis CI ###

在Yeoman生成的工程中，测试任务是使用 ```grunt test``` 来进行的。我的Todo app是用yo的angular生成器来进行生成的。所以在进行测试是使用 ```karma```(原testacular)来进行的。

由于没有使用实际的浏览器来测试代码，所以在Travis CI中用的是phantomjs来跑前端的单元测试，所以在 package.json 中的 test 改成下面这样：

```js
{
  ...
  "scripts" : {
    "test": "mocha args path/to/your/test && grunt test"
  }
}
```

#### 关于依赖 ####

* yeoman/yo 依赖 grunt/compass/sass/bower
* 后端依赖 Mongodb

所以在 .travis.yml 中需要配置 before script 和 Service:

```bash
language: node_js
node_js:
  - "0.8"
services: mongodb
before_script:
  - gem install sass
  - gem install compass
  - npm install -g grunt-cli
  - npm install -g bower
  - bower install
```

项目地址在这 --> [看看~~](https://github.com/kiddkai/todoSuper)




