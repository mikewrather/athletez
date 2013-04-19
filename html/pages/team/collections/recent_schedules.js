// Recent Schedules Data
// ----------

// Package Team
// Requires define
// Returns {TeamRecentScheduleList} constructor

define(['facade', 'sportorg/collections/games', 'utils'], 
function(facade, SportorgGameList, utils) {

    var TeamRecentScheduleList,
        Channel = utils.lib.Channel;

    TeamRecentScheduleList = SportorgGameList.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/team/recent_schedules/' + this.id + '/' + this.sport_id + '/' + this.complevel_id + '/' + this.season_id;
            return '/api/team/recent_schedules?team_id=' + this.id + '&sport_id=' + this.sport_id + '&complevel_id=' + this.complevel_id + '&season_id=' + this.season_id;            
        }

    });

    return TeamRecentScheduleList;
});
