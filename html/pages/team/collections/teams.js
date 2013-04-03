// Team Teams Data
// ----------

// Package Team
// Requires define
// Returns {TeamTeamList} constructor

define(['facade', 'sportorg/collections/teams', 'utils'], 
function(facade, SportorgTeamList, utils) {

    var TeamTeamList,
        _ = facade._,
        Channel = utils.lib.Channel;

    TeamTeamList = SportorgTeamList.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/team/teams/' + this.id + '/' + this.sport_id;
            return '/api/team/teams?user_id=' + this.id + '&sport_id=' + this.sport_id;            
        }

    });

    return TeamTeamList;
});
