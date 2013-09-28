// CommentsOn Data
// ----------

// Package Game
// Requires define
// Returns {GameCommentOnList} constructor

define(['facade', 'collections', 'utils', 'usercontrol/photo-player/models/tags'], 
function(facade, collections, utils, model) {

    var TagsList, BaseCollection = collections.BaseCollection;

    TagsList = BaseCollection.extend({
        model: model,
        url: function() {
            if (testpath)
                return testpath + '/media/tags/';
            return '/api/complevelprofile/search/';
        }

    });

    return TagsList;
});
