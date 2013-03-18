// Profile Images Data
// ----------

// Package Profile
// Requires define
// Returns {ProfileImageList} constructor

define(['facade', 'media/collections/images', 'utils'], 
function(facade, MediaImageList, utils) {

    var ProfileImageList,
        _ = facade._,
        Channel = utils.lib.Channel;

    ProfileImageList = MediaImageList.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/user/images/' + this.id;
            return '/api/user/images?user_id=' + this.id;            
        }
        
    });

    return ProfileImageList;
});
