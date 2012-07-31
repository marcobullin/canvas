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
		scoutModel.set('positionX', 50);
		scoutModel.set('positionY', 50);
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
		tankModel.set('positionX', 150);
		tankModel.set('positionY', 50);
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
		scoutModel.set('positionX', 850);
		scoutModel.set('positionY', 350);
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
		scoutModel.set('positionX', 450);
		scoutModel.set('positionY', 50);
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
		scoutModel.set('positionY', 450);
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
		tankModel.set('positionX', 250);
		tankModel.set('positionY', 450);
		tankModel.set('owner', 'user');
		tankModel.set('isAttackable', true);
		tankModel.set('weapon', 'Cannon');
		tankModel.set('type', 'unit');

		var tank = new MilitaryVehicleView({
			model: tankModel
		});

		window.battlefield.add(tank);












		var model = new ObstacleModel();
		model.set('width', 50);
		model.set('height', 50);
		model.set('positionX', 300);
		model.set('positionY', 450);
		model.set('type', 'obstacle');

		var obstacle = new ObstacleView({
			model: model
		});

		window.battlefield.add(obstacle);

		var model = new ObstacleModel();
		model.set('width', 50);
		model.set('height', 50);
		model.set('positionX', 350);
		model.set('positionY', 450);
		model.set('type', 'obstacle');

		var obstacle = new ObstacleView({
			model: model
		});

		window.battlefield.add(obstacle);

		var model = new ObstacleModel();
		model.set('width', 50);
		model.set('height', 50);
		model.set('positionX', 400);
		model.set('positionY', 450);
		model.set('type', 'obstacle');

		var obstacle = new ObstacleView({
			model: model
		});

		window.battlefield.add(obstacle);

		var model = new ObstacleModel();
		model.set('width', 50);
		model.set('height', 50);
		model.set('positionX', 200);
		model.set('positionY', 250);
		model.set('type', 'obstacle');

		var obstacle = new ObstacleView({
			model: model
		});

		window.battlefield.add(obstacle);

		var model = new ObstacleModel();
		model.set('width', 50);
		model.set('height', 50);
		model.set('positionX', 100);
		model.set('positionY', 200);
		model.set('type', 'obstacle');

		var obstacle = new ObstacleView({
			model: model
		});

		window.battlefield.add(obstacle);

		setInterval(function() {window.battlefield.update()}, 1);
	}
);
