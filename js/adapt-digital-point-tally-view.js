define([
    'coreJS/adapt'
], function(Adapt) {

    var DigitalPointTallyView = Backbone.View.extend({

        el: function() {
            return Handlebars.templates['digital-point-tally'](this.model);
        }
        
    });
    
    return DigitalPointTallyView;
});