// The Image List
// --------------

define(['facade', 'utils', 'media/views/image-list'],
function(facade,  utils,   BaseImageListView) {

    var ProfileImageListView;

    ProfileImageListView = BaseImageListView.extend({

	    imagetype: 'large_thumb',

        setupAddView: function() {
            
        }

    });

    return ProfileImageListView;
});