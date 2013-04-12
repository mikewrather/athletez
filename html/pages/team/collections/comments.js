// Comments Data
// ----------

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
                return testpath + '/team/comments/' + this.id + '/' + this.sport_id + '/' + this.complevel_id + '/' + this.season_id;
            return '/api/team/comments?game_id=' + this.id + '&sport_id=' + this.sport_id + '&complevel_id=' + this.complevel_id + '&season_id=' + this.season_id;                    
        }

    });

    return CommentList;
});
