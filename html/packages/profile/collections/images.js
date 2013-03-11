// Profile Images Data
// ----------

// Package Profile
// Requires define
// Returns {ProfileImageList} constructor

define(['facade', 'user/collections/images', 'utils'], 
function(facade, UserImageList, utils) {

    var ProfileImageList,
        _ = facade._,
        Channel = utils.lib.Channel;

    ProfileImageList = UserImageList.extend({
        
        

    });

    return ProfileImageList;
});
