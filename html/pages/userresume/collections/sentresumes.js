// CompLevel Data
// ----------

// Package Sports
// Requires define
// Returns {Sent Resumes} constructor

define(['facade', 'collections', 'user/collections/resumes', 'utils'], function(facade, collections, UserCollection, utils) {

	var List, BaseCollection = collections.BaseCollection, _ = facade._, Channel = utils.lib.Channel;

	List = UserCollection.extend({
		url : function() {
			if (testpath)
				return testpath + '/api/user/sent_resume/' + this.user_id;

			if (this.user_id == undefined) {
				//Incase to Hit Api without any parameter, Add Url here
			}
			return 'api/user/sent_resumes/' + this.user_id + '?id1=' + this.user_id;
		},
		
	});

	return List;
}); 