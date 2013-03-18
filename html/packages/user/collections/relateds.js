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
        
        // **Method:** `fetchSuccess` - resolve the deferred here in success
        fetchSuccess: function (collection, response) {
            collection.reset();
            var payload = response.payload;
            for (i = 0; i < payload.length; i++) {
                var item = new UserRelatedModel();
                item.id = Math.ceil(Math.random() * 100000);
                item.set('payload', payload[i]);
                item.set('desc', response.desc);
                item.set('exec_data', response.exec_data);
                collection.push(item);
            }
            collection.deferred.resolve(response);
        }

    });

    return UserRelatedList;
});
