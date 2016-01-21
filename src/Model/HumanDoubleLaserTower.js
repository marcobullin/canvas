define(function () {
    var Model = Model || {};
    Model.HumanDoubleLaserTower = Backbone.Model.extend({
        defaults: {
            width: 30,
            height: 30,
            originalWidth: 100,
            originalHeight: 100,
            currentArmor:  50,
            maxArmor:  50,
            currentShield: 100,
            maxShield: 100,
            speed: 0,
            isAttackable: true,
            isUnit: true,
            price: 100,
            headMoney: 40,
            type: 'laserTower',
            soundDestroy: 'sounds/boom.mp3',
            soundHit: 'sounds/hit.mp3'
        },

        initialize: function () {
            this.set('weapons', [
                {
                    coordX: 0,
                    coordY: 0,
                    firerange: SCOUT_FIRERANGE,
                    firespeed: SCOUT_FIRESPEED,
                    firepower: 2 * SCOUT_FIREPOWER,
                    firefrequence: 1000,
                    sound: 'sounds/laser.mp3',
                    type: 'doublelaser',
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
                    delete follower[i];
                }
            }

            this.set('follower', follower);
        }
    });

    return Model.HumanDoubleLaserTower;
});