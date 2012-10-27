
!function(GLOBAL, $) {
	var Sidebar = Backbone.Model.extend({
		promptColor: function() {
			var cssColor = prompt("Please Enter A CSS Color");
			this.set({color: cssColor});
		}
	});

	GLOBAL.sidebar = new Sidebar;
	GLOBAL.sidebar.on('change:color', function(model, color) {
		$('#sidebar').css({background: color});
	});

	GLOBAL.sidebar.set({color: "red"});
	GLOBAL.sidebar.promptColor();
}(window, window.jQuery);