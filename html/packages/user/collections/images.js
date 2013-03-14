// User Images Data
// ----------

// Package User
// Requires define
// Returns {UserImageList} constructor

define(['facade', 'collections', 'user/models/image', 'utils'], 
function(facade, collections, UserImageModel, utils) {

    var UserImageList,
        BaseCollection = collections.BaseCollection,
        _ = facade._,
        Channel = utils.lib.Channel;

    UserImageList = BaseCollection.extend({

        // Reference to this collection's model.
        model: UserImageModel,
        
        url: function() {
            if (live)
                return '/api/user/images?user_id=' + this.id;
            return '/test/user/images/' + this.id;
        },
        
        // **Method:** `fetchSuccess` - resolve the deferred here in success
        fetchSuccess: function (collection, response) {
            collection.reset();
            var payload = response.payload;
            for (i = 0; i < payload.length; i++) {
                var userImage = new UserImageModel();
                userImage.set('payload', payload[i]);
                userImage.set('desc', response.desc);
                userImage.set('exec_data', response.exec_data);
                collection.push(userImage);
            }
            collection.deferred.resolve(response);
            debug.log(response);
        }

    });

    return UserImageList;
});
