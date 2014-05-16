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
        limit: 8,
        offset: 0,
        url: function() {
	        if (testpath)
                return testpath + '/game/media/' + this.id;
            return '/api/game/media/' + this.id+ "?limit="+this.limit+"&offset="+this.offset;
        }
    });

    return GameImageList;
});
