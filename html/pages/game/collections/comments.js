// Comments Data
// ----------

// Package Game
// Requires define
// Returns {CommentList} constructor

define(['facade', 'site/collections/comments', 'utils'], 
function(facade, SiteCommentList, utils) {

    var CommentList,
        _ = facade._,
        Channel = utils.lib.Channel;

    CommentList = SiteCommentList.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/game/comments/' + this.id;
            return '/api/game/comments?game_id=' + this.id;            
        }

    });

    return CommentList;
});
