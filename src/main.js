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

		function createShip(data) {
			var spaceship = new SpaceShip();
			spaceship.set('width',  		data.width);
			spaceship.set('height', 		data.height);
			spaceship.set('armor',  		data.armor);
			spaceship.set('shield', 		data.shield);
			spaceship.set('speed', 			data.speed);
			spaceship.set('positionX', 		data.positionX);
			spaceship.set('positionY', 		data.positionY);
			spaceship.set('owner', 			data.owner);
			spaceship.set('isAttackable', 	data.isAttackable);
			spaceship.set('type', 			data.type); // bomber, scout, ...

			for (var i in data.weapons) {
				var weapon = new Weapon();
				weapon.set('coordX', 		data.weapons[i].coordX);
				weapon.set('coordY', 		data.weapons[i].coordY);
				weapon.set('firerange', 	data.weapons[i].firerange);
				weapon.set('firespeed', 	data.weapons[i].firespeed);
				weapon.set('firepower', 		data.weapons[i].firepower);
				weapon.set('type', 			data.weapons[i].type);
				weapon.set('owner', 			data.owner);
				weapon.set('width', 			data.weapons[i].width);
				weapon.set('height', 		data.weapons[i].width);

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


			for (var i = 1; i <= 5; i++) {
				if (i % 2) {
					var ship = createShip({
						width: 50,
						height: 50,
						armor:100,
						shield: 100,
						speed: SCOUT_SPEED,
						positionX: 50,
						positionY: i * 50,
						owner: 'user',
						isAttackable: true,
						type: 'scout',
						weapons: [
							{
								coordX: -15,
								coordY: 0,
								firerange: SCOUT_FIRERANGE,
								firespeed: SCOUT_FIRESPEED,
								firepower: SCOUT_FIREPOWER,
								type: 'laser',
								width: 4,
								height: 4
							},
							{
								coordX: 15,
								coordY: 0,
								firerange: SCOUT_FIRERANGE,
								firespeed: SCOUT_FIRESPEED,
								firepower: SCOUT_FIREPOWER,
								type: 'laser',
								width: 4,
								height: 4
							}
						]
					});
				} else {
					var ship = createShip({
						width: 50,
						height: 50,
						armor: 100,
						shield: 100,
						speed: SCOUT_SPEED,
						positionX: 50,
						positionY: i * 50,
						owner: 'user',
						isAttackable: true,
						type: 'bomber',
						weapons: [
							{
								coordX: -17,
								coordY: 0,
								firerange: SCOUT_FIRERANGE,
								firespeed: SCOUT_FIRESPEED,
								firepower: 2 * SCOUT_FIREPOWER,
								type: 'doublelaser',
								width: 6,
								height: 6
							},
							{
								coordX: 17,
								coordY: 0,
								firerange: SCOUT_FIRERANGE,
								firespeed: SCOUT_FIRESPEED,
								firepower: 2 * SCOUT_FIREPOWER,
								type: 'doublelaser',
								width: 6,
								height: 6
							}
						]
					});
				}

				window.battlefield.add(ship);
			}


			var mothership = createShip({
				width: 100,
				height: 100,
				armor: 500,
				shield: 1000,
				speed: SCOUT_SPEED,
				positionX: 100,
				positionY: 350,
				owner: 'user',
				isAttackable: true,
				type: 'tank',
				weapons: [
					{
						coordX: -30,
						coordY: -38,
						firerange: TANK_FIRERANGE,
						firespeed: TANK_FIRESPEED,
						firepower: TANK_FIREPOWER,
						type: 'cannon',
						width: 8,
						height: 8
					},
					{
						coordX: 30,
						coordY: -38,
						firerange: TANK_FIRERANGE,
						firespeed: TANK_FIRESPEED,
						firepower: TANK_FIREPOWER,
						type: 'cannon',
						width: 8,
						height: 8
					},
					{
						coordX: 0,
						coordY: -38,
						firerange: SCOUT_FIRERANGE,
						firespeed: SCOUT_FIRESPEED,
						firepower: SCOUT_FIREPOWER,
						type: 'doublelaser',
						width: 6,
						height: 6
					},
					{
						coordX: 0,
						coordY: 45,
						firerange: SCOUT_FIRERANGE,
						firespeed: SCOUT_FIRESPEED,
						firepower: SCOUT_FIREPOWER,
						type: 'doublelaser',
						width: 6,
						height: 6
					}
				]
			});
			window.battlefield.add(mothership);

			var battleship = createShip({
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
				weapons: [
					{
						coordX: -34,
						coordY: -10,
						firerange: SCOUT_FIRERANGE,
						firespeed: SCOUT_FIRESPEED,
						firepower: SCOUT_FIREPOWER,
						type: 'doublelaser',
						width: 6,
						height: 6
					},
					{
						coordX: -15,
						coordY: -11,
						firerange: SCOUT_FIRERANGE,
						firespeed: SCOUT_FIRESPEED,
						firepower: SCOUT_FIREPOWER,
						type: 'doublelaser',
						width: 6,
						height: 6
					},
					{
						coordX: 15,
						coordY: -11,
						firerange: SCOUT_FIRERANGE,
						firespeed: SCOUT_FIRESPEED,
						firepower: SCOUT_FIREPOWER,
						type: 'doublelaser',
						width: 6,
						height: 6
					},
					{
						coordX: 34,
						coordY: -10,
						firerange: SCOUT_FIRERANGE,
						firespeed: SCOUT_FIRESPEED,
						firepower: SCOUT_FIREPOWER,
						type: 'doublelaser',
						width: 6,
						height: 6
					},
					{
						coordX: 0,
						coordY: 24,
						firerange: SCOUT_FIRERANGE,
						firespeed: SCOUT_FIRESPEED,
						firepower: SCOUT_FIREPOWER,
						type: 'laser',
						width: 4,
						height: 4
					}
				]
			});
			window.battlefield.add(battleship);






			window.setTimeout(function () {
				for (var i = 0; i < 10; i++) {
					var randY = Math.floor(Math.random() * 1000);
					var randX = Math.floor(Math.random() * 1500 + 1500);

					var ship = createShip({
						width: 50,
						height: 50,
						armor: 100,
						shield: 100,
						speed: SCOUT_SPEED,
						positionX: randX,
						positionY: randY,
						owner: 'computer',
						isAttackable: true,
						type: 'bomber',
						weapons: [
							{
								coordX: -17,
								coordY: 0,
								firerange: SCOUT_FIRERANGE,
								firespeed: SCOUT_FIRESPEED,
								firepower: 2 * SCOUT_FIREPOWER,
								type: 'doublelaser',
								width: 6,
								height: 6
							},
							{
								coordX: 17,
								coordY: 0,
								firerange: SCOUT_FIRERANGE,
								firespeed: SCOUT_FIRESPEED,
								firepower: 2 * SCOUT_FIREPOWER,
								type: 'doublelaser',
								width: 6,
								height: 6
							}
						]
					});

					window.battlefield.add(ship);

					ship.move(mothership.model.get('positionX'), mothership.model.get('positionY'));
				}
			}, 15000);

 			// for (var i = 0; i < OBSTACLES.length; i++) {
			// 	var model = new ObstacleModel();
			// 	model.set('width', 50);
			// 	model.set('height', 50);
			// 	model.set('positionX', OBSTACLES[i].x * 50);
			// 	model.set('positionY', OBSTACLES[i].y * 50);
			// 	model.set('type', 'obstacle');

			// 	var obstacle = new ObstacleView({
			// 		model: model
			// 	});

			// 	window.battlefield.add(obstacle);	
			// }
			
			then = Date.now();
			setInterval(function() {
				window.battlefield.update()
			}, 1);
		}
	}
);
