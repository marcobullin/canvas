define(function () {
    var Model = Model || {};
    Model.HumanLightFighter = Backbone.Model.extend({
        defaults: {
            width: 50,
            height: 50,
            currentArmor:  100,
            maxArmor:  100,
            currentShield: 100,
            maxShield: 100,
            speed: SCOUT_SPEED,
            isAttackable: true,
            type: 'lightFighter',
            soundDestroy: 'sounds/boom.mp3',
            soundHit: 'sounds/hit.mp3'
        },

        initialize: function () {
            this.set('weapons', [
                {
                    coordX: -15,
                    coordY: 0,
                    firerange: SCOUT_FIRERANGE,
                    firespeed: SCOUT_FIRESPEED,
                    firepower: SCOUT_FIREPOWER,
                    sound: 'sounds/laser.mp3',
                    type: 'laser',
                    width: 20,
                    height: 20
                },
                {
                    coordX: 15,
                    coordY: 0,
                    firerange: SCOUT_FIRERANGE,
                    firespeed: SCOUT_FIRESPEED,
                    firepower: SCOUT_FIREPOWER,
                    sound: 'sounds/laser.mp3',
                    type: 'laser',
                    width: 20,
                    height: 20
                }
            ]);
        }
    });

    return Model.HumanLightFighter;
});