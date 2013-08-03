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
					"link": "#",
					"id": "addPhoto"
				},
				{
					"label": "Video",
					"link": "#"
				}
			]

		},

	});

	return GameAddMediaModel;
});

