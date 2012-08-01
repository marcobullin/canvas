define(function () {
    var Vehicle = Backbone.View.extend({
        action: null,
        img: null,
        done: false,
        dieSound: null,

        getWayPoints: function (goalX, goalY) {
            var x,
                y,
                i,
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
                    for (i = 0; i < window.battlefield.items.length; i++) {
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

        move: function (x, y) {
            x = Math.floor(x / 50);
            x *= 50;

            y = Math.floor(y / 50);
            y *= 50;


            clearInterval(this.action);

            var wps = this.getWayPoints(x, y),
                moving = false,
                self = this,
                currentWps;

            this.action = setInterval(function () {
                if ((!wps || wps.length === 0) && moving === false) {
                    clearInterval(self.action);
                    return;
                }

                if (!moving) {
                    currentWps = wps.shift();
                }

                var directionX, directionY;
                if (currentWps.row * self.model.get('width') < self.model.get('positionX')) {
                    directionX = -self.model.get('speed');
                } else if (currentWps.row * self.model.get('width') > self.model.get('positionX')) {
                    directionX = self.model.get('speed');
                } else {
                    directionX = 0;
                }

                if (currentWps.col * self.model.get('height') < self.model.get('positionY')) {
                    directionY = -self.model.get('speed');
                } else if (currentWps.col * self.model.get('height') > self.model.get('positionY')) {
                    directionY = self.model.get('speed');
                } else {
                    directionY = 0;
                }

                var directionPath = '';

                moving = true;
                if (self.model.get('positionX') !== (currentWps.row * self.model.get('width'))) {
                    self.model.set('positionX', (self.model.get('positionX') + directionX));
                    if (directionX < 0) {
                        directionPath += 'L';
                    } else {
                        directionPath += 'R';
                    }
                }

                if (self.model.get('positionY') !== (currentWps.col * self.model.get('height'))) {
                    self.model.set('positionY', (self.model.get('positionY') + directionY));
                    if (directionY < 0) {
                        directionPath += 'U';
                    } else {
                        directionPath += 'D';
                    }
                }

                self.model.set('direction', directionPath);

                if (self.model.get('positionY') === (currentWps.col * self.model.get('height')) &&
                    self.model.get('positionX') === (currentWps.row * self.model.get('width'))
                ) {
                    moving = false;
                }
            }, 10);
        },

        destroy: function () {
            if (!this.dieSound) {
                this.dieSound = new Audio(this.model.get('sound').die);
            }

            this.dieSound.play();
            window.battlefield.remove(this.model.get('id'));
        },

        render: function () {
            if (!this.model.get('id')) {
                this.model.set('id', Math.ceil(Math.random() * 99999999999 * new Date().getTime()));
            }

            var live = this.model.get('width') / 100 * this.model.get('protection');

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

            var x = (-1 * this.model.get('width') / 2),
                y = (-1 * this.model.get('height') / 2);

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