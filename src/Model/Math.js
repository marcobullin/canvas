define(function () {
	var Model = Model || {};
    Model.Math = Backbone.Model.extend({
    	isPointInCircle: function (Px, Py, Mx, My, radius) {
    		var distance = (Px - Mx) * (Px - Mx) + (Py - My) * (Py - My);

    		if (distance > radius) {
    			return false;
    		}

    		return true;
    	},

    	getAngle: function (Px1, Py1, Px2, Py2) {
    		return Math.atan2(Py2 - Py1, Px2 - Px1) - Math.PI / 2;
    	}
    });

    return new Model.Math();
});