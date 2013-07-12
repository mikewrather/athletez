// Sporta Sports Data
// ----------

// Package Sports
// Requires define
// Returns {SportsList} constructor

define(['facade', 'collections', 'sportorg/collections/sports', 'utils'], function(facade, collections, SportsOrgCollection, utils) {

	var SportsList, BaseCollection = collections.BaseCollection, _ = facade._, Channel = utils.lib.Channel;

	SportsList = SportsOrgCollection.extend({
		sport_type : 1,
		male : 1,
		female : 0,
		url : function() {
			if (testpath)
				return testpath + '/api/user/sports';

			if (this.type == "get")
				return '/api/user/sports/' + this.user_id;

		},
		data : {
			sports_id : this.sports_id,
		}
	});

	return SportsList;
}); 