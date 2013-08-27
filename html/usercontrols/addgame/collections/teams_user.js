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
                    return '/api/user/teams/'+ this.user_id + '/sports_id=' + this.sports_id ;
      },
    });

    return GamesList;
});