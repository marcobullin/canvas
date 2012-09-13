define(function () {
    var Model = Model || {};
    Model.HumanMissileTower = Backbone.Model.extend({
        defaults: {
            width: 40,
            height: 40,
            originalWidth: 100,
            originalHeight: 100,
            currentArmor:  70,
            maxArmor:  70,
            currentShield: 100,
            maxShield: 100,
            speed: 0,
            isAttackable: true,
            isUnit: true,
            price: 150,
            headMoney: 60,
            type: 'laserTower',
            soundDestroy: 'sounds/boom.mp3',
            soundHit: 'sounds/hit.mp3'
        },

        initialize: function () {
            this.set('weapons', [
                {
                    coordX: 0,
                    coordY: 0,
                    firerange: 2 * TANK_FIRERANGE,
                    firespeed: SCOUT_FIRESPEED / 3,
                    firepower: 10 * SCOUT_FIREPOWER,
                    firefrequence: 3000,
                    sound: 'sounds/laser.mp3',
                    type: 'rocketlauncher',
                    width: 40,
                    height: 40
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

    return Model.HumanMissileTower;
});