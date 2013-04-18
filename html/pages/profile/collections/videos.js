// Videos Data
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
                return testpath + '/user/videos/' + this.id + '/' + this.sport_id;
            return '/api/user/videos?user_id=' + this.id + '&sport_id=' + this.sport_id;            
        }

    });

    return ProfileVideoList;
});
