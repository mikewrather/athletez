// Competitor Teams Data
// ----------

// Package Team
// Requires define
// Returns {CompetitorTeamList} constructor

define(['facade', 'sportorg/collections/teams', 'utils'], 
function(facade, SportorgTeamList, utils) {

    var CompetitorTeamList,
        Channel = utils.lib.Channel;

    CompetitorTeamList = SportorgTeamList.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/team/competitor_teams/' + this.id + '/' + this.sport_id + '/' + this.complevel_id + '/' + this.season_id;
            return '/api/team/competitor_teams?team_id=' + this.id + '&sport_id=' + this.sport_id + '&complevel_id=' + this.complevel_id + '&season_id=' + this.season_id;            
        }

    });

    return CompetitorTeamList;
});
