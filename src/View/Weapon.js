define(
    [
    'Model/Weapon/Shot',
    'View/Weapon/MachineGun',
    'View/Weapon/Cannon',
    'View/Weapon/DoubleMachineGun'
    ],
    function (ShotModel, MachineGun, Cannon, DoubleMachineGun) {
	var View = View || {};

	View.Weapon = Backbone.View.extend({
        initialize: function () {
            this._scanning = window.setInterval($.proxy(this.scan, this), Math.floor(Math.random() * 400 + 50));
        },

        scan: function () {
            if (this.options.spaceship.get('isDestroyed')) {
                window.clearInterval(this._scanning);
                return;
            }
            
            var items = window.battlefield.items,
                i,
                x1, x2, x3, x4, y1, y2, y3, y4, r2, centerX, centerY, destination1, destination2, destination3, destination4;

            // if (this.model.get('attackEnemy')) {
            //     var enemy = this.getEnemyById(this.model.get('attackEnemy'));

            //     if (enemy && this.inRange(enemy)) {
            //         this.attack(enemy);
            //         return;
            //     }
            // }

            for (i = 0; i < items.length; i+=1) {
                // do not attack your own units
                if (items[i].model.get('owner') === this.model.get('owner')) {
                    continue;
                }

                // item is not attackable
                if (!items[i].model.get('isAttackable')) {
                    continue;
                }

                x1 = items[i].model.get('positionX');
                y1 = items[i].model.get('positionY');

                x2 = items[i].model.get('positionX') + items[i].model.get('width');
                y2 = items[i].model.get('positionY');

                x3 = items[i].model.get('positionX') + items[i].model.get('width');
                y3 = items[i].model.get('positionY') + items[i].model.get('height');

                x4 = items[i].model.get('positionX');
                y4 = items[i].model.get('positionY') + items[i].model.get('height');

                r2 = this.model.get('firerange') * this.model.get('firerange');

                centerX = this.model.get('positionX') + this.model.get('width') / 2;
                centerY = this.model.get('positionY') + this.model.get('height') / 2;

                destination1 = (x1 - centerX) * (x1 - centerX) + (y1 - centerY) * (y1 - centerY);
                destination2 = (x2 - centerX) * (x2 - centerX) + (y2 - centerY) * (y2 - centerY);
                destination3 = (x3 - centerX) * (x3 - centerX) + (y3 - centerY) * (y3 - centerY);
                destination1 = (x4 - centerX) * (x4 - centerX) + (y4 - centerY) * (y4 - centerY);

                // check if one of this points is in range
                if (destination1 < r2 ||
                 destination2 < r2 ||
                 destination3 < r2 ||
                 destination4 < r2
                ) {
                 this.attack(items[i]);
                 break;
                }
            }
        },

        attack: function (enemy) {
            // if (!this.shotSound) {
            //     this.shotSound = new Audio(this.model.get('sound').shot);
            // }

            // this.shotSound.play();

            var shotModel = new ShotModel();
            shotModel.set('owner', this.model.get('owner'));
            shotModel.set('positionX', this.model.get('positionX') + (this.model.get('width') / 2));
            shotModel.set('positionY', this.model.get('positionY') + (this.model.get('height') / 2));
            shotModel.set('firepower', this.model.get('firepower'));
            shotModel.set('firespeed', this.model.get('firespeed'));

            var direction = Math.atan2(enemy.model.get('positionY') - this.model.get('positionY'), enemy.model.get('positionX') - this.model.get('positionX')) - Math.PI/2;
            shotModel.set('angle', direction);

            var shot = null;
            switch (this.model.get('type')) {
                case 'MachineGun':
                    shot = new MachineGun({
                        model: shotModel
                    });
                    break;
                case 'Cannon':
                    shot = new Cannon({
                        model: shotModel
                    });
                    break;
                case 'DoubleMachineGun':
                    shot = new DoubleMachineGun({
                        model: shotModel
                    });
                    break;
                default: return;
            }
        
            window.battlefield.add(shot);

            var randX = Math.floor(Math.random() * enemy.model.get('width') + enemy.model.get('positionX')),
                randY = Math.floor(Math.random() * enemy.model.get('height') + enemy.model.get('positionY'));

            shot.fire(randX, randY, enemy.model.get('positionX'), enemy.model.get('positionY'), enemy.model.get('positionX') + enemy.model.get('width'), enemy.model.get('positionY') + enemy.model.get('height'));
        },

		draw: function () {	   
            var Mx = this.options.spaceship.get('positionX') + this.options.spaceship.get('width')/2,
                My = this.options.spaceship.get('positionY') + this.options.spaceship.get('height')/2,
                x = Mx + this.model.get('coordX'),
                y = My + this.model.get('coordY'),
                alpha = this.options.spaceship.get('direction') || 0,
                newX = (x - Mx) * Math.cos(alpha) - (y-My) * Math.sin(alpha) + Mx,
                newY = (x - Mx) * Math.sin(alpha) + (y-My) * Math.cos(alpha) + My;

            this.model.set('positionX', newX);
            this.model.set('positionY', newY);

            if (this.options.spaceship.get('selected')) {
                window.battlefield.ctx.beginPath();
                window.battlefield.ctx.arc(this.model.get('positionX'), this.model.get('positionY'), this.model.get('firerange'), 0, Math.PI*2, false);
                window.battlefield.ctx.fillStyle = "rgba(255, 0, 0, 0.1)";
                window.battlefield.ctx.fill();
                window.battlefield.ctx.lineWidth = 1;
                window.battlefield.ctx.strokeStyle = 'red';
                window.battlefield.ctx.stroke();
                window.battlefield.ctx.closePath();
            }

            window.battlefield.ctx.beginPath();
            window.battlefield.ctx.arc(this.model.get('positionX'), this.model.get('positionY'), this.model.get('width'), 0, Math.PI*2, false);
            window.battlefield.ctx.fillStyle = "blue";
            window.battlefield.ctx.fill();
            window.battlefield.ctx.lineWidth = 1;
            window.battlefield.ctx.strokeStyle = 'blue';
            window.battlefield.ctx.stroke();
            window.battlefield.ctx.closePath();
		}
	});

	return View.Weapon;
});