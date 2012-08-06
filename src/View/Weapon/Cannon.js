define([
	'View/Weapon/Shot'
	],
	function (Shot) {
		var Cannon = Shot.extend({
			render: function (modifier) {
				this.model.set('id', Math.ceil(Math.random() * 99999999999 * new Date().getTime()));

				this.update(modifier);
				
				window.battlefield.ctx.save();

				window.battlefield.ctx.beginPath();
				window.battlefield.ctx.arc(this.model.get('positionX'), this.model.get('positionY'), 3, 0 , 2 * Math.PI, false);
				window.battlefield.ctx.closePath();

				window.battlefield.ctx.shadowBlur = 10;
				window.battlefield.ctx.shadowColor = "white";

				window.battlefield.ctx.fillStyle = 'red';
				window.battlefield.ctx.fill();

				window.battlefield.ctx.restore();
			}
		});

		return Cannon;
	}
);