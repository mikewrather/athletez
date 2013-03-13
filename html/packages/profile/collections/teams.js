// Profile Teams Data
// ----------

// Package Profile
// Requires define
// Returns {ProfileTeamList} constructor

define(['facade', 'user/collections/teams', 'utils'], 
function(facade, UserTeamList, utils) {

    var ProfileTeamList,
        _ = facade._,
        Channel = utils.lib.Channel;

    ProfileTeamList = UserTeamList.extend({
        
        

    });

    return ProfileTeamList;
});
