define([
    'View/Weapon/Shot'
    ],
    function (Shot) {
        'use strict';
        var View = View || {};
        View.Missile = Shot.extend({
            draw: function (modifier) {
                this.update(modifier);

                var angle = Math.atan2(this.model.get('enemy').get('positionY') + this.model.get('enemy').get('height') / 2 - this.model.get('positionY'), this.model.get('enemy').get('positionX') + this.model.get('enemy').get('width') / 2 - this.model.get('positionX')) - Math.PI / 2;
                window.battlefield.ctx.save();
                window.battlefield.ctx.translate(this.model.get('positionX'), this.model.get('positionY'));
                window.battlefield.ctx.rotate(angle);
                window.battlefield.ctx.drawImage(window.GameImages['missile'], 0, 0, 5, 20);
                window.battlefield.ctx.restore();
            }
        });

        return View.Missile;
    }
);