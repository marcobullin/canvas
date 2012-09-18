define(function () {
    var Model = Model || {};
    Model.AlienLightFighter = Backbone.Model.extend({
        defaults: {
            width: 50,
            height: 50,
            originalWidth: 100,
            originalHeight: 100,
            currentArmor:  100,
            maxArmor:  100,
            currentShield: 100,
            maxShield: 100,
            speed: SCOUT_SPEED,
            isAttackable: true,
            isUnit: true,
            headMoney: 25,
            type: 'alienLightFighter',
            soundDestroy: 'sounds/boom.mp3',
            soundHit: 'sounds/hit.mp3'
        },

        initialize: function () {
            this.set('weapons', [
                {
                    coordX: -7,
                    coordY: -5,
                    firerange: SCOUT_FIRERANGE,
                    firespeed: SCOUT_FIRESPEED,
                    firepower: SCOUT_FIREPOWER,
                    firefrequence: 1000,
                    sound: 'sounds/laser.mp3',
                    type: 'laser',
                    width: 20,
                    height: 20
                },
                {
                    coordX: 7,
                    coordY: -5,
                    firerange: SCOUT_FIRERANGE,
                    firespeed: SCOUT_FIRESPEED,
                    firepower: SCOUT_FIREPOWER,
                    firefrequence: 1000,
                    sound: 'sounds/laser.mp3',
                    type: 'laser',
                    width: 20,
                    height: 20
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
                    delete follower[i];
                }
            }

            this.set('follower', follower);
        }
    });

    return Model.AlienLightFighter;
});