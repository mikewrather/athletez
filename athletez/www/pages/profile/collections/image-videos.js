// ProfileImageVideosList Data
// ----------

// Package Profile
// Requires define
// Returns {ProfileImageList} constructor

define(['facade', 'media/collections/images', 'utils'], 
function(facade, MediaImageList, utils) {

    var ProfileImageVideosList;

    ProfileImageVideosList = MediaImageList.extend({
    	limit: 8,
    	offset: 0,
        url: function() {
            if (testpath)
                return testpath + '/user/media/' + this.id + '/' + this.sport_id;
                var limit = (this.limit)?'&limit='+this.limit:"";
            return '/api/user/media/' + this.id + '?offset='+this.offset+limit+'&sport_id=' + this.sport_id;
          //return '/api/user/media/' + this.id +'?sport_id=' + this.sport_id;
        }
    });

    return ProfileImageVideosList;
});
