define([
	'View/Unit/Vehicle',
	'Model/Weapon/Shot',
	'View/Weapon/MachineGun',
	'View/Weapon/Cannon'
	],
	function (Vehicle, ShotModel, MachineGun, Cannon) {
		var MilitaryVehicle = Vehicle.extend({
			_scanning: null,

			initialize: function () {
				this._scanning = window.setInterval($.proxy(this.scan, this), 500);
			},

			scan: function () {
				var items = window.battlefield.items,
					i,
					itemPosition;

				for (i = 0; i < items.length; i++) {
					// do not attack your own units
					if (items[i].model.get('owner') === this.model.get('owner')) {
						continue;
					}

					var r = this.model.get('firerange');
					var width = 2 * r;
					var height = 2 * r;
					var left = this.model.get('positionX') - r;
					var top = this.model.get('positionY') - r;

					if (top <= items[i].model.get('positionY') && items[i].model.get('positionY') <= top + height &&
						left <= items[i].model.get('positionX') && items[i].model.get('positionX') <= left + width &&
						true === items[i].model.get('isAttackable')
					){
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

				if (enemy.model.get('owner') === 'computer') {
					$('#js-sound-a')[0].src = 'glock17.mp3';
				} else {
					
						$('#js-sound-b')[0].src = 'mp5.mp3';
					
				}

				var shotModel = new ShotModel();
				shotModel.set('owner', this.model.get('owner'));
				shotModel.set('positionX', this.model.get('positionX') + (this.model.get('width') / 2));
				shotModel.set('positionY', this.model.get('positionY') + (this.model.get('height') / 2));
				shotModel.set('firepower', this.model.get('firepower'));
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
					default: return;
				}

				window.battlefield.add(shot);

				shot.move(enemy, this.model.get('firespeed'));
			},

			destroy: function () {
				MilitaryVehicle.__super__.destroy.apply(this, arguments);
				clearInterval(this._scanning);
			}
		});

		return MilitaryVehicle;
	}
);