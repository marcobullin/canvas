define([
	'View/Unit/MilitaryVehicle'
	],
	function (MilitaryVehicle) {
		var Tank = MilitaryVehicle.extend({
			
			// img: null,
			// done: false,

			// render: function () {
			// 	if (!this.model.get('id')) {
			// 		this.model.set('id', Math.ceil(Math.random() * 99999999999 * new Date().getTime()));
			// 	}

			// 	var live = this.model.get('width') / 100 * this.model.get('protection');

			// 	// ROTATE
			// 	window.battlefield.ctx.save();
			// 	window.battlefield.ctx.translate(this.model.get('positionX') + this.model.get('width') / 2, this.model.get('positionY') + this.model.get('height') / 2);

			// 	switch (this.model.get('direction')) {
			// 		case 'L':
			// 			window.battlefield.ctx.rotate(Math.PI / 2);
			// 			break;
			// 		case 'R':
			// 			window.battlefield.ctx.rotate(-Math.PI / 2);
			// 			break;
			// 		case 'U':
			// 			window.battlefield.ctx.rotate(Math.PI);
			// 			break;
			// 		case 'D':
			// 			window.battlefield.ctx.rotate(2 * Math.PI);
			// 			break;
			// 		case 'LU':
			// 			window.battlefield.ctx.rotate(3/4 * Math.PI);
			// 			break;
			// 		case 'LD':
			// 			window.battlefield.ctx.rotate(Math.PI / 4);
			// 			break;
			// 		case 'RU':
			// 			window.battlefield.ctx.rotate(-3/4 * Math.PI);
			// 			break;
			// 		case 'RD':
			// 			window.battlefield.ctx.rotate(-Math.PI / 4);
			// 			break;
			// 		default:
			// 			window.battlefield.ctx.rotate(2 * Math.PI);
			// 	}

			// 	var x = (-1 * this.model.get('width') / 2),
			// 		y = (-1 * this.model.get('height') / 2);

			// 	// LIVE
			// 	window.battlefield.ctx.fillStyle = 'red';
			// 	window.battlefield.ctx.fillRect(x, y - 4, this.model.get('width'), 4);
			// 	window.battlefield.ctx.fillStyle = 'green';
			// 	window.battlefield.ctx.fillRect(x, y - 4, live, 4);

			// 	// FIRERANGE
			// 	if (this.model.get('selected')) {
			// 		window.battlefield.ctx.beginPath();
			// 		window.battlefield.ctx.arc(x + (this.model.get('width') / 2), y + (this.model.get('height') / 2), this.model.get('firerange'), 0, Math.PI*2, false);
			// 		window.battlefield.ctx.fillStyle = "rgba(255, 0, 0, 0.3)";
			// 		window.battlefield.ctx.fill();
			// 		window.battlefield.ctx.lineWidth = 1;
			// 		window.battlefield.ctx.strokeStyle = 'red';
			// 		window.battlefield.ctx.stroke();
			// 		window.battlefield.ctx.closePath();
			// 	}

			// 	if (this.done) {
			// 		window.battlefield.ctx.drawImage(this.img, x, y, this.model.get('width'), this.model.get('height'));
			// 		window.battlefield.ctx.restore();
			// 		return;
			// 	}

			// 	this.img = new Image();

			// 	var self = this;

			// 	this.img.onload = function () {
			// 		self.done = true;
			// 		window.battlefield.ctx.translate(self.model.get('positionX') + self.model.get('width') / 2, self.model.get('positionY') + self.model.get('height') / 2);
			// 		window.battlefield.ctx.rotate(Math.PI );

			// 		var x = (-1 * self.model.get('width') / 2),
			// 			y = (-1 * self.model.get('height') / 2);

			// 		window.battlefield.ctx.drawImage(self.img, x, y, self.model.get('width'), self.model.get('height'));
			// 		window.battlefield.ctx.restore();
			// 	};

			// 	this.img.src = 'scout2.jpg';
			// }
		});

		return Tank;
	}
);