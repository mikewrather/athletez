// TeamRosters Data
// ----------

// Package Game
// Requires define
// Returns {TeamRosterList} constructor

define(['facade', 'sportorg/collections/teamrosters', 'utils'], 
function(facade, SportorgTeamRosterList, utils) {

    var TeamRosterList,
        _ = facade._,
        Channel = utils.lib.Channel;

    TeamRosterList = SportorgTeamRosterList.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/game/teamrosters/' + this.id;
            return '/api/game/teamrosters?game_id=' + this.id;
        }

    });

    return TeamRosterList;
});
