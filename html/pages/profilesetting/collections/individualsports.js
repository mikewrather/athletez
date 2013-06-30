// Sporta Sports Data
// ----------

// Package Sports
// Requires define
// Returns {SportsList} constructor

define(['facade', 'collections', 'sportorg/collections/sports', 'utils'
], 
function(facade, collections, SportsOrgCollection, utils) {

    var SportsList,
        BaseCollection = collections.BaseCollection,
        _ = facade._,
        Channel = utils.lib.Channel;

    SportsList = SportsOrgCollection.extend({
    	sport_type :1,
    	male : 1,
    	female : 0,
    	url: function(){
                    if (testpath)
                        return testpath + '/api/user/sports';
                        
                    if(this.gender == undefined) {
                    	//Incase to Hit Api without any parameter, Add Url here
                    } 
                    return '/api/user/sports/' + this.user_id;
      },
    });

    return SportsList;
});