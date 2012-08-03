define(function () {
	var Tank = Backbone.Model.extend({
		defaults: {
			imageKey: 'tank',
			sound: {
				shot: 'sounds/laser.mp3',
				die: 'sounds/bigboom.mp3',
				hit: 'sounds/hit.mp3'
			}
		}
	});

	return Tank;
});