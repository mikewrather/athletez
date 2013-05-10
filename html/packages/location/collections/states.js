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
        
        url: function() {
            
        },
        
        // **Method:** `fetchSuccess` - resolve the deferred here in success
        fetchSuccess: function (collection, response) {
            collection.reset();
            var payload = response.payload;
            for (i = 0; i < payload.length; i++) {
                var item = new LocationStateModel();
                item.id = Math.ceil(Math.random() * 100000);
                item.set('payload', payload[i]);
                item.set('desc', response.desc);
                item.set('exec_data', response.exec_data);
                collection.push(item);
            }
            collection.deferred.resolve(response);            
        }

    });

    return LocationStateList;
});
