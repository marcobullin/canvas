define(function () {
    var Model = Model || {};
    Model.HumanHeavyFighter = Backbone.Model.extend({
        defaults: {
            width: 50,
            height: 50,
            currentArmor:  100,
            maxArmor:  100,
            currentShield: 100,
            maxShield: 100,
            speed: SCOUT_SPEED,
            isAttackable: true,
            type: 'heavyFighter',
            soundDestroy: 'sounds/boom.mp3',
            soundHit: 'sounds/hit.mp3'
        },
        initialize: function () {
            this.set('weapons', [
                {
                    coordX: -17,
                    coordY: 0,
                    firerange: SCOUT_FIRERANGE,
                    firespeed: SCOUT_FIRESPEED,
                    firepower: 2 * SCOUT_FIREPOWER,
                    sound: 'sounds/laser.mp3',
                    type: 'doublelaser',
                    width: 25,
                    height: 25
                },
                {
                    coordX: 17,
                    coordY: 0,
                    firerange: SCOUT_FIRERANGE,
                    firespeed: SCOUT_FIRESPEED,
                    firepower: 2 * SCOUT_FIREPOWER,
                    sound: 'sounds/laser.mp3',
                    type: 'doublelaser',
                    width: 25,
                    height: 25
                }
            ])
        }
    });

    return Model.HumanHeavyFighter;
});