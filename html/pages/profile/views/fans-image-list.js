// The Image List
// --------------

define(['facade', 'utils', 'media/views/image-list'],
function(facade,  utils,   BaseImageListView) {

    var FansImageListView;

    FansImageListView = BaseImageListView.extend({

	    imagetype: 'large_thumb',
		name: "fans List",
        setupAddView: function() {
            
        }

    });

    return FansImageListView;
});