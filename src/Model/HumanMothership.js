define(function () {
    var Model = Model || {};
    Model.Mothership = Backbone.Model.extend({
        defaults: {
            width: 200,
            height: 200,
            currentArmor:  500,
            maxArmor:  500,
            currentShield: 1000,
            maxShield: 1000,
            speed: 20,
            isAttackable: true,
            type: 'mothership',
            soundDestroy: 'sounds/bigboom.mp3',
            soundHit: 'sounds/hit.mp3'
        },

        initialize: function () {
            this.set('weapons', [
                {
                    coordX: 0,
                    coordY: -90,
                    firerange: 2 * SCOUT_FIRERANGE,
                    firespeed: SCOUT_FIRESPEED,
                    firepower: SCOUT_FIREPOWER,
                    type: 'laser',
                    sound: 'sounds/laser.mp3',
                    width: 30,
                    height: 30
                },
                {
                    coordX: 0,
                    coordY: 90,
                    firerange: 2 * SCOUT_FIRERANGE,
                    firespeed: SCOUT_FIRESPEED,
                    firepower: SCOUT_FIREPOWER,
                    type: 'laser',
                    sound: 'sounds/laser.mp3',
                    width: 30,
                    height: 30
                },
                {
                    coordX: -90,
                    coordY: 0,
                    firerange: 2 * SCOUT_FIRERANGE,
                    firespeed: SCOUT_FIRESPEED,
                    firepower: SCOUT_FIREPOWER,
                    type: 'laser',
                    sound: 'sounds/laser.mp3',
                    width: 30,
                    height: 30
                },
                {
                    coordX: 80,
                    coordY: -30,
                    firerange: 2 * SCOUT_FIRERANGE,
                    firespeed: SCOUT_FIRESPEED,
                    firepower: SCOUT_FIREPOWER,
                    type: 'laser',
                    sound: 'sounds/laser.mp3',
                    width: 30,
                    height: 30
                }
            ]);
        }
    });

    return Model.Mothership;
});