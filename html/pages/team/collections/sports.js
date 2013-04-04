// Sports Data
// ----------

// Package Team
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
                return testpath + '/team/sports/' + this.id;
            return '/api/team/sports?team_id=' + this.id;
        }

    });

    return SportList;
});
