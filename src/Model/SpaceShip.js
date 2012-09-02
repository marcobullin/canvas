define(function () {
	var Model = Model || {};
	Model.SpaceShip = Backbone.Model.extend({
		addWeapon: function (weapon) {
			var weapons = _.clone(this.get('weapons')) || [];
			weapons.push(weapon);
			this.set('weapons', weapons);
		}
	});

	return Model.SpaceShip;
});