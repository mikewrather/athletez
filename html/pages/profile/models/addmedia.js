// addmedia.js Model
// ------------
// Requires define
// Return {BaseModel} model constructor object

define( ["models/base"], function (BaseModel) {

    var ProfileAddMediaModel;

    ProfileAddMediaModel = BaseModel.extend({

        defaults: {
            
            "links": [{
                "label": "Photo",
                "link" : "#profile",
				"id"   :"addPhoto"
            }, {
                "label": "Video",
                "link": "#profile",
				"id"   :""
            }, {
                "label": "Game",
                "link": "#profile",
				"id"   :""
            }
            ],
	        "userid" : null
            
        }

    });

    return ProfileAddMediaModel;
});

