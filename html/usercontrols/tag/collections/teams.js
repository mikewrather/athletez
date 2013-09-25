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
				 if(this.team_name)
					 params += '&searchtext='+ this.team_name;
				 if(this.states_id)
					 params += '&states_id=' + this.states_id;	
				 if(this.cities_id)
					 params += '&cities_id=' + this.cities_id;
				 if(this.sports_id)
					 params += '&sports_id=' + this.sports_id;


                    return '/api/team/search?'+ params;
      },
    });

    return List;
});