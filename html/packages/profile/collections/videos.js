// Profile Videos Data
// ----------

// Package Profile
// Requires define
// Returns {ProfileVideoList} constructor

define(['facade', 'user/collections/videos', 'utils'], 
function(facade, UserVideoList, utils) {

    var ProfileVideoList,
        _ = facade._,
        Channel = utils.lib.Channel;

    ProfileVideoList = UserVideoList.extend({
        
        

    });

    return ProfileVideoList;
});
