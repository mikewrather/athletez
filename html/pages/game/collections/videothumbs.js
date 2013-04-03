// VideoThumbs Data
// ----------

// Package Game
// Requires define
// Returns {VideoThumbList} constructor

define(['facade', 'media/collections/videos', 'utils'], 
function(facade, MediaVideoList, utils) {

    var VideoThumbList,
        _ = facade._,
        Channel = utils.lib.Channel;

    VideoThumbList = MediaVideoList.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/game/videothumbs/' + this.id;
            return '/api/game/videothumbs?game_id=' + this.id;
        }

    });

    return VideoThumbList;
});
