lstitle: Angularjs App 应用架构
tags: Angularjs, JavaScript
categories: JavaScript, Angularjs
id:5134d7985802ec0000000001
+++++++++++++++++++++++++++++++++++++++

### app.js ###

一个app是一个 angular.module。因为要实现单页应用，所以router也是必须存在的。所以这部分一样写在app里面。

```js
angular.module('learnAngularApp',[])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
```

### index.html ###

```html
<div class="container" ng-view>
</div>
```

这个就是实际的内容容器，一个 ng-view。 ng-view 的内容根据 router 的变化而变化。

### views/main.html ###

在这个 app 充当主 view 来使用。其对应的 controller 的名字是 MainCtrl，这个 Ctrl 的声明在 scripts/controllers/main.js 里。

### scripts/controllers/main.js ###

main里面放一些controller。

```js
angular.module('learnAngularApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Testacular'
    ];
  });
```


简单记录， mark 一下以免忘记。























