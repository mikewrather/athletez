// GamesData
// ----------

// Package Sports
// Requires define
// Returns {GamesList} constructor

define(['facade', 'collections', 'sportorg/collections/games', 'utils'
], 
function(facade, collections, SportsOrgCollection, utils) {

    var GamesList,
        BaseCollection = collections.BaseCollection,
        _ = facade._,
        Channel = utils.lib.Channel;

    GamesList = SportsOrgCollection.extend({
    	url: function(){
			var params = '';
				if(this.sports_id)
					params += 'sports_id='+ this.sports_id +'&';
				if(this.teams_id)
					params += 'teams_id='+ this.teams_id;

                    return '/api/game/search/0?'+ params;
      },
    });

    return GamesList;
});