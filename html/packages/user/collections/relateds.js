// User Related Data
// ----------

// Package User
// Requires define
// Returns {UserRelatedList} constructor

define(['facade', 'collections', 'user/models/related', 'utils'], 
function(facade, collections, UserRelatedModel, utils) {

    var UserRelatedList,
        BaseCollection = collections.BaseCollection,
        _ = facade._,
        Channel = utils.lib.Channel;

    UserRelatedList = BaseCollection.extend({

        // Reference to this collection's model.
        model: UserRelatedModel,
        
        url: function() {
            return '/api/user/related/' + this.id;
        },

    });

    return UserRelatedList;
});
