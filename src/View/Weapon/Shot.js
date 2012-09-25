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
            var radius =  20,
                color1 = 'rgba(255, 255, 0, 0.7)',
                color2 = 'rgba(255,0,0, 0.2)',
                gradient = this.game.battlefield.ctx.createRadialGradient(this.model.get('positionX'), this.model.get('positionY'), 0, this.model.get('positionX'), this.model.get('positionY'), radius / 2);

            gradient.addColorStop(0.5, color1);
            gradient.addColorStop(1, color2);

            this.game.battlefield.ctx.save();
            this.game.battlefield.ctx.beginPath();
            this.game.battlefield.ctx.arc(this.model.get('positionX'), this.model.get('positionY'), radius, 0, Math.PI*2, false);
            this.game.battlefield.ctx.fillStyle = gradient;
            this.game.battlefield.ctx.fill();
            this.game.battlefield.ctx.closePath();
            this.game.battlefield.ctx.restore();
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
                    this.game.battlefield.remove(shotId);
                } else {
                    this.game.battlefield.removeObject(shotId);
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
            for (i = 0; i < this.game.battlefield.items.length; i+=1) {
                unit = this.game.battlefield.items[i];

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
                        this.game.battlefield.remove(shotId);
                    } else {
                        this.game.battlefield.removeObject(shotId);
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

                this.game.battlefield.removeObject(shotId);
                this.drawEplosion();
            }
        }


    });

    return Shot;
});