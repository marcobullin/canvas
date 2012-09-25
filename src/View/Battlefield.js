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

        game: null,

        canvas: null,

        ctx: null,

        events: {
            'tap canvas': 'onClick',
            'tap #items': 'onClickItems',
            'tap .cancel': 'onCancel'
        },

        initialize: function (game) {
            this.game = game;

            _.bindAll(this, 'onClick', 'updateDrawings');

            this.canvas = document.createElement('canvas');
            this.canvas.width = 1500;//window.outerWidth;
            this.canvas.height = 1000;//window.outerHeight;

            this.ctx = this.canvas.getContext('2d');
            $('#game_map').html(this.canvas);
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
                    model: this.building,
                    game: this.game
                });

                this.add(tower);
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

            if (model.get('price') > this.game.user.model.get('money')) {
                alert('Not enought Money');
                return;
            }

            this.game.user.model.set('money', this.game.user.model.get('money') - model.get('price'));

            $('#items').hide();
            $('#info').show();
            model.set('id', ++this.game.idCounter);
            this.building = model;
        },

        onCancel: function () {
            this.game.user.model.set('money', this.game.user.model.get('money') + this.building.get('price'));
            this.building = null;

            $('#items').show();
            $('#info').hide();
        },

        updateDrawings: function () {
            var newTimestamp = Date.now(),
                delta = newTimestamp - this.game.timestamp,
                modifier = delta / 1000,
                i;

            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            for (i in this.items) {
                if (this.items.hasOwnProperty(i)) {
                    this.items[i].draw(modifier);
                }
            }

            for (i in this.objects) {
                if (this.objects.hasOwnProperty(i)) {
                    this.objects[i].draw(modifier);
                }
            }

            this.game.timestamp = newTimestamp;

            requestAnimationFrame(this.updateDrawings);
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