// Location States Data
// ----------

// Package Location
// Requires define
// Returns {LocationStateList} constructor

define(['facade', 'collections', 'location/models/state', 'utils'], 
function(facade, collections, LocationStateModel, utils) {

    var LocationStateList,
        BaseCollection = collections.BaseCollection,
        _ = facade._,
        Channel = utils.lib.Channel;

    LocationStateList = BaseCollection.extend({

        // Reference to this collection's model.
        model: LocationStateModel,
        
        //Default URL for fetching states to autocomplete 
        url: function() {
        	if (testpath)
                        return testpath + '/state_search';
            if(this.state_name == undefined){
            // Added by Rishabh(alphanso)
            // for getting list of states for homepage
            	return '/api/state/search';
            }   
                     
                    return '/api/state/search/?state_name=' + this.state_name;            
        },
        
        // **Method:** `fetchSuccess` - resolve the deferred here in success
        fetchSuccess: function (collection, response) {
            collection.reset();
            var payload = response.payload;
            if(payload != null){
            for (i = 0; i < payload.length; i++) {
                var item = new LocationStateModel();
                item.id = Math.ceil(Math.random() * 100000);
                item.set('payload', payload[i]);
                item.set('desc', response.desc);
                item.set('exec_data', response.exec_data);
                collection.push(item);
            }
            }
            collection.deferred.resolve(response);            
        },
        
        /*Method to return if any error occured in data fetching*/
       isError : function(){
       	//TODO: implement function as we get errors
       	return false;
       }

    });

    return LocationStateList;
});
