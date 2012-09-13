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
			userModel.set('money', 100);

			window.level = 1;
			window.counter = 1;
			$('[data-role="page"]').on('game_over', function (event, model) {
				window.counter = 1;
				for (var i in window.battlefield.items) {

					if (window.battlefield.items[i].model.get('isUnit') && window.battlefield.items[i].model.get('isAttackable')) {
						window.battlefield.items[i].stopScaning();
					}
				}
				if (model.get('owner') === 'computer') {
					alert('You Won!');
					window.level += 1;
				} else {
					alert('You LOSE!');
				}
				run();
			});
			run();

			then = Date.now();
			window.battlefield.update();
		}

		function run(level) {
			window.battlefield.items = [];
			clearInterval(this.action);
			clearInterval(this.backupAction);

			/**
			 * USER
			 */
			for (var j = 0; j < LEVEL[window.level].user.length; j++) {
				var spaceship;

				if (LEVEL[window.level].user[j] === 'mothership') {
				 	spaceship = create(LEVEL[window.level].user[j], 50, 50, 'user');
				} else {
					spaceship = create(LEVEL[window.level].user[j], 350, (j + 1) * 50, 'user');
				}

				window.battlefield.add(spaceship);
			}

			/**
			 * COMPUTER
			 */
			for (var j = 0; j <  LEVEL[window.level].enemy.length; j++) {
				var spaceship;

				if (LEVEL[window.level].enemy[j] === 'alienMothership') {
				 	spaceship = create(LEVEL[window.level].enemy[j], 1200, 550, 'computer');
				} else {
					spaceship = create(LEVEL[window.level].enemy[j], 1050, 900 - (j + 1) * 50, 'computer');
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

			this.backupAction = setInterval(function () {
				var spaceship;

				switch (window.level) {
					case 1:
					case 2:
					case 3:
						spaceship = create('alienLightFighter', 1150, 550, 'computer');
						break;
					case 4:
						spaceship = create('alienHeavyFighter', 1150, 550, 'computer');
						break;
					case 5:
						spaceship = create('alienHeavyFighter', 1150, 550, 'computer');
						break;
					case 6:
						spaceship = create('alienFrigate', 1150, 550, 'computer');
						break;
				}
				window.battlefield.add(spaceship);
			}, 30000);
		}
	}
);
