// Data
// ----------

// Package User
// Requires define
// Returns {RDTree Collection} constructor

define(['facade', 'collections', 'user/collections/rdtree', 'utils'], function(facade, collections, UserCollection, utils) {

	var List, BaseCollection = collections.BaseCollection, _ = facade._, Channel = utils.lib.Channel;

	List = UserCollection.extend({
		url : function() {
			if (testpath)
				return testpath + '/api/user/rdtree/' + this.user_id;

			if (this.user_id == undefined) {
				//Incase to Hit Api without any parameter, Add Url here
			}
			return 'api/user/rdtree/' + this.user_id + '?id1=' + this.user_id;
		},
		
	});

	return List;
}); 