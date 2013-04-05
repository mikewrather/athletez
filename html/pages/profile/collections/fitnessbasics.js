// Fitness Basics Data
// ----------

// Package Profile
// Requires define
// Returns {FitnessBasicList} constructor

define(['facade', 'user/collections/fitnessbasics', 'utils'], 
function(facade, UserFitnessBasicList, utils) {

    var FitnessBasicList,
        Channel = utils.lib.Channel;

    FitnessBasicList = UserFitnessBasicList.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/user/fitnessbasics/' + this.id;            
            return '/api/user/fitnessbasics?user_id=' + this.id;                        
        }
        

    });

    return FitnessBasicList;
});
