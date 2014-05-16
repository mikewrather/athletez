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
                return testpath + '/game/comments/' + this.id;
            return '/api/game/comments/'+this.id;
        }

    });

    return GameCommentOnList;
});
