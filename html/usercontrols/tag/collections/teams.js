// TeamsData
// ----------

// Package Sports
// Requires define
// Returns {TeamsList} constructor
define(['facade', 'collections', 'sportorg/collections/teams', 'utils'
], 
function(facade, collections, SportsOrgCollection, utils) {

    var List,
        BaseCollection = collections.BaseCollection,
        _ = facade._,
        Channel = utils.lib.Channel;

    List = SportsOrgCollection.extend({
    	url: function(){
    		var params = '';
				if(this.team_name)
					params += 'team_name='+ this.team_name;

                    return '/api/team/search/?'+ params;
      },
    });

    return List;
});