// Location States Data
// ----------

// Package Location
// Requires define
// Returns {LocationStateList} constructor

define(['facade', 'collections', 'location/collections/states', 'utils', 
'profilesetting/models/state',
], 
function(facade, collections, LocationStateCollection, utils,LocationStateModel) {

    var LocationStateList,
        BaseCollection = collections.BaseCollection,
        _ = facade._,
        Channel = utils.lib.Channel;

    LocationStateList = LocationStateCollection.extend({

        // Reference to this collection's model.
        model: LocationStateModel,
        
        url: function() {
            if (testpath)
					return testpath + '/user/basics/425983';
				return '/api/user/basics/';
        },
        
        // // **Method:** `fetchSuccess` - resolve the deferred here in success
        // fetchSuccess: function (collection, response) {
            // collection.reset();
            // var payload = response.payload;
            // for (i = 0; i < payload.length; i++) {
                // var item = new LocationStateModel();
                // item.id = Math.ceil(Math.random() * 100000);
                // item.set('payload', payload[i]);
                // item.set('desc', response.desc);
                // item.set('exec_data', response.exec_data);
                // collection.push(item);
            // }
            // collection.deferred.resolve(response);            
        // }

    });

    return LocationStateList;
});