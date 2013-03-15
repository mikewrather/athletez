// Profile CommentsOf Data
// ----------

// Package Profile
// Requires define
// Returns {ProfileCommentOfList} constructor

define(['facade', 'user/collections/commentsof', 'utils'], 
function(facade, UserCommentOfList, utils) {

    var ProfileCommentOfList,
        _ = facade._,
        Channel = utils.lib.Channel;

    ProfileCommentOfList = UserCommentOfList.extend({
        
        

    });

    return ProfileCommentOfList;
});
