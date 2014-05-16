// TeamRosters Data
// ----------

// Package Game
// Requires define
// Returns {GameTeamRosterList} constructor

define(['facade', 'sportorg/collections/teamrosters', 'utils'], 
function(facade, SportorgTeamRosterList, utils) {

    var RosterList,
        _ = facade._,
        Channel = utils.lib.Channel;

    RosterList = SportorgTeamRosterList.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/team/roster/' + this.id;
            return '/api/team/roster/' + this.id;
        }

    });

    return RosterList;
});
