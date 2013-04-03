// Images Data
// ----------

// Package Profile
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
                return testpath + '/user/images/' + this.id;
            return '/api/user/images?user_id=' + this.id;            
        }
        
    });

    return ImageList;
});
