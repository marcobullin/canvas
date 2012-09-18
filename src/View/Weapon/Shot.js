define(function () {
    var Shot = Backbone.View.extend({
        goalX: false,
        goalY: false,

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