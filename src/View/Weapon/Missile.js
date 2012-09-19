define([
    'View/Weapon/Shot'
    ],
    function (Shot) {
        'use strict';
        var View = View || {};
        View.Missile = Shot.extend({
            initialize: function () {
                this.model.set('type', 'missile');
                this.game = this.options.game;
            },

            draw: function (modifier) {
                this.update(modifier);

                var angle = Math.atan2(this.model.get('enemy').get('positionY') + this.model.get('enemy').get('height') / 2 - this.model.get('positionY'), this.model.get('enemy').get('positionX') + this.model.get('enemy').get('width') / 2 - this.model.get('positionX')) - Math.PI / 2;
                this.game.battlefield.ctx.save();
                this.game.battlefield.ctx.translate(this.model.get('positionX'), this.model.get('positionY'));
                this.game.battlefield.ctx.rotate(angle);
                if (this.model.get('owner') === 'user') {
                    this.game.battlefield.ctx.drawImage(this.game.getImage('missile'), 0, 0, 5, 20);
                } else {
                    this.game.battlefield.ctx.drawImage(this.game.getImage('missile'), 0, 0, 5, 20);
                }
                this.game.battlefield.ctx.restore();
            }
        });

        return View.Missile;
    }
);