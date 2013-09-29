// CommentsOn Data
// ----------

// Package Game
// Requires define
// Returns {GameCommentOnList} constructor

define(['facade', 'site/collections/comments', 'utils'], 
function(facade, SiteCommentList, utils) {

    var GameCommentOnList;

    GameCommentOnList = SiteCommentList.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/media/comments/' + this.id;
            return '/api/media/comments/'+this.id;
        }

    });

    return GameCommentOnList;
});
