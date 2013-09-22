// The Image List
// --------------

define(['facade', 'utils', 'media/views/image-list'],
function(facade,  utils,   BaseImageListView) {

    var ImageList;

    ImageList = BaseImageListView.extend({

	    imagetype: 'large_thumb',
        setupAddView: function() {
            
        }

    });

    return ImageList;
});