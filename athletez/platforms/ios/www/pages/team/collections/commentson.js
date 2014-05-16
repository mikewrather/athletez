// CommentsOn Data
// ----------

// Package Profile
// Requires define
// Returns {ProfileCommentOnList} constructor

define(['facade', 'site/collections/comments', 'utils'], 
function(facade, SiteCommentList, utils) {

    var TeamCommentOnList;

    TeamCommentOnList = SiteCommentList.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/team/comments/' + this.id;
            return '/api/team/comments/'+this.id;
        }

    });

    return TeamCommentOnList;
});
