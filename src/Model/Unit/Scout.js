define(function () {
	var Scout = Backbone.Model.extend({
		defaults: {
			image: 'images/scout.png',
			sound: {
				shot: 'sounds/laser.mp3',
				die: 'sounds/boom.mp3'
			}
		}
	});

	return Scout;
});