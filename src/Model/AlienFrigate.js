define(function () {
    var Model = Model || {};
    Model.AlienFrigate = Backbone.Model.extend({
        defaults: {
            width: 100,
            height: 100,
            originalWidth: 100,
            originalHeight: 100,
            currentArmor:  200,
            maxArmor:  200,
            currentShield: 500,
            maxShield: 500,
            speed: TANK_SPEED / 2,
            isAttackable: true,
            isUnit: true,
            type: 'alienFrigate',
            soundDestroy: 'sounds/bigboom.mp3',
            soundHit: 'sounds/hit.mp3'
        },

        initialize: function () {
            this.set('weapons', [
                // {
                //     coordX: -25,
                //     coordY: -30,
                //     firerange: TANK_FIRERANGE,
                //     firespeed: TANK_FIRESPEED,
                //     firepower: TANK_FIREPOWER,
                //     firefrequence: 1000,
                //     type: 'cannon',
                //     sound: 'sounds/laser.mp3',
                //     width: 30,
                //     height: 30
                // },
                // {
                //     coordX: 25,
                //     coordY: -30,
                //     firerange: TANK_FIRERANGE,
                //     firespeed: TANK_FIRESPEED,
                //     firepower: TANK_FIREPOWER,
                //     firefrequence: 1000,
                //     type: 'cannon',
                //     sound: 'sounds/laser.mp3',
                //     width: 30,
                //     height: 30
                // },
                {
                    coordX: -25,
                    coordY: -30,
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
                    coordX: 25,
                    coordY: -30,
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
                    coordX: 30,
                    coordY: 15,
                    firerange: SCOUT_FIRERANGE,
                    firespeed: SCOUT_FIRESPEED,
                    firepower: SCOUT_FIREPOWER,
                    firefrequence: 1000,
                    type: 'laser',
                    sound: 'sounds/laser.mp3',
                    width: 25,
                    height: 25
                },
                {
                    coordX: -30,
                    coordY: 15,
                    firerange: SCOUT_FIRERANGE,
                    firespeed: SCOUT_FIRESPEED,
                    firepower: SCOUT_FIREPOWER,
                    firefrequence: 1000,
                    type: 'laser',
                    sound: 'sounds/laser.mp3',
                    width: 25,
                    height: 25
                },
                {
                    coordX: 15,
                    coordY: 15,
                    firerange: SCOUT_FIRERANGE,
                    firespeed: SCOUT_FIRESPEED,
                    firepower: SCOUT_FIREPOWER,
                    firefrequence: 1000,
                    type: 'laser',
                    sound: 'sounds/laser.mp3',
                    width: 25,
                    height: 25
                },
                {
                    coordX: -15,
                    coordY: 15,
                    firerange: SCOUT_FIRERANGE,
                    firespeed: SCOUT_FIRESPEED,
                    firepower: SCOUT_FIREPOWER,
                    firefrequence: 1000,
                    type: 'laser',
                    sound: 'sounds/laser.mp3',
                    width: 25,
                    height: 25
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

    return Model.AlienFrigate;
});