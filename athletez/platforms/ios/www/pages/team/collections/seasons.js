// Sports Data
// ----------

// Package Team
// Requires define
// Returns {TeamSeasonList} constructor

define(['facade', 'sportorg/collections/seasons', 'utils'], 
function(facade, SportorgSeasonList, utils) {

    var TeamSeasonList,
        Channel = utils.lib.Channel;

    TeamSeasonList = SportorgSeasonList.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/org/seasons/' + this.id + '/' + this.sport_id + '/' + this.complevel_id;
            return '/api/org/seasons/' + this.id + '?sports_id=' + this.sport_id + '&complevels_id=' + this.complevel_id;
        }

    });

    return TeamSeasonList;
});
