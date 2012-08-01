define(function () {
	var Battlefield = Backbone.View.extend({
		el: 'body',

		items: [],

		selectedItem: null,
		img: null,
		done: false,

		events: {
			'click canvas': 'onClick'
		},

		initialize: function () {
			_.bindAll(this, 'onClick');
		},

		add: function (item) {
			this.items.push(item);
			item.render();
		},

		onClick: function (event) {
			var x = event.clientX,
				y = event.clientY,
				i,
				clickedAnItem = false;

			for (i = 0; i < this.items.length; i++) {
				if (x >= this.items[i].model.get('positionX') &&
					x <= (this.items[i].model.get('positionX') + this.items[i].model.get('width')) &&
					y >= this.items[i].model.get('positionY') &&
					y <= (this.items[i].model.get('positionY') + this.items[i].model.get('height'))
				) {
					// user clicked an enemy
					if ('user' !== this.items[i].model.get('owner')) {
						if (this.selectedItem) {
							console.log('MOVE AND ATTACK');
							this.selectedItem.model.set('attackEnemy', this.items[i].model.get('id'));
							// move to enemy and attack them
							this.selectedItem.moveAndAttack(this.items[i]);
							return;
						}

					// user clicked an unit
					} else {
						// deselect previous item
						if (this.selectedItem) {
							this.selectedItem.model.set('attackEnemy', false);
							this.selectedItem.model.set('selected', false);
						}

						this.selectedItem = this.items[i];
						this.selectedItem.model.set('selected', true);
						clickedAnItem = true;
						break;
					}
				}
			}

			if (this.selectedItem && false === clickedAnItem) {
				this.selectedItem.model.set('attackEnemy', false);
				this.selectedItem.move(x, y);
			}
		},

		render: function () {
			this.canvas = document.createElement('canvas'),
			this.ctx = this.canvas.getContext('2d');

			this.canvas.width = BATTLEFIELD_WIDTH;
			this.canvas.height = BATTLEFIELD_HEIGHT;

			this.el.appendChild(this.canvas);
		},

		update: function () {
			window.battlefield.ctx.drawImage(window.GameImages['map'], 0, 0, BATTLEFIELD_WIDTH, BATTLEFIELD_HEIGHT);

			for (var i = 0; i < this.items.length; i++) {
				this.items[i].render();
			}
		},

		remove: function (id) {
			for (var i = 0; i < this.items.length; i++) {
				if (id === this.items[i].model.get('id')) {
					this.items.splice(i, 1);
					break;
				}
			}
		}
	});

	return Battlefield;
});