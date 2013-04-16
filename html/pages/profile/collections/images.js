// Images Data
// ----------

// Package Profile
// Requires define
// Returns {ImageList} constructor

define(['facade', 'media/collections/images', 'utils'], 
function(facade, MediaImageList, utils) {

    var ImageList,
        Channel = utils.lib.Channel;

    ImageList = MediaImageList.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/user/images/' + this.id + '/' + this.sport_id;
            return '/api/user/images?user_id=' + this.id + '&sport_id=' + this.sport_id;            
        }
        
    });

    return ImageList;
});
