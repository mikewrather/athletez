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
        
        // **Method:** `fetchSuccess` - resolve the deferred here in success
        fetchSuccess: function (collection, response) {
            collection.reset();
            var payload = response.payload;
            for (i = 0; i < payload.length; i++) {
                var userRelated = new UserRelatedModel();
                userRelated.set('payload', payload[i]);
                userRelated.set('desc', response.desc);
                userRelated.set('exec_data', response.exec_data);
                collection.push(userRelated);
            }
            collection.deferred.resolve(response);
            debug.log(response);
        }

    });

    return UserRelatedList;
});
