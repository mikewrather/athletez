// Followers Data
// ----------

// Package Team
// Requires define
// Returns {FansImageList} constructor

define(['facade', 'media/collections/images', 'utils'], 
function(facade, MediaImageList, utils) {

    var FansImageList;

    FansImageList = MediaImageList.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/team/followers/' + this.id + '/' + this.sport_id;
            return '/api/team/followers/' + this.id + '?sport_id=' + this.sport_id;
        }
        
    });

    return FansImageList;
});
