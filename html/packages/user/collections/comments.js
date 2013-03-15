// User Comments Data
// ----------

// Package User
// Requires define
// Returns {UserCommentList} constructor

define(['facade', 'collections', 'user/models/comment', 'utils'], 
function(facade, collections, UserCommentModel, utils) {

    var UserCommentList,
        BaseCollection = collections.BaseCollection,
        _ = facade._,
        Channel = utils.lib.Channel;

    UserCommentList = BaseCollection.extend({

        // Reference to this collection's model.
        model: UserCommentModel,
        
        url: function() {
            if (testpath)
                return '/test/user/commentsof/' + this.id;
            return '/api/user/commentsof?user_id=' + this.id;            
        },
        
        // **Method:** `fetchSuccess` - resolve the deferred here in success
        fetchSuccess: function (collection, response) {
            collection.reset();
            var payload = response.payload;
            for (i = 0; i < payload.length; i++) {
                var userComment = new UserCommentModel();
                userComment.set('payload', payload[i]);
                userComment.set('desc', response.desc);
                userComment.set('exec_data', response.exec_data);
                collection.push(userComment);
            }
            collection.deferred.resolve(response);
            debug.log(response);
        }

    });

    return UserCommentList;
});
