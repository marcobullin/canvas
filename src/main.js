window.requestAnimationFrame = (function () {
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
	'../order!View/User',
	'../order!Game'
	],
	function (_, Backbone, config, Battlefield, SpaceShip, HumanDestroyer, HumanFrigate, HumanHeavyFighter, HumanLightFighter, HumanMothership, AlienLightFighter, AlienHeavyFighter, AlienFrigate, AlienDestroyer, AlienMothership, UserModel, User, Game) {
		new Game();
	}
);
