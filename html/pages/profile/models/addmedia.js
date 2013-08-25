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
                //"link" : "#imageUp",
                "link" : "#imageupload",
				"id"   :"addPhoto"
            }, {
                "label": "Video",
                "link": "#videoprev",
				"id"   :""
            }, {
                "label": "Game",
                "link": "#game",
				"id"   :""
            }
            ],
	        "userid" : null
            
        }

    });

    return ProfileAddMediaModel;
});

