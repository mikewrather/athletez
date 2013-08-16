// Sportorg Games Data
// ----------

// Package Sportorg
// Requires define
// Returns {SportorgGameList} constructor

define(['facade', 'collections', 'sportorg/models/game', 'utils'], 
function(facade, collections, SportorgGameModel, utils) {

    var SportorgGameList,
        BaseCollection = collections.BaseCollection,
        _ = facade._,
        Channel = utils.lib.Channel;

    SportorgGameList = BaseCollection.extend({

        // Reference to this collection's model.
        model: SportorgGameModel,
        
        // **Method:** `fetchSuccess` - resolve the deferred here in success
        fetchSuccess: function (collection, response) {
            collection.reset();
            var payload = response.payload;
            for (i = 0; i < payload.length; i++) {
                var item = new SportorgGameModel();
                item.id = Math.ceil(Math.random() * 100000);
                item.set('payload', payload[i]);
                item.set('desc', response.desc);
                item.set('exec_data', response.exec_data);
                collection.push(item);
            }
            collection.deferred.resolve(response);  
            collection.processResult(collection);          
        },
        // **MEthod:** Override this function in inherited class if any action is required 
		processResult : function (collection) {
		}

    });

    return SportorgGameList;
});
