// Media Image Model
// -----------
// Requires define
// Return {MediaImageModel} object as constructor  

define(["facade", "models/base"], function (facade, BaseModel) {

	var _ = facade._;

	return BaseModel.extend({
		cityId : undefined,
		url: function() {
			return "/api/city/basics/"+this.cityId;
		}
	});
});
