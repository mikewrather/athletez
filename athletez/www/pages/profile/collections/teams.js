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
            return '/api/user/teamlist/' + this.id + '?sports_id=' + this.sports_id;
        }

    });

    return ProfileTeamList;
});
