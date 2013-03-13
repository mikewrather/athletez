// Profile Fitness Basics Data
// ----------

// Package Profile
// Requires define
// Returns {ProfileFitnessBasicList} constructor

define(['facade', 'user/collections/fitnessbasics', 'utils'], 
function(facade, UserFitnessBasicList, utils) {

    var ProfileFitnessBasicList,
        _ = facade._,
        Channel = utils.lib.Channel;

    ProfileFitnessBasicList = UserFitnessBasicList.extend({
        
        

    });

    return ProfileFitnessBasicList;
});
