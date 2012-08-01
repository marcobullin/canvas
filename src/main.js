require([
	'../order!../underscore-min',
	'../order!../backbone-min',
	'../order!config',
	'../order!View/Battlefield',
	'../order!Model/Unit/Scout',
	'../order!Model/Unit/Tank',
	'../order!View/Unit/MilitaryVehicle',
	'../order!Model/Obstacle/Obstacle',
	'../order!View/Obstacle/Obstacle'
	],
	function (_, Backbone, config, Battlefield, Scout, Tank, MilitaryVehicleView, ObstacleModel, ObstacleView) {
		var images = [
			{
				key: 'map',
				src: 'images/battlefield2.jpg'
			},
			{
				key: 'scout',
				src: 'images/scout.png'
			},
			{
				key: 'tank',
				src: 'images/tank.png'
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
			}(i)
		}

		function start() {

			window.battlefield = new Battlefield();
			window.battlefield.render();

			var scoutModel = new Scout();
			scoutModel.set('name', 'b');
			scoutModel.set('protection', SCOUT_PROTECTION);
			scoutModel.set('price', SCOUT_PRICE);
			scoutModel.set('speed', SCOUT_SPEED);
			scoutModel.set('firepower', SCOUT_FIREPOWER);
			scoutModel.set('firerange', SCOUT_FIRERANGE);
			scoutModel.set('firespeed', SCOUT_FIRESPEED);
			scoutModel.set('width', SCOUT_WIDTH);
			scoutModel.set('height', SCOUT_HEIGHT);
			scoutModel.set('positionX', 1050);
			scoutModel.set('positionY', 450);
			scoutModel.set('owner', 'computer');
			scoutModel.set('isAttackable', true);
			scoutModel.set('weapon', 'MachineGun');
			scoutModel.set('type', 'unit');

			var scout = new MilitaryVehicleView({
				model: scoutModel
			});

			window.battlefield.add(scout);

			var tankModel = new Tank();
			tankModel.set('name', 'a');
			tankModel.set('protection', TANK_PROTECTION);
			tankModel.set('price', TANK_PRICE);
			tankModel.set('speed', TANK_SPEED);
			tankModel.set('firepower', TANK_FIREPOWER);
			tankModel.set('firerange', TANK_FIRERANGE);
			tankModel.set('firespeed', TANK_FIRESPEED);
			tankModel.set('width', TANK_WIDTH);
			tankModel.set('height', TANK_HEIGHT);
			tankModel.set('positionX', 950);
			tankModel.set('positionY', 250);
			tankModel.set('owner', 'computer');
			tankModel.set('isAttackable', true);
			tankModel.set('weapon', 'Cannon');
			tankModel.set('type', 'unit');

			var tank = new MilitaryVehicleView({
				model: tankModel
			});

			window.battlefield.add(tank);

			var scoutModel = new Scout();
			scoutModel.set('name', 'b');
			scoutModel.set('protection', SCOUT_PROTECTION);
			scoutModel.set('price', SCOUT_PRICE);
			scoutModel.set('speed', SCOUT_SPEED);
			scoutModel.set('firepower', SCOUT_FIREPOWER);
			scoutModel.set('firerange', SCOUT_FIRERANGE);
			scoutModel.set('firespeed', SCOUT_FIRESPEED);
			scoutModel.set('width', SCOUT_WIDTH);
			scoutModel.set('height', SCOUT_HEIGHT);
			scoutModel.set('positionX', 950);
			scoutModel.set('positionY', 600);
			scoutModel.set('owner', 'computer');
			scoutModel.set('isAttackable', true);
			scoutModel.set('weapon', 'MachineGun');
			scoutModel.set('type', 'unit');

			var scout = new MilitaryVehicleView({
				model: scoutModel
			});

			window.battlefield.add(scout);


			var scoutModel = new Scout();
			scoutModel.set('name', 'b');
			scoutModel.set('protection', SCOUT_PROTECTION);
			scoutModel.set('price', SCOUT_PRICE);
			scoutModel.set('speed', SCOUT_SPEED);
			scoutModel.set('firepower', SCOUT_FIREPOWER);
			scoutModel.set('firerange', SCOUT_FIRERANGE);
			scoutModel.set('firespeed', SCOUT_FIRESPEED);
			scoutModel.set('width', SCOUT_WIDTH);
			scoutModel.set('height', SCOUT_HEIGHT);
			scoutModel.set('positionX', 950);
			scoutModel.set('positionY', 450);
			scoutModel.set('owner', 'computer');
			scoutModel.set('isAttackable', true);
			scoutModel.set('weapon', 'MachineGun');
			scoutModel.set('type', 'unit');

			var scout = new MilitaryVehicleView({
				model: scoutModel
			});

			window.battlefield.add(scout);









			var scoutModel = new Scout();
			scoutModel.set('name', 'xxx');
			scoutModel.set('protection', SCOUT_PROTECTION);
			scoutModel.set('price', SCOUT_PRICE);
			scoutModel.set('speed', SCOUT_SPEED);
			scoutModel.set('firepower', 2 * SCOUT_FIREPOWER);
			scoutModel.set('firerange', SCOUT_FIRERANGE);
			scoutModel.set('firespeed', SCOUT_FIRESPEED);
			scoutModel.set('width', SCOUT_WIDTH);
			scoutModel.set('height', SCOUT_HEIGHT);
			scoutModel.set('positionX', 50);
			scoutModel.set('positionY', 300);
			scoutModel.set('owner', 'user');
			scoutModel.set('isAttackable', true);
			scoutModel.set('weapon', 'DoubleMachineGun');
			scoutModel.set('type', 'unit');

			var scout = new MilitaryVehicleView({
				model: scoutModel
			});

			window.battlefield.add(scout);

			var tankModel = new Tank();
			tankModel.set('name', 'a');
			tankModel.set('protection', TANK_PROTECTION);
			tankModel.set('price', TANK_PRICE);
			tankModel.set('speed', TANK_SPEED);
			tankModel.set('firepower', TANK_FIREPOWER);
			tankModel.set('firerange', TANK_FIRERANGE);
			tankModel.set('firespeed', TANK_FIRESPEED);
			tankModel.set('width', TANK_WIDTH);
			tankModel.set('height', TANK_HEIGHT);
			tankModel.set('positionX', 150);
			tankModel.set('positionY', 300);
			tankModel.set('owner', 'user');
			tankModel.set('isAttackable', true);
			tankModel.set('weapon', 'Cannon');
			tankModel.set('type', 'unit');

			var tank = new MilitaryVehicleView({
				model: tankModel
			});

			window.battlefield.add(tank);











			for (var i = 0; i < OBSTACLES.length; i++) {
				var model = new ObstacleModel();
				model.set('width', 50);
				model.set('height', 50);
				model.set('positionX', OBSTACLES[i].x * 50);
				model.set('positionY', OBSTACLES[i].y * 50);
				model.set('type', 'obstacle');

				var obstacle = new ObstacleView({
					model: model
				});

				window.battlefield.add(obstacle);	
			}
			
			setInterval(function() {window.battlefield.update()}, 1);
		}
	}
);
