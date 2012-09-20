define(
    [
        'images',
        'levels',
        'View/Battlefield',
        'Model/User',
        'View/User',
        'Model/HumanDestroyer',
        'Model/HumanFrigate',
        'Model/HumanHeavyFighter',
        'Model/HumanLightFighter',
        'Model/HumanMothership',
        'Model/AlienLightFighter',
        'Model/AlienHeavyFighter',
        'Model/AlienFrigate',
        'Model/AlienDestroyer',
        'Model/AlienMothership',
        'View/SpaceShip'
    ],
    function (
        images,
        levels,
        Battlefield,
        UserModel,
        UserView,
        HumanDestroyer,
        HumanFrigate,
        HumanHeavyFighter,
        HumanLightFighter,
        HumanMothership,
        AlienLightFighter,
        AlienHeavyFighter,
        AlienFrigate,
        AlienDestroyer,
        AlienMothership,
        SpaceShip
    ) {
        var EarthDefense = EarthDefense || {};
        EarthDefense.Game = Backbone.View.extend({
            el: 'body',

            loadedImages: {},

            currentLevel: 1,

            idCounter: 0,

            user: null,

            timestamp: null,

            events: {
                'tap .start_game': 'onStartGame',
                'tap .play': 'onPlay',
                'tap .cancel': 'onCancel'
            },

            initialize: function () {
                _.bindAll(this, 'showMission', 'onGameEvent', 'onWin', 'onLose');
                this._loadImages();

                $('body').on('check_goal', this.onGameEvent);

                // PLAYER
                var userModel = new UserModel();
                this.user = new UserView({
                    model: userModel
                });
                userModel.set('money', 100);

                this.battlefield = new Battlefield(this);
            },

            _loadImages: function () {
                var i,
                    img,
                    counter = 0,
                    self = this,
                    loading = $('#loading');

                for (i = 0; i < images.length; i++) {
                    img = new Image();
                    img.src = images[i].src;

                    img.onload = function (i) {
                        counter += 1;

                        self.loadedImages[images[i].key] = img;
                        loading.html(counter / images.length * 100 + '%');

                        if (counter === images.length) {
                            loading.fadeOut('slow', self.showMainMenu);
                        }
                    }(i);
                }
            },

            getImage: function (imageKey) {
                if (!this.loadedImages.hasOwnProperty(imageKey)) {
                    throw new Error('Unknown image key "' + imageKey + '"');
                }

                return this.loadedImages[imageKey];
            },

            showMainMenu: function () {
                $('#main_menu').fadeIn('slow');
            },

            onStartGame: function () {
                $('#main_menu').fadeOut('slow', this.showMission);
            },

            createUnit: function (unit, owner) {
                var model,
                    spacecship;

                switch (unit.spaceship) {
                    case 'destroyer':
                        model = new HumanDestroyer();
                        break;
                    case 'frigate':
                        model = new HumanFrigate();
                        break;
                    case 'heavyFighter':
                        model = new HumanHeavyFighter();
                        break;
                    case 'lightFighter':
                        model = new HumanLightFighter();
                        break;
                    case 'mothership':
                        model = new HumanMothership();
                        break;
                    case 'alienLightFighter':
                        model = new AlienLightFighter();
                        break;
                    case 'alienHeavyFighter':
                        model = new AlienHeavyFighter();
                        break;
                    case 'alienFrigate':
                        model = new AlienFrigate();
                        break;
                    case 'alienDestroyer':
                        model = new AlienDestroyer();
                        break;
                    case 'alienMothership':
                        model = new AlienMothership();
                        break;
                }

                model.set('id', ++this.idCounter);
                model.set('positionX', unit.x);
                model.set('positionY', unit.y);
                model.set('destinationPositionX', unit.x);
                model.set('destinationPositionY', unit.y);
                model.set('owner', owner);

                spacecship = new SpaceShip({
                    model: model,
                    game: this
                });

                return spacecship;
            },

            showMission: function () {
                $('#game_area').hide();
                $('#description').html(levels[this.currentLevel].desc.main);
                $('#goals').html(levels[this.currentLevel].desc.goals.join('<br/>'));
                $('#hints').html(levels[this.currentLevel].desc.hints.join('<br/>'));
                $('#mission').fadeIn('slow');
            },

            onPlay: function () {
                $('#mission').fadeOut('slow');
                this.battlefield.items = [];
                this.battlefield.objects = [];
                this.idCounter = 0;
                window.clearInterval(this.action);

                this.timestamp = Date.now();
                this.battlefield.updateDrawings();

                var spaceship,
                    self = this,
                    i;

                // USER UNITS
                for (i = 0; i < levels[this.currentLevel].usersUnits.length; i += 1) {
                    spaceship = this.createUnit(levels[this.currentLevel].usersUnits[i], 'user');
                    this.battlefield.add(spaceship);
                }

                // ALIEN UNITS
                for (i = 0; i < levels[this.currentLevel].alienUnits.length; i += 1) {
                    spaceship = this.createUnit(levels[this.currentLevel].alienUnits[i], 'computer');
                    this.battlefield.add(spaceship);
                    spaceship.move(levels[this.currentLevel].alienUnits[i].dx, levels[this.currentLevel].alienUnits[i].dy);
                }

                $('#game_area').fadeIn('slow');

                var randX,
                    randY;
                this.action = setInterval(function () {
                    for (i in self.battlefield.items) {
                        if (!self.battlefield.items.hasOwnProperty(i)) {
                            continue;
                        }

                        if (self.battlefield.items[i].model.get('isUnit') && self.battlefield.items[i].model.get('isAttackable') && self.battlefield.items[i].model.get('owner') === 'computer') {
                            randX = Math.round(Math.random() * 1400);
                            randY = Math.round(Math.random() * 800);
                            self.battlefield.items[i].move(randX, randY);
                        }
                    }
                }, 10000);
            },

            onCancel: function () {
                $('#mission').fadeOut('slow', this.showMainMenu);
            },

            onLose: function () {
                console.log('You Lose');
            },

            onWin: function () {
                console.log('You Win');
                this.currentLevel++;
                this.showMission();
                return;
            },

            onGameEvent: function (event, model) {
                var owner = model.get('owner'),
                    goal = levels[this.currentLevel].goal,
                    humansLeft = [],
                    aliensLeft = [],
                    towersLeft = false,
                    unit,
                    i;

                // if users mothership is destroyed -> game over
                if (owner === 'user' && model.get('type') === 'mothership') {
                    $('body').trigger('stop_scanning_for_enemies');
                    $('#game_area').fadeOut('slow', this.onLose);
                    return;
                }

                for (i in this.battlefield.items) {
                    if (this.battlefield.items.hasOwnProperty(i)) {
                        unit = this.battlefield.items[i].model;

                        if (unit.get('type') === 'missile') {
                            continue;
                        }

                        if (unit.get('owner') === 'user') {
                            humansLeft.push(unit);
                            continue;
                        }

                        aliensLeft.push(unit);
                    }
                }

                // USER LOST ALL UNITS
                if (humansLeft.length === 0) {
                    $('body').trigger('stop_scanning_for_enemies');
                    $('#game_area').fadeOut('slow', this.onLose);
                    return;
                }

                /**
                 * GOAL DESTROY ALL DEFENSE TOWERS
                 */
                if (goal === 'destroy_towers') {
                    for (i in aliensLeft) {
                        if (aliensLeft.hasOwnProperty(i)) {
                            if (aliensLeft[i].get('type') === 'alienLaserTower' ||
                                aliensLeft[i].get('type') === 'alienDoubleLaserTower' ||
                                aliensLeft[i].get('type') === 'alienBigLaserTower' ||
                                aliensLeft[i].get('type') === 'alienMissileTower'
                            ) {
                                towersLeft = true;
                                break;
                            }
                        }
                    }

                    if (towersLeft === false) {
                        $('body').trigger('stop_scanning_for_enemies');
                        $('#game_area').fadeOut('slow', this.onWin);
                    }

                    return;
                }

                /**
                 * GOAL DESTROY THE ALIEN DESTROYER
                 */
                if (goal === 'destroy_destroyer') {
                    if (model.get('type') === 'alienDestroyer') {
                        $('body').trigger('stop_scanning_for_enemies');
                        $('#game_area').fadeOut('slow', this.onWin);
                    }
                    return;
                }

                /**
                 * GOAL DESTROY THE ALIEN DESTROYER
                 */
                if (goal === 'destroy_frigate') {
                    if (model.get('type') === 'alienFrigate') {
                        $('body').trigger('stop_scanning_for_enemies');
                        $('#game_area').fadeOut('slow', this.onWin);
                    }
                    return;
                }

                /**
                 * GOAL DESTROY ALL ENEMIES
                 */
                if (goal === 'destroy_all') {
                    if (aliensLeft.length === 0) {
                        $('body').trigger('stop_scanning_for_enemies');
                        $('#game_area').fadeOut('slow', this.onWin);
                    }

                    return;
                }
            }
        });
        return EarthDefense.Game;
    }
);