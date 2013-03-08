// User Orgs Data
// ----------

// Package User
// Requires define
// Returns {UserOrgList} constructor

define(['facade', 'collections', 'user/models/org', 'utils'], 
function(facade, collections, UserOrgModel, utils) {

    var UserOrgList,
        BaseCollection = collections.BaseCollection,
        _ = facade._,
        Channel = utils.lib.Channel;

    UserOrgList = BaseCollection.extend({

        // Reference to this collection's model.
        model: UserOrgModel,
        
        url: function() {
            return '/api/user/orgs/' + this.id;
        },

    });

    return UserOrgList;
});
