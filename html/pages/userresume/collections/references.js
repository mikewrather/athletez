// Data
// ----------

// Package User
// Requires define
// Returns {Reference  Collection} constructor

define(['facade', 'collections', 'user/collections/references', 'utils'], function(facade, collections, UserCollection, utils) {

	var List, BaseCollection = collections.BaseCollection, _ = facade._, Channel = utils.lib.Channel,

	List = UserCollection.extend({
		url : function() {
			if (testpath)
				return testpath + '/api/user/references/' + this.user_id;

			return 'api/user/references/' + this.user_id + '?id1=' + this.user_id;
		},

		parseAsRequired : function() {
			var self = this;

			var models = self.toJSON();
			var d = [];
				console.log("models References", models);
			if (models.length) {
				$.each(models, function(index, load) {
					if (load != null && load.payload != null) {
						var payload = load.payload;
						var temp = {
							
							sports_id : payload.id,
							sports_name : payload.name,
							references : []
						}
						
						$.each(payload.references,function(i,l){
							temp.references.push({
								id : l.id,
								name : l.name,
								description : l.long_description,
								relation : l.relation,
								email : l.email,
								phone : l.phone
							});							
						})
						
						d.push(temp);
					}
				});
			}
			console.log("del",d);
			return d;
		}
	});

	return List;
});
