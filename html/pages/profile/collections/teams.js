// Teams Data
// ----------

// Package Profile
// Requires define
// Returns {ProfileTeamList} constructor

define(['facade', 'sportorg/collections/teams', 'utils'], 
function(facade, SportorgTeamList, utils) {

    var ProfileTeamList,
        _ = facade._,
        Channel = utils.lib.Channel;

    ProfileTeamList = SportorgTeamList.extend({
        
        url: function() {
            //for test
            return '/api/user/teams/424322?id1=424322';
            if (testpath)
                return testpath + '/user/teams/' + this.id + '/' + this.sport_id;
            return '/api/user/teams/' + this.id + '?sport_id=' + this.sport_id;
        }

    });

    return ProfileTeamList;
});
