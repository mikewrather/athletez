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
					"label": "",
					"link" : "javascript:void(0);",
					"id": "addPhoto"
				},
				{
					"label": "",
					"link" : "javascript:void(0);",
					"id": "addVideo"
				}
			]

		},

	});

	return GameAddMediaModel;
});

