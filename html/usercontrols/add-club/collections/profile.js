// CommentsOn Data
// ----------

// Package Game
// Requires define
// Returns {GameCommentOnList} constructor

define(['facade', 'collections', 'utils', 'models'], 
function(facade, collections, utils, models) {

    var TagsList, BaseModel = models.BaseModel, BaseCollection = collections.BaseCollection;

    return BaseCollection.extend({
        model: facade.Backbone.Model.extend(),
        url: function() {
            if (testpath)
                return testpath + '/seasonprofile/search/';
            return '/api/seasonprofile/search/';
        }

    });
});
