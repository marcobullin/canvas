define(function () {
    var Model = Model || {};
    Model.HumanFrigate = Backbone.Model.extend({
        defaults: {
            width: 100,
            height: 100,
            currentArmor:  200,
            maxArmor:  200,
            currentShield: 500,
            maxShield: 500,
            speed: TANK_SPEED / 2,
            isAttackable: true,
            type: 'frigate',
            soundDestroy: 'sounds/bigboom.mp3',
            soundHit: 'sounds/hit.mp3'
        },

        initialize: function () {
            this.set('weapons', [
                {
                    coordX: -30,
                    coordY: -38,
                    firerange: TANK_FIRERANGE,
                    firespeed: TANK_FIRESPEED,
                    firepower: TANK_FIREPOWER,
                    type: 'cannon',
                    sound: 'sounds/laser.mp3',
                    width: 30,
                    height: 30
                },
                {
                    coordX: 30,
                    coordY: -38,
                    firerange: TANK_FIRERANGE,
                    firespeed: TANK_FIRESPEED,
                    firepower: TANK_FIREPOWER,
                    type: 'cannon',
                    sound: 'sounds/laser.mp3',
                    width: 30,
                    height: 30
                },
                {
                    coordX: 0,
                    coordY: -38,
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
                    coordY: 45,
                    firerange: SCOUT_FIRERANGE,
                    firespeed: SCOUT_FIRESPEED,
                    firepower: SCOUT_FIREPOWER,
                    type: 'doublelaser',
                    sound: 'sounds/laser.mp3',
                    width: 25,
                    height: 25
                }
            ]);
        }
    });

    return Model.HumanFrigate;
});