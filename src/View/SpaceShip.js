define(
    [
        'Model/Weapon/Shot',
        'View/Weapon/MachineGun',
        'View/Weapon/Cannon',
        'View/Weapon/DoubleMachineGun'
    ],
    function (ShotModel, MachineGun, Cannon, DoubleMachineGun) {
        'use strict';
        var View = View || {};
        View.SpaceShip = Backbone.View.extend({
            scaning: {},

            /**
             * init stuff
             *
             * @return void
             */
            initialize: function () {
                // unique ID
                this.model.set('id', Math.ceil(Math.random() * 99999999999 * new Date().getTime()));

                // events
                this.model.on('change:isDestroyed', $.proxy(this.onDestroy, this));
                this.model.on('change:currentShield', $.proxy(this.onHitShield, this));
                this.model.on('change:currentArmor', $.proxy(this.onHitArmor, this));

                // reset weapon scaning
                this.scaning = {};

                // let weapons scan for enemies
                var weapons = this.model.get('weapons'),
                    index,
                    key;
                for (index in weapons) {
                    if (weapons.hasOwnProperty(index)) {
                        key = weapons[index].coordX + '_' + weapons[index].coordY;

                        this.scaning[key] = window.setInterval($.proxy(this.scan, this, weapons[index]), Math.floor(Math.random() * 400 + 50));
                    }
                }
            },

            /**
             * Scan location for enemies and attack them.
             *
             * @param  object weapon - current scaning weapon
             *
             * @return void
             */
            scan: function (weapon) {
                var items = window.battlefield.items,
                    i,
                    x1,
                    x2,
                    x3,
                    x4,
                    y1,
                    y2,
                    y3,
                    y4,
                    r2,
                    centerX,
                    centerY,
                    destination1,
                    destination2,
                    destination3,
                    destination4;

                for (i = 0; i < items.length; i += 1) {
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
                    if (destination1 < r2 || destination2 < r2 || destination3 < r2 || destination4 < r2) {
                        this.attack(items[i].model, weapon);
                        return;
                    }
                }

                weapon.direction = null;
            },

            /**
             * Moving the spaceship to a position.
             *
             * @param  integer x destination x - position
             * @param  integer y destination y - position
             *
             * @return void
             */
            move: function (x, y) {
                this.model.set('destinationPositionX', x - this.model.get('width') / 2);
                this.model.set('destinationPositionY', y - this.model.get('height') / 2);

                var direction = Math.atan2(
                    this.model.get('destinationPositionY') - this.model.get('positionY'),
                    this.model.get('destinationPositionX') - this.model.get('positionX')
                ) - Math.PI / 2;

                this.model.set('direction', direction);
            },

            /**
             * Handles a hit on the shield.
             *
             * @param  object   model - ship model
             * @param  integer  value - current shield
             *
             * @return void
             */
            onHitShield: function (model, value) {
                window.battlefield.ctx.beginPath();
                window.battlefield.ctx.arc(
                    this.model.get('positionX') + this.model.get('width') / 2,
                    this.model.get('positionY') + this.model.get('height') / 2,
                    this.model.get('width') / 2 + 5,
                    0,
                    Math.PI * 2,
                    false
                );

                window.battlefield.ctx.fillStyle = "rgba(17, 92, 177, 0.4)";
                window.battlefield.ctx.fill();
                window.battlefield.ctx.closePath();
            },

            /**
             * Handles a hit on the ship it self.
             *
             * @param  object   model - ship model
             * @param  integer  value - current armor
             *
             * @return void
             */
            onHitArmor: function (model, value) {
                if (!this.hitSound) {
                    this.hitSound = new Audio(this.model.get('soundHit'));
                }

                this.hitSound.play();

                if (value <= 0) {
                    model.set('isDestroyed', true);
                }
            },

            /**
             * attack an enemy
             *
             * @param  object  enemy - model of enemy
             * @param  object  weapon - the weapon to attack the enemy
             *
             * @return void
             */
            attack: function (enemy, weapon) {
                if (!this.shotSound) {
                    this.shotSound = new Audio(weapon.sound);
                }

                this.shotSound.play();

                var shotModel = new ShotModel(),
                    direction = Math.atan2(enemy.get('positionY') + enemy.get('height') / 2 - weapon.positionY, enemy.get('positionX') + enemy.get('width') / 2 - weapon.positionX) - Math.PI / 2,
                    shot = null,
                    randX = Math.floor(Math.random() * enemy.get('width') + enemy.get('positionX')),
                    randY = Math.floor(Math.random() * enemy.get('height') + enemy.get('positionY'));

                shotModel.set('owner', this.model.get('owner'));
                shotModel.set('positionX', weapon.positionX + (weapon.width / 2));
                shotModel.set('positionY', weapon.positionY + (weapon.height / 2));
                shotModel.set('firepower', weapon.firepower);
                shotModel.set('firespeed', weapon.firespeed);
                shotModel.set('angle', direction);

                weapon.direction = direction;

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

                shot.fire(randX, randY, enemy.get('positionX'), enemy.get('positionY'), enemy.get('positionX') + enemy.get('width'), enemy.get('positionY') + enemy.get('height'));
            },

            /**
             * Check if unit has to be moved and than update the position for rendering/drawing.
             *
             * @param integer modifier - time 
             *
             * @return void
             */
            updatePosition: function (modifier) {
                if (this.model.get('destinationPositionX') === Math.round(this.model.get('positionX')) && this.model.get('destinationPositionY') === Math.round(this.model.get('positionY'))) {
                    return;
                }

                var speed = this.model.get('speed') * modifier,
                    speedX,
                    speedY,
                    a = Math.abs(this.model.get('destinationPositionX') - this.model.get('positionX')) / speed,
                    b = Math.abs(this.model.get('destinationPositionY') - this.model.get('positionY')) / speed;

                // set right speed for x and y distance
                if (a >= b) {
                    speedX = speed;
                    speedY = (b / a) * speed;
                } else {
                    speedX = (a / b) * speed;
                    speedY = speed;
                }

                // setting new postion
                if (this.model.get('destinationPositionX') < this.model.get('positionX')) {
                    this.model.set('positionX', (this.model.get('positionX') - speedX));
                }

                if (this.model.get('destinationPositionX') > this.model.get('positionX')) {
                    this.model.set('positionX', (this.model.get('positionX') + speedX));
                }

                if (this.model.get('destinationPositionY') < this.model.get('positionY')) {
                    this.model.set('positionY', (this.model.get('positionY') - speedY));
                }

                if (this.model.get('destinationPositionY') > this.model.get('positionY')) {
                    this.model.set('positionY', (this.model.get('positionY') + speedY));
                }
            },

            /**
             * Handler if unit is destroyed by enemy.
             *
             * @param object model - model of destroyed spaceship
             *
             * @return void
             */
            onDestroy: function (model) {
                var i,
                    self = this,
                    x = 0,
                    y = 0,
                    w = 118,
                    h = 118,
                    dx = model.get('positionX') - 54,
                    dy = model.get('positionY') - 54,
                    dw = 118,
                    dh = 118,
                    animation;

                if (!this.dieSound) {
                    this.dieSound = new Audio(this.model.get('soundDestroy'));
                }

                this.dieSound.play();

                // removing unit/item from battlefield
                window.battlefield.remove(this.model.get('id'));

                // clean all weapon scanings
                for (i in this.scaning) {
                    if (this.scaning.hasOwnProperty(i)) {
                        window.clearInterval(this.scaning[i]);
                    }
                }

                // display explosion
                animation = window.setInterval(function () {
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
            },

            /**
             * Draws the weapons of the spaceship.
             *
             * @param object weapon - current weapon to draw
             *
             * @return void
             */
            drawWeapon: function (weapon) {
                var Mx = this.model.get('positionX') + this.model.get('width') / 2,
                    My = this.model.get('positionY') + this.model.get('height') / 2,
                    x = Mx + weapon.coordX,
                    y = My + weapon.coordY,
                    alpha = this.model.get('direction') || 0,
                    newX = (x - Mx) * Math.cos(alpha) - (y - My) * Math.sin(alpha) + Mx,
                    newY = (x - Mx) * Math.sin(alpha) + (y - My) * Math.cos(alpha) + My;

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
                window.battlefield.ctx.drawImage(window.GameImages[weapon.type], -weapon.width / 2, -weapon.height / 2, weapon.width, weapon.height);
                window.battlefield.ctx.restore();
            },

            /**
             * Drawing everything. The spaceship, the armor, the shield and the weapons.
             *
             * @param integer modifier - time 
             *
             * @return void
             */
            draw: function (modifier) {
                var armor = this.model.get('width') / 100 * (this.model.get('currentArmor') / this.model.get('maxArmor') * 100),
                    shield = this.model.get('width') / 100 * (this.model.get('currentShield') / this.model.get('maxShield') * 100),
                    x = (-1 * this.model.get('width') / 2),
                    y = (-1 * this.model.get('height') / 2),
                    weapons = this.model.get('weapons'),
                    key;

                this.updatePosition(modifier);

                // MARK SHIP AS SELECTED
                if (this.model.get('selected')) {
                    window.battlefield.ctx.beginPath();
                    window.battlefield.ctx.arc(this.model.get('positionX') + this.model.get('width') / 2, this.model.get('positionY') + this.model.get('height') / 2, this.model.get('width') / 2 + 2, 0, Math.PI * 2, false);
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

                // ARMOR BAR
                window.battlefield.ctx.fillStyle = 'red';
                window.battlefield.ctx.fillRect(x, y - 4, this.model.get('width'), 4);
                window.battlefield.ctx.fillStyle = 'green';
                window.battlefield.ctx.fillRect(x, y - 4, armor, 4);

                // SHIELD BAR
                window.battlefield.ctx.fillStyle = '#115cb1';
                window.battlefield.ctx.fillRect(x, y - 8, shield, 4);

                // SPACESHIP
                window.battlefield.ctx.drawImage(window.GameImages[this.model.get('type')], x, y, this.model.get('width'), this.model.get('height'));
                window.battlefield.ctx.restore();

                // WEAPONS
                for (key in weapons) {
                    if (weapons.hasOwnProperty(key)) {
                        this.drawWeapon(weapons[key]);
                    }
                }
            }
        });

        return View.SpaceShip;
    }
);