// Teams Data
// ----------

// Package Profile
// Requires define
// Returns {ProfileTeamList} constructor

define(['facade', 'sportorg/collections/teams', 'utils'], 
function(facade, SportorgTeamList, utils) {

    var ProfileTeamList;

    ProfileTeamList = SportorgTeamList.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/user/teamlist/' + this.sport_id;
            return '/api/user/teamlist/?sports_id=' + this.sports_id;
        }

    });

    return ProfileTeamList;
});
