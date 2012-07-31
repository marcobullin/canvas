define(
	function () {
		var Obstacle = Backbone.View.extend({
			render: function () {
				window.battlefield.ctx.beginPath();
				window.battlefield.ctx.fillStyle = 'red';
				window.battlefield.ctx.fillRect(this.model.get('positionX'), this.model.get('positionY'), this.model.get('width'), this.model.get('height'));
				window.battlefield.ctx.fill();
				window.battlefield.ctx.closePath();
			}
		});

		return Obstacle;
	}
);