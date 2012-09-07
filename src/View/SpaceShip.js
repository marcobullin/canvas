define([
    'View/AbstractSpaceShip',
    'Model/Weapon/Shot',
    'View/Weapon/MachineGun',
    'View/Weapon/Cannon',
    'View/Weapon/DoubleMachineGun'
    ],
    function (AbstractSpaceShip, ShotModel, MachineGun, Cannon, DoubleMachineGun) {
	var View = View || {};
    View.SpaceShip = AbstractSpaceShip.extend({

    });
    /*
    View.SpaceShip = Backbone.View.extend({
        _scaning: {},
		initialize: function () {
		    this.model.set('id', Math.ceil(Math.random() * 99999999999 * new Date().getTime()));
            this.x = this.model.get('positionX');
            this.y = this.model.get('positionY');
            this.totalShield = this.model.get('shield');
            this.totalArmor = this.model.get('armor');

            this.model.on('change:isDestroyed', $.proxy(this.onDestroy, this));

            var weapons = this.model.get('weapons'),
                self = this;

                this._scaning = {};
            for (var key in weapons) {
                this._scaning[weapons[key].coordX + '_' + weapons[key].coordX] = window.setInterval(
                     $.proxy(this.scan, this, weapons[key]),
                     Math.floor(Math.random() * 400 + 50)
                 );
             }

            // if (this.model.get('owner') === 'computer' && this.model.get('type') !== 'mothership') {
            //     var self = this;
            //     window.setInterval(function () {
            //         var randX = Math.floor(Math.random() * 1400);
            //         var randY = Math.floor(Math.random() * 900);

            //         if (randX > 1500) {
            //             randX = 1300;
            //         }

            //         self.move(randX, randY);
            //     }, 10000);
            // }
        },

        move: function (x, y) {
            this.x = x - this.model.get('width') / 2;
            this.y = y - this.model.get('height') / 2;

            var direction = Math.atan2(this.y - this.model.get('positionY'), this.x - this.model.get('positionX')) - Math.PI/2;
            this.model.set('direction', direction);
        },

        moveAndAttack: function (enemy) {
            var xDst = Math.abs(enemy.model.get('positionX') - this.model.get('positionX') + this.model.get('width') / 2),
                yDst = Math.abs(enemy.model.get('positionY') - this.model.get('positionY') + this.model.get('height') / 2),
                a, b, c, x, y;

            c = Math.sqrt(xDst * xDst + yDst * yDst);

            var weapons = this.model.get('weapons');
            // unit is already in fireposition
            for (var i in weapons) {
                if (c <= weapons[i].model.get('firerange')) {
                    return;
                }

                a = xDst * (1 - weapons[i].model.get('firerange') / c);
                b = yDst * (1 - weapons[i].model.get('firerange') / c);

                if (weapons[i].model.get('positionX') < enemy.model.get('positionX')) {
                    x = weapons[i].model.get('positionX') + a;
                } else if (weapons[i].model.get('positionX') > enemy.model.get('positionX')) {
                    x = weapons[i].model.get('positionX') - a;
                } else {
                    x = weapons[i].model.get('positionX');
                }

                if (weapons[i].model.get('positionY') < enemy.model.get('positionY')) {
                    y = weapons[i].model.get('positionY') + b;
                } else if (weapons[i].model.get('positionY') > enemy.model.get('positionY')) {
                    y = weapons[i].model.get('positionY') - b;
                } else {
                    y = weapons[i].model.get('positionY');
                }
                break;
            }
            this.move(x, y);
        },

        hit: function (firepower) {
            if (!this.hitSound) {
                this.hitSound = new Audio(this.model.get('soundHit'));
            }

            this.hitSound.play();

            if (this.model.get('shield') > 0) {
                window.battlefield.ctx.beginPath();
                window.battlefield.ctx.arc(this.model.get('positionX') + this.model.get('width')/2, this.model.get('positionY') + this.model.get('height')/2, this.model.get('width')/2 + 5, 0, Math.PI*2, false);
                window.battlefield.ctx.fillStyle = "rgba(17, 92, 177, 0.4)";
                window.battlefield.ctx.fill();
                window.battlefield.ctx.closePath();

                this.model.set('shield', this.model.get('shield') - firepower);

                if (this.model.get('shield') >= 0) {
                    return;
                }

                firepower = Math.abs(this.model.get('shield'));
            }

            this.model.set('armor', this.model.get('armor') - firepower);

            if (this.model.get('armor') <= 0) {
                this.destroy();
            }
        },

        attack: function (enemy, weapon) {
            if (!this.shotSound) {
                this.shotSound = new Audio(weapon.sound);
            }

            this.shotSound.play();

            var shotModel = new ShotModel();
            shotModel.set('owner', this.model.get('owner'));
            shotModel.set('positionX', weapon.positionX + (weapon.width / 2));
            shotModel.set('positionY', weapon.positionY + (weapon.height / 2));
            shotModel.set('firepower', weapon.firepower);
            shotModel.set('firespeed', weapon.firespeed);

            var direction = Math.atan2(enemy.model.get('positionY') + enemy.model.get('height')/2 - weapon.positionY, enemy.model.get('positionX') + enemy.model.get('width')/2 - weapon.positionX) - Math.PI/2;
            shotModel.set('angle', direction);

            weapon.direction = direction;

            var shot = null;
            switch (weapon.type) {
                case 'laser':
                    shot = new MachineGun({
                        model: shotModel
                    });
                    break;
                case 'cannon':
                    shot = new Cannon({
                        model: shotModel
                    });
                    break;
                case 'doublelaser':
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

        updatePosition: function (modifier) {
            if (this.x === Math.round(this.model.get('positionX')) && this.y === Math.round(this.model.get('positionY'))) {
                return;
            }
            var speed = this.model.get('speed') * modifier,
                speedX, speedY,
                a = Math.abs(this.x - this.model.get('positionX')) / speed,
                b = Math.abs(this.y - this.model.get('positionY')) / speed;

            // set right speed for x and y distance
            if (a >= b) {
                speedX = speed;
                speedY = (b / a) * speed;
            } else {
                speedX = (a / b) * speed;
                speedY = speed;
            }

            // setting new postion
            if (this.x < this.model.get('positionX')) {
                this.model.set('positionX', (this.model.get('positionX') - speedX));
            }

            if (this.x > this.model.get('positionX')) {
                this.model.set('positionX', (this.model.get('positionX') + speedX));
            }

            if (this.y < this.model.get('positionY')) {
                this.model.set('positionY', (this.model.get('positionY') - speedY));
            }

            if (this.y > this.model.get('positionY')) {
                this.model.set('positionY', (this.model.get('positionY') + speedY));
            }
        },

        destroy: function () {
            if (!this.dieSound) {
                this.dieSound = new Audio(this.model.get('soundDestroy'));
            }

            this.dieSound.play();

            // removing unit/item from battlefield
            window.battlefield.remove(this.model.get('id'));

            // mark unit as destroyed
            this.model.set('isDestroyed', true);


            // animate explosion
            var self = this,
                x = 0,
                y = 0,
                w = 118,
                h = 118,
                dx = this.model.get('positionX')-54,
                dy = this.model.get('positionY')-54,
                dw = 118,
                dh = 118,
                animation;

            animation = window.setInterval(function() {
                window.battlefield.ctx.drawImage(
                    window.GameImages.explosion,
                    x,
                    y,
                    w,
                    h,
                    dx,
                    dy,
                    dw,
                    dh
                );

                if (x === (5 * 118)) {
                    window.clearInterval(animation);
                    return;
                }
                x += 118;
            }, 10);

            if (this.model.get('type') === 'mothership') {
                $('body').trigger('gameOver');
                if (this.model.get('owner') === 'user') {
                    alert('you loose');
                    $('body').trigger('newLevel', [window.level]);
                } else {
                    alert('you won');
                    $('body').trigger('newLevel', [++window.level]);
                }
            }
        },

        scan: function (weapon) {
            var items = window.battlefield.items,
                i,
                x1, x2, x3, x4, y1, y2, y3, y4, r2, centerX, centerY, destination1, destination2, destination3, destination4;

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

                r2 = weapon.firerange * weapon.firerange;

                centerX = weapon.positionX + weapon.width / 2;
                centerY = weapon.positionY + weapon.height / 2;

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
                    this.attack(items[i], weapon);
                    return;
                }
            }
            weapon.direction = null;
        },

        onDestroy: function () {
            console.log(this._scaning);
            for (var i in this._scaning) {
                window.clearInterval(this._scaning[i]);
            }
        },

        drawWeapon: function (weapon) {
            var Mx = this.model.get('positionX') + this.model.get('width')/2,
                My = this.model.get('positionY') + this.model.get('height')/2,
                x = Mx + weapon.coordX,
                y = My + weapon.coordY,
                alpha = this.model.get('direction') || 0,
                newX = (x - Mx) * Math.cos(alpha) - (y-My) * Math.sin(alpha) + Mx,
                newY = (x - Mx) * Math.sin(alpha) + (y-My) * Math.cos(alpha) + My;

            weapon.positionX = newX;
            weapon.positionY = newY;

            // if (this.model.get('selected')) {
            //     window.battlefield.ctx.beginPath();
            //     window.battlefield.ctx.arc(weapon.positionX, weapon.positionY, weapon.firerange, 0, Math.PI*2, false);
            //     window.battlefield.ctx.fillStyle = "rgba(255, 0, 0, 0.1)";
            //     window.battlefield.ctx.fill();
            //     window.battlefield.ctx.lineWidth = 1;
            //     window.battlefield.ctx.strokeStyle = 'red';
            //     window.battlefield.ctx.stroke();
            //     window.battlefield.ctx.closePath();
            // }

            window.battlefield.ctx.save();

            window.battlefield.ctx.translate(newX, newY);
            if (weapon.direction) {
                window.battlefield.ctx.rotate(weapon.direction);
            } else {
                window.battlefield.ctx.rotate(this.model.get('direction'));
            }
            window.battlefield.ctx.drawImage(window.GameImages[weapon.type], -weapon.width/2, -weapon.height/2, weapon.width, weapon.height);
            window.battlefield.ctx.restore();

            return {x: newX, y: newY};
        },

        draw: function (modifier) {
		    var armor = this.model.get('width') / 100 * (this.model.get('armor') / this.totalArmor * 100),
                shield = this.model.get('width') / 100 *(this.model.get('shield') / this.totalShield * 100),
                x = (-1 * this.model.get('width') / 2),
                y = (-1 * this.model.get('height') / 2);

            this.updatePosition(modifier);

            if (this.model.get('selected')) {
                window.battlefield.ctx.beginPath();
                window.battlefield.ctx.arc(this.model.get('positionX') + this.model.get('width')/2, this.model.get('positionY') + this.model.get('height')/2, this.model.get('width')/2 + 2, 0, Math.PI*2, false);
                window.battlefield.ctx.fillStyle = "rgba(0, 255, 0, 0.5)";
                window.battlefield.ctx.fill();
                window.battlefield.ctx.lineWidth = 1;
                window.battlefield.ctx.strokeStyle = 'green';
                window.battlefield.ctx.stroke();
                window.battlefield.ctx.closePath();
            }
            // ROTATE
            window.battlefield.ctx.save();
            window.battlefield.ctx.translate(this.model.get('positionX') + this.model.get('width') / 2, this.model.get('positionY') + this.model.get('height') / 2);
            window.battlefield.ctx.rotate(this.model.get('direction'));

            // LIVE
            window.battlefield.ctx.fillStyle = 'red';
            window.battlefield.ctx.fillRect(x, y - 4, this.model.get('width'), 4);
            window.battlefield.ctx.fillStyle = 'green';
            window.battlefield.ctx.fillRect(x, y - 4, armor, 4);

            // SHIELD
            window.battlefield.ctx.fillStyle = '#115cb1';
            window.battlefield.ctx.fillRect(x, y - 8, shield, 4);

            window.battlefield.ctx.drawImage(window.GameImages[this.model.get('type')], x, y, this.model.get('width'), this.model.get('height'));
            window.battlefield.ctx.restore();

            // WEAPONS
            var weapons = this.model.get('weapons');
            for (var key in weapons) {
                this.drawWeapon(weapons[key]);
            }
		}
 	});
     */
	return View.SpaceShip;
});