// TeamsData
// ----------

// Package Sports
// Requires define
// Returns {TeamsList} constructor
define(['facade', 'collections', 'sportorg/collections/games', 'utils'
],  
function(facade, collections, SportsOrgCollection, utils) {

    var List,
        BaseCollection = collections.BaseCollection,
        _ = facade._,
        Channel = utils.lib.Channel;

    List = SportsOrgCollection.extend({
    	url: function(){
                var params = '';
				if(this.game_name)
					params += 'searchtext='+ this.game_name;
				if(this.sports_id)
					params += '&sports_id='+ this.sports_id;

                    return '/api/game/search?'+ params;
      }
    });

    return List;
});