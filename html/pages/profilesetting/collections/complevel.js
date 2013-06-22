// CompLevel Data
// ----------

// Package Sports
// Requires define
// Returns {SportsList} constructor

define(['facade', 'collections', 'sportorg/collections/complevels', 'utils'
], 
function(facade, collections, SportsOrgCollection, utils) {

    var List,
        BaseCollection = collections.BaseCollection,
        _ = facade._,
        Channel = utils.lib.Channel;

    List = SportsOrgCollection.extend({
    	url: function(){
                    if (testpath)
                        return testpath + '/api/org/basics/';
                        
                    if(this.orgs_id == undefined) {
                    	//Incase to Hit Api without any parameter, Add Url here
                    } 
                    return '/api/org/basics/?orgs_id=' + this.orgs_id;
      },
    });

    return List;
});