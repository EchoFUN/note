define(function(require, exports, module) {

	var Article = Backbone.Model.extend({
		url: '/article',
		initialize: function() {},
		validate: function() {}
	});


	var Articles = Backbone.Collection.extend({
		url: '/articles',
		model: Article
	});

	exports.Article = Article;
	exports.Articles = Articles;
});