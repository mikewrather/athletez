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
                "link" : "#",
				"id"   :"addPhoto"
            }, {
                "label": "Video",
                "link": "#",
				"id"   :""
            }, {
                "label": "Game",
                "link": "#",
				"id"   :""
            }
            ],
	        "userid" : null
            
        }

    });

    return ProfileAddMediaModel;
});

