// User Events Collection Data
// ----------

// Package Game
// Requires define

define(['facade', 'collections', 'utils'],
function(facade, collections, utils) {

    var _ = facade._,
    	BaseCollection = collections.BaseCollection,
        Channel = utils.lib.Channel,
	    Backbone = facade.Backbone;

    return BaseCollection.extend({
        url: function() {
            if (testpath)
                return testpath + '/game/users/' + this.id;
            return '/api/game/users/' + this.id;
        },

	    fetchSuccess: function (collection, response) {
		    collection.reset();

		    //console.log("Collection: ",collection);
		    //console.log("Response: ",response);
		    //console.log(collection);

		    var payload = response.payload;
		    for (var key in payload) {

			    var item = new Backbone.Model();
			    item.set('payload', payload[key]);
			    item.set('desc', response.desc);
			    item.set('exec_data', response.exec_data);
			    console.log(item);
			    collection.push(item);
		    }

		    collection.deferred.resolve(response);

	    }

    });
});
