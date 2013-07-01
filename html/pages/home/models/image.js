// Home Image Model

define([ "facade", "models/base" ], function(facade, BaseModel) {

	var HomeImageModel, _ = facade._;

	HomeImageModel = BaseModel.extend({

		defaults : _.extend({}, (new BaseModel).attributes, {

			"payload" : {
				"image_id" : 0,
				"image_path" : null,
				"image_title" : null,
				"num_votes" : 0
			},
			"desc" : "Image information",
			"exec_data" : {
				"exec_time" : 0,
				"exec_error" : false
			}
		})

	});

	return HomeImageModel;
});
