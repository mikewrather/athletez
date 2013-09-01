// Model
// -----------
// Requires define
// Return {SportorgTeamModel} object as constructor

define(["facade", "sportorg/models/team"], function(facade, SportsOrgModel) {

	var Model, _ = facade._;

	Model = SportsOrgModel.extend({

		/*Use this method to map only required data from response after SUCCESS function*/
		parseAsRequired : function(response) {
			var self = this;
			var temp = {
			};
			if (response != null && response.payload != null) {
				var payload = response.payload;
				var location = {
					id : null,
					fulladdress : ''
				};

				if (payload && payload.org_sport_link_obj && payload.org_sport_link_obj.org && payload.org_sport_link_obj.org.locations)
					location = payload.org_sport_link_obj.org.locations;

				temp = {
					team_id : payload.id,
					team_name : payload.team_name,
					location_id : location.id,
					location_name : location.full_address,
				};
			}
			return temp;
		}
	});

	return Model;
});
