// Sports Data
// ----------

// Package Team
// Requires define
// Returns {SeasonList} constructor

define(['facade', 'sportorg/collections/seasons', 'utils'], 
function(facade, SportorgSeasonList, utils) {

    var SeasonList,
        Channel = utils.lib.Channel;

    SeasonList = SportorgSeasonList.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/team/seasons/' + this.id + '/' + this.sport_id + '/' + this.complevel_id;
            return '/api/team/seasons?team_id=' + this.id + '&sport_id=' + this.sport_id + '&complevel_id=' + this.complevel_id;
        }

    });

    return SeasonList;
});
