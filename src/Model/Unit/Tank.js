define(function () {
	var Tank = Backbone.Model.extend({
		defaults: {
			image: 'tank.png'
		}
	});

	return Tank;
});