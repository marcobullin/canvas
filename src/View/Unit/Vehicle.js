define(function () {
    var Vehicle = Backbone.View.extend({
        /**
         * Moving action.
         *
         * @type action id
         */
        action: null,

        dieSound: null,

        moving: false,

        wps: [],

        currentWp: {},

        x: 0,
        y: 0,

        initialize: function () {
            this.x = this.model.get('positionX');
            this.y = this.model.get('positionY');
        },

        move: function (x, y) {
            this.x = x - this.model.get('width') / 2;
            this.y = y - this.model.get('height') / 2;

            var direction = Math.atan2(this.y - this.model.get('positionY'), this.x - this.model.get('positionX')) - Math.PI/2;
            this.model.set('direction', direction);
        },

        update: function (modifier) {
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

        hit: function () {
            var sound = new Audio(this.model.get('sound').hit);
            sound.play();
        },

        /**
         * This method removes the unit/item from battlefield.
         * Plays the explosion sound and renders the explosion.
         *
         * @return void
         */
        destroy: function () {
            if (!this.dieSound) {
                this.dieSound = new Audio(this.model.get('sound').die);
            }

            this.dieSound.play();

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

        /**
         * This method renders the unit/item in correct rotation with live bar and firerange.
         *
         * @return void
         */
        render: function (modifier) {
            if (!this.model.get('id')) {
                this.model.set('id', Math.ceil(Math.random() * 99999999999 * new Date().getTime()));
            }

            var live = this.model.get('width') / 100 * this.model.get('protection'),
                x = (-1 * this.model.get('width') / 2),
                y = (-1 * this.model.get('height') / 2);

            this.update(modifier);

            // ROTATE
            window.battlefield.ctx.save();
            window.battlefield.ctx.translate(this.model.get('positionX') + this.model.get('width') / 2, this.model.get('positionY') + this.model.get('height') / 2);

            window.battlefield.ctx.rotate(this.model.get('direction'));

            // LIVE
            window.battlefield.ctx.fillStyle = 'red';
            window.battlefield.ctx.fillRect(x, y - 4, this.model.get('width'), 4);
            window.battlefield.ctx.fillStyle = 'green';
            window.battlefield.ctx.fillRect(x, y - 4, live, 4);

            // FIRERANGE
            if (this.model.get('selected')) {
                window.battlefield.ctx.beginPath();
                window.battlefield.ctx.arc(x + (this.model.get('width') / 2), y + (this.model.get('height') / 2), this.model.get('firerange'), 0, Math.PI*2, false);
                window.battlefield.ctx.fillStyle = "rgba(255, 0, 0, 0.1)";
                window.battlefield.ctx.fill();
                window.battlefield.ctx.lineWidth = 1;
                window.battlefield.ctx.strokeStyle = 'red';
                window.battlefield.ctx.stroke();
                window.battlefield.ctx.closePath();
            }

            window.battlefield.ctx.drawImage(window.GameImages[this.model.get('imageKey')], x, y, this.model.get('width'), this.model.get('height'));
            window.battlefield.ctx.restore();
        }
    });

    return Vehicle;
});