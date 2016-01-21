define([
	'View/Weapon/Shot'
	],
	function (Shot) {
		'use strict';
        var View = View || {};
        View.DoubleLaser = Shot.extend({
        	initialize: function () {
                this.model.set('type', 'doublelaser');
                this.game = this.options.game;
            },
			draw: function (modifier) {
				this.update(modifier);

				this.game.battlefield.ctx.save();
                this.game.battlefield.ctx.translate(this.model.get('positionX'), this.model.get('positionY'));
                this.game.battlefield.ctx.rotate(this.model.get('angle'));
                if (this.model.get('owner') === 'user') {
                	this.game.battlefield.ctx.drawImage(this.game.getImage('humanDoubleLaserShot'), 0, 0, 5, 10);
                } else {
                	this.game.battlefield.ctx.drawImage(this.game.getImage('alienDoubleLaserShot'), 0, 0, 5, 10);
                }
                this.game.battlefield.ctx.restore();
			}
		});

		return View.DoubleLaser;
	}
);