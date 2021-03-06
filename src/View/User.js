define(function () {
    var View = View || {};
    View.User = Backbone.View.extend({
        initialize: function () {
            _.bindAll(this, 'updateMoney');
            this.model.on('change:money', this.updateMoney);
        },

        updateMoney: function (model, value) {
            $('#current_money').html('Rescourcen: $' + value);

            var lis = $('#available_units li'),
                li,
                i;
            for (i = 0; i < lis.length; i++) {
                li = $(lis[i]);
                if (parseInt(li.attr('data-price'), 10) > this.model.get('money')) {
                    li.addClass('not_enough_money');
                    continue;
                }

                li.removeClass('not_enough_money');
            }
        }
    });

    return View.User;
});