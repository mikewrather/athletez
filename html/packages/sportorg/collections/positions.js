// Sportorg Positions Data
// ----------

// Package Sportorg
// Requires define
// Returns {SportorgPositionList} constructor

define(['facade', 'collections', 'sportorg/models/position', 'utils'], 
function(facade, collections, SportorgPositionModel, utils) {

    var SportorgPositionList,
        BaseCollection = collections.BaseCollection,
        _ = facade._,
        Channel = utils.lib.Channel;

    SportorgPositionList = BaseCollection.extend({

        // Reference to this collection's model.
        model: SportorgPositionModel,
        
        // **Method:** `fetchSuccess` - resolve the deferred here in success
        fetchSuccess: function (collection, response) {
            collection.reset();
            var payload = response.payload;
            if(payload != null){
            for (i = 0; i < payload.length; i++) {
                var item = new SportorgPositionModel();
                item.id = Math.ceil(Math.random() * 100000);
                item.set('payload', payload[i]);
                item.set('desc', response.desc);
                item.set('exec_data', response.exec_data);
                collection.push(item);
            }
            }
            collection.deferred.resolve(response);            
        }

    });

    return SportorgPositionList;
});
