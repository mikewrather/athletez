// Images Data
// ----------

// Package Profile
// Requires define
// Returns {ProfileImageList} constructor

define(['facade', 'media/collections/images', 'utils'], 
function(facade, MediaImageList, utils) {

    var ProfileImageList,
        Channel = utils.lib.Channel;

    ProfileImageList = MediaImageList.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/user/images/' + this.id + '/' + this.sport_id;
            return '/api/user/images/' + this.id + '?sport_id=' + this.sport_id;
        }
        
    });

    return ProfileImageList;
});
