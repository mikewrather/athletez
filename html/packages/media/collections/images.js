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

	        //console.log("Collection: ",collection);
	        //console.log("Response: ",response);

            var payload = response.payload;            
            for (var key in payload) {
                var item = new MediaImageModel();
                item.id = Math.ceil(Math.random() * 100000);

	            // this gives a payload, desc, and exec_data to every item in collection based on the main response
                item.set('payload', payload[key]);
                item.set('desc', response.desc);
                item.set('exec_data', response.exec_data);

	            //console.log("Item: ",item);
	            //console.log("This Payload: ",payload[key].image_path);

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