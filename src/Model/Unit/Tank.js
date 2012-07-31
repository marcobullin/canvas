define(function () {
	var Tank = Backbone.Model.extend({
		defaults: {
			image: 'images/tank.png',
			sound: {
				shot: 'sounds/laser.mp3',
				die: 'sounds/bigboom.mp3'
			}
		}
	});

	return Tank;
});