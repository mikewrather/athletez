// Sports Data
// ----------

// Package Team
// Requires define
// Returns {TeamSeasonList} constructor

define(['facade', 'sportorg/collections/teams', 'utils'],
function(facade, SportorgTeamList, utils) {

    var TeamSeasonTeamsList,
        Channel = utils.lib.Channel;

    TeamSeasonTeamsList = SportorgTeamList.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/org/seasonteams/' + this.id + '/' + this.sport_id + '/' + this.complevel_id;
            return '/api/org/seasonteams/' + this.id + '?sports_id=' + this.sport_id + '&complevels_id=' + this.complevel_id;
        }

    });

    return TeamSeasonTeamsList;
});
