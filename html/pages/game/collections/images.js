// Images Data
// ----------

// Package Game
// Requires define
// Returns {GameImageList} constructor

define(['facade', 'media/collections/images', 'utils'], 
function(facade, MediaImageList, utils) {

    var GameImageList,
        _ = facade._,
        Channel = utils.lib.Channel;

    GameImageList = MediaImageList.extend({
        
        url: function() {
	        if (testpath)
                return testpath + '/game/images/' + this.id;
            return '/api/game/images/' + this.id;
        }
        
    });

    return GameImageList;
});
