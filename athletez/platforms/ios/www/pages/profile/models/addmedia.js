// addmedia.js Model
// ------------
// Requires define
// Return {BaseModel} model constructor object

define( ["models/base"], function (BaseModel) {

    var ProfileAddMediaModel;

    ProfileAddMediaModel = BaseModel.extend({
		sportName: undefined,
		firstName: undefined,
        defaults: {
            "links": [{
                "label": "Add "+this.sportName+" pics of "+this.firstName,
                "link" : "javascript:void(0);",
				"id"   :"addPhoto"
            }, {
                "label": "Add "+this.sportName+" videos of "+this.firstName,
                "link" : "javascript:void(0);",
	            "id": "addVideo"
            }
            ],
	        "userid" : null
            
        },
        
        setData: function() {
        	this.set({"links": [{
                "label": "Add "+this.sportName+" pics of "+this.firstName,
                "link" : "javascript:void(0);",
				"id"   :"addPhoto"
            }, {
                "label": "Add "+this.sportName+" videos of "+this.firstName,
                "link" : "javascript:void(0);",
	            "id": "addVideo"
            }
            ],
	        "userid" : null});
        }

    });

    return ProfileAddMediaModel;
});

