define(
	function () {
		var Obstacle = Backbone.View.extend({
            initialize: function () {
                this.model.set('id', Math.ceil(Math.random() * 99999999999 * new Date().getTime()));
                this.x = this.model.get('positionX');
                this.y = this.model.get('positionY');
            },

            move: function (x, y) {
                this.x = x - this.model.get('width') / 2;
                this.y = y - this.model.get('height') / 2;
            },
            updatePosition: function (modifier) {
                if (this.x === Math.round(this.model.get('positionX')) && this.y === Math.round(this.model.get('positionY'))) {
                    return;
                }
                var speed = 50 * modifier,
                    speedX, speedY,
                    a = Math.abs(this.x - this.model.get('positionX')) / speed,
                    b = Math.abs(this.y - this.model.get('positionY')) / speed;

                // set right speed for x and y distance
                if (a >= b) {
                    speedX = speed;
                    speedY = (b / a) * speed;
                } else {
                    speedX = (a / b) * speed;
                    speedY = speed;
                }

                // setting new postion
                if (this.x < this.model.get('positionX')) {
                    this.model.set('positionX', (this.model.get('positionX') - speedX));
                }

                if (this.x > this.model.get('positionX')) {
                    this.model.set('positionX', (this.model.get('positionX') + speedX));
                }

                if (this.y < this.model.get('positionY')) {
                    this.model.set('positionY', (this.model.get('positionY') - speedY));
                }

                if (this.y > this.model.get('positionY')) {
                    this.model.set('positionY', (this.model.get('positionY') + speedY));
                }
            },
			draw: function (modifier) {
                this.updatePosition(modifier);
				window.battlefield.ctx.beginPath();
                window.battlefield.ctx.arc(this.model.get('positionX') + this.model.get('width')/2, this.model.get('positionY') + this.model.get('height')/2, this.model.get('width')/2 + 2, 0, Math.PI*2, false);
                window.battlefield.ctx.fillStyle = "rgba(100, 100, 100, 0.8)";
                window.battlefield.ctx.fill();
                window.battlefield.ctx.closePath();
				window.battlefield.ctx.restore();
			}
		});

		return Obstacle;
	}
);