// User CommentsOn Data
// ----------

// Package User
// Requires define
// Returns {UserCommentsOnList} constructor

define(['facade', 'collections', 'user/models/commenton', 'utils'], 
function(facade, collections, UserCommentOnModel, utils) {

    var UserCommentOnList,
        BaseCollection = collections.BaseCollection,
        _ = facade._,
        Channel = utils.lib.Channel;

    UserCommentOnList = BaseCollection.extend({

        // Reference to this collection's model.
        model: UserCommentOnModel,
        
        url: function() {
            if (testpath)
                return testpath + '/user/commentson/' + this.id;
            return '/api/user/commentson?user_id=' + this.id;            
        },
        
        // **Method:** `fetchSuccess` - resolve the deferred here in success
        fetchSuccess: function (collection, response) {
            collection.reset();
            var payload = response.payload;
            for (i = 0; i < payload.length; i++) {
                var userComment = new UserCommentOnModel();
                userComment.set('payload', payload[i]);
                userComment.set('desc', response.desc);
                userComment.set('exec_data', response.exec_data);
                collection.push(userComment);
            }
            collection.deferred.resolve(response);
            debug.log(response);
        }

    });

    return UserCommentOnList;
});
