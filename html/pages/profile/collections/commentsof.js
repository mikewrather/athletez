// CommentsOf Data
// ----------

// Package Profile
// Requires define
// Returns {ProfileCommentOfList} constructor

define(['facade', 'site/collections/comments', 'utils'], 
function(facade, SiteCommentList, utils) {

    var ProfileCommentOfList,
        Channel = utils.lib.Channel;

    ProfileCommentOfList = SiteCommentList.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/user/commentsof/' + this.id;
            return '/api/user/commentsof/' + this.id;
        }

    });

    return ProfileCommentOfList;
});
