define([
	'View/Weapon/Shot'
	],
	function (Shot) {
		'use strict';
        var View = View || {};
        View.BigLaser = Shot.extend({
        	initialize: function () {
                this.model.set('type', 'biglaser');
            },
			draw: function (modifier) {
				//this.model.set('id', Math.ceil(Math.random() * 9999999999999 * new Date().getTime()));

				var width = 4,
					height = 12;

				this.update(modifier);

				window.battlefield.ctx.save();

				window.battlefield.ctx.translate(this.model.get('positionX') + width/2 - 20, this.model.get('positionY') + height/2 - 20);
				window.battlefield.ctx.rotate(this.model.get('angle'));

				window.battlefield.ctx.beginPath();
				window.battlefield.ctx.moveTo(-width/2, -height/2);
				window.battlefield.ctx.lineTo(-width/2, -height/2 + height);
				window.battlefield.ctx.lineTo(-width/2 + width, -height/2 + height);
				window.battlefield.ctx.lineTo(-width/2 + width, -height/2);
				window.battlefield.ctx.closePath();

				window.battlefield.ctx.shadowBlur = 5;
				window.battlefield.ctx.shadowColor = "white";

				if (this.model.get('owner') === 'user') {
					window.battlefield.ctx.fillStyle = 'LightGreen';
				} else {
					window.battlefield.ctx.fillStyle = '#FF0033';
				}

				window.battlefield.ctx.fill();

				window.battlefield.ctx.restore();
			}
		});

		return View.BigLaser;
	}
);