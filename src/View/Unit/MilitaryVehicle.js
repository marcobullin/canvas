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
				MilitaryVehicle.__super__.initialize.apply(this, arguments);
				this._scanning = window.setInterval($.proxy(this.scan, this), Math.floor(Math.random() * 400 + 250));

				if (this.model.get('owner') === 'computer' && this.model.get('name') === 'xxx') {
					var self = this;
					this.test = window.setInterval(function () {
						var x = Math.random() * BATTLEFIELD_WIDTH - self.model.get('width');
						var y = Math.random() * BATTLEFIELD_HEIGHT - self.model.get('height');
						self.move(x, y);
					}, 10000);
				}
			},

			scan: function () {
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
				var xDst = Math.abs(enemy.model.get('positionX') - this.model.get('positionX') + this.model.get('width') / 2),
					yDst = Math.abs(enemy.model.get('positionY') - this.model.get('positionY') + this.model.get('height') / 2),
					a, b, c, x, y;

				c = Math.sqrt(xDst * xDst + yDst * yDst);

				// unit is already in fireposition
				if (c <= this.model.get('firerange')) {
					return;
				}


				a = xDst * (1 - this.model.get('firerange') / c);
				b = yDst * (1 - this.model.get('firerange') / c);


				if (this.model.get('positionX') < enemy.model.get('positionX')) {
					x = this.model.get('positionX') + a;
				} else if (this.model.get('positionX') > enemy.model.get('positionX')) {
					x = this.model.get('positionX') - a;
				} else {
					x = this.model.get('positionX');
				}

				if (this.model.get('positionY') < enemy.model.get('positionY')) {
					y = this.model.get('positionY') + b;
				} else if (this.model.get('positionY') > enemy.model.get('positionY')) {
					y = this.model.get('positionY') - b;
				} else {
					y = this.model.get('positionY');
				}

				this.move(x, y);
			},

			attack: function (enemy) {
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

				var direction = Math.atan2(enemy.model.get('positionY') - this.model.get('positionY'), enemy.model.get('positionX') - this.model.get('positionX')) - Math.PI/2;
				shotModel.set('angle', direction);

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
			},

			destroy: function () {
				MilitaryVehicle.__super__.destroy.apply(this, arguments);
				clearInterval(this._scanning);
			}
		});

		return MilitaryVehicle;
	}
);