// Sports Data
// ----------

// Package Team
// Requires define
// Returns {TeamSportList} constructor

define(['facade', 'sportorg/collections/sports', 'utils'], 
function(facade, SportorgSportList, utils) {

    var TeamSportList,
        Channel = utils.lib.Channel;

    TeamSportList = SportorgSportList.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/team/sports/' + this.id;
            return '/api/team/sports/' + this.id;
        }

    });

    return TeamSportList;
});
