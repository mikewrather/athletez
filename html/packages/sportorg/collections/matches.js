// Sportorg Matches Data
// ----------

// Package Sportorg
// Requires define
// Returns {SportorgMatchList} constructor

define(['facade', 'collections', 'sportorg/models/match', 'utils'], 
function(facade, collections, SportorgMatchModel, utils) {

    var SportorgMatchList,
        BaseCollection = collections.BaseCollection,
        _ = facade._,
        Channel = utils.lib.Channel;

    SportorgMatchList = BaseCollection.extend({

        // Reference to this collection's model.
        model: SportorgMatchModel,
        
        // **Method:** `fetchSuccess` - resolve the deferred here in success
        fetchSuccess: function (collection, response) {
            collection.reset();
            var payload = response.payload;
            for (i = 0; i < payload.length; i++) {
                var item = new SportorgMatchModel();
                item.id = Math.ceil(Math.random() * 100000);
                item.set('payload', payload[i]);
                item.set('desc', response.desc);
                item.set('exec_data', response.exec_data);
                collection.push(item);
            }
            collection.deferred.resolve(response);            
        }

    });

    return SportorgMatchList;
});
