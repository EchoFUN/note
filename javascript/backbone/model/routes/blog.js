
blog = (function() {
	var _create = function(req, res) {
		var title = req.body.title;
		var content = req.body.content;
		console.log(JSON.stringify(req.body));
		res.send(JSON.stringify({status: {code: 1, centent: ""}}));
	};
	return {
		create: _create
	};
})();

exports.blog = blog;