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
                "label": "Add image",
                "link": "javascript: void(0);",
                "id"   :"addPhoto"
            }, {
                "label": "Add video",
                "link": "javascript: void(0);",
                "id"   :"addVideo"
            }
            ]
        }
    });
    return TeamAddMediaModel;
});

