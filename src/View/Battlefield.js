define([
    'Model/HumanLaserTower',
    'Model/HumanDoubleLaserTower',
    'Model/HumanBigLaserTower',
    'Model/HumanMissileTower',
    'View/Tower'
    ], function (HumanLaserTower, HumanDoubleLaserTower, HumanBigLaserTower, HumanMissileTower, Tower) {
    var Battlefield = Backbone.View.extend({
        el: 'body',

        items: [],
        objects: [],

        selectedItem: null,

        events: {
            'tap canvas': 'onClick',
            'tap #items': 'onClickItems',
            'tap .cancel': 'onCancel'
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

            if (this.building) {
                this.building.set('positionX', x - this.building.get('width') / 2);
                this.building.set('positionY', y - this.building.get('height') / 2);
                this.building.set('owner', 'user');

                var tower = new Tower({
                    model: this.building
                });

                window.battlefield.add(tower);
                this.building = null;

                $('#items').show();
                $('#info').hide();
                return;
            }

            for (i = 0; i < this.items.length; i++) {

                // AN UNIT WAS CLICKED
                if (x >= this.items[i].model.get('positionX') &&
                    x <= (this.items[i].model.get('positionX') + this.items[i].model.get('width')) &&
                    y >= this.items[i].model.get('positionY') &&
                    y <= (this.items[i].model.get('positionY') + this.items[i].model.get('height'))
                ) {

                    if ('user' !== this.items[i].model.get('owner')) {
                        /**
                         * MOVE AND ATTACK
                         */
                        if (this.selectedItem) {
                            if (this.selectedItem.model.get('follow')) {
                                var enemy = this.selectedItem.model.get('follow');
                                enemy.removeFollower(this.selectedItem.model);
                            }

                            var minusX = Math.round(Math.random()),
                                minusY = Math.round(Math.random());
                            this.selectedItem.model.set('follow', this.items[i].model);
                            this.selectedItem.model.set('distanceX', Math.random() * (minusX ? -1 : 1) * 200 + this.items[i].model.get('width'));
                            this.selectedItem.model.set('distanceY', Math.random() * (minusY ? -1 : 1) * 200 + this.items[i].model.get('width'));
                            this.items[i].model.addFollower(this.selectedItem.model);

                            this.selectedItem.model.trigger('follow', this.items[i].model);

                            clickedAnItem = true;
                        }
                        break;
                    }

                    /**
                     * SELECT AN UNIT
                     */

                    // deselect previous item
                    if (this.selectedItem) {
                        this.selectedItem.model.set('selected', false);
                        this.selectedItem = null;
                    }

                    this.selectedItem = this.items[i];
                    this.items[i].model.set('selected', true);
                    clickedAnItem = true;

                    /**
                     * RENDER FOR STATUSBAR
                     */

                    $('#status_bar').attr('data-unitid', this.items[i].model.get('id'));
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
                    break;
                }
            }

            /**
             * MOVE TO CLICKED POSITION
             */
            if (this.selectedItem && false === clickedAnItem) {
                if (this.selectedItem.model.get('follow')) {
                    var enemy = this.selectedItem.model.get('follow');
                    enemy.removeFollower(this.selectedItem.model);
                    this.selectedItem.model.set('follow', null);
                }

                this.selectedItem.move(x, y);
            }
        },

        onClickItems: function (event) {
            var li = $(event.target).closest('li.tower'),
                type = li.attr('data-type'),
                model;

            switch (type) {
                case 'laserTower':
                    model = new HumanLaserTower();
                    break;
                case 'doublelaserTower':
                    model = new HumanDoubleLaserTower();
                    break;
                case 'biglaserTower':
                    model = new HumanBigLaserTower();
                    break;
                case 'missileTower':
                    model = new HumanMissileTower();
                    break;
            }

            if (model.get('price') > window.Global.user.model.get('money')) {
                alert('Not enought Money');
                return;
            }

            window.Global.user.model.set('money', window.Global.user.model.get('money') - model.get('price'));

            $('#items').hide();
            $('#info').show();
            model.set('id', ++window.counter);
            this.building = model;
        },

        onCancel: function () {
            window.Global.user.model.set('money', window.Global.user.model.get('money') + this.building.get('price'));
            this.building = null;

            $('#items').show();
            $('#info').hide();
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