// Sportorg Orgs Data
// ----------

// Package Sportorg
// Requires define
// Returns {SportorgOrgList} constructor

define(['facade', 'collections', 'sportorg/models/org', 'utils'], 
function(facade, collections, SportorgOrgModel, utils) {

    var SportorgOrgList,
        BaseCollection = collections.BaseCollection,
        _ = facade._,
        Channel = utils.lib.Channel;

    SportorgOrgList = BaseCollection.extend({

        // Reference to this collection's model.
        model: SportorgOrgModel,
        
        // **Method:** `fetchSuccess` - resolve the deferred here in success
        fetchSuccess: function (collection, response) {
            collection.reset();
            var payload = response.payload;
            for (i = 0; i < payload.length; i++) {
                var item = new SportorgOrgModel();
                item.id = Math.ceil(Math.random() * 100000);
                item.set('payload', payload[i]);
                item.set('desc', response.desc);
                item.set('exec_data', response.exec_data);
                collection.push(item);
            }
            collection.deferred.resolve(response);            
        }

    });

    return SportorgOrgList;
});
