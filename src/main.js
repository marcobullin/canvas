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
				key: 'tank',
				src: 'images/tank.png'
			},
			{
				key: 'explosion',
				src: 'images/explosion.png'
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

			// var scoutModel = new Scout();
			// scoutModel.set('name', 'b');
			// scoutModel.set('protection', SCOUT_PROTECTION);
			// scoutModel.set('shield', SCOUT_SHIELD);
			// scoutModel.set('price', SCOUT_PRICE);
			// scoutModel.set('speed', SCOUT_SPEED);
			// scoutModel.set('firepower', SCOUT_FIREPOWER);
			// scoutModel.set('firerange', SCOUT_FIRERANGE);
			// scoutModel.set('firespeed', SCOUT_FIRESPEED);
			// scoutModel.set('width', SCOUT_WIDTH);
			// scoutModel.set('height', SCOUT_HEIGHT);
			// scoutModel.set('positionX', 1050);
			// scoutModel.set('positionY', 450);
			// scoutModel.set('owner', 'computer');
			// scoutModel.set('isAttackable', true);
			// scoutModel.set('weapon', 'MachineGun');
			// scoutModel.set('type', 'unit');

			// var scout = new MilitaryVehicleView({
			// 	model: scoutModel
			// });

			// window.battlefield.add(scout);

			// var scoutModel = new Scout();
			// scoutModel.set('name', 'b');
			// scoutModel.set('protection', SCOUT_PROTECTION);
			// scoutModel.set('shield', SCOUT_SHIELD);
			// scoutModel.set('price', SCOUT_PRICE);
			// scoutModel.set('speed', SCOUT_SPEED);
			// scoutModel.set('firepower', SCOUT_FIREPOWER);
			// scoutModel.set('firerange', SCOUT_FIRERANGE);
			// scoutModel.set('firespeed', SCOUT_FIRESPEED);
			// scoutModel.set('width', SCOUT_WIDTH);
			// scoutModel.set('height', SCOUT_HEIGHT);
			// scoutModel.set('positionX', 650);
			// scoutModel.set('positionY', 200);
			// scoutModel.set('owner', 'computer');
			// scoutModel.set('isAttackable', true);
			// scoutModel.set('weapon', 'MachineGun');
			// scoutModel.set('type', 'unit');

			// var scout = new MilitaryVehicleView({
			// 	model: scoutModel
			// });

			// window.battlefield.add(scout);

			// var tankModel = new Tank();
			// tankModel.set('name', 'xxx');
			// tankModel.set('protection', TANK_PROTECTION);
			// tankModel.set('shield', TANK_SHIELD);
			// tankModel.set('price', TANK_PRICE);
			// tankModel.set('speed', TANK_SPEED);
			// tankModel.set('firepower', TANK_FIREPOWER);
			// tankModel.set('firerange', TANK_FIRERANGE);
			// tankModel.set('firespeed', TANK_FIRESPEED);
			// tankModel.set('width', TANK_WIDTH * 2);
			// tankModel.set('height', TANK_HEIGHT * 2);
			// tankModel.set('positionX', 950);
			// tankModel.set('positionY', 250);
			// tankModel.set('owner', 'computer');
			// tankModel.set('isAttackable', true);
			// tankModel.set('weapon', 'Cannon');
			// tankModel.set('type', 'unit');

			// var tank = new MilitaryVehicleView({
			// 	model: tankModel
			// });

			// window.battlefield.add(tank);

			// var scoutModel = new Scout();
			// scoutModel.set('name', 'b');
			// scoutModel.set('protection', SCOUT_PROTECTION);
			// scoutModel.set('shield', SCOUT_SHIELD);
			// scoutModel.set('price', SCOUT_PRICE);
			// scoutModel.set('speed', SCOUT_SPEED);
			// scoutModel.set('firepower', SCOUT_FIREPOWER);
			// scoutModel.set('firerange', SCOUT_FIRERANGE);
			// scoutModel.set('firespeed', SCOUT_FIRESPEED);
			// scoutModel.set('width', SCOUT_WIDTH);
			// scoutModel.set('height', SCOUT_HEIGHT);
			// scoutModel.set('positionX', 950);
			// scoutModel.set('positionY', 600);
			// scoutModel.set('owner', 'computer');
			// scoutModel.set('isAttackable', true);
			// scoutModel.set('weapon', 'MachineGun');
			// scoutModel.set('type', 'unit');

			// var scout = new MilitaryVehicleView({
			// 	model: scoutModel
			// });

			// window.battlefield.add(scout);


			// var scoutModel = new Scout();
			// scoutModel.set('name', 'b');
			// scoutModel.set('protection', SCOUT_PROTECTION);
			// scoutModel.set('shield', SCOUT_SHIELD);
			// scoutModel.set('price', SCOUT_PRICE);
			// scoutModel.set('speed', SCOUT_SPEED);
			// scoutModel.set('firepower', SCOUT_FIREPOWER);
			// scoutModel.set('firerange', SCOUT_FIRERANGE);
			// scoutModel.set('firespeed', SCOUT_FIRESPEED);
			// scoutModel.set('width', SCOUT_WIDTH);
			// scoutModel.set('height', SCOUT_HEIGHT);
			// scoutModel.set('positionX', 950);
			// scoutModel.set('positionY', 450);
			// scoutModel.set('owner', 'computer');
			// scoutModel.set('isAttackable', true);
			// scoutModel.set('weapon', 'MachineGun');
			// scoutModel.set('type', 'unit');

			// var scout = new MilitaryVehicleView({
			// 	model: scoutModel
			// });

			// window.battlefield.add(scout);

			// var scoutModel = new Scout();
			// scoutModel.set('name', 'b');
			// scoutModel.set('protection', SCOUT_PROTECTION);
			// scoutModel.set('shield', SCOUT_SHIELD);
			// scoutModel.set('price', SCOUT_PRICE);
			// scoutModel.set('speed', SCOUT_SPEED);
			// scoutModel.set('firepower', SCOUT_FIREPOWER);
			// scoutModel.set('firerange', SCOUT_FIRERANGE);
			// scoutModel.set('firespeed', SCOUT_FIRESPEED);
			// scoutModel.set('width', SCOUT_WIDTH);
			// scoutModel.set('height', SCOUT_HEIGHT);
			// scoutModel.set('positionX', 850);
			// scoutModel.set('positionY', 450);
			// scoutModel.set('owner', 'computer');
			// scoutModel.set('isAttackable', true);
			// scoutModel.set('weapon', 'MachineGun');
			// scoutModel.set('type', 'unit');

			// var scout = new MilitaryVehicleView({
			// 	model: scoutModel
			// });

			// window.battlefield.add(scout);

			// var scoutModel = new Scout();
			// scoutModel.set('name', 'b');
			// scoutModel.set('protection', SCOUT_PROTECTION);
			// scoutModel.set('shield', SCOUT_SHIELD);
			// scoutModel.set('price', SCOUT_PRICE);
			// scoutModel.set('speed', SCOUT_SPEED);
			// scoutModel.set('firepower', SCOUT_FIREPOWER);
			// scoutModel.set('firerange', SCOUT_FIRERANGE);
			// scoutModel.set('firespeed', SCOUT_FIRESPEED);
			// scoutModel.set('width', SCOUT_WIDTH);
			// scoutModel.set('height', SCOUT_HEIGHT);
			// scoutModel.set('positionX', 750);
			// scoutModel.set('positionY', 450);
			// scoutModel.set('owner', 'computer');
			// scoutModel.set('isAttackable', true);
			// scoutModel.set('weapon', 'MachineGun');
			// scoutModel.set('type', 'unit');

			// var scout = new MilitaryVehicleView({
			// 	model: scoutModel
			// });

			// window.battlefield.add(scout);


			// var scoutModel = new Scout();
			// scoutModel.set('name', 'b');
			// scoutModel.set('protection', SCOUT_PROTECTION);
			// scoutModel.set('shield', SCOUT_SHIELD);
			// scoutModel.set('price', SCOUT_PRICE);
			// scoutModel.set('speed', SCOUT_SPEED);
			// scoutModel.set('firepower', SCOUT_FIREPOWER);
			// scoutModel.set('firerange', SCOUT_FIRERANGE);
			// scoutModel.set('firespeed', SCOUT_FIRESPEED);
			// scoutModel.set('width', SCOUT_WIDTH);
			// scoutModel.set('height', SCOUT_HEIGHT);
			// scoutModel.set('positionX', 950);
			// scoutModel.set('positionY', 550);
			// scoutModel.set('owner', 'computer');
			// scoutModel.set('isAttackable', true);
			// scoutModel.set('weapon', 'MachineGun');
			// scoutModel.set('type', 'unit');

			// var scout = new MilitaryVehicleView({
			// 	model: scoutModel
			// });

			// window.battlefield.add(scout);









			// var scoutModel = new Scout();
			// scoutModel.set('name', 'xxx');
			// scoutModel.set('protection', SCOUT_PROTECTION);
			// scoutModel.set('shield', SCOUT_SHIELD);
			// scoutModel.set('price', SCOUT_PRICE);
			// scoutModel.set('speed', SCOUT_SPEED);
			// scoutModel.set('firepower', 2 * SCOUT_FIREPOWER);
			// scoutModel.set('firerange', SCOUT_FIRERANGE);
			// scoutModel.set('firespeed', SCOUT_FIRESPEED);
			// scoutModel.set('width', SCOUT_WIDTH);
			// scoutModel.set('height', SCOUT_HEIGHT);
			// scoutModel.set('positionX', 50);
			// scoutModel.set('positionY', 300);
			// scoutModel.set('owner', 'user');
			// scoutModel.set('isAttackable', true);
			// scoutModel.set('weapon', 'DoubleMachineGun');
			// scoutModel.set('type', 'unit');

			// var scout = new MilitaryVehicleView({
			// 	model: scoutModel
			// });

			// window.battlefield.add(scout);

			// var scoutModel = new Scout();
			// scoutModel.set('name', 'xxx');
			// scoutModel.set('protection', SCOUT_PROTECTION);
			// scoutModel.set('shield', SCOUT_SHIELD);
			// scoutModel.set('price', SCOUT_PRICE);
			// scoutModel.set('speed', SCOUT_SPEED);
			// scoutModel.set('firepower', 2 * SCOUT_FIREPOWER);
			// scoutModel.set('firerange', SCOUT_FIRERANGE);
			// scoutModel.set('firespeed', SCOUT_FIRESPEED);
			// scoutModel.set('width', SCOUT_WIDTH);
			// scoutModel.set('height', SCOUT_HEIGHT);
			// scoutModel.set('positionX', 50);
			// scoutModel.set('positionY', 350);
			// scoutModel.set('owner', 'user');
			// scoutModel.set('isAttackable', true);
			// scoutModel.set('weapon', 'DoubleMachineGun');
			// scoutModel.set('type', 'unit');

			// var scout = new MilitaryVehicleView({
			// 	model: scoutModel
			// });

			// window.battlefield.add(scout);

			// var scoutModel = new Scout();
			// scoutModel.set('name', 'xxx');
			// scoutModel.set('protection', SCOUT_PROTECTION);
			// scoutModel.set('shield', SCOUT_SHIELD);
			// scoutModel.set('price', SCOUT_PRICE);
			// scoutModel.set('speed', SCOUT_SPEED);
			// scoutModel.set('firepower', 2 * SCOUT_FIREPOWER);
			// scoutModel.set('firerange', SCOUT_FIRERANGE);
			// scoutModel.set('firespeed', SCOUT_FIRESPEED);
			// scoutModel.set('width', SCOUT_WIDTH);
			// scoutModel.set('height', SCOUT_HEIGHT);
			// scoutModel.set('positionX', 50);
			// scoutModel.set('positionY', 400);
			// scoutModel.set('owner', 'user');
			// scoutModel.set('isAttackable', true);
			// scoutModel.set('weapon', 'DoubleMachineGun');
			// scoutModel.set('type', 'unit');

			// var scout = new MilitaryVehicleView({
			// 	model: scoutModel
			// });

			// window.battlefield.add(scout);

			// var scoutModel = new Scout();
			// scoutModel.set('name', 'xxx');
			// scoutModel.set('protection', SCOUT_PROTECTION);
			// scoutModel.set('shield', SCOUT_SHIELD);
			// scoutModel.set('price', SCOUT_PRICE);
			// scoutModel.set('speed', SCOUT_SPEED);
			// scoutModel.set('firepower', 2 * SCOUT_FIREPOWER);
			// scoutModel.set('firerange', SCOUT_FIRERANGE);
			// scoutModel.set('firespeed', SCOUT_FIRESPEED);
			// scoutModel.set('width', SCOUT_WIDTH);
			// scoutModel.set('height', SCOUT_HEIGHT);
			// scoutModel.set('positionX', 50);
			// scoutModel.set('positionY', 450);
			// scoutModel.set('owner', 'user');
			// scoutModel.set('isAttackable', true);
			// scoutModel.set('weapon', 'DoubleMachineGun');
			// scoutModel.set('type', 'unit');

			// var scout = new MilitaryVehicleView({
			// 	model: scoutModel
			// });

			// window.battlefield.add(scout);

			// var tankModel = new Tank();
			// tankModel.set('name', 'a');
			// tankModel.set('protection', TANK_PROTECTION);
			// tankModel.set('shield', TANK_SHIELD);
			// tankModel.set('price', TANK_PRICE);
			// tankModel.set('speed', TANK_SPEED);
			// tankModel.set('firepower', TANK_FIREPOWER);
			// tankModel.set('firerange', TANK_FIRERANGE);
			// tankModel.set('firespeed', TANK_FIRESPEED);
			// tankModel.set('width', TANK_WIDTH);
			// tankModel.set('height', TANK_HEIGHT);
			// tankModel.set('positionX', 150);
			// tankModel.set('positionY', 300);
			// tankModel.set('owner', 'user');
			// tankModel.set('isAttackable', true);
			// tankModel.set('weapon', 'Cannon');
			// tankModel.set('type', 'unit');

			// var tank = new MilitaryVehicleView({
			// 	model: tankModel
			// });

			// window.battlefield.add(tank);




			var spaceship = new SpaceShip();
			spaceship.set('width', 100);
			spaceship.set('height', 100);
			spaceship.set('armor', 100);
			spaceship.set('shield', 100);
			spaceship.set('speed', 128);
			spaceship.set('positionX', 100);
			spaceship.set('positionY', 100);
			spaceship.set('owner', 'user');
			spaceship.set('isAttackable', true);
			spaceship.set('type', 'unit');
			spaceship.set('image', 'scout');
			spaceship.set('shieldImage', 'shield');
			
			var laser = new Weapon();
			laser.set('coordX', -25);
			laser.set('coordY', 0);
			laser.set('firepower', SCOUT_FIREPOWER);
			laser.set('firerange', TANK_FIRERANGE);
			laser.set('firespeed', SCOUT_FIRESPEED);
			laser.set('owner', 'user');
			laser.set('width', 4);
			laser.set('height', 4);

			var weapon = new WeaponView({
                model: laser,
                spaceship: spaceship
            });

			spaceship.addWeapon(weapon);

						var laser = new Weapon();
			laser.set('coordX', -25);
			laser.set('coordY', -25);
			laser.set('firepower', SCOUT_FIREPOWER);
			laser.set('firerange', TANK_FIRERANGE);
			laser.set('firespeed', SCOUT_FIRESPEED);
			laser.set('owner', 'user');
			laser.set('width', 4);
			laser.set('height', 4);

			var weapon = new WeaponView({
                model: laser,
                spaceship: spaceship
            });

			spaceship.addWeapon(weapon);


			var laser = new Weapon();
			laser.set('coordX', 25);
			laser.set('coordY', -25);
			laser.set('firepower', SCOUT_FIREPOWER);
			laser.set('firerange', TANK_FIRERANGE);
			laser.set('firespeed', SCOUT_FIRESPEED);
			laser.set('owner', 'user');
			laser.set('width', 4);
			laser.set('height', 4);

			var weapon = new WeaponView({
                model: laser,
                spaceship: spaceship
            });

			spaceship.addWeapon(weapon);



			var laser = new Weapon();
			laser.set('coordX', 25);
			laser.set('coordY', 0);
			laser.set('firepower', SCOUT_FIREPOWER);
			laser.set('firerange', SCOUT_FIRERANGE);
			laser.set('firespeed', SCOUT_FIRESPEED);
			laser.set('owner', 'user');
			laser.set('width', 4);
			laser.set('height', 4);

			var weapon = new WeaponView({
                model: laser,
                spaceship: spaceship
            });

			spaceship.addWeapon(weapon);

			var humanFighter = new HumanFighter({
				model: spaceship
			});

			window.battlefield.add(humanFighter);






			var spaceship = new SpaceShip();
			spaceship.set('width', 100);
			spaceship.set('height', 100);
			spaceship.set('armor', 100);
			spaceship.set('shield', 100);
			spaceship.set('speed', 128);
			spaceship.set('positionX', 400);
			spaceship.set('positionY', 400);
			spaceship.set('owner', 'computer');
			spaceship.set('isAttackable', true);
			spaceship.set('type', 'unit');
			spaceship.set('image', 'tank');
			spaceship.set('shieldImage', 'shield');

			var laser = new Weapon();
			laser.set('coordX', -25);
			laser.set('coordY', 0);
			laser.set('firepower', SCOUT_FIREPOWER);
			laser.set('firerange', SCOUT_FIRERANGE);
			laser.set('firespeed', SCOUT_FIRESPEED);
			laser.set('owner', 'computer');
			laser.set('width', 4);
			laser.set('height', 4);
			var weapon = new WeaponView({
                model: laser,
                spaceship: spaceship
            });

			spaceship.addWeapon(weapon);

			var laser = new Weapon();
			laser.set('coordX', 25);
			laser.set('coordY', 0);
			laser.set('firepower', SCOUT_FIREPOWER);
			laser.set('firerange', SCOUT_FIRERANGE);
			laser.set('firespeed', SCOUT_FIRESPEED);
			laser.set('owner', 'computer');
			laser.set('width', 4);
			laser.set('height', 4);

			
            var weapon = new WeaponView({
                model: laser,
                spaceship: spaceship
            });

			spaceship.addWeapon(weapon);

			var humanFighter = new HumanFighter({
				model: spaceship
			});

			window.battlefield.add(humanFighter);




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
