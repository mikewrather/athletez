// Comments Data
// ----------

// Package Game
// Requires define
// Returns {GameCommentList} constructor

define(['facade', 'site/collections/comments', 'utils'], 
function(facade, SiteCommentList, utils) {

    var GameCommentList,
        _ = facade._,
        Channel = utils.lib.Channel;

    GameCommentList = SiteCommentList.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/game/comments/' + this.id;
            return '/api/game/comments?game_id=' + this.id;            
        }

    });

    return GameCommentList;
});
