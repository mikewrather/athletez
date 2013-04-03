// Images Data
// ----------

// Package Game
// Requires define
// Returns {ImageList} constructor

define(['facade', 'media/collections/images', 'utils'], 
function(facade, MediaImageList, utils) {

    var ImageList,
        _ = facade._,
        Channel = utils.lib.Channel;

    ImageList = MediaImageList.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/game/images/' + this.id;
            return '/api/game/images?game_id=' + this.id;            
        }
        
    });

    return ImageList;
});
