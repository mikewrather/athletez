// ProfileSetting Complevel Model
// -----------
// Requires define
// Return {SportorgComplevelModel} object as constructor

define(["facade", "sportorg/models/sport"], function(facade, SportsOrgModel) {

	var Model, _ = facade._;

	Model = SportsOrgModel.extend({
		idAttribute : 'sports_id',
		url : function() {
			if (testpath)
				return testpath + '/api/org/basics/';

			if (this.orgs_id == undefined) {
				//Incase to Hit Api without any parameter, Add Url here
			}

			if (this.type == "save")
				return '/api/user/addsport/' + this.user_id;
			if (this.type == "delete")
				return '/api/user/sport/' + this.user_id + '?sports_id=' + this.sports_id;
		},
		data : {
			sports_id : this.sports_id,
		}
	});

	return Model;
});
