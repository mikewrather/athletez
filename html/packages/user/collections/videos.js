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
            if (testpath)
                return '/test/user/videos/' + this.id;
            return '/api/user/videos?user_id=' + this.id;            
        },
        
        // **Method:** `fetchSuccess` - resolve the deferred here in success
        fetchSuccess: function (collection, response) {
            collection.reset();
            var payload = response.payload;
            for (i = 0; i < payload.length; i++) {
                var userVideo = new UserVideoModel();
                userVideo.set('payload', payload[i]);
                userVideo.set('desc', response.desc);
                userVideo.set('exec_data', response.exec_data);
                collection.push(userVideo);
            }
            collection.deferred.resolve(response);
            debug.log(response);
        }

    });

    return UserVideoList;
});
