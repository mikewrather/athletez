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
					"label": "Add Photo",
					"link" : "javascript:void(0);",
					"id": "addPhoto"
				},
				{
					"label": "Add Video",
					"link" : "javascript:void(0);",
					"id": "addVideo"
				}
			]

		},

	});

	return GameAddMediaModel;
});

