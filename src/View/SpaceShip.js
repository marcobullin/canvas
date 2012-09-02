define(function () {
	var View = View || {};
    View.SpaceShip = Backbone.View.extend({
		initialize: function () {
		    this.model.set('id', Math.ceil(Math.random() * 99999999999 * new Date().getTime()));
            this.x = this.model.get('positionX');
            this.y = this.model.get('positionY');
        },

        move: function (x, y) {
            this.x = x - this.model.get('width') / 2;
            this.y = y - this.model.get('height') / 2;

            var direction = Math.atan2(this.y - this.model.get('positionY'), this.x - this.model.get('positionX')) - Math.PI/2;
            this.model.set('direction', direction);
        },

        hit: function (firepower) {
            // var sound = new Audio(this.model.get('sound').hit);
            // sound.play();

            if (this.model.get('shield') > 0) {
                window.battlefield.ctx.drawImage(window.GameImages[this.model.get('shieldImage')], this.model.get('positionX') - 25, this.model.get('positionY') - 25, 100, 100);

                this.model.set('shield', this.model.get('shield') - firepower);

                if (this.model.get('shield') >= 0) {
                    return;
                }

                firepower = Math.abs(this.model.get('shield'));
            }

            this.model.set('armor', this.model.get('armor') - firepower);

            if (this.model.get('armor') <= 0) {
                this.destroy();
            }
        },

        updatePosition: function (modifier) {
            if (this.x === Math.round(this.model.get('positionX')) && this.y === Math.round(this.model.get('positionY'))) {
                return;
            }
            var speed = this.model.get('speed') * modifier,
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
        
        destroy: function () {
            // if (!this.dieSound) {
            //     this.dieSound = new Audio(this.model.get('sound').die);
            // }

            // this.dieSound.play();

            // removing unit/item from battlefield
            window.battlefield.remove(this.model.get('id'));

            // mark unit as destroyed
            this.model.set('isDestroyed', true);


            // animate explosion
            var self = this,
                x = 0,
                y = 0,
                w = 118,
                h = 118,
                dx = this.model.get('positionX')-54,
                dy = this.model.get('positionY')-54,
                dw = 118,
                dh = 118,
                animation;

            animation = window.setInterval(function() {
                window.battlefield.ctx.drawImage(
                    window.GameImages.explosion,
                    x,
                    y,
                    w,
                    h,
                    dx,
                    dy,
                    dw,
                    dh
                );

                if (x === (5 * 118)) {
                    window.clearInterval(animation);
                    return;
                }
                x += 118;
            }, 10);
        },

        draw: function (modifier) {
		    var armor = this.model.get('width') / 100 * this.model.get('armor'),
                shield = this.model.get('width') / 100 * this.model.get('shield'),
                x = (-1 * this.model.get('width') / 2),
                y = (-1 * this.model.get('height') / 2);

            this.updatePosition(modifier);

            // ROTATE
            window.battlefield.ctx.save();
            window.battlefield.ctx.translate(this.model.get('positionX') + this.model.get('width') / 2, this.model.get('positionY') + this.model.get('height') / 2);
            window.battlefield.ctx.rotate(this.model.get('direction'));

            // LIVE
            window.battlefield.ctx.fillStyle = 'red';
            window.battlefield.ctx.fillRect(x, y - 4, this.model.get('width'), 4);
            window.battlefield.ctx.fillStyle = 'green';
            window.battlefield.ctx.fillRect(x, y - 4, armor, 4);

            // SHIELD
            window.battlefield.ctx.fillStyle = '#115cb1';
            window.battlefield.ctx.fillRect(x, y - 8, shield, 4);

            window.battlefield.ctx.drawImage(window.GameImages[this.model.get('image')], x, y, this.model.get('width'), this.model.get('height'));
            window.battlefield.ctx.restore();
            
            // WEAPONS
            var weapons = this.model.get('weapons');
            for (var key in weapons) {
                weapons[key].draw();
            }
		}
 	});

	return View.SpaceShip;
});