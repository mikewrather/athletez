// Model
// -----------
// Requires define
// Return {SportorgComplevelModel} object as constructor

define(["facade", "sportorg/models/game"], function(facade, SportsOrgModel) {

	var Model, _ = facade._;

	Model = SportsOrgModel.extend({
		idAttribute : 'game_id',

		url : function() {
			
			return '/api/game/add/' + this.game_id;
		},
		// /*Override function from sportorg/models/complevel as per the requirement*/
		// fetchSuccess : function(model, response) {
		// }
	});

	return Model;
});
