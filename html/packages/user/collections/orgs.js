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
            if (testpath)
                return '/test/user/orgs/' + this.id;
            return '/api/user/orgs?user_id=' + this.id;            
        },
        
        // **Method:** `fetchSuccess` - resolve the deferred here in success
        fetchSuccess: function (collection, response) {
            collection.reset();
            var payload = response.payload;
            for (i = 0; i < payload.length; i++) {
                var userOrg = new UserOrgModel();
                userOrg.set('payload', payload[i]);
                userOrg.set('desc', response.desc);
                userOrg.set('exec_data', response.exec_data);
                collection.push(userOrg);
            }
            collection.deferred.resolve(response);
            debug.log(response);
        }

    });

    return UserOrgList;
});
