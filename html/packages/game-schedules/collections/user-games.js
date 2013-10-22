// Sportorg Orgs Data
// ----------

// Package Sportorg
// Requires define
// Returns {SportorgTeamList} constructor

define(['facade', 'collections', 'sportorg/models/team', 'utils'], 
function(facade, collections, SportorgTeamModel, utils) {

    var BaseCollection = collections.BaseCollection,
        _ = facade._,
        Channel = utils.lib.Channel;

    return BaseCollection.extend({
		userId: undefined,
		sports_id: undefined,
        // Reference to this collection's model.
        model: facade.Backbone.Model.extend({}),
        url: function() {
        	return "/api/user/games/"+this.userId+"?sports_id="+this.sports_id;
        },
        // **Method:** `fetchSuccess` - resolve the deferred here in success
        fetchSuccess: function (collection, response) {
            collection.reset();
            
            var payload = response.payload;            
            for (var key in payload) {
                var item = new SportorgTeamModel();
                item.id = Math.ceil(Math.random() * 100000);
                item.set('payload', payload[key]);
                item.set('desc', response.desc);
                item.set('exec_data', response.exec_data);
                collection.push(item);
            }
            console.log("Updtaed Collection",collection);
            collection.deferred.resolve(response);            
        }

    });
});
