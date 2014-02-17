// Sportorg Seasons Data
// ----------

// Package Sportorg
// Requires define
// Returns {SportorgSeasonList} constructor

define(['facade', 'collections', 'sportorg/models/season', 'utils'], 
function(facade, collections, SportorgSeasonModel, utils) {

    var SportorgSeasonList,
        BaseCollection = collections.BaseCollection,
        _ = facade._,
        Channel = utils.lib.Channel;

    SportorgSeasonList = BaseCollection.extend({

        // Reference to this collection's model.
        model: SportorgSeasonModel,
        
        // **Method:** `fetchSuccess` - resolve the deferred here in success
        fetchSuccess: function (collection, response) {
            collection.reset();
            var payload = response.payload;
            for (i = 0; i < payload.length; i++) {
                var item = new SportorgSeasonModel();
                item.id = Math.ceil(Math.random() * 100000);
                item.set('payload', payload[i]);
                item.set('desc', response.desc);
                item.set('exec_data', response.exec_data);
                collection.push(item);
            }
            collection.deferred.resolve(response);            
        },
	    ParseForDropdown : function(){
		    return this.toJSON();
	    }

    });

    return SportorgSeasonList;
});
