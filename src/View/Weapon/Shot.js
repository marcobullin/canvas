define(function () {
    var Shot = Backbone.View.extend({
        goalX: false,
        goalY: false,
        endX1: false,
        endY1: false,
        endX2: false,
        endY2: false,

        update: function (modifier) {
            if (false === this.goalX && false === this.goalY) {
                return;
            }

            var dx = this.goalX - this.model.get('positionX'),
                dy = this.goalY - this.model.get('positionY'),
                distance = Math.sqrt(dx * dx + dy * dy),
                moves = distance / (this.model.get('firespeed') * modifier),
                x = dx / moves,
                y = dy / moves,
                i,
                obstacle;

            this.model.set('positionX', this.model.get('positionX') + x);
            this.model.set('positionY', this.model.get('positionY') + y);

            // check if something is hit
            for (i = 0; i < window.battlefield.items.length; i+=1) {
                obstacle = window.battlefield.items[i];

                if (this.model.get('positionY') >= obstacle.model.get('positionY') &&
                    this.model.get('positionY') <= obstacle.model.get('positionY') + obstacle.model.get('height') &&
                    this.model.get('positionX') >= obstacle.model.get('positionX') &&
                    this.model.get('positionX') <= obstacle.model.get('positionX') + obstacle.model.get('width') &&
                    obstacle.model.get('owner') !== this.model.get('owner')
                ) {
                    this.goalX = false;
                    this.goalY = false;

                    window.battlefield.remove(this.model.get('id'));
                    if (obstacle.model.get('isAttackable') && !obstacle.model.get('isDestroyed')) {
                        obstacle.hit(this.model.get('firepower'));
                    }

                    return;
                }
            }

            // shot reaches goal
            if (this.model.get('positionY') >= this.endY1 &&
                this.model.get('positionY') <= this.endY2 &&
                this.model.get('positionX') >= this.endX1 &&
                this.model.get('positionX') <= this.endX2
            ) {
                this.goalX = false;
                this.goalY = false;
                window.battlefield.remove(this.model.get('id'));
            }
        },

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
            this.goalX = goalX;
            this.goalY = goalY;

            this.endX1 = endX1;
            this.endY1 = endY1;
            this.endX2 = endX2;
            this.endY2 = endY2;
        }
    });

    return Shot;
});