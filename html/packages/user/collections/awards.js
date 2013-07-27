// Data
// ----------

// Package user
// Requires define
// Returns {Awards} constructor

define(['facade', 'collections', 'user/models/common', 'utils'], 
function(facade, collections, Model, utils) {

    var List,
        BaseCollection = collections.BaseCollection,
        _ = facade._,
        Channel = utils.lib.Channel,

    List = BaseCollection.extend({

        // Reference to this collection's model.
        model: Model,
        
        // **Method:** `fetchSuccess` - resolve the deferred here in success
        fetchSuccess: function (collection, response) {
            collection.reset();
            
            var payload = response.payload;
            for (var key in payload) {
                var item = new Model();
                item.id = Math.ceil(Math.random() * 100000);
                item.set('payload', payload[key]);
                item.set('desc', response.desc);
                item.set('exec_data', response.exec_data);
                collection.push(item);
            }
            
            collection.deferred.resolve(response);            
        }

    });

    return List;
});
