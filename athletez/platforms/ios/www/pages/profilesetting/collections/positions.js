// CompLevel Data
// ----------

// Package Sports
// Requires define
// Returns {SportsList} constructor

define(['facade', 'collections', 'sportorg/collections/positions', 'utils'
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
                    return '/api/sport/positions/' + this.sport_id + '?id1=' + this.sport_id;
      },
      
       // // **Method:** `fetchSuccess` - resolve the deferred here in success
       // /*Over ride function in sportorg/collection/complevels to modify data as per our requirement*/
        // fetchSuccess: function (collection, response) {
        	// console.log("Payload",response.payload);
            // collection.reset();
            // var payload = response.payload;
            // for (i = 0; i < payload.length; i++) {
                // var item = new SportorgComplevelModel();
                // item.id = Math.ceil(Math.random() * 100000);
                // item.set('payload', payload[i]);
                // item.set('desc', response.desc);
                // item.set('exec_data', response.exec_data);
                // collection.push(item);
            // }
            // collection.deferred.resolve(response);            
        // }
    });

    return List;
});