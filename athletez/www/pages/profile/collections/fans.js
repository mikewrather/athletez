// Followers Data
// ----------

// Package Profile
// Requires define
// Returns {FansImageList} constructor

define(['facade', 'media/collections/images', 'utils'], 
function(facade, MediaImageList, utils) {

    var FansImageList;

    FansImageList = MediaImageList.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/user/followers/' + this.id + '/' + this.sport_id;
            return '/api/user/followers/' + this.id + '?sport_id=' + this.sport_id;
        }
        
    });

    return FansImageList;
});
