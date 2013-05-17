// Media Images Data
// ----------

// Package Media
// Requires define
// Returns {MediaImageList} constructor

define(['facade', 'collections', 'media/models/image', 'utils'], 
function(facade, collections, MediaImageModel, utils) {

    var MediaImageList,
        BaseCollection = collections.BaseCollection,
        _ = facade._,
        Channel = utils.lib.Channel;

    MediaImageList = BaseCollection.extend({

        // Reference to this collection's model.
        model: MediaImageModel,
        
        // **Method:** `fetchSuccess` - resolve the deferred here in success
        fetchSuccess: function (collection, response) {
            collection.reset();
            
            var payload = response.payload;            
            for (var key in payload) {
                var item = new MediaImageModel();
                item.id = Math.ceil(Math.random() * 100000);
                item.set('payload', payload[key]);
                item.set('desc', response.desc);
                item.set('exec_data', response.exec_data);
                collection.push(item);
            }
            collection.deferred.resolve(response);            
        }

    });

    return MediaImageList;
});
