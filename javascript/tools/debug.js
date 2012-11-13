
!function(GOLBAL) {
	var root = GOLBAL
	   ,results
	   ,asyncQueue = []
	   ,paused = false;


	var pause = function() {
		paused = true;
	};

	var resume = function() {
		paused = false;
		setTimeout(runTest, 1);
	};

	var runTest = function() {
		if (!paused && asyncQueue.length) {
			asyncQueue.shift()();
			if (!paused) {
				resume();
			}
		}
	};

	// debug tool
	var debug_tool = {

		// 打印函数
		log: function() {
			try {
				console.log.apply(console, arguments);
			}
			catch(e) {
				try {
					opera.postError.apply(opera, arguments);
				}
				catch(e) {
					alert(Array.prototype.join.call(arguments, " "));
				}
			}
		},

		// 断言函数
		assert: function(value, desc) {
			var li = document.createElement('li');
			li.className = value ? "pass" : "fail";
			li.appendChild(document.createTextNode(desc));
			if (!results) results = results = document.getElementById('results');
			results.appendChild(li);
			if (!value) {
				li.parentNode.parentNode.className = "fail";
			}
			return li;
		},
		// 一般测试
		test: function(name, fn) {
			results = document.getElementById('results');
			results = debug_tool.assert(true, name).appendChild(document.createElement('ul'));
			fn();
		},
		// 异步测试
		asyncTest: function(name, fn) {
			asyncQueue.push(function() {
				results = document.getElementById('results');
				results = debug_tool.assert(true, name).appendChild(
					document.createElement('ul'));
				fn();
			});
			runTest();
		},
		pause: pause,
		resume: resume,
	};
	root.debug_tool = debug_tool;
}(this);