// Model
// -----------
// Requires define
// Return {SportorgComplevelModel} object as constructor

define(["facade",  "models/base"], function(facade, BaseModel) {

	var _ = facade._;

	return BaseModel.extend({
		//idAttribute : 'game_id',
		sports_id: undefined,
		url : function() {
			return '/api/user/games?sports_id=' + this.sports_id;
		}
	});
	
});
