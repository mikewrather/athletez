// Data
// ----------

// Package User
// Requires define
// Returns {Test  Collection} constructor

define(['facade', 'collections', 'user/collections/tests', 'utils'], function(facade, collections, UserCollection, utils) {

	var List, BaseCollection = collections.BaseCollection, _ = facade._, Channel = utils.lib.Channel, List = UserCollection.extend({
		url : function() {
			if (testpath)
				return testpath + '/api/academictest/listall/' + this.user_id;

			if (this.user_id == undefined) {
				//Incase to Hit Api without any parameter, Add Url here
			}
			return 'api/academictest/listall/0?id1=' + this.user_id + '&standardized=' + (this.includeStandard || 0) + '&ap=' + (this.includeAp || 0);
		},

		parseAsRequired : function() {
			var self = this;

			var models = self.toJSON();
			var d = [];
			if (models.length) {
				$.each(models, function(index, load) {
					if (load != null && load.payload != null) {
						var payload = load.payload;
						var temp = {
							id : payload.id,
							testname : payload.name,
							type : payload.test_type,
							topics : []
						};

						if (payload.topics != null) {
							for (var key in payload.topics) {
								temp.topics.push({
									topicid : key,
									name : payload.topics[key].name,
									score : payload.topics[key].score || ""
								});

							}
						}
						d.push(temp);
					}
				});
			}
			return d;
		}
	});

	return List;
});
