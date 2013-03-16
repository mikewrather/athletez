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
        
        url: function() {
            if (testpath)
                return testpath + '/media/images/' + this.id;
            return base_url + '/api/media/images?user_id=' + this.id;
        },
        
        // **Method:** `fetchSuccess` - resolve the deferred here in success
        fetchSuccess: function (collection, response) {
            collection.reset();
            var payload = response.payload;
            for (i = 0; i < payload.length; i++) {
                var item = new MediaImageModel();
                item.id = Math.ceil(Math.random() * 100000);
                item.set('payload', payload[i]);
                item.set('desc', response.desc);
                item.set('exec_data', response.exec_data);
                collection.push(item);
            }
            collection.deferred.resolve(response);            
        }

    });

    return MediaImageList;
});
