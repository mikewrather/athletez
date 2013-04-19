// addmedia.js Model
// ------------
// Requires define
// Return {BaseModel} model constructor object

define( ["models/base"], function (BaseModel) {

    var TeamAddMediaModel;

    TeamAddMediaModel = BaseModel.extend({

        defaults: {
            
            "links": [{
                "label": "Photo",
                "link": "#"
            }, {
                "label": "Video",
                "link": "#"
            }, {
                "label": "Game",
                "link": "#"
            }
            ]
            
        }

    });

    return TeamAddMediaModel;
});

