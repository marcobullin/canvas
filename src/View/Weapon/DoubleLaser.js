define([
	'View/Weapon/Shot'
	],
	function (Shot) {
		'use strict';
        var View = View || {};
        View.DoubleLaser = Shot.extend({
        	initialize: function () {
                this.model.set('type', 'doublelaser');
            },
			draw: function (modifier) {
				this.update(modifier);

				window.battlefield.ctx.save();
                window.battlefield.ctx.translate(this.model.get('positionX'), this.model.get('positionY'));
                window.battlefield.ctx.rotate(this.model.get('angle'));
                if (this.model.get('owner') === 'user') {
                	window.battlefield.ctx.drawImage(window.GameImages['humanDoubleLaserShot'], 0, 0, 5, 10);
                } else {
                	window.battlefield.ctx.drawImage(window.GameImages['alienDoubleLaserShot'], 0, 0, 5, 10);
                }
                window.battlefield.ctx.restore();
			}
		});

		return View.DoubleLaser;
	}
);