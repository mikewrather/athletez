// Data
// ----------

// Package User
// Requires define
// Returns {GPA  Collection} constructor

define(['facade', 'collections', 'user/collections/awards', 'utils'], function(facade, collections, UserCollection, utils) {

	var List, BaseCollection = collections.BaseCollection, _ = facade._, Channel = utils.lib.Channel,

	List = UserCollection.extend({
		url : function() {
			if (testpath)
				return testpath + '/api/user/awards/' + this.user_id;

			if (this.user_id == undefined) {
				//Incase to Hit Api without any parameter, Add Url here
			}
			return 'api/user/awards/' + this.user_id + '?id1=' + this.user_id;
		},

		parseAsRequired : function() {
			var self = this;

			var models = self.toJSON();
			console.log("sports models", models);
			var d = [];

			if (models.length) {
				$.each(models, function(index, load) {
					if (load != null && load.payload != null) {
						var payload = load.payload;
						var temp = {
							
							sports_id : payload.sports_id,
							sports_name : payload.name,
							awards : []
						}
						
						$.each(payload.awards,function(i,l){
							temp.awards.push({
								id : l.id,
								name : l.name,
								description : l.description,
								year : l.year
							});
							
						})
						
						d.push(temp);
					}
				});
			}
			return d;
		}
	});

	return List;
});
