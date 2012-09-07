define(function () {
    var Model = Model || {};
    Model.HumanDestroyer = Backbone.Model.extend({
        defaults: {
            width:  100,
            height: 50,
            currentArmor:  200,
            maxArmor:  200,
            currentShield: 500,
            maxShield: 500,
            speed:  40,
            isAttackable: true,
            type: 'destroyer',
            soundDestroy: 'sounds/bigboom.mp3',
            soundHit: 'sounds/hit.mp3'
        },

        initialize: function () {
            this.set('weapons', [
                {
                    coordX: -34,
                    coordY: -10,
                    firerange: SCOUT_FIRERANGE,
                    firespeed: SCOUT_FIRESPEED,
                    firepower: SCOUT_FIREPOWER,
                    type: 'doublelaser',
                    sound: 'sounds/laser.mp3',
                    width: 25,
                    height: 25
                },
                {
                    coordX: -15,
                    coordY: -11,
                    firerange: SCOUT_FIRERANGE,
                    firespeed: SCOUT_FIRESPEED,
                    firepower: SCOUT_FIREPOWER,
                    type: 'doublelaser',
                    sound: 'sounds/laser.mp3',
                    width: 25,
                    height: 25
                },
                {
                    coordX: 15,
                    coordY: -11,
                    firerange: SCOUT_FIRERANGE,
                    firespeed: SCOUT_FIRESPEED,
                    firepower: SCOUT_FIREPOWER,
                    type: 'doublelaser',
                    sound: 'sounds/laser.mp3',
                    width: 25,
                    height: 25
                },
                {
                    coordX: 34,
                    coordY: -10,
                    firerange: SCOUT_FIRERANGE,
                    firespeed: SCOUT_FIRESPEED,
                    firepower: SCOUT_FIREPOWER,
                    type: 'doublelaser',
                    sound: 'sounds/laser.mp3',
                    width: 25,
                    height: 25
                },
                {
                    coordX: 0,
                    coordY: 24,
                    firerange: SCOUT_FIRERANGE,
                    firespeed: SCOUT_FIRESPEED,
                    firepower: SCOUT_FIREPOWER,
                    type: 'laser',
                    sound: 'sounds/laser.mp3',
                    width: 20,
                    height: 20
                }
            ]);
        }

    });

    return Model.HumanDestroyer;
});