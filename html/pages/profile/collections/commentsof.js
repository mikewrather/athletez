// CommentsOf Data
// ----------

// Package Profile
// Requires define
// Returns {CommentOfList} constructor

define(['facade', 'site/collections/comments', 'utils'], 
function(facade, SiteCommentList, utils) {

    var CommentOfList,
        _ = facade._,
        Channel = utils.lib.Channel;

    CommentOfList = SiteCommentList.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/user/commentsof/' + this.id;
            return '/api/user/commentsof?user_id=' + this.id;            
        }

    });

    return CommentOfList;
});
