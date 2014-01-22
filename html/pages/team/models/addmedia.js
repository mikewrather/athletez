// addmedia.js Model
// ------------
// Requires define
// Return {BaseModel} model constructor object

define( ["models/base"], function (BaseModel) {

    var TeamAddMediaModel;

    TeamAddMediaModel = BaseModel.extend({
		id: undefined,
		sportName: undefined,
		firstName: undefined,
        defaults: {
            "links": [{
                "label": "Got pics of "+this.teamName,
                "link" : "javascript:void(0);",
				"id"   :"addPhoto"
            }, {
                "label": "Got videos of "+this.teamName,
                "link" : "javascript:void(0);",
	            "id": "addVideo"
            }
            ],
	        "userid" : null
            
        },
        
        setData: function() {
        	this.set({"links": [{
                "label": "Got pics of "+this.teamName,
                "link" : "javascript:void(0);",
				"id"   :"addPhoto"
            }, {
                "label": "Got videos of "+this.teamName,
                "link" : "javascript:void(0);",
	            "id": "addVideo"
            }
            ],
	        "userid" : null});
        }
    });
    return TeamAddMediaModel;
});

