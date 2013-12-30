// addmedia.js Model
// ------------
// Requires define
// Return {BaseModel} model constructor object

define( ["models/base"], function (BaseModel) {

    var ProfileAddMediaModel;

    ProfileAddMediaModel = BaseModel.extend({

        defaults: {
            "links": [{
                "label": "Add image",
                "link" : "javascript:void(0);",
				"id"   :"addPhoto"
            }, {
                "label": "Add Video",
                "link" : "javascript:void(0);",
	            "id": "addVideo"
            }
            ],
	        "userid" : null
            
        }

    });

    return ProfileAddMediaModel;
});

