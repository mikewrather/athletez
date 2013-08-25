// addmedia.js Model
// ------------
// Requires define
// Return {BaseModel} model constructor object

define(["models/base"], function (BaseModel) {

	var GameAddMediaModel;

	GameAddMediaModel = BaseModel.extend({

		defaults: {

			"links": [
				{
					"label": "Photo",
					"link" : "javascript:void(0);",
					"id": "addPhoto"
				},
				{
					"label": "Video",
					"link" : "javascript:void(0);",
					"id": "addVideo"
				}
			]

		},

	});

	return GameAddMediaModel;
});

