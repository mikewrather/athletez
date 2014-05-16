
define(['facade', 'collections', 'utils', 'sportorg/models/season_profile'],
	function(facade, collections, utils, model) {

		var BaseCollection = collections.BaseCollection;

		return BaseCollection.extend({
			model: model,
			url: function() {
				return '/api/seasonprofile/search/';
			},
			fetchSuccess : function(collection, response) {
				console.log(this.model);

				collection.reset();

				var payload = response.payload;
				for (var key in payload) {
					var item = new this.model();
					item.id = Math.ceil(Math.random() * 100000);
					item.set('payload', payload[key]);
					item.set('desc', response.desc);
					item.set('exec_data', response.exec_data);
					collection.push(item);
				}

				collection.deferred.resolve(response);
				collection.processResult(collection);
			},
			processResult : function (collection) {

			},
			returnProcessedData : function(collection){

			},

			ParseForDropdown: function(){
				return this.toJSON();
			}
		});
	});
