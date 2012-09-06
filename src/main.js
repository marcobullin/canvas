require([
	'../order!../underscore-min',
	'../order!../backbone-min',
	'../order!config',
	'../order!View/Battlefield',
	'../order!Model/Unit/Scout',
	'../order!Model/Unit/Tank',
	'../order!View/Unit/MilitaryVehicle',
	'../order!Model/Obstacle/Obstacle',
	'../order!View/Obstacle/Obstacle',
	'../order!Model/SpaceShip',
	'../order!View/SpaceShip',
	'../order!Model/Weapon',
	'../order!View/Weapon'
	],
	function (_, Backbone, config, Battlefield, Scout, Tank, MilitaryVehicleView, ObstacleModel, ObstacleView, SpaceShip, HumanFighter, Weapon, WeaponView) {
		var images = [
			{
				key: 'map',
				src: 'images/stone2.jpeg'
			},
			{
				key: 'obstacle',
				src: 'images/obstacle.png'
			},
			{
				key: 'scout',
				src: 'images/scout.png'
			},
			{
				key: 'bomber',
				src: 'images/bomber.png'
			},
			{
				key: 'mothership',
				src: 'images/mothership.png'
			},
			{
				key: 'tank',
				src: 'images/tank.png'
			},
			{
				key: 'battleship',
				src: 'images/battleship.png'
			},
			{
				key: 'explosion',
				src: 'images/explosion.png'
			},
			{
				key: 'laser',
				src: 'images/laser.png'
			},
			{
				key: 'doublelaser',
				src: 'images/doublelaser.png'
			},
			{
				key: 'cannon',
				src: 'images/cannon.png'
			},
			{
				key: 'shield',
				src: 'images/shield.png'
			}
		];

		var levels = {
			1: {
				mothershipWeapons: 1,
				user: ['mothership', 'scout', 'scout', 'scout', 'bomber', 'bomber'],
				enemy: ['mothership', 'scout', 'scout', 'scout', 'scout', 'scout']
			},
			2: {
				mothershipWeapons: 2,
				user: ['mothership', 'scout', 'scout', 'scout', 'bomber', 'bomber', 'battleship'],
				enemy: ['mothership', 'scout', 'scout', 'scout', 'scout', 'scout', 'bomber', 'bomber']
			},
			3: {
				mothershipWeapons: 3,
				user: ['mothership', 'scout', 'bomber', 'bomber', 'bomber', 'bomber', 'battleship'],
				enemy: ['mothership', 'scout', 'scout', 'fregatte']
			},
			4: {
				mothershipWeapons: 3,
				user: ['mothership', 'bomber', 'bomber', 'fregatte', 'battleship'],
				enemy: ['mothership', 'scout', 'scout', 'fregatte', 'fregatte']
			},
			5: {
				mothershipWeapons: 4,
				user: ['mothership', 'scout', 'scout', 'scout', 'scout', 'scout', 'scout', 'scout', 'scout', 'scout', 'battleship'],
				enemy: ['mothership', 'bomber', 'fregatte', 'fregatte']
			},
			6: {
				mothershipWeapons: 4,
				user: ['mothership', 'battleship', 'battleship', 'battleship', 'battleship'],
				enemy: ['mothership', 'bomber', 'bomber', 'fregatte', 'fregatte']
			}
		};

		var ships = {
			scout: {
				width: 50,
				height: 50,
				armor:100,
				shield: 100,
				speed: SCOUT_SPEED,
				positionX: 300,
				positionY: 50,
				owner: 'user',
				isAttackable: true,
				type: 'scout',
				soundDestroy: 'sounds/boom.mp3',
				soundHit: 'sounds/hit.mp3',
				weapons: [
					{
						coordX: -15,
						coordY: 0,
						firerange: SCOUT_FIRERANGE,
						firespeed: SCOUT_FIRESPEED,
						firepower: SCOUT_FIREPOWER,
						sound: 'sounds/laser.mp3',
						type: 'laser',
						width: 20,
						height: 20
					},
					{
						coordX: 15,
						coordY: 0,
						firerange: SCOUT_FIRERANGE,
						firespeed: SCOUT_FIRESPEED,
						firepower: SCOUT_FIREPOWER,
						sound: 'sounds/laser.mp3',
						type: 'laser',
						width: 20,
						height: 20
					}
				]
			},

			bomber: {
				width: 50,
				height: 50,
				armor: 100,
				shield: 100,
				speed: SCOUT_SPEED,
				positionX: 300,
				positionY: 50,
				owner: 'user',
				isAttackable: true,
				type: 'bomber',
				soundDestroy: 'sounds/boom.mp3',
				soundHit: 'sounds/hit.mp3',
				weapons: [
					{
						coordX: -17,
						coordY: 0,
						firerange: SCOUT_FIRERANGE,
						firespeed: SCOUT_FIRESPEED,
						firepower: 2 * SCOUT_FIREPOWER,
						sound: 'sounds/laser.mp3',
						type: 'doublelaser',
						width: 25,
						height: 25
					},
					{
						coordX: 17,
						coordY: 0,
						firerange: SCOUT_FIRERANGE,
						firespeed: SCOUT_FIRESPEED,
						firepower: 2 * SCOUT_FIREPOWER,
						sound: 'sounds/laser.mp3',
						type: 'doublelaser',
						width: 25,
						height: 25
					}
				]
			},

			mothership: {
				width: 200,
				height: 200,
				armor: 500,
				shield: 1000,
				speed: 20,
				positionX: 50,
				positionY: 50,
				owner: 'user',
				isAttackable: true,
				type: 'mothership',
				soundDestroy: 'sounds/bigboom.mp3',
				soundHit: 'sounds/hit.mp3',
				weapons: [
					{
						coordX: 0,
						coordY: -90,
						firerange: 2 * SCOUT_FIRERANGE,
						firespeed: SCOUT_FIRESPEED,
						firepower: SCOUT_FIREPOWER,
						type: 'laser',
						sound: 'sounds/laser.mp3',
						width: 30,
						height: 30
					},
					{
						coordX: 0,
						coordY: 90,
						firerange: 2 * SCOUT_FIRERANGE,
						firespeed: SCOUT_FIRESPEED,
						firepower: SCOUT_FIREPOWER,
						type: 'laser',
						sound: 'sounds/laser.mp3',
						width: 30,
						height: 30
					},
					{
						coordX: -90,
						coordY: 0,
						firerange: 2 * SCOUT_FIRERANGE,
						firespeed: SCOUT_FIRESPEED,
						firepower: SCOUT_FIREPOWER,
						type: 'laser',
						sound: 'sounds/laser.mp3',
						width: 30,
						height: 30
					},
					{
						coordX: 80,
						coordY: -30,
						firerange: 2 * SCOUT_FIRERANGE,
						firespeed: SCOUT_FIRESPEED,
						firepower: SCOUT_FIREPOWER,
						type: 'laser',
						sound: 'sounds/laser.mp3',
						width: 30,
						height: 30
					}
				]
			},

			battleship: {
				width: 100,
				height: 50,
				armor: 200,
				shield: 500,
				speed: SCOUT_SPEED,
				positionX: 200,
				positionY: 350,
				owner: 'user',
				isAttackable: true,
				type: 'battleship',
				soundDestroy: 'sounds/bigboom.mp3',
				soundHit: 'sounds/hit.mp3',
				weapons: [
					{
						coordX: -34,
						coordY: -10,
						firerange: SCOUT_FIRERANGE,
						firespeed: SCOUT_FIRESPEED,
						firepower: SCOUT_FIREPOWER,
						type: 'doublelaser',
						sound: 'sounds/laser.mp3',
						width: 25,
						height: 25
					},
					{
						coordX: -15,
						coordY: -11,
						firerange: SCOUT_FIRERANGE,
						firespeed: SCOUT_FIRESPEED,
						firepower: SCOUT_FIREPOWER,
						type: 'doublelaser',
						sound: 'sounds/laser.mp3',
						width: 25,
						height: 25
					},
					{
						coordX: 15,
						coordY: -11,
						firerange: SCOUT_FIRERANGE,
						firespeed: SCOUT_FIRESPEED,
						firepower: SCOUT_FIREPOWER,
						type: 'doublelaser',
						sound: 'sounds/laser.mp3',
						width: 25,
						height: 25
					},
					{
						coordX: 34,
						coordY: -10,
						firerange: SCOUT_FIRERANGE,
						firespeed: SCOUT_FIRESPEED,
						firepower: SCOUT_FIREPOWER,
						type: 'doublelaser',
						sound: 'sounds/laser.mp3',
						width: 25,
						height: 25
					},
					{
						coordX: 0,
						coordY: 24,
						firerange: SCOUT_FIRERANGE,
						firespeed: SCOUT_FIRESPEED,
						firepower: SCOUT_FIREPOWER,
						type: 'laser',
						sound: 'sounds/laser.mp3',
						width: 20,
						height: 20
					}
				]
			},

			fregatte: {
				width: 100,
				height: 100,
				armor: 200,
				shield: 500,
				speed: SCOUT_SPEED,
				positionX: 100,
				positionY: 350,
				owner: 'user',
				isAttackable: true,
				type: 'tank',
				soundDestroy: 'sounds/bigboom.mp3',
				soundHit: 'sounds/hit.mp3',
				weapons: [
					{
						coordX: -30,
						coordY: -38,
						firerange: TANK_FIRERANGE,
						firespeed: TANK_FIRESPEED,
						firepower: TANK_FIREPOWER,
						type: 'cannon',
						sound: 'sounds/laser.mp3',
						width: 30,
						height: 30
					},
					{
						coordX: 30,
						coordY: -38,
						firerange: TANK_FIRERANGE,
						firespeed: TANK_FIRESPEED,
						firepower: TANK_FIREPOWER,
						type: 'cannon',
						sound: 'sounds/laser.mp3',
						width: 30,
						height: 30
					},
					{
						coordX: 0,
						coordY: -38,
						firerange: SCOUT_FIRERANGE,
						firespeed: SCOUT_FIRESPEED,
						firepower: SCOUT_FIREPOWER,
						type: 'doublelaser',
						sound: 'sounds/laser.mp3',
						width: 25,
						height: 25
					},
					{
						coordX: 0,
						coordY: 45,
						firerange: SCOUT_FIRERANGE,
						firespeed: SCOUT_FIRESPEED,
						firepower: SCOUT_FIREPOWER,
						type: 'doublelaser',
						sound: 'sounds/laser.mp3',
						width: 25,
						height: 25
					}
				]
			}
		};

		var img = null,
			count = 0;
		window.GameImages = {};
		for (var i = 0; i < images.length; i++) {
			img = new Image();
			img.src = images[i].src;

			img.onload = function (i) {
				count += 1;

				window.GameImages[images[i].key] = img;
				if (count === images.length) {
					start();
				}
			}(i);
		}

		function createShip(data, x, y, owner, weaponsCount) {
			var spaceship = new SpaceShip();
			spaceship.set('width',  		data.width);
			spaceship.set('height', 		data.height);
			spaceship.set('armor',  		data.armor);
			spaceship.set('shield', 		data.shield);
			spaceship.set('speed', 			data.speed);
			spaceship.set('positionX', 		x);
			spaceship.set('positionY', 		y);
			spaceship.set('owner', 			owner);
			spaceship.set('isAttackable', 	data.isAttackable);
			spaceship.set('soundDestroy', 	data.soundDestroy);
			spaceship.set('soundHit', 		data.soundHit);
			spaceship.set('type', 			data.type); // bomber, scout, ...

			for (var i in data.weapons) {
				if (weaponsCount && weaponsCount === parseInt(i, 10)) {
					break;
				}

				var weapon = new Weapon();
				weapon.set('coordX', 		data.weapons[i].coordX);
				weapon.set('coordY', 		data.weapons[i].coordY);
				weapon.set('firerange', 	data.weapons[i].firerange);
				weapon.set('firespeed', 	data.weapons[i].firespeed);
				weapon.set('firepower', 		data.weapons[i].firepower);
				weapon.set('type', 			data.weapons[i].type);
				weapon.set('sound', 			data.weapons[i].sound);
				weapon.set('owner', 			owner);
				weapon.set('width', 			data.weapons[i].width);
				weapon.set('height', 		data.weapons[i].height);

				var weaponView = new WeaponView({
	                model: weapon,
	                spaceship: spaceship
	            });

				spaceship.addWeapon(weaponView);
			}

			var ship = new HumanFighter({
				model: spaceship
			});
			return ship;
		}

		function start() {
			window.Global = {};
			// Handle keyboard controls
			window.Global.keysDown = {};

			addEventListener("keydown", function (e) {
				window.Global.keysDown[e.keyCode] = true;
			}, false);

			addEventListener("keyup", function (e) {
				delete window.Global.keysDown[e.keyCode];
			}, false);

			window.battlefield = new Battlefield();
			window.battlefield.render();

			window.level = 1;
			$('body').on('newLevel', function () {
				run();
			});
			run();
			

			then = Date.now();
			setInterval(function() {
				window.battlefield.update()
			}, 1);
		}

		function run(level) {
			window.battlefield.items = [];

			var levelUnits = levels[window.level];
			/**
			 * USER
			 */
			for (var j = 0; j <  levelUnits.user.length; j++) {
				var spaceship;

				if (levelUnits.user[j] === 'mothership') {
				 	spaceship = createShip(ships[levelUnits.user[j]], 50, 50, 'user', levelUnits.mothershipWeapons);
				} else {
					spaceship = createShip(ships[levelUnits.user[j]], 350, (j + 1) * 50, 'user');
				}

				window.battlefield.add(spaceship);
			}

			/**
			 * COMPUTER
			 */
			for (var j = 0; j <  levelUnits.enemy.length; j++) {
				var spaceship;

				if (levelUnits.enemy[j] === 'mothership') {
				 	spaceship = createShip(ships[levelUnits.enemy[j]], 1200, 550, 'computer', levelUnits.mothershipWeapons);
				} else {
					spaceship = createShip(ships[levelUnits.enemy[j]], 1050, 900 - (j + 1) * 50, 'computer');
				}

				window.battlefield.add(spaceship);
			}
		}
	}
);
