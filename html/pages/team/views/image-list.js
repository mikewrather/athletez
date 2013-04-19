// The Image List
// --------------

define(['facade', 'utils', 'media/views/image-list', 'team/views/add-image'], 
function(facade,  utils,   BaseImageListView,       AddImageView) {

    var TeamImageListView, 
        Channel = utils.lib.Channel;

    TeamImageListView = BaseImageListView.extend({

        setupAddView: function() {
            var listView = this,
                addView = new AddImageView({collection: this.collection}),
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
            
            Channel('teamaddimage:fetch').subscribe(callback);
        }

    });

    return TeamImageListView;
});
