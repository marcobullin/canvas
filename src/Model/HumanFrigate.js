define(function () {
    var Model = Model || {};
    Model.HumanFrigate = Backbone.Model.extend({
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
            type: 'frigate',
            soundDestroy: 'sounds/bigboom.mp3',
            soundHit: 'sounds/hit.mp3'
        },

        initialize: function () {
            this.set('weapons', [
                // {
                //     coordX: -30,
                //     coordY: -38,
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
                //     coordX: 30,
                //     coordY: -38,
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
                    coordX: 0,
                    coordY: -38,
                    firerange: SCOUT_FIRERANGE,
                    firespeed: SCOUT_FIRESPEED,
                    firepower: 2 * SCOUT_FIREPOWER,
                    firefrequence: 1000,
                    type: 'doublelaser',
                    sound: 'sounds/laser.mp3',
                    width: 25,
                    height: 25
                },
                {
                    coordX: 0,
                    coordY: 45,
                    firerange: SCOUT_FIRERANGE,
                    firespeed: SCOUT_FIRESPEED,
                    firepower: 2 * SCOUT_FIREPOWER,
                    firefrequence: 1000,
                    type: 'doublelaser',
                    sound: 'sounds/laser.mp3',
                    width: 25,
                    height: 25
                },
                {
                    coordX: 30,
                    coordY: -38,
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
                    coordX: -30,
                    coordY: -38,
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

    return Model.HumanFrigate;
});