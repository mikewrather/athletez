// VideoThumbs Data
// ----------

// Package Game
// Requires define
// Returns {GameVideoThumbList} constructor

define(['facade', 'media/collections/videos', 'utils'], 
function(facade, MediaVideoList, utils) {

    var GameVideoThumbList,
        _ = facade._,
        Channel = utils.lib.Channel;

    GameVideoThumbList = MediaVideoList.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/game/videothumbs/' + this.id;
            return '/api/game/videothumbs?game_id=' + this.id;
        }

    });

    return GameVideoThumbList;
});
