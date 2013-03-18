// Profile CommentsOn Data
// ----------

// Package Profile
// Requires define
// Returns {ProfileCommentOnList} constructor

define(['facade', 'site/collections/comments', 'utils'], 
function(facade, SiteCommentList, utils) {

    var ProfileCommentOnList,
        _ = facade._,
        Channel = utils.lib.Channel;

    ProfileCommentOnList = SiteCommentList.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/user/commentson/' + this.id;
            return '/api/user/commentson?user_id=' + this.id;            
        }

    });

    return ProfileCommentOnList;
});
