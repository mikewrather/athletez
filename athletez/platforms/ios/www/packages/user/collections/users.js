// Data
// ----------

// Package user
// Requires define
// Returns {List} constructor

define(['facade', 'collections', 'user/models/common', 'utils'], 
function(facade, collections, Model, utils) {

    var List,
        BaseCollection = collections.BaseCollection,
        _ = facade._,
        Channel = utils.lib.Channel,

    List = BaseCollection.extend({

        // Reference to this collection's model.
        model: Model,
        
        url: function(){
        	var params = '';
        	if(this.user_name)
					params += 'searchtext='+ this.user_name;			
			if(this.sports_id)
					 params += '&sports_id=' + this.sports_id;
			if(this.states_id)
				 params += '&states_id=' + this.states_id;	
			if(this.cities_id)
					 params += '&cities_id=' + this.cities_id;
			if(this.team_id)
					 params += '&team_id=' + this.cities_id;
					 
        	return '/api/user/search?' + params;
        },
        
        
        // **Method:** `fetchSuccess` - resolve the deferred here in success
        fetchSuccess: function (collection, response) {
            collection.reset();
            
            var payload = response.payload;
            for (var key in payload) {
            	var d = payload[key];
            	d.sports_id = key;
            	
                var item = new Model();
                item.id = Math.ceil(Math.random() * 100000);
                item.set('payload', d);
                item.set('desc', response.desc);
                item.set('exec_data', response.exec_data);
                //item.payload.sports_id = key;
                collection.push(item);
            }
            
            collection.deferred.resolve(response);            
        }

    });

    return List;
});
