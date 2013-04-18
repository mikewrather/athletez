
// Rosters Data
// ----------

// Package Team
// Requires define
// Returns {TeamRosterList} constructor

define(['facade', 'sportorg/collections/rosters', 'utils'], 
function(facade, SportorgRosterList, utils) {

    var TeamRosterList,
        _ = facade._,
        Channel = utils.lib.Channel;

    TeamRosterList = SportorgRosterList.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/team/rosters/' + this.id + '/' + this.sport_id + '/' + this.complevel_id + '/' + this.season_id;
            return '/api/team/rosters?team_id=' + this.id + '&sport_id=' + this.sport_id + '&complevel_id=' + this.complevel_id + '&season_id=' + this.season_id; 
        }

    });

    return TeamRosterList;
});
