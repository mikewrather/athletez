// Model
// -----------
// Requires define
// Return {SportorgTeamModel} object as constructor

define(["facade", "sportorg/models/team"], function(facade, SportsOrgModel) {

	var Model, _ = facade._;

	Model = SportsOrgModel.extend({
		url : function() {
			
			return '/api/team/game/' + this.teams_id;
		},
		// /*Override function from sportorg/models/complevel as per the requirement*/
		// fetchSuccess : function(model, response) {
		// }
	});

	return Model;
});
