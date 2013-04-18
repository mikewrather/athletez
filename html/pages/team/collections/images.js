// Images Data
// ----------

// Package Team
// Requires define
// Returns {TeamImageList} constructor

define(['facade', 'media/collections/images', 'utils'], 
function(facade, MediaImageList, utils) {

    var TeamImageList,
        _ = facade._,
        Channel = utils.lib.Channel;

    TeamImageList = MediaImageList.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/team/images/' + this.id + '/' + this.sport_id + '/' + this.complevel_id + '/' + this.season_id;
            return '/api/team/images?team_id=' + this.id + '&sport_id=' + this.sport_id + '&complevel_id=' + this.complevel_id + '&season_id=' + this.season_id;                
        }

    });

    return TeamImageList;
});
