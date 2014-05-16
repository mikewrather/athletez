// Media Video Services Data
// ----------

// Package Media
// Requires define
// Returns {MediaVideoServiceList} constructor

define(['facade', 'collections', 'media/models/videoservice', 'utils'], 
function(facade, collections, MediaVideoServiceModel, utils) {

    var MediaVideoServiceList,
        BaseCollection = collections.BaseCollection,
        _ = facade._,
        Channel = utils.lib.Channel;

    MediaVideoServiceList = BaseCollection.extend({

        // Reference to this collection's model.
        model: MediaVideoServiceModel,
        
        url: function() {
            if (testpath)
                return testpath + '/media/videos/' + this.id;
            return base_url + '/api/media/videos?user_id=' + this.id;
        },        
        
        // **Method:** `fetchSuccess` - resolve the deferred here in success
        fetchSuccess: function (collection, response) {
            collection.reset();
            var payload = response.payload;
            for (i = 0; i < payload.length; i++) {
                var item = new MediaVideoServiceModel();
                item.id = Math.ceil(Math.random() * 100000);
                item.set('payload', payload[i]);
                item.set('desc', response.desc);
                item.set('exec_data', response.exec_data);
                collection.push(item);
            }
            collection.deferred.resolve(response);
        }

    });

    return MediaVideoServiceList;
});
