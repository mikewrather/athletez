// Videos Data
// ----------

// Package Team
// Requires define
// Returns {TeamVideoList} constructor

define(['facade', 'media/collections/videos', 'utils'], 
function(facade, MediaVideoList, utils) {

    var TeamVideoList,
        _ = facade._,
        Channel = utils.lib.Channel;

    TeamVideoList = MediaVideoList.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/team/videos/' + this.id + '/' + this.sport_id + '/' + this.complevel_id + '/' + this.season_id;
            return '/api/team/videos?team_id=' + this.id + '&sport_id=' + this.sport_id + '&complevel_id=' + this.complevel_id + '&season_id=' + this.season_id;                
        }

    });

    return TeamVideoList;
});
