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


                "link" : "javascript:void(0);",
                //"link" : "#imageup",

				"id"   :"addPhoto"
            }, /*{
                "label": "Video",
                "link": "#videoprev",
				"id"   :""
            }, {
                "label": "Game",
                "link": "#game",
				"id"   :""
    //            "link" : "javascript:void(0);",
				"id"   :"addPhoto"
            },*/ {
                "label": "Video",
	            //"link": "#videoprev",
                "link" : "javascript:void(0);",
	            "id": "addVideo"
            }/*, {
                "label": "Game",
	            "link" : "javascript: void(0);",
	            "id": "addGame"
                            }*/
            ],
	        "userid" : null
            
        }

    });

    return ProfileAddMediaModel;
});

