// Videos Data
// ----------

// Package Team
// Requires define
// Returns {VideoList} constructor

define(['facade', 'media/collections/videos', 'utils'], 
function(facade, MediaVideoList, utils) {

    var VideoList,
        _ = facade._,
        Channel = utils.lib.Channel;

    VideoList = MediaVideoList.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/team/videos/' + this.id + '/' + this.sport_id + '/' + this.complevel_id + '/' + this.season_id;
            return '/api/team/videos?team_id=' + this.id + '&sport_id=' + this.sport_id + '&complevel_id=' + this.complevel_id + '&season_id=' + this.season_id;                
        }

    });

    return VideoList;
});
