// Media Image Model
// -----------
// Requires define
// Return {MediaImageModel} object as constructor  

define(["facade", "models/base"], function (facade, BaseModel) {

    var MediaImageModel,
        _ = facade._;

    MediaImageModel = BaseModel.extend({  

        defaults: _.extend({}, (new BaseModel).attributes, {
            
            "payload": {
                "image_id": 0,
                "image_path": null,
                "image_title": null,
                "num_votes": 0
            },
            "desc": "Image information",
            "exec_data": {
                "exec_time": 0,
                "exec_error": false
            }
        }),



	    processItemFromPayload: function(response,key)
	    {
		    var item = this;
		    var payload = response.payload;

		    item.id = Math.ceil(Math.random() * 100000);

		    // this gives a payload, desc, and exec_data to every item in collection based on the main response
		    if(key != undefined)
		    {
			    item.set('payload', payload[key]);
		    }
		    else
		    {
			    item.set('payload', payload);
		    }
		    item.set('desc', response.desc);
		    item.set('exec_data', response.exec_data);

		    console.log("MediaImageModel: ",this);
	    }
        
        
    });

    return MediaImageModel;
});
