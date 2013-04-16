// Videos Data
// ----------

// Package Profile
// Requires define
// Returns {VideoList} constructor

define(['facade', 'media/collections/videos', 'utils'], 
function(facade, MediaVideoList, utils) {

    var VideoList,
        _ = facade._,
        Channel = utils.lib.Channel;

    VideoList = MediaVideoList.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/user/videos/' + this.id + '/' + this.sport_id;
            return '/api/user/videos?user_id=' + this.id + '&sport_id=' + this.sport_id;            
        }

    });

    return VideoList;
});
