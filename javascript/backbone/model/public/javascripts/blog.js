var Article = Backbone.Model.extend({
	url: '/article',
	validate: function(attributes) {
		for (var k in attributes) {
			console.log(k, ':', attributes[k]);
		}
	}
});