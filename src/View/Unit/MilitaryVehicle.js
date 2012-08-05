define([
	'View/Unit/Vehicle',
	'Model/Weapon/Shot',
	'View/Weapon/MachineGun',
	'View/Weapon/Cannon',
	'View/Weapon/DoubleMachineGun'
	],
	function (Vehicle, ShotModel, MachineGun, Cannon, DoubleMachineGun) {
		var MilitaryVehicle = Vehicle.extend({
			_scanning: null,
			shotSound: null,
			counter: 0,

			initialize: function () {
				this._scanning = window.setInterval($.proxy(this.scan, this), Math.floor(Math.random() * 400 + 250));
			},

			intersect: function (source_x1, source_y1, source_x2, source_y2, target_x1, target_y1, target_x2, target_y2) {
				var source_m = (source_y2 - source_y1) / (source_x2 - source_x1),
					target_m = (target_y2 - target_y1) / (target_x2 - target_x1),
					n1 = source_y1 - source_m * source_x1,
					n2 = target_y1 - target_m * target_x1,
					x;

					if (source_m !== target_m) {
						x = (n2 - n1) / (source_m - target_m);
					} else {
						x = n2 - n1;
					}

					y1 = source_m * x + n1,
					y2 = target_m * x + n2;

					// enemy is left, below or left-below
					if (x <= source_x1 &&
						x >= source_x2 &&
						y1 >= source_y1 &&
						y1 <= source_y2
					) {
						return true;
					}

					// enemy is left, top or left-below
					/*
					if (x <= source_x1 &&
						x >= source_x2 &&
						y1 >= source_y1 &&
						y1 <= source_y2
					) {
						return true;
					}
					 */

					return false;
			},

			scan: function () {
				var items = window.battlefield.items,
					i,
					x1, x2, x3, x4, y1, y2, y3, y4, r2, centerX, centerY, destination1, destination2, destination3, destination4;

				for (i = 0; i < items.length; i++) {
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
						if (this.model.get('attackEnemy')) {
							if (this.model.get('attackEnemy') === items[i].model.get('id')) {
								this.attack(items[i]);
								break;
							}
							continue;
						}
						this.attack(items[i]);
						break;
					}
				}
			},

			moveAndAttack: function (enemy) {
				var x, y;

				if (enemy.model.get('positionX') === this.model.get('positionX')) {
					x = enemy.model.get('positionX');

					if (enemy.model.get('positionY') < this.model.get('positionY')) {
						y = enemy.model.get('positionY') + this.model.get('firerange');
					} else {
						y = enemy.model.get('positionY') - this.model.get('firerange');
					}

					y = y < 0 ? 0 : y;

					return this.move(x, y);
				}

				if (enemy.model.get('positionY') === this.model.get('positionY')) {
					y = enemy.model.get('positionY');

					if (enemy.model.get('positionX') < this.model.get('positionX')) {
						x = enemy.model.get('positionX') + this.model.get('firerange');
					} else {
						x = enemy.model.get('positionX') - this.model.get('firerange');
					}

					x = x < 0 ? 0 : x;

					return this.move(x, y);
				}

				var dx, dy;

				dx = Math.abs(enemy.model.get('positionX') - this.model.get('positionX'));
				dy = Math.abs(enemy.model.get('positionY') - this.model.get('positionY'));

				var c_current = Math.sqrt(dy * dy + dx * dx);
				var c_new = c_current - this.model.get('firerange');

				if (enemy.model.get('positionX') < this.model.get('positionX')) {
					dx = -dx;
				} else {
					dx = dx + enemy.model.get('width') + this.model.get('width') / 2;
				}

				if (enemy.model.get('positionY') < this.model.get('positionY')) {
					dy = -dy;
				} else {
					dy = dy + enemy.model.get('width') + this.model.get('height') / 2;
				}

				x = Math.ceil(c_new/c_current * dx);
				y = Math.ceil(c_new/c_current * dy);

				return this.move(this.model.get('positionX') + x, this.model.get('positionY') + y);
			},

			attack: function (enemy) {
				if (this.alreadyAttacking === true) {
					return;
				}

				this.alreadyAttacking = true;

				var a = Math.abs(enemy.model.get('positionY') - this.model.get('positionY')),
					b = Math.abs(enemy.model.get('positionX') - this.model.get('positionX')),
					a2 = a * a,
					b2 = b * b,
					c = Math.sqrt(a2 + b2),
					angle = Math.cos(b/c) * Math.PI;

				if ((enemy.model.get('positionX') <= this.model.get('positionX') &&
					enemy.model.get('positionY') >= this.model.get('positionY')) ||
					(enemy.model.get('positionX') >= this.model.get('positionX') &&
					enemy.model.get('positionY') <= this.model.get('positionY'))
				) {
					angle = -1 * angle;
				}

				if (!this.shotSound) {
					this.shotSound = new Audio(this.model.get('sound').shot);
				}

				this.shotSound.play();

				var shotModel = new ShotModel();
				shotModel.set('owner', this.model.get('owner'));
				shotModel.set('positionX', this.model.get('positionX') + (this.model.get('width') / 2));
				shotModel.set('positionY', this.model.get('positionY') + (this.model.get('height') / 2));
				shotModel.set('firepower', this.model.get('firepower'));
				shotModel.set('firespeed', this.model.get('firespeed'));
				shotModel.set('angle', angle);

				var shot = null;
				switch (this.model.get('weapon')) {
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
				
				this.alreadyAttacking = false;
			},

			destroy: function () {
				MilitaryVehicle.__super__.destroy.apply(this, arguments);
				clearInterval(this._scanning);
			}
		});

		return MilitaryVehicle;
	}
);