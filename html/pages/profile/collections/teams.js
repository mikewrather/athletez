// Teams Data
// ----------

// Package Profile
// Requires define
// Returns {TeamList} constructor

define(['facade', 'sportorg/collections/teams', 'utils'], 
function(facade, SportorgTeamList, utils) {

    var TeamList,
        _ = facade._,
        Channel = utils.lib.Channel;

    TeamList = SportorgTeamList.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/user/teams/' + this.id + '/' + this.sport_id;
            return '/api/user/teams?user_id=' + this.id + '&sport_id=' + this.sport_id;            
        }

    });

    return TeamList;
});
