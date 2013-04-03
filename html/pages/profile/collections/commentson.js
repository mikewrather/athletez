// CommentsOn Data
// ----------

// Package Profile
// Requires define
// Returns {CommentOnList} constructor

define(['facade', 'site/collections/comments', 'utils'], 
function(facade, SiteCommentList, utils) {

    var CommentOnList,
        _ = facade._,
        Channel = utils.lib.Channel;

    CommentOnList = SiteCommentList.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/user/commentson/' + this.id;
            return '/api/user/commentson?user_id=' + this.id;            
        }

    });

    return CommentOnList;
});
