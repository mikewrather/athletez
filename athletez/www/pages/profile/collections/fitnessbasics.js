// Fitness Basics Data
// ----------

// Package Profile
// Requires define
// Returns {ProfileFitnessBasicList} constructor

define(['facade', 'user/collections/fitnessbasics', 'utils'], 
function(facade, UserFitnessBasicList, utils) {

    var ProfileFitnessBasicList;

    ProfileFitnessBasicList = UserFitnessBasicList.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/user/rdtree/' + this.id + '/?overview=1&sports_id=' + this.sport_id;
            return '/api/user/rdtree/' + this.id + '?overview=1&sports_id=' + this.sport_id;
        }

    });

    return ProfileFitnessBasicList;
});
