// The Video List
// --------------

define(['facade', 'utils', 'media/views/video-list', 'profile/views/add-video'], 
function(facade,  utils,   BaseVideoListView,       ProfileAddVideoView) {

    var ProfileVideoListView, 
        Channel = utils.lib.Channel;

    ProfileVideoListView = BaseVideoListView.extend({
        
        setupAddView: function() {
            var listView = this,
                addView = new ProfileAddVideoView({collection: this.collection}),
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

    return ProfileVideoListView;
});
