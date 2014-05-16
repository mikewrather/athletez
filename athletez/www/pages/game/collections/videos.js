// Videos Data
// ----------

// Package Game
// Requires define
// Returns {GameVideoList} constructor

define(['facade', 'media/collections/videos', 'utils'], 
function(facade, MediaVideoList, utils) {

    var GameVideoList,
        _ = facade._,
        Channel = utils.lib.Channel;

    GameVideoList = MediaVideoList.extend({

        url: function() {
	        if (testpath)
                return testpath + '/game/videos/' + this.id;
            return '/api/game/videos/' + this.id;
        }

    });

    return GameVideoList;
});
