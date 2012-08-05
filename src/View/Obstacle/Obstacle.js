define(
	function () {
		var Obstacle = Backbone.View.extend({
			img: null,
			done: false,

			render: function () {
				//if (this.done) {
					//window.battlefield.ctx.drawImage(this.img, this.model.get('positionX'), this.model.get('positionY'), this.model.get('width'), this.model.get('height'));
					window.battlefield.ctx.drawImage(window.GameImages['obstacle'], this.model.get('positionX'), this.model.get('positionY'), this.model.get('width'), this.model.get('height'));
					window.battlefield.ctx.restore();
					/*
				} else {
					var self = this;
					this.img = new Image();
					this.img.onload = function () {
						self.done = true;
						//window.battlefield.ctx.drawImage(self.img, self.model.get('positionX'), self.model.get('positionY'), self.model.get('width'), self.model.get('height'));
						window.battlefield.ctx.drawImage(window.GameImages['obstacle'], self.model.get('positionX'), self.model.get('positionY'), self.model.get('width'), self.model.get('height'));
						window.battlefield.ctx.restore();
					};

					this.img.src = 'images/tree.png';
				}
				*/
			}
		});

		return Obstacle;
	}
);