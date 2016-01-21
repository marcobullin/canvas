define([
	'View/Weapon/Shot'
	],
	function (Shot) {
		'use strict';
        var View = View || {};
        View.BigLaser = Shot.extend({
        	initialize: function () {
                this.model.set('type', 'biglaser');
                this.game = this.options.game;
            },
			draw: function (modifier) {
				this.update(modifier);

				this.game.battlefield.ctx.save();
                this.game.battlefield.ctx.translate(this.model.get('positionX'), this.model.get('positionY'));
                this.game.battlefield.ctx.rotate(this.model.get('angle'));
                if (this.model.get('owner') === 'user') {
                	this.game.battlefield.ctx.drawImage(this.game.getImage('humanBigLaserShot'), 0, 0, 10, 20);
                } else {
                	this.game.battlefield.ctx.drawImage(this.game.getImage('alienBigLaserShot'), 0, 0, 10, 20);
                }
                this.game.battlefield.ctx.restore();
			}
		});

		return View.BigLaser;
	}
);