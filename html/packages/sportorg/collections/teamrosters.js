// Sportorg Orgs Data
// ----------

// Package Sportorg
// Requires define
// Returns {SportorgTeamRosterList} constructor

define(['facade', 'collections', 'sportorg/models/teamroster', 'utils'], 
function(facade, collections, SportorgTeamRosterModel, utils) {

    var SportorgTeamRosterList,
        BaseCollection = collections.BaseCollection,
        _ = facade._,
        Channel = utils.lib.Channel;

    SportorgTeamRosterList = BaseCollection.extend({

        // Reference to this collection's model.
        model: SportorgTeamRosterModel,
        
        // **Method:** `fetchSuccess` - resolve the deferred here in success
        fetchSuccess: function (collection, response) {
            collection.reset();
            var payload = response.payload;
            if(!_.isUndefined(payload) && payload != null && payload) {
	            for (i = 0; i < payload.length; i++) {
	                var item = new SportorgTeamRosterModel();
	                item.id = Math.ceil(Math.random() * 100000);
	                item.set('payload', payload[i]);
	                item.set('desc', response.desc);
	                item.set('exec_data', response.exec_data);
	                collection.push(item);
	            }
	            collection.deferred.resolve(response); 
            } 
            collection.deferred.resolve(response);           
        }

    });

    return SportorgTeamRosterList;
});
