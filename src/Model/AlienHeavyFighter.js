define(function () {
    var Model = Model || {};
    Model.AlienHeavyFighter = Backbone.Model.extend({
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
            type: 'alienHeavyFighter',
            soundDestroy: 'sounds/boom.mp3',
            soundHit: 'sounds/hit.mp3'
        },
        initialize: function () {
            this.set('weapons', [
                {
                    coordX: -15,
                    coordY: -10,
                    firerange: SCOUT_FIRERANGE,
                    firespeed: SCOUT_FIRESPEED,
                    firepower: 2 * SCOUT_FIREPOWER,
                    firefrequence: 1000,
                    sound: 'sounds/laser.mp3',
                    type: 'doublelaser',
                    width: 25,
                    height: 25
                },
                {
                    coordX: 15,
                    coordY: -10,
                    firerange: SCOUT_FIRERANGE,
                    firespeed: SCOUT_FIRESPEED,
                    firepower: 2 * SCOUT_FIREPOWER,
                    firefrequence: 1000,
                    sound: 'sounds/laser.mp3',
                    type: 'doublelaser',
                    width: 25,
                    height: 25
                }
            ])
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

    return Model.AlienHeavyFighter;
});