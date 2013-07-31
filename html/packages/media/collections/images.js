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

	        console.log("Collection: ",collection);
	        console.log("Response: ",response);
	        console.log(collection);

            var payload = response.payload;
            for (var key in payload)
            {
	            var item = new MediaImageModel();
	            item.processItemFromPayload(response,key);

	            if(item.selected_image != undefined)
	            {
		            payload[key].image_path = item.selected_image;
	            }

                collection.push(item);
            }

            collection.deferred.resolve(response);

        }

    });

    return MediaImageList;

});