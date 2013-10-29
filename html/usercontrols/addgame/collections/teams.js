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
    		//http://localhost/api/team/search/0?id1=0&sports_id=47&complevels_id=0&orderby=&searchtext=a&cities_id=2&loc_name=&apiaccess_id=440
                var params = '';
				if(this.team_name)
					params += 'searchtext='+ encodeURI(this.team_name);
				if(this.states_id)
					params += '&states_id=' + this.states_id;	
				if(this.cities_id)
					params += '&cities_id=' + this.cities_id;
				if(this.sports_id)
					params += '&sports_id=' + this.sports_id;


                    return '/api/team/search?'+ params;
      }
    });

    return List;
});