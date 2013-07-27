// Data
// ----------

// Package User
// Requires define
// Returns {RDTree Collection} constructor

define(['facade', 'collections', 'user/collections/rdtree', 'utils'], function(facade, collections, UserCollection, utils) {

	var List, BaseCollection = collections.BaseCollection, _ = facade._, Channel = utils.lib.Channel,

	List = UserCollection.extend({
		url : function() {
			if (testpath)
				return testpath + '/api/user/rdtree/' + this.user_id;

			if (this.user_id == undefined) {
				//Incase to Hit Api without any parameter, Add Url here
			}
			return 'api/user/rdtree/' + this.user_id + '?id1=' + this.user_id;
		},
		parseAsRequired : function() {
			var self = this;
			var models = self.toJSON();
				var d = [];
				if (models.length) {
					

					$.each(models, function(index, load) {
						var temp = {
							title : load.payload.name
						}
						var data = [];
						for (var key in load.payload.data) {
							var t = load.payload.data[key];
							var obj = {
								name : t.name,
								id : t.id,
								type : t.type,
								val : t.val || "",
								resumeDataId : t.resume_data_id
							}
							data.push(obj);
						}
						temp.data = data;

						d.push(temp);
					});
		}
		return d;
		}
	});

	return List;
}); 