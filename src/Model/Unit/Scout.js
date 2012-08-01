define(function () {
	var Scout = Backbone.Model.extend({
		defaults: {
			imageKey: 'scout',
			sound: {
				shot: 'sounds/laser.mp3',
				die: 'sounds/boom.mp3'
			}
		}
	});

	return Scout;
});