// Location States Data
// ----------

// Package Location
// Requires define
// Returns {LocationStateList} constructor

define(['facade', 'collections', 'models/common', 'utils'], 
function(facade, collections, CommonModel, utils) {

    var LocationList,
        BaseCollection = collections.BaseCollection,
        _ = facade._,
        Channel = utils.lib.Channel;

    LocationList = BaseCollection.extend({

        // Reference to this collection's model.
        model: CommonModel,
        
        //Default URL for fetching states to autocomplete 
        url: function() {
        	if (testpath)
                return testpath + '/city';
            if(this.city_name == undefined){
            	return '/api/city/search';
            }   
                     
                    return '/api/city/search/?city_name=' + this.city_name;            
        },
        
        // **Method:** `fetchSuccess` - resolve the deferred here in success
        fetchSuccess: function (collection, response) {
            collection.reset();
            var payload = response.payload;
            if(payload != null){
            	for (i = 0; i < (payload.length > 10 ? 10 : payload.length) ; i++) {
		         		 var item = {};
		         		 item.city = payload[i].name ;
		         		 item.county = payload[i].county.name
		         		 item.state = payload[i].county.state.name;
		         		 
		         		 item.id = payload[i].id;
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

    return LocationList;
});