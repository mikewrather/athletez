// Profile Sports Data
// ----------

// Package Profile
// Requires define
// Returns {ProfileSportList} constructor

define(['facade', 'user/collections/sports', 'utils'], 
function(facade, UserSportList, utils) {

    var ProfileSportList,
        _ = facade._,
        Channel = utils.lib.Channel;

    ProfileSportList = UserSportList.extend({
        
        

    });

    return ProfileSportList;
});
