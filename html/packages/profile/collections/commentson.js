// Profile CommentsOn Data
// ----------

// Package Profile
// Requires define
// Returns {ProfileCommentOnList} constructor

define(['facade', 'user/collections/commentson', 'utils'], 
function(facade, UserCommentOnList, utils) {

    var ProfileCommentOnList,
        _ = facade._,
        Channel = utils.lib.Channel;

    ProfileCommentOnList = UserCommentOnList.extend({
        
        

    });

    return ProfileCommentOnList;
});
