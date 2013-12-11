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

				var sport = {
					id : null,
					sport_name : "",
				};

				if (payload && payload.org_sport_link_obj) {
					if (payload.org_sport_link_obj.org && payload.org_sport_link_obj.org.locations) {
						location = payload.org_sport_link_obj.org.locations;
					}
					if (payload.org_sport_link_obj.sport) {
						sport = payload.org_sport_link_obj.sport;
					}
				}

				temp = {
					team_id : payload.id,
					team_name : payload.team_name,
					location_id : location.id,
					location_name : location.full_address,
					sports_name : sport.sport_name,
					sports_id : sport.id,
					complevels_id : payload.complevels_id,
					seasons_id : payload.seasons_id,
					year : payload.year
				};
			}
			return temp;
		}
	});

	return Model;
});
