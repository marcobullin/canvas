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
				this.update(modifier);

				window.battlefield.ctx.save();
                window.battlefield.ctx.translate(this.model.get('positionX'), this.model.get('positionY'));
                window.battlefield.ctx.rotate(this.model.get('angle'));
                if (this.model.get('owner') === 'user') {
                	window.battlefield.ctx.drawImage(window.GameImages['humanBigLaserShot'], 0, 0, 10, 20);
                } else {
                	window.battlefield.ctx.drawImage(window.GameImages['alienBigLaserShot'], 0, 0, 10, 20);
                }
                window.battlefield.ctx.restore();
			}
		});

		return View.BigLaser;
	}
);