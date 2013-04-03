// Sports Data
// ----------

// Package Profile
// Requires define
// Returns {SportList} constructor

define(['facade', 'sportorg/collections/sports', 'utils'], 
function(facade, SportorgSportList, utils) {

    var SportList,
        _ = facade._,
        Channel = utils.lib.Channel;

    SportList = SportorgSportList.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/user/sports/' + this.id;
            return '/api/user/sports?user_id=' + this.id;
        }

    });

    return SportList;
});
