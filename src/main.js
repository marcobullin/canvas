window.requestAnimationFrame = (function(){
  return  window.requestAnimationFrame       || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame    || 
          window.oRequestAnimationFrame      || 
          window.msRequestAnimationFrame     || 
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();
require([
	'../order!../underscore-min',
	'../order!../backbone-min',
	'../order!config',
	'../order!View/Battlefield',
	'../order!View/SpaceShip',
	'../order!Model/HumanDestroyer',
	'../order!Model/HumanFrigate',
	'../order!Model/HumanHeavyFighter',
	'../order!Model/HumanLightFighter',
	'../order!Model/HumanMothership',
	'../order!Model/AlienLightFighter',
	'../order!Model/AlienHeavyFighter',
	'../order!Model/AlienFrigate',
	'../order!Model/AlienDestroyer',
	'../order!Model/AlienMothership',
	'../order!Model/User',
	'../order!View/User'
	],
	function (_, Backbone, config, Battlefield, SpaceShip, HumanDestroyer, HumanFrigate, HumanHeavyFighter, HumanLightFighter, HumanMothership, AlienLightFighter, AlienHeavyFighter, AlienFrigate, AlienDestroyer, AlienMothership, UserModel, User) {
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
				key: 'lightFighter',
				src: 'images/scout.png'
			},
			{
				key: 'heavyFighter',
				src: 'images/bomber.png'
			},
			{
				key: 'mothership',
				src: 'images/mothership.png'
			},
			{
				key: 'frigate',
				src: 'images/tank.png'
			},
			{
				key: 'destroyer',
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
				key: 'biglaser',
				src: 'images/cannon.png'
			},
			{
				key: 'shield',
				src: 'images/shield.png'
			},
			{
				key: 'alienLightFighter',
				src: 'images/alienLightFighter.png'
			},
			{
				key: 'alienHeavyFighter',
				src: 'images/alienHeavyFighter.png'
			},
			{
				key: 'alienFrigate',
				src: 'images/alienFrigate.png'
			},
			{
				key: 'rocketlauncher',
				src: 'images/rocketlauncher.png'
			},
			{
				key: 'missile',
				src: 'images/missile.png'
			},
			{
				key: 'laserTower',
				src: 'images/laserTower.png'
			},
			{
				key: 'alienDestroyer',
				src: 'images/alienDestroyer.png'
			},
			{
				key: 'alienMothership',
				src: 'images/alienMothership.png'
			},
			{
				key: 'humanLaserShot',
				src: 'images/humanLaserShot.png'
			},
			{
				key: 'alienLaserShot',
				src: 'images/alienLaserShot.png'
			},
			{
				key: 'alienDoubleLaserShot',
				src: 'images/alienDoubleLaserShot.png'
			},
			{
				key: 'humanDoubleLaserShot',
				src: 'images/humanDoubleLaserShot.png'
			},
			{
				key: 'humanBigLaserShot',
				src: 'images/humanBigLaserShot.png'
			},
			{
				key: 'alienBigLaserShot',
				src: 'images/alienBigLaserShot.png'
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

		$('#start').unbind('tap.start').bind('tap.start', function () {
			$('#dialog').hide();
			run();
		});

		function create(type, x, y, owner) {
			var model;

			switch (type) {
				case 'destroyer':
					model = new HumanDestroyer();
					break;
				case 'frigate':
					model = new HumanFrigate();
					break;
				case 'heavyFighter':
					model = new HumanHeavyFighter();
					break;
				case 'lightFighter':
					model = new HumanLightFighter();
					break;
				case 'mothership':
					model = new HumanMothership();
					break;
				case 'alienLightFighter':
					model = new AlienLightFighter();
					break;
				case 'alienHeavyFighter':
					model = new AlienHeavyFighter();
					break;
				case 'alienFrigate':
					model = new AlienFrigate();
					break;
				case 'alienDestroyer':
					model = new AlienDestroyer();
					break;
				case 'alienMothership':
					model = new AlienMothership();
					break;
			}

			model.set('id', window.counter);
			model.set('positionX', x);
			model.set('positionY', y);
			model.set('destinationPositionX', x);
			model.set('destinationPositionY', y);
			model.set('owner', owner);

			var ship = new SpaceShip({
				model: model
			});

			++window.counter;
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

			var userModel = new UserModel();
			window.Global.user = new User({
				model: userModel
			});
			userModel.set('money', 500);

			window.level = 1;
			window.counter = 1;

			missionDescription();

			then = Date.now();
			window.battlefield.update();
		}
		
		function missionDescription() {
			$('body').off('check_goal', checkGoal);
			$('body').trigger('stop_scanning_for_enemies');

			$('#dialog').show();
			$('#description').html(LEVEL[window.level].desc.main);
			$('#goals').html(LEVEL[window.level].desc.goals.join('<br/>'));
			$('#hints').html(LEVEL[window.level].desc.hints.join('<br/>'));
			$('body').on('check_goal', checkGoal);
		}

		function run() {
			window.battlefield.items = [];
			clearInterval(this.action);

			/**
			 * USER
			 */
			var oldHeight = 50,
				spaceship,
				j;
			for (j = 0; j < LEVEL[window.level].user.length; j++) {
				spaceship = create(LEVEL[window.level].user[j], 50, oldHeight, 'user');
				oldHeight += spaceship.model.get('height');

				window.battlefield.add(spaceship);
			}

			/**
			 * COMPUTER
			 */
			for (j = 0; j <  LEVEL[window.level].enemy.length; j++) {
				if (LEVEL[window.level].enemy[j] === 'alienMothership') {
				 	spaceship = create(LEVEL[window.level].enemy[j], 1050, 550, 'computer');
				} else {
					spaceship = create(LEVEL[window.level].enemy[j], 1200, 900 - (j + 1) * 50, 'computer');
				}

				window.battlefield.add(spaceship);
			}

			this.action = setInterval(function () {
				for (var i in window.battlefield.items) {
					if (!window.battlefield.items.hasOwnProperty(i)) {
                        continue;
                    }

					var randX = Math.round(Math.random() * 1400);
					var randY = Math.round(Math.random() * 800);
					if (window.battlefield.items[i].model.get('isUnit') && window.battlefield.items[i].model.get('isAttackable') && window.battlefield.items[i].model.get('owner') === 'computer') {
						window.battlefield.items[i].move(randX, randY);
					}
				}
			}, 10000);
		}

		function checkGoal(event, model) {
			console.log('LEVEL = ', level);
			var owner = model.get('owner'),
				goal = LEVEL[window.level].goal,
				humansLeft = [],
				aliensLeft = [],
				towersLeft = false,
				unit,
				i;

			// if users mothership is destroyed -> game over
			if (owner === 'user' && model.get('type') === 'mothership') {
				alert('YOU LOSE!');
				return missionDescription();
			}

			for (i in battlefield.items) {
				if (battlefield.items.hasOwnProperty(i)) {
					unit = battlefield.items[i].model;
					
					if (unit.get('type') === 'missile') {
						continue;
					}

					if (unit.get('owner') === 'user') {
						humansLeft.push(unit);
						continue
					}

					aliensLeft.push(unit);
				}
			}

			// USER LOST ALL UNITS
			if (humansLeft.length === 0) {
				alert('YOU LOSE!');
				return missionDescription();
			}

			/**
			 * GOAL DESTROY ALL DEFENSE TOWERS
			 */
			if (goal === 'destroy_towers') {
				for (i in aliensLeft) {
					if (aliensLeft.hasOwnProperty(i)) {
						if (aliensLeft[i].get('type') === 'alienLaserTower' ||
							aliensLeft[i].get('type') === 'alienDoubleLaserTower' ||
							aliensLeft[i].get('type') === 'alienBigLaserTower' ||
							aliensLeft[i].get('type') === 'alienMissileTower'
						) {
							towersLeft = true;
							break;
						}
					}
				}

				if (towersLeft === false) {
					window.level += 1;
					return missionDescription();	
				}

				return;
			}

			/**
			 * GOAL DESTROY THE ALIEN DESTROYER
			 */
			if (goal === 'destroy_destroyer') {
				if (model.get('type') === 'alienDestroyer') {
					window.level += 1;
					return missionDescription();
				}
				return;
			}

			/**
			 * GOAL DESTROY THE ALIEN DESTROYER
			 */
			if (goal === 'destroy_frigate') {
				if (model.get('type') === 'alienFrigate') {
					window.level += 1;
					return missionDescription();
				}
				return;
			}

			/**
			 * GOAL DESTROY ALL ENEMIES
			 */
			if (goal === 'destroy_all') {
				if (aliensLeft.length === 0) {
					window.level += 1;
					return missionDescription();	
				}

				return;
			}
		}
	}
);
