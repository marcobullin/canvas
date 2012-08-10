define(function () {
    var Battlefield = Backbone.View.extend({
        el: 'body',

        items: [],

        selectedItems: [],

        events: {
            'click canvas': 'onClick'
        },

        initialize: function () {
            _.bindAll(this, 'onClick');
        },

        add: function (item) {
            this.items.push(item);
            item.render();
        },

        onClick: function (event) {
            var x = event.clientX,
                y = event.clientY,
                i, j,
                clickedAnItem = false;

            for (i = 0; i < this.items.length; i++) {
                if (x >= this.items[i].model.get('positionX') &&
                    x <= (this.items[i].model.get('positionX') + this.items[i].model.get('width')) &&
                    y >= this.items[i].model.get('positionY') &&
                    y <= (this.items[i].model.get('positionY') + this.items[i].model.get('height'))
                ) {

                    if ('user' !== this.items[i].model.get('owner')) {
                        // MOVE AND ATTACK
                        if (this.selectedItems.length > 0) {
                            for (j in this.selectedItems) {
                                this.selectedItems[j].model.set('attackEnemy', this.items[i].model.get('id'));
                                // move to enemy and attack them
                                this.selectedItems[j].moveAndAttack(this.items[i]);
                            }
                            return;
                        }

                    // SELECT AN UNIT
                    } else {
                        // deselect previous item
                        if (this.selectedItems.length > 0 && ! (17 in window.Global.keysDown)) {
                            for (j in this.selectedItems) {
                                //this.selectedItems[j].model.set('attackEnemy', false);
                                this.selectedItems[j].model.set('selected', false);
                                delete this.selectedItems[j];
                            }
                        }

                        this.selectedItems.push(this.items[i]);
                        this.items[i].model.set('selected', true);
                        clickedAnItem = true;
                        break;
                    }
                }
            }

            // MOVE
            if (this.selectedItems.length > 0 && false === clickedAnItem) {
                

                for (j in this.selectedItems) {
                    var yh = y -50,
                    xh = x -50;
                    this.selectedItems[j].model.set('attackEnemy', false);
                    this.selectedItems[j].move(x, y);

                    // BLOCK FORMATION
                    if (j % 2) {
                        y+=50;
                        x-=50;
                    } else {
                        x+=50;
                    }

                    if (y > BATTLEFIELD_HEIGHT) {
                        yh -= 50;
                        y = yh;
                    }

                    if (x > BATTLEFIELD_WIDTH) {
                        xh += 50;
                        x = xh;
                    }
                }
            }
        },

        render: function () {
            this.canvas = document.createElement('canvas'),
            this.ctx = this.canvas.getContext('2d');

            this.canvas.width = BATTLEFIELD_WIDTH;
            this.canvas.height = BATTLEFIELD_HEIGHT;

            this.el.appendChild(this.canvas);
        },

        update: function () {
            var now = Date.now(),
                delta = now - then,
                modifier = delta / 1000;

            window.battlefield.ctx.drawImage(window.GameImages['map'], 0, 0, BATTLEFIELD_WIDTH, BATTLEFIELD_HEIGHT);

            for (var i = 0; i < this.items.length; i++) {
                this.items[i].render(modifier);
            }

            then = now;
        },

        remove: function (id) {
            for (var i = 0; i < this.items.length; i++) {
                if (id === this.items[i].model.get('id')) {
                    this.items.splice(i, 1);
                    break;
                }
            }
        }
    });

    return Battlefield;
});