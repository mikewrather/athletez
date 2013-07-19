// ProfileSetting Complevel Model
// -----------
// Requires define
// Return {SportorgComplevelModel} object as constructor

define(["facade", "sportorg/models/position"], function(facade, SportsOrgModel) {

	var Model, _ = facade._;

	Model = SportsOrgModel.extend({
		idAttribute : 'position_id',
		url : function() {
			if (this.orgs_id == undefined) {
				//Incase to Hit Api without any parameter, Add Url here
			}

			if (this.type == "save")
				return '/api/user/position/' + this.user_id;
			if (this.type == "delete")
				return '/api/user/position/' + this.user_id + '?user_id=' + this.user_id;
		}
	});

	return Model;
});
