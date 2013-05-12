// Sports Data
// ----------

// Package Profile
// Requires define
// Returns {ProfileSportList} constructor

define(['facade', 'sportorg/collections/sports', 'utils'], 
function(facade, SportorgSportList, utils) {

    var ProfileSportList,
        _ = facade._,
        Channel = utils.lib.Channel;

    ProfileSportList = SportorgSportList.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/user/sports/' + this.id;
            return '/api/user/sports/' + this.id;
        }

    });

    return ProfileSportList;
});
