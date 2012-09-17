define(function () {
    var Shot = Backbone.View.extend({
        goalX: false,
        goalY: false,
        endX1: false,
        endY1: false,
        endX2: false,
        endY2: false,

        // update: function (modifier) {
        //     if (false === this.goalX && false === this.goalY) {
        //         return;
        //     }

        //     if (this.model.get('enemy').get('isDestroyed') === true && this.model.get('type') === 'missile') {
        //         window.battlefield.remove(this.model.get('id'));
        //     }

        //     var dx = (this.model.get('type') === 'missile') ? Math.floor(this.model.get('enemy').get('positionX')) + this.model.get('enemy').get('width')/2 - this.model.get('positionX') : this.goalX - this.model.get('positionX'),
        //         dy = (this.model.get('type') === 'missile') ? Math.floor(this.model.get('enemy').get('positionY')) + this.model.get('enemy').get('height')/2 - this.model.get('positionY') : this.goalY - this.model.get('positionY'),
        //         distance = Math.sqrt(dx * dx + dy * dy),
        //         moves = distance / (this.model.get('firespeed') * modifier),
        //         x = dx / moves,
        //         y = dy / moves,
        //         i,
        //         obstacle;

        //     this.model.set('positionX', this.model.get('positionX') + x);
        //     this.model.set('positionY', this.model.get('positionY') + y);

        //     // check if something is hit
        //     for (i = 0; i < window.battlefield.items.length; i+=1) {
        //         if (!window.battlefield.items.hasOwnProperty(i)) {
        //             continue;
        //         }
        //         obstacle = window.battlefield.items[i];

        //         if (this.model.get('positionY') >= obstacle.model.get('positionY') &&
        //             this.model.get('positionY') <= obstacle.model.get('positionY') + obstacle.model.get('height') &&
        //             this.model.get('positionX') >= obstacle.model.get('positionX') &&
        //             this.model.get('positionX') <= obstacle.model.get('positionX') + obstacle.model.get('width') &&
        //             obstacle.model.get('owner') !== this.model.get('owner')
        //         ) {
        //             this.goalX = false;
        //             this.goalY = false;

        //             if (this.model.get('type') === 'missile') {
        //                 this.model.set('isDestroyed', true);
        //                 window.battlefield.remove(this.model.get('id'));
        //             } else {
        //                 window.battlefield.removeObject(this.model.get('id'));
        //             }
        //             if (obstacle.model.get('isAttackable') && !obstacle.model.get('isDestroyed')) {
        //                 var firepower = this.model.get('firepower');
        //                 // if (obstacle.model.get('currentShield') > 0) {
        //                 //     obstacle.model.set('currentShield', obstacle.model.get('currentShield') - firepower);

        //                 //     if (obstacle.model.get('currentShield') < 0) {
        //                 //         firepower = Math.abs(obstacle.model.get('currentShield'));
        //                 //         obstacle.model.set('currentArmor', obstacle.model.get('currentArmor') - firepower);
        //                 //     }
        //                 // } else {
        //                     obstacle.model.set('currentArmor', obstacle.model.get('currentArmor') - firepower);
        //                 // }
        //             }
        //             window.battlefield.ctx.save();
        //             window.battlefield.ctx.beginPath();
        //             window.battlefield.ctx.arc(this.model.get('positionX'), this.model.get('positionY'), 4, 0, Math.PI*2, false);
        //             window.battlefield.ctx.fillStyle = "orange";
        //             window.battlefield.ctx.fill();
        //             window.battlefield.ctx.closePath();
        //             window.battlefield.ctx.restore();

        //             return;
        //         }
        //     }

        //     // shot reaches goal
        //     if (Math.floor(this.model.get('positionY')) >= Math.floor(this.endY1) &&
        //         Math.floor(this.model.get('positionY')) <= Math.floor(this.endY2) &&
        //         Math.floor(this.model.get('positionX')) >= Math.floor(this.endX1) &&
        //         Math.floor(this.model.get('positionX')) <= Math.floor(this.endX2)
        //     ) {
        //         this.goalX = false;
        //         this.goalY = false;

        //         if (this.model.get('type') === 'missile') {
        //             this.model.set('isDestroyed', true);
        //             window.battlefield.remove(this.model.get('id'));
        //         } else {
        //             window.battlefield.removeObject(this.model.get('id'));
        //         }

        //         window.battlefield.ctx.save();
        //         window.battlefield.ctx.beginPath();
        //         window.battlefield.ctx.arc(this.model.get('positionX'), this.model.get('positionY'), 4, 0, Math.PI*2, false);
        //         window.battlefield.ctx.fillStyle = "orange";
        //         window.battlefield.ctx.fill();
        //         window.battlefield.ctx.closePath();
        //         window.battlefield.ctx.restore();
        //     }
        // },

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
        //  fire: function (goalX, goalY, endX1, endY1, endX2, endY2) {
        //     this.goalX = goalX;
        //     this.goalY = goalY;

        //     this.endX1 = endX1;
        //     this.endY1 = endY1;
        //     this.endX2 = endX2;
        //     this.endY2 = endY2;
        // },


        fire: function () {
            var enemy = this.model.get('enemy');

            this.goalX = enemy.get('positionX') + enemy.get('width') / 2;
            this.goalY = enemy.get('positionY') + enemy.get('height') / 2;
        },

        drawEplosion: function () {
            window.battlefield.ctx.save();
            window.battlefield.ctx.beginPath();
            window.battlefield.ctx.arc(this.model.get('positionX'), this.model.get('positionY'), 4, 0, Math.PI*2, false);
            window.battlefield.ctx.fillStyle = "orange";
            window.battlefield.ctx.fill();
            window.battlefield.ctx.closePath();
            window.battlefield.ctx.restore();
        },

        update: function (modifier) {
            var enemy = this.model.get('enemy'),
                shotId = this.model.get('id'),
                MxShot = this.model.get('positionX'),// + this.model.get('width') / 2,
                MyShot = this.model.get('positionY'),// + this.model.get('height') / 2,
                firepower = this.model.get('firepower'),
                dx,
                dy,
                distance,
                moves,
                newX,
                newY,
                i,
                unit;

            if (false === this.goalX && false === this.goalY) {
                return;
            }

            // ENEMY IS ALREADY DESTROYED
            if (enemy.get('isDestroyed') === true) {
                this.model.set('isDestroyed', true);
                if (this.model.get('type') === 'missile') {
                    window.battlefield.remove(shotId);
                } else {
                    window.battlefield.removeObject(shotId);
                }

                this.drawEplosion();

                this.goalX = false;
                this.goalY = false;
                return;
            }

            if (this.model.get('type') === 'missile') {
                dx = enemy.get('positionX') + enemy.get('width') / 2 - MxShot;
                dy = enemy.get('positionY') + enemy.get('height') / 2 - MyShot;
            } else {
                dx = this.goalX - MxShot;
                dy = this.goalY - MyShot;
            }

            distance = Math.sqrt(dx * dx + dy * dy);
            moves = distance / (this.model.get('firespeed') * modifier);
            newX = dx / moves;
            newY = dy / moves;

            this.model.set('positionX', this.model.get('positionX') + newX);
            this.model.set('positionY', this.model.get('positionY') + newY);

            // check if something is hit
            for (i = 0; i < window.battlefield.items.length; i+=1) {
                unit = window.battlefield.items[i];

                // THE SHOT HITS THE ENEMY
                if (this.model.get('positionY') >= unit.model.get('positionY') &&
                    this.model.get('positionY') <= unit.model.get('positionY') + unit.model.get('height') &&
                    this.model.get('positionX') >= unit.model.get('positionX') &&
                    this.model.get('positionX') <= unit.model.get('positionX') + unit.model.get('width') &&
                    unit.model.get('owner') !== this.model.get('owner')
                ) {
                    this.goalX = false;
                    this.goalY = false;

                    this.model.set('isDestroyed', true);

                    if (this.model.get('type') === 'missile') {
                        window.battlefield.remove(shotId);
                    } else {
                        window.battlefield.removeObject(shotId);
                    }
                     
                    unit.model.set('currentArmor', unit.model.get('currentArmor') - firepower);
                    this.drawEplosion();

                    return;
                }
            }

            // SHOT REACHES GOAL
            if (this.model.get('positionY') - 10 <= this.goalY &&
                this.model.get('positionY') + 10 >= this.goalY &&
                this.model.get('positionX') - 10 <= this.goalX &&
                this.model.get('positionX') + 10 >= this.goalX &&
                this.model.get('type') !== 'missile'                
            ) {
                this.goalX = false;
                this.goalY = false;

                window.battlefield.removeObject(shotId);
                this.drawEplosion();
            }
        }


    });

    return Shot;
});