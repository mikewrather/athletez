// Game TeamRosters Data
// ----------

// Package Game
// Requires define
// Returns {GameTeamRosterList} constructor

define(['facade', 'sportorg/collections/teamrosters', 'utils'], 
function(facade, SportorgTeamRosterList, utils) {

    var GameTeamRosterList,
        _ = facade._,
        Channel = utils.lib.Channel;

    GameTeamRosterList = SportorgTeamRosterList.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/game/teamrosters/' + this.id;
            return '/api/game/teamrosters?game_id=' + this.id;
        }

    });

    return GameTeamRosterList;
});
