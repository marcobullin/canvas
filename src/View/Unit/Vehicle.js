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

        /**
         * This method collects possible way points to goal destination.
         * It uses the astar algorithm.
         *
         * @param  {integer} goalX
         * @param  {integer} goalY
         *
         * @return array
         */
        getWayPoints: function (goalX, goalY) {
            var x,
                y,
                i,
                len,
                item,
                blocked = false,
                currentPosition = [],
                matrix = [],
                wayPoints,
                currX  = Math.floor(this.model.get('positionX') / 50) * 50,
                currY  = Math.floor(this.model.get('positionY') / 50) * 50;

            for (x = 0; x < BATTLEFIELD_WIDTH; x+=this.model.get('width')) {
                currentPosition = [];
                for (y = 0; y < BATTLEFIELD_HEIGHT; y+=this.model.get('height')) {
                    // start
                    if (currX === x &&
                        currY === y
                    ) {
                        currentPosition.push('s');
                        continue;
                    }

                    // goal
                    if (x === goalX && y === goalY) {
                        currentPosition.push('g');
                        continue;
                    }

                    // obstacles
                    for (i = 0, len = window.battlefield.items.length; i < len; i+=1) {
                        item = window.battlefield.items[i];

                        if (item.model.get('type') !== 'obstacle' && item.model.get('type') !== 'unit') {
                            continue;
                        }

                        if (item.model.get('id') === this.model.get('id')) {
                            continue;
                        }

                        if (x === item.model.get('positionX') &&
                            y === item.model.get('positionY')
                        ) {
                            currentPosition.push('u');
                            blocked = true;
                            break;
                        }
                    }

                    // somethin is in the way
                    if (blocked) {
                        blocked = false;
                        continue;
                    }

                    currentPosition.push('w');
                }

                matrix.push(currentPosition);
            }

            wayPoints = astar(matrix, 'manhattan', true);

            if (wayPoints && wayPoints.length > 0) {
                wayPoints.shift();
            }

            return wayPoints;
        },

        /**
         * This method moves the unit/item to given position.
         *
         * @param  {integer} x
         * @param  {integer} y
         *
         * @return void
         */
        //  move: function (x, y) {
        //     x = Math.floor(x / 50);
        //     x *= 50;

        //     y = Math.floor(y / 50);
        //     y *= 50;

        //     this.wps = this.getWayPoints(x, y);

        //     this.x = x;
        //     this.y = y;
        // },

        move: function (x, y) {
            this.x = x - this.model.get('width') / 2;
            this.y = y - this.model.get('height') / 2;
        },

        update: function (modifier) {
            var directionPathX = '',
                directionPathY = '',
                speed = this.model.get('speed') * modifier;

            if (this.model.get('positionX') === this.x && 
                this.model.get('positionY') === this.y) {
                return;
            }

            if (this.x < this.model.get('positionX')) {
                this.model.set('positionX', (this.model.get('positionX') - speed));
            } 

            if (this.x > this.model.get('positionX')) {
                this.model.set('positionX', (this.model.get('positionX') + speed));
            }

            if (this.y < this.model.get('positionY')) {
                this.model.set('positionY', (this.model.get('positionY') - speed));
            } 

            if (this.y > this.model.get('positionY')) {
                this.model.set('positionY', (this.model.get('positionY') + speed));
            }
/*
            if (this.model.get('positionX') !== this.x) {
                this.model.set('positionX', (this.model.get('positionX') + directionX));
                if (directionX < 0) {
                    directionPath += 'L';
                } else {
                    directionPath += 'R';
                }
            }

            if (this.model.get('positionY') !== this.y) {
                this.model.set('positionY', (this.model.get('positionY') + directionY));
                if (directionY < 0) {
                    directionPath += 'U';
                } else {
                    directionPath += 'D';
                }
            }

            this.model.set('direction', directionPath);
            */
        },

        // checkPosition: function (modifier) {
        //     if ((!this.wps || this.wps.length === 0) && this.moving === false) {
        //         return;
        //     }
            
        //     var directionX = 0,
        //         directionY = 0,
        //         directionPath = '',
        //         speed = this.model.get('speed') * modifier;

        //     if (!this.moving) {
        //         this.currentWp = this.wps.shift();
        //     }

        //     if (this.currentWp.row * this.model.get('width') < this.model.get('positionX')) {
        //         directionX = -speed;
        //     } else if (this.currentWp.row * this.model.get('width') > this.model.get('positionX')) {
        //         directionX = speed;
        //     }

        //     if (this.currentWp.col * this.model.get('height') < this.model.get('positionY')) {
        //         directionY = -speed;
        //     } else if (this.currentWp.col * this.model.get('height') > this.model.get('positionY')) {
        //         directionY = speed;
        //     }

        //     this.moving = true;
        //     if (this.model.get('positionX') !== (this.currentWp.row * this.model.get('width'))) {
        //         this.model.set('positionX', (this.model.get('positionX') + directionX));
        //         if (directionX < 0) {
        //             directionPath += 'L';
        //         } else {
        //             directionPath += 'R';
        //         }
        //     }

        //     if (this.model.get('positionY') !== (this.currentWp.col * this.model.get('height'))) {
        //         this.model.set('positionY', (this.model.get('positionY') + directionY));
        //         if (directionY < 0) {
        //             directionPath += 'U';
        //         } else {
        //             directionPath += 'D';
        //         }
        //     }

        //     this.model.set('direction', directionPath);

        //     if (this.model.get('positionY') === (this.currentWp.col * this.model.get('height')) &&
        //         this.model.get('positionX') === (this.currentWp.row * this.model.get('width'))
        //     ) {
        //         this.moving = false;
        //     }
        // },

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

            switch (this.model.get('direction')) {
                case 'L':
                    window.battlefield.ctx.rotate(Math.PI / 2);
                    break;
                case 'R':
                    window.battlefield.ctx.rotate(-Math.PI / 2);
                    break;
                case 'U':
                    window.battlefield.ctx.rotate(Math.PI);
                    break;
                case 'D':
                    window.battlefield.ctx.rotate(2 * Math.PI);
                    break;
                case 'LU':
                    window.battlefield.ctx.rotate(3/4 * Math.PI);
                    break;
                case 'LD':
                    window.battlefield.ctx.rotate(Math.PI / 4);
                    break;
                case 'RU':
                    window.battlefield.ctx.rotate(-3/4 * Math.PI);
                    break;
                case 'RD':
                    window.battlefield.ctx.rotate(-Math.PI / 4);
                    break;
                default:
                    window.battlefield.ctx.rotate(2 * Math.PI);
            }

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