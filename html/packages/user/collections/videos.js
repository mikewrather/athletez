// User Videos Data
// ----------

// Package User
// Requires define
// Returns {UserVideoList} constructor

define(['facade', 'collections', 'user/models/video', 'utils'], 
function(facade, collections, UserVideoModel, utils) {

    var UserVideoList,
        BaseCollection = collections.BaseCollection,
        _ = facade._,
        Channel = utils.lib.Channel;

    UserVideoList = BaseCollection.extend({

        // Reference to this collection's model.
        model: UserVideoModel,
        
        url: function() {
            return '/api/user/videos/' + this.id;
        },

    });

    return UserVideoList;
});
