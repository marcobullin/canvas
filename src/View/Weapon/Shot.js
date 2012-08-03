define(function () {
    var Shot = Backbone.View.extend({
        hitSound: null,

        /**
         * This method updates the position of the current shot and checks
         * if something is hit.
         *
         * @param  {integer} goalX [description]
         * @param  {integer} goalY [description]
         * @param  {integer} endX1 [description]
         * @param  {integer} endY1 [description]
         * @param  {integer} endX2 [description]
         * @param  {integer} endY2 [description]
         *
         * @return void
         */
        fire: function (goalX, goalY, endX1, endY1, endX2, endY2) {
            var self = this,
                action;

            action = setInterval(function () {
                var dx = goalX - self.model.get('positionX'),
                    dy = goalY - self.model.get('positionY'),
                    distance = Math.sqrt(dx * dx + dy * dy),
                    moves = distance / self.model.get('firespeed'),
                    x = dx / moves,
                    y = dy / moves,
                    i,
                    obstacle;

                self.model.set('positionX', self.model.get('positionX') + x);
                self.model.set('positionY', self.model.get('positionY') + y);

                // check if something is hit
                for (i = 0; i < window.battlefield.items.length; i+=1) {
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
                            if (!self.hitSound) {
                                self.hitSound = new Audio(obstacle.model.get('sound').hit);
                            }

                            self.hitSound.play();
                            obstacle.model.set('protection', obstacle.model.get('protection') - self.model.get('firepower'));

                            if (obstacle.model.get('protection') <= 0) {
                                obstacle.destroy();
                            }
                        }

                        return;
                    }
                }

                // shot reaches goal
                if (self.model.get('positionY') >= endY1 &&
                    self.model.get('positionY') <= endY2 &&
                    self.model.get('positionX') >= endX1 &&
                    self.model.get('positionX') <= endX2
                ) {
                    clearInterval(action);
                    window.battlefield.remove(self.model.get('id'));
                }
            }, 10);
        }
    });

    return Shot;
});