define([
    'coreJS/adapt',
    './adapt-digital-point-tally-view',
], function(Adapt, DigitalPointTallyView) {

    var PointsHandler = _.extend({

        initialize: function() {
            this.listenToOnce(Adapt, {
                "app:dataReady": this.onAppDataReady
            });
        },

        onAppDataReady: function() {
            this.setupRender();
        },

        setupRender: function() {
            Adapt.on('pageView:postRender', this.onPostRender);
        },

        onPostRender: function(view) {
            if($('#digital-point-tally').length) return;
            var config = Adapt.course.get('digital-point-tally');
            var pt = new DigitalPointTallyView({
                    model : config
            });  
            
            $(config.parent).append(pt.$el);
            Adapt.listenTo(Adapt.course, "change:_allQuestionsScore", PointsHandler.tally);
        },

        tally: function() {
            var score = Adapt.course.get('_allQuestionsScore'),
            $this = $('#digital-point-tally span');
            $({ countNum: $this.text()}).animate({
                    countNum: score
                },
                {
                    duration: 500,
                    easing:'linear',
                    step: function() {
                        $this.text(Math.floor(this.countNum));
                    },
                    complete: function() {
                        $this.text(this.countNum);
                    }
                });  
        }

    }, Backbone.Events);

    PointsHandler.initialize();

    return PointsHandler;
});


