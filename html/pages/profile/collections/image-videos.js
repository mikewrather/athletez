// ProfileImageVideosList Data
// ----------

// Package Profile
// Requires define
// Returns {ProfileImageList} constructor

define(['facade', 'media/collections/images', 'utils'], 
function(facade, MediaImageList, utils) {

    var ProfileImageVideosList;

    ProfileImageVideosList = MediaImageList.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/user/media/' + this.id + '/' + this.sport_id;
            return '/api/user/media/' + this.id + '?sport_id=' + this.sport_id;
        }
        
    });

    return ProfileImageVideosList;
});
