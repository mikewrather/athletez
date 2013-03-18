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
        
        // **Method:** `fetchSuccess` - resolve the deferred here in success
        fetchSuccess: function (collection, response) {
            collection.reset();
            var payload = response.payload;
            for (i = 0; i < payload.length; i++) {
                var item = new UserOrgModel();
                item.id = Math.ceil(Math.random() * 100000);
                item.set('payload', payload[i]);
                item.set('desc', response.desc);
                item.set('exec_data', response.exec_data);
                collection.push(item);
            }
            collection.deferred.resolve(response);
        }

    });

    return UserOrgList;
});
