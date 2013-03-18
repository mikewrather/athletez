// Profile Videos Data
// ----------

// Package Profile
// Requires define
// Returns {ProfileVideoList} constructor

define(['facade', 'media/collections/videos', 'utils'], 
function(facade, MediaVideoList, utils) {

    var ProfileVideoList,
        _ = facade._,
        Channel = utils.lib.Channel;

    ProfileVideoList = MediaVideoList.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/user/videos/' + this.id;
            return '/api/user/videos?user_id=' + this.id;            
        }

    });

    return ProfileVideoList;
});
