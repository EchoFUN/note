/**
 * From Tencent Blog
 * http://www.alloyteam.com/2012/10/common-javascript-design-patterns/
 * 在全局中只存在一个实例对象可以被别共享
 */ 

// 老方法，创建对象, 全局污染
var mask = {};
var createMask = function() {
	return mask || (mask = document.body.appendChild(document.createElement("DIV")));
};

// 合适的单例
var createMask = (function() {
	var mask;
	return function() {
		return mask || (mask = document.body.appendChild(document.createElement("DIV")));
	};
})();

// 抽象出来当做通用的单例
var singleton = function(fn) {
	var result;
	return function() {
		return result || (result = fn.apply(this, arguments));
	};
};

// Use
var createMask = singleton(function() {
	return document.body.appendChild(document.createElement("DIV"));
});