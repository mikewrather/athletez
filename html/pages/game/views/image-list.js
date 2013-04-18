// The Image List
// --------------

define(['facade', 'utils', 'media/views/image-list', 'game/views/add-image'], 
function(facade,   utils,   BaseImageListView,        GameAddImageView) {

    var GameImageListView, 
        Channel = utils.lib.Channel;

    GameImageListView = BaseImageListView.extend({

        setupAddView: function() {
            var listView = this,
                addView = new GameAddImageView({collection: this.collection}),
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
            
            Channel('gameaddimage:fetch').subscribe(callback);
        }

    });

    return GameImageListView;
});
