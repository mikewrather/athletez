// Profile Comments Data
// ----------

// Package Profile
// Requires define
// Returns {ProfileCommentList} constructor

define(['facade', 'user/collections/comments', 'utils'], 
function(facade, UserCommentList, utils) {

    var ProfileCommentList,
        _ = facade._,
        Channel = utils.lib.Channel;

    ProfileCommentList = UserCommentList.extend({
        
        

    });

    return ProfileCommentList;
});
