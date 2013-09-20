// TeamRosters Data
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
                return testpath + '/team/roster/' + this.id;
            return '/api/team/roster/' + this.id;
        }

    });

    return GameTeamRosterList;
});
