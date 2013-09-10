// addmedia.js Model
// ------------
// Requires define
// Return {BaseModel} model constructor object

define( ["models/base"], function (BaseModel) {

    var TeamAddMediaModel;

    TeamAddMediaModel = BaseModel.extend({
		id: undefined,
        defaults: {
            
            "links": [{
                "label": "Photo",
                "link": "javascript: void(0);",
                "id"   :"addPhoto"
            }, {
                "label": "Video",
                "link": "javascript: void(0);",
                "id"   :"addVideo"
            }, {
                "label": "Game",
                "link": "javascript: void(0);",
                "id"   :"addGame"
            }
            ]
            
        }

    });

    return TeamAddMediaModel;
});

