// ProfileSetting Complevel Model
// -----------
// Requires define
// Return {SportorgComplevelModel} object as constructor

define(["facade", "sportorg/models/complevel"], function(facade, SportsOrgModel) {

	var Model, _ = facade._;

	Model = SportsOrgModel.extend({

		url : function() {
			if (testpath)
				return testpath + '/api/org/basics/';

			if (this.orgs_id == undefined) {
				//Incase to Hit Api without any parameter, Add Url here
			}
			return '/api/org/basics/' + this.orgs_id + '?id1=' + this.orgs_id;
		},
		/*Override function from sportorg/models/complevel as per the requirement*/
		fetchSuccess : function(model, response) {
		}
	});

	return Model;
});
