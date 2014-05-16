// The VideoThumb List
// --------------

define(['facade', 'utils', 'media/views/video-list', 'game/views/add-video'], 
function(facade,   utils,   BaseVideoListView,        GameAddVideoView) {

    var GameVideoListView, 
        Channel = utils.lib.Channel;

    GameVideoListView = BaseVideoListView.extend({

        setupAddView: function() {
            var listView = this,
                addView = new GameAddVideoView({collection: this.collection}),
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
            
            Channel('gameaddvideo:fetch').subscribe(callback);
        }

    });

    return GameVideoListView;
});
