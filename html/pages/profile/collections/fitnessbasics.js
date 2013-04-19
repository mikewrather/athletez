// Fitness Basics Data
// ----------

// Package Profile
// Requires define
// Returns {ProfileFitnessBasicList} constructor

define(['facade', 'user/collections/fitnessbasics', 'utils'], 
function(facade, UserFitnessBasicList, utils) {

    var ProfileFitnessBasicList,
        Channel = utils.lib.Channel;

    ProfileFitnessBasicList = UserFitnessBasicList.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/user/fitnessbasics/' + this.id + '/' + this.sport_id;            
            return '/api/user/fitnessbasics?user_id=' + this.id + '&sport_id=' + this.sport_id;                        
        }
        

    });

    return ProfileFitnessBasicList;
});
