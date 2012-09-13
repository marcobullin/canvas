define(function () {
    var Model = Model || {};
    Model.AlienMothership = Backbone.Model.extend({
        defaults: {
            width: 200,
            height: 200,
            originalWidth: 100,
            originalHeight: 100,
            currentArmor:  500,
            maxArmor:  500,
            currentShield: 1000,
            maxShield: 1000,
            speed: 5,
            isAttackable: true,
            isUnit: true,
            headMoney: 400,
            type: 'alienMothership',
            soundDestroy: 'sounds/bigboom.mp3',
            soundHit: 'sounds/hit.mp3'
        },

        initialize: function () {
            this.set('weapons', [
                {
                    coordX: 45,
                    coordY: -45,
                    firerange: 2 * SCOUT_FIRERANGE,
                    firespeed: SCOUT_FIRESPEED,
                    firepower: SCOUT_FIREPOWER,
                    firefrequence: 1000,
                    type: 'laser',
                    sound: 'sounds/laser.mp3',
                    width: 30,
                    height: 30
                },
                {
                    coordX: 70,
                    coordY: -50,
                    firerange: 2 * SCOUT_FIRERANGE,
                    firespeed: SCOUT_FIRESPEED,
                    firepower: SCOUT_FIREPOWER,
                    firefrequence: 1000,
                    type: 'laser',
                    sound: 'sounds/laser.mp3',
                    width: 30,
                    height: 30
                },
                {
                    coordX: -70,
                    coordY: -50,
                    firerange: 2 * SCOUT_FIRERANGE,
                    firespeed: SCOUT_FIRESPEED,
                    firepower: SCOUT_FIREPOWER,
                    firefrequence: 1000,
                    type: 'laser',
                    sound: 'sounds/laser.mp3',
                    width: 30,
                    height: 30
                },
                {
                    coordX: -45,
                    coordY: -45,
                    firerange: 2 * SCOUT_FIRERANGE,
                    firespeed: SCOUT_FIRESPEED,
                    firepower: SCOUT_FIREPOWER,
                    firefrequence: 1000,
                    type: 'laser',
                    sound: 'sounds/laser.mp3',
                    width: 30,
                    height: 30
                },
                {
                    coordX: -50,
                    coordY: 0,
                    firerange: 2 * TANK_FIRERANGE,
                    firespeed: SCOUT_FIRESPEED / 3,
                    firepower: 10 * SCOUT_FIREPOWER,
                    firefrequence: 3000,
                    sound: 'sounds/laser.mp3',
                    type: 'rocketlauncher',
                    width: 30,
                    height: 30
                },
                {
                    coordX: 50,
                    coordY: 0,
                    firerange: 2 * TANK_FIRERANGE,
                    firespeed: SCOUT_FIRESPEED / 3,
                    firepower: 10 * SCOUT_FIREPOWER,
                    firefrequence: 3000,
                    sound: 'sounds/laser.mp3',
                    type: 'rocketlauncher',
                    width: 30,
                    height: 30
                }
            ]);
        },

        addFollower: function (enemyModel) {
            var follower = _.clone(this.get('follower')) || [];
            follower.push(enemyModel);

            this.set('follower', follower);
        },

        removeFollower: function (enemyModel) {
            var follower = _.clone(this.get('follower')) || [],
                i;

            for (i in follower) {
                if (enemyModel === follower[i]) {
                    console.log('removing...');
                    delete follower[i];
                }
            }

            this.set('follower', follower);
        }
    });

    return Model.AlienMothership;
});