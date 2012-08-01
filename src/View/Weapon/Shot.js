define(function () {
	var Shot = Backbone.View.extend({
		move: function (enemy, speed) {
			var self = this,
				x2 = enemy.model.get('positionX') + (enemy.model.get('width') / 2),
				y2 = enemy.model.get('positionY') + (enemy.model.get('height') / 2);

			var action = setInterval(function () {
				var dx = x2 - self.model.get('positionX'),
					dy = y2 - self.model.get('positionY'),
					distance = Math.sqrt(dx * dx + dy * dy),
					moves = distance / speed,
					x = dx / moves,
					y = dy / moves,
					i,
					obstacle;

				self.model.set('positionX', self.model.get('positionX') + x);
				self.model.set('positionY', self.model.get('positionY') + y);


				// check if shot hits an obstacle or something crosses the way
				for (i = 0; i < window.battlefield.items.length; i++) {
					obstacle = window.battlefield.items[i];

					if (self.model.get('positionY') >= obstacle.model.get('positionY') &&
						self.model.get('positionY') <= obstacle.model.get('positionY') + obstacle.model.get('height') &&
						self.model.get('positionX') >= obstacle.model.get('positionX') &&
						self.model.get('positionX') <= obstacle.model.get('positionX') + obstacle.model.get('width') &&
						obstacle.model.get('owner') !== self.model.get('owner')
					) {
						clearInterval(action);
						window.battlefield.remove(self.model.get('id'));

						if (obstacle.model.get('isAttackable') && !obstacle.model.get('isDestroyed')) {
							obstacle.model.set('protection', obstacle.model.get('protection') - self.model.get('firepower'));

							if (obstacle.model.get('protection') <= 0) {
								obstacle.destroy();
							}
						}

						return;
					}
				}

				// shot reaches goal
				if (self.model.get('positionY') >= (y2 - (enemy.model.get('height') / 2)) &&
					self.model.get('positionY') <= (y2 + (enemy.model.get('height') / 2)) &&
					self.model.get('positionX') >= (x2 - (enemy.model.get('width') / 2)) &&
					self.model.get('positionX') <= (x2 + (enemy.model.get('width') / 2))
				) {
					clearInterval(action);
					window.battlefield.remove(self.model.get('id'));

					// check if enemy could be hit
					if (self.model.get('positionX') >= enemy.model.get('positionX') &&
						self.model.get('positionX') <= (enemy.model.get('positionX') + enemy.model.get('width')) &&
						self.model.get('positionY') >= enemy.model.get('positionY') &&
						self.model.get('positionY') <= (enemy.model.get('positionY') + enemy.model.get('height')) &&
						!enemy.model.get('isDestroyed')
					) {
						enemy.model.set('protection', enemy.model.get('protection') - self.model.get('firepower'));

						if (enemy.model.get('protection') <= 0) {
							enemy.destroy();
						}
					}
				}
			}, 10);
		}
	});

	return Shot;
});