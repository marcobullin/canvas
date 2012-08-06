define(
	function () {
		var Obstacle = Backbone.View.extend({
			render: function () {
				window.battlefield.ctx.drawImage(window.GameImages['obstacle'], this.model.get('positionX'), this.model.get('positionY'), this.model.get('width'), this.model.get('height'));
				window.battlefield.ctx.restore();
			}
		});

		return Obstacle;
	}
);