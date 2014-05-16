// tag.js Model
// ------------
// Requires define
// Return {TagModel} model constructor object

define(["facade", "models/base"], function(facade, BaseModel) {

	var TagModel, _ = facade._;

	TagModel = BaseModel.extend({
		url : function() {
			return '/api/ent/addtag/';
		}
	});

	return TagModel;
}); 