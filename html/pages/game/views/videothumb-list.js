// The VideoThumb List
// --------------

define(['facade', 'utils', 'media/views/videothumb-list', 'game/views/add-video'], 
function(facade,  utils,   BaseVideoThumbListView,       AddVideoView) {

    var VideoThumbListView, 
        Channel = utils.lib.Channel;

    VideoThumbListView = BaseVideoThumbListView.extend({

        setupAddView: function() {
            var listView = this,
                addView = new AddVideoView({collection: this.collection}),
                renderAddView = this.addChildView(addView);
            
            this.childViews.form = addView;
            this.callbacks.add(function() {
                renderAddView();
            });
            
            function callback (data) {
                addView.model = data;
                addView.render();
                listView.$el.append(addView.el);
            }
            
            Channel('addvideo:fetch').subscribe(callback);
        }

    });

    return VideoThumbListView;
});
