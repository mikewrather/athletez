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
                return testpath + '/team/seasons/' + this.id + '/' + this.sport_id + '/' + this.complevel_id;
            return '/api/team/seasons/' + this.id + '?sport_id=' + this.sport_id + '&complevel_id=' + this.complevel_id;
        }

    });

    return TeamSeasonList;
});
