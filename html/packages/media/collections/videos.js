// Media Videos Data
// ----------

// Package Media
// Requires define
// Returns {MediaVideoList} constructor

define(['facade', 'collections', 'media/models/video', 'utils'], 
function(facade, collections, MediaVideoModel, utils) {

    var MediaVideoList,
        BaseCollection = collections.BaseCollection,
        _ = facade._,
        Channel = utils.lib.Channel;

    MediaVideoList = BaseCollection.extend({

        // Reference to this collection's model.
        model: MediaVideoModel,
        
        // **Method:** `fetchSuccess` - resolve the deferred here in success
        fetchSuccess: function (collection, response) {
            collection.reset();
            var payload = response.payload;
            for (i = 0; i < payload.length; i++) {
                var item = new MediaVideoModel();
                item.id = Math.ceil(Math.random() * 100000);
                item.set('payload', payload[i]);
                item.set('desc', response.desc);
                item.set('exec_data', response.exec_data);
                collection.push(item);
            }
            collection.deferred.resolve(response);
        }

    });

    return MediaVideoList;
});
