// Site Comments Data
// ----------

// Package Site
// Requires define
// Returns {SiteCommentList} constructor

define(['facade', 'collections', 'site/models/phrase', 'utils','controller'],
function(facade, collections, SitePhraseModel, utils,controller) {

    var SitePhraseList,
        BaseCollection = collections.BaseCollection,
	    ApplicationStates = collections.ApplicationStates;
        _ = facade._,
        Channel = utils.lib.Channel;

	SitePhraseList = BaseCollection.extend({

        // Reference to this collection's model.
        model: SitePhraseModel,

		url: function() {
			return base_url + 'api/phrase/listall';
		},

		saveData: function (collection) {
			var appStates = controller.prototype.appStates;
			if (appStates) {
				appStates.add({
					name: 'phrases',
					data: this.toJSON(),
					storage: 'localStorage',
					expires: new Date(Date.now() + 315400000)
				});
				appStates.save('phrases');
			}
			console.log(appStates.findByNameInStorage('phrases'));
		},

		// **Method:** `fetchSuccess` - resolve the deferred here in success
		fetchSuccess : function (collection, response) {
			console.log('fetchsuccess');
            collection.reset();

            var payload = response.payload;
            for (var key in payload) {
                var item = new SitePhraseModel();
                item.id = Math.ceil(Math.random() * 100000);
                item.set('payload', payload[key]);
                item.set('desc', response.desc);
                item.set('exec_data', response.exec_data);
                collection.push(item);
            }
            collection.deferred.resolve(response);
			collection.saveData(collection);

		//	console.log("SAVEDATA: ",collection.saveData);
        },

    });

    return SitePhraseList;
});