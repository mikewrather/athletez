// Profile CommentsOf Data
// ----------

// Package Profile
// Requires define
// Returns {ProfileCommentOfList} constructor

define(['facade', 'site/collections/comments', 'utils'], 
function(facade, SiteCommentList, utils) {

    var ProfileCommentOfList,
        _ = facade._,
        Channel = utils.lib.Channel;

    ProfileCommentOfList = SiteCommentList.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/user/commentsof/' + this.id;
            return '/api/user/commentsof?user_id=' + this.id;            
        }

    });

    return ProfileCommentOfList;
});