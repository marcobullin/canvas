define(function () {
    var Battlefield = Backbone.View.extend({
        el: 'body',

        items: [],
        objects: [],

        selectedItems: [],

        events: {
            'tap canvas': 'onClick'
        },

        initialize: function () {
            var canvas = document.createElement('canvas'),
                ctx = canvas.getContext('2d');

            canvas.width = BATTLEFIELD_WIDTH;
            canvas.height = BATTLEFIELD_HEIGHT;
            canvas.style.zIndex = 0;
            canvas.style.position = 'absolute';

            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, BATTLEFIELD_WIDTH, BATTLEFIELD_HEIGHT);

            this.el.appendChild(canvas);
            _.bindAll(this, 'onClick');
        },

        add: function (item) {
            this.items.push(item);
            item.draw();
        },

        addObject: function (obj) {
            this.objects.push(obj);
            obj.draw();
        },

        onClick: function (event) {
            var x = event.clientX + window.scrollX,
                y = event.clientY + window.scrollY,
                i, j,
                clickedAnItem = false;

            for (i = 0; i < this.items.length; i++) {

                // AN UNIT WAS CLICKED
                if (x >= this.items[i].model.get('positionX') &&
                    x <= (this.items[i].model.get('positionX') + this.items[i].model.get('width')) &&
                    y >= this.items[i].model.get('positionY') &&
                    y <= (this.items[i].model.get('positionY') + this.items[i].model.get('height'))
                ) {

                    if ('user' !== this.items[i].model.get('owner')) {
                        // MOVE AND ATTACK
                        if (this.selectedItems.length > 0) {
                            for (j in this.selectedItems) {
                                if (this.selectedItems[j].model.get('follow')) {
                                    var enemy = this.selectedItems[j].model.get('follow');
                                    enemy.removeFollower(this.selectedItems[j].model);
                                }

                                this.selectedItems[j].model.set('follow', this.items[i].model);
                                this.items[i].model.addFollower(this.selectedItems[j].model);

                                this.selectedItems[j].model.trigger('follow', this.items[i].model);
                            }
                            clickedAnItem = true;
                            //return;
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

                        $('#action_bar').attr('data-unitid', this.items[i].model.get('id'));
                        $('#spaceship').attr('src', window.GameImages[this.items[i].model.get('type')].src);
                        $('#spaceship').attr('width', this.items[i].model.get('originalWidth'));
                        $('#spaceship').attr('height', this.items[i].model.get('originalHeight'));
                        $('#spaceship').show();

                        var weapons = this.items[i].model.get('weapons'),
                            index,
                            html = [];
                        for (index in weapons) {
                            html.push('<li><img width="25" height="25" src="' + window.GameImages[weapons[index].type].src + '"></li>');
                        }

                        $('#weapons').html(html.join('')).show();
                        var armor = 100 - (this.items[i].model.get('currentArmor') / this.items[i].model.get('maxArmor') * 100);
                        $('#currentArmor').css({height: armor});
                        $('#armor').show();

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
                    if (this.selectedItems[j].model.get('follow')) {
                        var enemy = this.selectedItems[j].model.get('follow');
                        enemy.removeFollower(this.selectedItems[j].model);
                        this.selectedItems[j].model.set('follow', null);
                    }

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
            this.canvas.style.zIndex = 1;
            this.canvas.style.position = 'absolute';

            this.el.appendChild(this.canvas);
        },

        update: function () {
            var now = Date.now(),
                delta = now - then,
                modifier = delta / 1000,
                i;

            window.battlefield.ctx.clearRect(0, 0, BATTLEFIELD_WIDTH, BATTLEFIELD_HEIGHT);

            for (i in window.battlefield.objects) {
                if (window.battlefield.objects.hasOwnProperty(i)) {
                    window.battlefield.objects[i].draw(modifier);
                }
            }

            for (i in window.battlefield.items) {
                if (window.battlefield.items.hasOwnProperty(i)) {
                    window.battlefield.items[i].draw(modifier);
                }
            }

            then = now;
            requestAnimationFrame(window.battlefield.update);
        },


        remove: function (id) {
            for (var i = 0; i < this.items.length; i++) {
                if (id === this.items[i].model.get('id')) {
                    this.items.splice(i, 1);
                    break;
                }
            }
        },

        removeObject: function (id) {
            for (var i = 0; i < this.objects.length; i++) {
                if (id === this.objects[i].model.get('id')) {
                    this.objects.splice(i, 1);
                    break;
                }
            }
        }
    });

    return Battlefield;
});