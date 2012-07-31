define([
	'View/Weapon/Shot'
	],
	function (Shot) {
		var DoubleMachineGun = Shot.extend({
			render: function () {
				this.model.set('id', Math.ceil(Math.random() * 99999999999 * new Date().getTime()));

				var width = 2,
					height = 10;

				window.battlefield.ctx.save();

				window.battlefield.ctx.translate(this.model.get('positionX') + width/2, this.model.get('positionY') + height/2);
				window.battlefield.ctx.rotate(this.model.get('angle'));

				window.battlefield.ctx.beginPath();
				window.battlefield.ctx.moveTo(-width/2 - 2, -height/2);
				window.battlefield.ctx.lineTo(-width/2 - 2, -height/2 + height);
				window.battlefield.ctx.lineTo(-width/2 - 2 + width, -height/2 + height);
				window.battlefield.ctx.lineTo(-width/2 - 2 + width, -height/2);


				window.battlefield.ctx.moveTo(-width/2 + 2, -height/2);
				window.battlefield.ctx.lineTo(-width/2 + 2 , -height/2 + height);
				window.battlefield.ctx.lineTo(-width/2 + 2 + width, -height/2 + height);
				window.battlefield.ctx.lineTo(-width/2 + 2 + width, -height/2);
				window.battlefield.ctx.closePath();

				window.battlefield.ctx.shadowBlur = 5;
				window.battlefield.ctx.shadowColor = "white";

				window.battlefield.ctx.fillStyle = 'yellow';
				window.battlefield.ctx.fill();

				window.battlefield.ctx.restore();
			}
		});

		return DoubleMachineGun;
	}
);