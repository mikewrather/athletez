// The Video List
// --------------

define(['facade', 'utils', 'media/views/video-list', 'profile/views/add-video'], 
function(facade,  utils,   BaseVideoListView,       AddVideoView) {

    var VideoListView, 
        Channel = utils.lib.Channel;

    VideoListView = BaseVideoListView.extend({
        
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

    return VideoListView;
});
