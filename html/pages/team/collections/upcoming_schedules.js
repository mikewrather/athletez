// Upcoming Schedules Data
// ----------

// Package Team
// Requires define
// Returns {TeamUpcomingScheduleList} constructor

define(['facade', 'sportorg/collections/games', 'utils'], 
function(facade, SportorgGameList, utils) {

    var TeamUpcomingScheduleList,
        Channel = utils.lib.Channel;

    TeamUpcomingScheduleList = SportorgGameList.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/team/upcoming_schedules/' + this.id + '/' + this.sport_id + '/' + this.complevel_id + '/' + this.season_id;
            return '/api/team/upcoming_schedules?team_id=' + this.id + '&sport_id=' + this.sport_id + '&complevel_id=' + this.complevel_id + '&season_id=' + this.season_id;            
        }

    });

    return TeamUpcomingScheduleList;
});
